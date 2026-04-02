'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import type { RegistrationFormData } from '@/lib/validation/schemas';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface RegisterResult {
  success: boolean;
  userId?: string;
  dni?: string;
  error?: string;
  errorCode?: 'DUPLICATE_DNI' | 'NO_ACTIVE_EVENT' | 'UNKNOWN';
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

export async function registerUser(formData: RegistrationFormData): Promise<RegisterResult> {
  try {
    const eventId = await getActiveEventId();
    if (!eventId) {
      return {
        success: false,
        error: 'No hay un evento activo',
        errorCode: 'NO_ACTIVE_EVENT'
      };
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('dni', formData.dni)
      .eq('event_id', eventId)
      .single();

    if (existingUser) {
      return {
        success: false,
        error: 'DNI ya registrado para este evento',
        errorCode: 'DUPLICATE_DNI'
      };
    }

    const howFoundId = await getHowFoundIdByLabel(formData.source);

    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        event_id: eventId,
        dni: formData.dni,
        name: formData.name,
        lastname: formData.surname,
        email: formData.email,
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

    revalidatePath('/');
    revalidatePath('/register');

    return {
      success: true,
      userId: newUser.id,
      dni: newUser.dni,
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