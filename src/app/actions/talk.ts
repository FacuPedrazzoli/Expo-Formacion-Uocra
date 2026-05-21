'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { logger } from '@/lib/logger';

let _adminClient: ReturnType<typeof createClient> | null = null;

function getAdminClient() {
  if (!_adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    _adminClient = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _adminClient;
}

export async function registerUserToTalk(userId: string, talkId: string, eventId: string) {
  try {
    const { data: talk } = await getAdminClient()
      .from('talks')
      .select('capacity')
      .eq('id', talkId)
      .single();

    if (!talk) {
      return { success: false, error: 'Charla no encontrada' };
    }

    const talkData = talk as { capacity: number };
    const { count } = await getAdminClient()
      .from('talk_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('talk_id', talkId);

    if (count && count >= talkData.capacity) {
      return { success: false, error: 'Charla completa' };
    }

    const { error: insertError } = await getAdminClient()
      .from('talk_registrations')
      .insert({ user_id: userId, talk_id: talkId } as never);

    if (insertError) {
      if (insertError.code === '23505') {
        return { success: false, error: 'Ya estás registrado en esta charla' };
      }
      return { success: false, error: 'Error al registrarse en la charla' };
    }

    revalidatePath('/register');
    return { success: true };
  } catch (error) {
    logger.error('Register to talk error', error);
    return { success: false, error: 'Error inesperado' };
  }
}

export async function unregisterFromTalk(userId: string, talkId: string) {
  try {
    const { error } = await getAdminClient()
      .from('talk_registrations')
      .delete()
      .eq('user_id', userId)
      .eq('talk_id', talkId);

    if (error) {
      return { success: false, error: 'Error al cancelar registro' };
    }

    revalidatePath('/register');
    return { success: true };
  } catch (error) {
    logger.error('Unregister from talk error', error);
    return { success: false, error: 'Error inesperado' };
  }
}