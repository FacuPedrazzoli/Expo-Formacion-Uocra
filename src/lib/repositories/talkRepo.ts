import { createClient } from '@supabase/supabase-js';
import type { TalkWithCapacity } from '@/types/talk';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export const talkRepo = {
  async getTalksByEvent(eventId: string): Promise<TalkWithCapacity[]> {
    const { data: talks, error } = await adminClient
      .from('talks')
      .select('*')
      .eq('event_id', eventId)
      .eq('active', true)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching talks:', error);
      return [];
    }

    if (!talks || talks.length === 0) return [];

    const { data: registrations } = await adminClient
      .from('talk_registrations')
      .select('talk_id');

    const registrationCount: Record<string, number> = {};
    registrations?.forEach(r => {
      registrationCount[r.talk_id] = (registrationCount[r.talk_id] || 0) + 1;
    });

    return talks.map(talk => {
      const registered = registrationCount[talk.id] || 0;
      return {
        id: talk.id,
        eventId: talk.event_id,
        title: talk.title,
        description: talk.description ?? undefined,
        speaker: talk.speaker_name ?? undefined,
        startTime: talk.start_time,
        endTime: talk.end_time,
        room: talk.room ?? '',
        capacity: talk.capacity,
        registeredCount: registered,
        isFull: registered >= talk.capacity,
        availableSpots: Math.max(0, talk.capacity - registered),
      };
    });
  },

  async getTalkById(talkId: string): Promise<TalkWithCapacity | null> {
    const { data: talk, error } = await adminClient
      .from('talks')
      .select('*')
      .eq('id', talkId)
      .single();

    if (error || !talk) {
      console.error('Error fetching talk:', error);
      return null;
    }

    const { count } = await adminClient
      .from('talk_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('talk_id', talkId);

    const registered = count || 0;
    return {
      id: talk.id,
      eventId: talk.event_id,
      title: talk.title,
      description: talk.description ?? undefined,
      speaker: talk.speaker_name ?? undefined,
      startTime: talk.start_time,
      endTime: talk.end_time,
      room: talk.room ?? '',
      capacity: talk.capacity,
      registeredCount: registered,
      isFull: registered >= talk.capacity,
      availableSpots: Math.max(0, talk.capacity - registered),
    };
  },

  async getUserTalks(userId: string): Promise<string[]> {
    const { data, error } = await adminClient
      .from('talk_registrations')
      .select('talk_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user talks:', error);
      return [];
    }

    return data?.map(r => r.talk_id) || [];
  },

  async createTalk(talk: Omit<TalkWithCapacity, 'registeredCount' | 'isFull' | 'availableSpots'>): Promise<string | null> {
    const { data, error } = await adminClient
      .from('talks')
      .insert({
        event_id: talk.eventId,
        title: talk.title,
        description: talk.description,
        speaker_name: talk.speaker,
        start_time: talk.startTime,
        end_time: talk.endTime,
        capacity: talk.capacity,
        room: talk.room,
        active: true,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating talk:', error);
      return null;
    }

    return data?.id || null;
  },

  async updateTalk(talkId: string, updates: Partial<TalkWithCapacity>): Promise<boolean> {
    const { error } = await adminClient
      .from('talks')
      .update({
        title: updates.title,
        description: updates.description,
        speaker_name: updates.speaker,
        start_time: updates.startTime,
        end_time: updates.endTime,
        capacity: updates.capacity,
        room: updates.room,
      })
      .eq('id', talkId);

    if (error) {
      console.error('Error updating talk:', error);
      return false;
    }

    return true;
  },

  async deleteTalk(talkId: string): Promise<boolean> {
    const { error } = await adminClient
      .from('talks')
      .update({ active: false })
      .eq('id', talkId);

    if (error) {
      console.error('Error deleting talk:', error);
      return false;
    }

    return true;
  },
};