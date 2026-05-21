'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/browser';
import type { GalleryImage } from '@/types/gallery';

interface UseGalleryReturn {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const supabase = createClient();

export function useGallery(eventId?: string): UseGalleryReturn {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchImages = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('gallery')
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
        setImages((data || []) as GalleryImage[]);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error fetching gallery');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchImages();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchImages]);

  return { images, loading, error, refetch: fetchImages };
}