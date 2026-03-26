import { talkRepo } from '@/lib/repositories/talkRepo';
import type { TalkWithCapacity } from '@/types/talk';

export const talkService = {
  async getTalksByEvent(eventId: string): Promise<TalkWithCapacity[]> {
    return talkRepo.getTalksByEvent(eventId);
  },

  async getTalkById(talkId: string): Promise<TalkWithCapacity | null> {
    return talkRepo.getTalkById(talkId);
  },

  async getUserTalks(userId: string): Promise<string[]> {
    return talkRepo.getUserTalks(userId);
  },

  async createTalk(talk: Omit<TalkWithCapacity, 'registeredCount' | 'isFull' | 'availableSpots'>): Promise<string | null> {
    return talkRepo.createTalk(talk);
  },

  async updateTalk(talkId: string, updates: Partial<TalkWithCapacity>): Promise<boolean> {
    return talkRepo.updateTalk(talkId, updates);
  },

  async deleteTalk(talkId: string): Promise<boolean> {
    return talkRepo.deleteTalk(talkId);
  },
};