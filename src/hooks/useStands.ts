'use client';

import { useState, useEffect, useCallback } from 'react';
import eventData from '@/data/event-data.json';
import type { Stand } from '@/types/stand';

interface UseStandsReturn {
  stands: Stand[];
  loading: boolean;
  error: null;
  refetch: () => void;
}

export function useStands(_eventId?: string): UseStandsReturn {
  const [stands, setStands] = useState<Stand[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStands = useCallback(() => {
    try {
      setLoading(true);
      const jsonStands: Stand[] = eventData.stands.map((s, index) => ({
        id: s.id,
        eventId: 'static-event',
        name: s.name,
        description: s.description,
        logoUrl: s.logo,
        imageUrl: s.logo,
        category: s.category,
        boothNumber: undefined,
        order: index,
      }));
      setStands(jsonStands);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStands();
  }, [fetchStands]);

  return { stands, loading, error: null, refetch: fetchStands };
}