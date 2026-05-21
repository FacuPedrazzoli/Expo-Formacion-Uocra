import { createClient } from '@supabase/supabase-js';
import type { Event, EventStats } from '@/types/event';
import { mapRowToEvent, mapRowToEventStats, type EventRow, type EventStatsRow } from '@/lib/models/eventModel';
import { logger } from '@/lib/logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

function toSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = value;
  }
  return result;
}

export const eventRepo = {
  async getActiveEvent(): Promise<Event | null> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      logger.error('Error fetching active event', error);
      return null;
    }

    return data ? mapRowToEvent(data as EventRow) : null;
  },

  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event', error);
      return null;
    }

    return data ? mapRowToEvent(data as EventRow) : null;
  },

  async getEventStats(eventId: string): Promise<EventStats | null> {
    const { data, error } = await adminClient
      .from('event_stats')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (error) {
      logger.error('Error fetching event stats', error);
      return null;
    }

    return data ? mapRowToEventStats(data as EventStatsRow) : null;
  },

  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .order('year', { ascending: false });

    if (error) {
      logger.error('Error fetching events', error);
      return [];
    }

    return (data || []).map(row => mapRowToEvent(row as EventRow));
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<boolean> {
    const snakeUpdates = toSnakeCase(updates as Record<string, unknown>);
    const { error } = await adminClient
      .from('events')
      .update(snakeUpdates)
      .eq('id', id);

    if (error) {
      logger.error('Error updating event', error);
      return false;
    }

    return true;
  },

  async createEvent(event: Omit<Event, 'id' | 'createdAt'>): Promise<Event | null> {
    const { data, error } = await adminClient
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) {
      logger.error('Error creating event', error);
      return null;
    }

    return data ? mapRowToEvent(data as EventRow) : null;
  },
};