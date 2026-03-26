'use server';

import { checkinService } from '@/lib/services/checkinService';
import { revalidatePath } from 'next/cache';

export async function checkinUser(dni: string, eventId: string) {
  const result = await checkinService.checkinByDNI(dni, eventId);
  
  if (result.success) {
    revalidatePath('/admin/checkin');
    revalidatePath('/qr/[dni]');
  }
  
  return result;
}

export async function searchUsers(eventId: string, query: string) {
  return checkinService.searchUsers(eventId, query);
}

export async function getCheckinStats(eventId: string) {
  return checkinService.getCheckinStats(eventId);
}