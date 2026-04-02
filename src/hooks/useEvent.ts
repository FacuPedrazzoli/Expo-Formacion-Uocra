'use client';

import { useState, useEffect, useCallback } from 'react';
import eventData from '@/data/event-data.json';
import type { Event } from '@/types/event';

interface UseEventReturn {
  event: Event | null;
  loading: boolean;
  error: null;
  refetch: () => void;
}

export function useEvent(_eventId?: string): UseEventReturn {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(() => {
    try {
      setLoading(true);
      setEvent({
        id: 'static-event',
        year: 2026,
        title: eventData.event.name,
        date: eventData.event.date,
        active: true,
        description: 'El evento anual de formación profesional para el sector de la construcción',
        location: eventData.eventInfo.location,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, loading, error: null, refetch: fetchEvent };
}

export function useActiveEvent(): UseEventReturn {
  return useEvent();
}