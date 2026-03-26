import { eventRepo } from '@/lib/repositories/eventRepo';
import type { Event, EventStats } from '@/types/event';

export const eventService = {
  async getActiveEvent(): Promise<Event | null> {
    return eventRepo.getActiveEvent();
  },

  async getEventById(id: string): Promise<Event | null> {
    return eventRepo.getEventById(id);
  },

  async getEventStats(eventId: string): Promise<EventStats | null> {
    return eventRepo.getEventStats(eventId);
  },

  async getAllEvents(): Promise<Event[]> {
    return eventRepo.getAllEvents();
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<boolean> {
    return eventRepo.updateEvent(id, updates);
  },
};