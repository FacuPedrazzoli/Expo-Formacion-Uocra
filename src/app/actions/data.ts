'use server';

import { eventService } from '@/lib/services/eventService';
import { talkService } from '@/lib/services/talkService';
import { standRepo } from '@/lib/repositories/standRepo';
import { userRepo } from '@/lib/repositories/userRepo';
import { revalidatePath } from 'next/cache';

export async function getActiveEvent() {
  return eventService.getActiveEvent();
}

export async function getEventById(id: string) {
  return eventService.getEventById(id);
}

export async function getEventStats(eventId: string) {
  return eventService.getEventStats(eventId);
}

export async function updateEvent(id: string, updates: Record<string, unknown>) {
  const result = await eventService.updateEvent(id, updates);
  if (result) {
    revalidatePath('/admin/events');
  }
  return result;
}

export async function getTalks(eventId: string) {
  return talkService.getTalksByEvent(eventId);
}

export async function getTalk(talkId: string) {
  return talkService.getTalkById(talkId);
}

export async function createTalk(talk: Record<string, unknown>) {
  const result = await talkService.createTalk(talk as never);
  if (result) {
    revalidatePath('/admin/talks');
  }
  return result;
}

export async function updateTalk(talkId: string, updates: Record<string, unknown>) {
  const result = await talkService.updateTalk(talkId, updates);
  if (result) {
    revalidatePath('/admin/talks');
  }
  return result;
}

export async function deleteTalk(talkId: string) {
  const result = await talkService.deleteTalk(talkId);
  if (result) {
    revalidatePath('/admin/talks');
  }
  return result;
}

export async function getStands(eventId: string) {
  return standRepo.getStandsByEvent(eventId);
}

export async function getUsers(eventId: string, page = 1) {
  return userRepo.getUsersByEvent(eventId, page);
}

export async function getUsersCount(eventId: string) {
  return userRepo.getUsersCount(eventId);
}

export async function searchUsers(eventId: string, query: string) {
  return userRepo.searchUsers(eventId, query);
}