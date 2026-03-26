'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/browser';
import type { Stand } from '@/types/stand';

const supabase = createClient();

interface UseStandsReturn {
  stands: Stand[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStands(eventId?: string): UseStandsReturn {
  const [stands, setStands] = useState<Stand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('stands')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setStands((data || []) as Stand[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching stands');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchStands();
  }, [fetchStands]);

  return { stands, loading, error, refetch: fetchStands };
}