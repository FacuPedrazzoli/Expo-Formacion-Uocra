'use client';

import { useState, useEffect, useCallback } from 'react';
import eventData from '@/data/event-data.json';
import type { TalkWithCapacity } from '@/types/talk';

interface UseTalksReturn {
  talks: TalkWithCapacity[];
  loading: boolean;
  error: null;
  refetch: () => void;
}

export function useTalks(_eventId?: string): UseTalksReturn {
  const [talks, setTalks] = useState<TalkWithCapacity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTalks = useCallback(() => {
    try {
      setLoading(true);
      const jsonTalks = eventData.talks.map((t) => ({
        id: t.id,
        eventId: 'static-event',
        title: t.title,
        description: t.description,
        speaker: t.speaker,
        startTime: t.startTime,
        endTime: t.endTime,
        room: t.room,
        capacity: 0,
        registeredCount: 0,
        isFull: false,
        availableSpots: 0,
      }));
      const sortedTalks = jsonTalks.sort((a, b) => a.startTime.localeCompare(b.startTime));
      setTalks(sortedTalks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalks();
  }, [fetchTalks]);

  return { talks, loading, error: null, refetch: fetchTalks };
}

export function useTalk(talkId: string) {
  const { talks, ...rest } = useTalks();
  const talk = talks.find((t) => t.id === talkId);
  return { talk, ...rest };
}