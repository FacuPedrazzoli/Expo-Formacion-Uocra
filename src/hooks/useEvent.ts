'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/browser';
import type { Event } from '@/types/event';

const supabase = createClient();

interface UseEventReturn {
  event: Event | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvent(eventId?: string): UseEventReturn {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('events').select('*').eq('active', true).single();

      if (eventId) {
        query = supabase.from('events').select('*').eq('id', eventId).single();
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setEvent(null);
        } else {
          setError(fetchError.message);
        }
      } else {
        setEvent(data as Event);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching event');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, loading, error, refetch: fetchEvent };
}

export function useActiveEvent(): UseEventReturn {
  return useEvent();
}