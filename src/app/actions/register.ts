'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import type { User } from '@/types/user';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface RegistrationFormData {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  howFoundId?: string;
  talkIds: string[];
  eventId: string;
}

export interface RegistrationResult {
  success: boolean;
  user?: User;
  error?: string;
  errorCode?: 'DUPLICATE_DNI' | 'TALK_FULL' | 'TALK_OVERLAP' | 'UNKNOWN';
}

function mapErrorMessage(errorMsg: string | null): { message: string; code: RegistrationResult['errorCode'] } {
  if (!errorMsg) {
    return { message: 'Error desconocido', code: 'UNKNOWN' };
  }
  
  const lowerMsg = errorMsg.toLowerCase();
  
  if (lowerMsg.includes('ya registrado') || lowerMsg.includes('duplicate') || lowerMsg.includes('dni')) {
    return { message: 'DNI ya registrado para este evento', code: 'DUPLICATE_DNI' };
  }
  
  if (lowerMsg.includes('completa') || lowerMsg.includes('full') || lowerMsg.includes('cupo')) {
    return { message: 'La charla selected está completa', code: 'TALK_FULL' };
  }
  
  if (lowerMsg.includes('overlap') || lowerMsg.includes('conflicto') || lowerMsg.includes('horario')) {
    return { message: 'Horario solapado con otra charla seleccionada', code: 'TALK_OVERLAP' };
  }
  
  return { message: errorMsg, code: 'UNKNOWN' };
}

export async function registerUser(formData: RegistrationFormData): Promise<RegistrationResult> {
  try {
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('dni', formData.dni)
      .eq('event_id', formData.eventId)
      .single();

    if (existingUser) {
      return {
        success: false,
        error: 'DNI ya registrado para este evento',
        errorCode: 'DUPLICATE_DNI'
      };
    }

    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        event_id: formData.eventId,
        dni: formData.dni,
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        user_type: 'web',
        has_qr: false,
        checked_in: false,
        how_found_id: formData.howFoundId ?? null,
      })
      .select()
      .single();

    if (userError || !newUser) {
      const errorInfo = mapErrorMessage(userError?.message ?? null);
      return {
        success: false,
        error: errorInfo.message,
        errorCode: errorInfo.code
      };
    }

    const registeredTalks: string[] = [];
    const failedTalks: string[] = [];

    if (formData.talkIds && formData.talkIds.length > 0) {
      for (const talkId of formData.talkIds) {
        const { data: rpcResult, error: rpcError } = await supabase.rpc('register_user_to_talk', {
          p_user_id: newUser.id,
          p_talk_id: talkId,
          p_event_id: formData.eventId,
        });

        if (rpcError) {
          console.error('RPC error:', rpcError);
          failedTalks.push(talkId);
          continue;
        }

        if (rpcResult && typeof rpcResult === 'object' && 'success' in rpcResult && !rpcResult.success) {
          console.error('Talk registration failed:', rpcResult.error);
          failedTalks.push(talkId);
        } else {
          registeredTalks.push(talkId);
        }
      }
    }

    const finalUser: User = {
      id: newUser.id,
      eventId: newUser.event_id,
      dni: newUser.dni,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      userType: newUser.user_type,
      hasQR: newUser.has_qr,
      checkedIn: newUser.checked_in,
      createdAt: newUser.created_at,
    };

    const hasPartialFailure = failedTalks.length > 0 && registeredTalks.length > 0;
    const hasTotalFailure = failedTalks.length > 0 && registeredTalks.length === 0;

    if (hasTotalFailure) {
      await supabase.from('users').delete().eq('id', newUser.id);
      return {
        success: false,
        error: 'No se pudo registrar en las charlas seleccionadas. Por favor intentá de nuevo.',
        errorCode: 'TALK_FULL'
      };
    }

    if (hasPartialFailure) {
      return {
        success: true,
        user: finalUser,
        error: `Te registraste pero no pudimos confirmar algunas charlas (${failedTalks.length}). Contactate con soporte.`
      };
    }

    revalidatePath('/');
    revalidatePath('/register');

    return {
      success: true,
      user: finalUser
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Error inesperado en el registro. Por favor intentá más tarde.',
      errorCode: 'UNKNOWN'
    };
  }
}

interface CSVRow {
  dni: string;
  name: string;
  lastname: string;
  email: string;
}

export async function registerFromCSV(
  data: CSVRow[],
  eventId: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let successCount = 0;
  let failedCount = 0;

  for (const row of data) {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('dni', row.dni)
        .eq('event_id', eventId)
        .single();

      if (existingUser) {
        failedCount++;
        errors.push(`DNI ${row.dni} ya existe`);
        continue;
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert({
          event_id: eventId,
          dni: row.dni,
          name: row.name,
          lastname: row.lastname,
          email: row.email,
          user_type: 'manual',
          has_qr: true,
          qr_code: `/qr/${row.dni}`,
          checked_in: false,
        });

      if (insertError) {
        failedCount++;
        errors.push(`Error insertando ${row.dni}: ${insertError.message}`);
      } else {
        successCount++;
      }
    } catch (error) {
      failedCount++;
      errors.push(`Error procesando ${row.dni}`);
    }
  }

  revalidatePath('/admin/users');

  return { success: successCount, failed: failedCount, errors };
}