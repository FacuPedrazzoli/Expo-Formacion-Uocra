'use server';

import { checkinService } from '@/lib/services/checkinService';
import { revalidatePath } from 'next/cache';
import { checkinSchema } from '@/lib/validation/schemas';
import { validateUUID } from '@/lib/validation/util';

export async function checkinUser(dni: string, eventId: string) {
  const validated = checkinSchema.safeParse({ dni, eventId });
  if (!validated.success) {
    return { success: false, message: 'Datos inválidos' };
  }

  if (!validateUUID(eventId)) {
    return { success: false, message: 'ID de evento inválido' };
  }

  const result = await checkinService.checkinByDNI(dni, eventId);
  
  if (result.success) {
    revalidatePath('/admin/checkin');
  }
  
  return result;
}

export async function verifyUser(dni: string, eventId: string) {
  return checkinService.verifyUser(dni, eventId);
}

export async function searchUsers(eventId: string, query: string) {
  return checkinService.searchUsers(eventId, query);
}

export async function getCheckinStats(eventId: string) {
  return checkinService.getCheckinStats(eventId);
}

export async function getActiveEventId(): Promise<string | null> {
  return checkinService.getActiveEventId();
}

export async function getUserByDNI(dni: string) {
  return checkinService.getUserByDNI(dni);
}