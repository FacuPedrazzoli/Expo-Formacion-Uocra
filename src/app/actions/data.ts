'use server';

import { userRepo } from '@/lib/repositories/userRepo';

export async function getUsers(eventId: string, page = 1) {
  return userRepo.getUsersByEvent(eventId, page);
}

export async function getUsersCount(eventId: string) {
  return userRepo.getUsersCount(eventId);
}

export async function searchUsers(eventId: string, query: string) {
  return userRepo.searchUsers(eventId, query);
}