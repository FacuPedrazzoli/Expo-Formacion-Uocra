'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/browser';
import type { TalkWithCapacity } from '@/types/talk';

const supabase = createClient();

interface UseTalksReturn {
  talks: TalkWithCapacity[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTalks(eventId?: string): UseTalksReturn {
  const [talks, setTalks] = useState<TalkWithCapacity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTalks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('v_talks_with_capacity')
        .select('*')
        .order('start_time', { ascending: true });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        const fallbackQuery = supabase
          .from('talks')
          .select('*')
          .eq('active', true)
          .order('start_time', { ascending: true });

        const { data: fallbackData, error: fallbackError } = eventId 
          ? await fallbackQuery.eq('event_id', eventId)
          : await fallbackQuery;

        if (fallbackError) {
          setError(fallbackError.message);
        } else {
          const talksWithCapacity = (fallbackData || []).map(talk => ({
            id: talk.id,
            eventId: talk.event_id,
            title: talk.title,
            description: talk.description,
            speaker: talk.speaker_name,
            startTime: talk.start_time,
            endTime: talk.end_time,
            room: talk.room || '',
            capacity: talk.capacity,
            registeredCount: 0,
            isFull: false,
            availableSpots: talk.capacity,
          }));
          setTalks(talksWithCapacity);
        }
      } else {
        setTalks(data as TalkWithCapacity[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching talks');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchTalks();
  }, [fetchTalks]);

  return { talks, loading, error, refetch: fetchTalks };
}

export function useTalk(talkId: string) {
  const { talks, ...rest } = useTalks();
  const talk = talks.find(t => t.id === talkId);
  return { talk, ...rest };
}