import { createClient } from '@supabase/supabase-js';
import type { Event, EventStats } from '@/types/event';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export const eventRepo = {
  async getActiveEvent(): Promise<Event | null> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching active event:', error);
      return null;
    }

    return data as Event;
  },

  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return null;
    }

    return data as Event;
  },

  async getEventStats(eventId: string): Promise<EventStats | null> {
    const { data, error } = await adminClient
      .from('event_stats')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (error) {
      console.error('Error fetching event stats:', error);
      return null;
    }

    return data as EventStats;
  },

  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .order('year', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return (data || []) as Event[];
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<boolean> {
    const { error } = await adminClient
      .from('events')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating event:', error);
      return false;
    }

    return true;
  },
};