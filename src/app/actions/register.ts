'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { registrationSchema } from '@/lib/validation/schemas';
import { generateQRDataURL } from '@/lib/qr';
import { logger } from '@/lib/logger';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://expoformacion.uocra.org';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface RegisterResult {
  success: boolean;
  userId?: string;
  dni?: string;
  error?: string;
  errorCode?: 'DUPLICATE_DNI' | 'NO_ACTIVE_EVENT' | 'DUPLICATE_EMAIL' | 'UNKNOWN';
}

async function getActiveEventId(): Promise<string | null> {
  const { data, error } = await supabase
    .from('events')
    .select('id')
    .eq('active', true)
    .single();

  if (error || !data) return null;
  return data.id;
}

async function getHowFoundIdByLabel(label: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('how_found')
    .select('id')
    .eq('label', label)
    .eq('active', true)
    .single();

  if (error || !data) return null;
  return data.id;
}

export async function registerUser(formData: unknown): Promise<RegisterResult> {
  const validated = registrationSchema.safeParse(formData);
  if (!validated.success) {
    return { success: false, error: 'Datos inválidos', errorCode: 'UNKNOWN' };
  }

  const { name, surname, dni, email, source } = validated.data;

  try {
    const eventId = await getActiveEventId();
    if (!eventId) {
      return {
        success: false,
        error: 'No hay un evento activo',
        errorCode: 'NO_ACTIVE_EVENT'
      };
    }

    const { data: existingUserByDNI } = await supabase
      .from('users')
      .select('id')
      .eq('dni', dni)
      .eq('event_id', eventId)
      .single();

    if (existingUserByDNI) {
      return {
        success: false,
        error: 'DNI ya registrado para este evento',
        errorCode: 'DUPLICATE_DNI'
      };
    }

    const { data: existingUserByEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .eq('event_id', eventId)
      .single();

    if (existingUserByEmail) {
      return {
        success: false,
        error: 'Email ya registrado para este evento',
        errorCode: 'DUPLICATE_EMAIL'
      };
    }

    const howFoundId = await getHowFoundIdByLabel(source);

    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        event_id: eventId,
        dni: dni,
        name: name,
        lastname: surname,
        email: email,
        user_type: 'web',
        has_qr: false,
        checked_in: false,
        how_found_id: howFoundId,
      })
      .select('id, dni')
      .single();

    if (userError || !newUser) {
      return {
        success: false,
        error: userError?.message || 'Error al crear el usuario',
        errorCode: 'UNKNOWN'
      };
    }

    const qrDataUrl = await generateQRDataURL(dni);

    const { error: updateError } = await supabase
      .from('users')
      .update({ has_qr: true, qr_code: qrDataUrl })
      .eq('id', newUser.id);

    if (updateError) {
      logger.error('Error updating QR', updateError);
    }

    revalidatePath('/');
    revalidatePath('/register');

    return {
      success: true,
      userId: newUser.id,
      dni: newUser.dni,
    };

  } catch (error) {
    logger.error('Registration error', error);
    return {
      success: false,
      error: 'Error inesperado en el registro. Por favor, intentá más tarde.',
      errorCode: 'UNKNOWN'
    };
  }
}