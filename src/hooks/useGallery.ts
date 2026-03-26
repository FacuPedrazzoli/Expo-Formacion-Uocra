'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/browser';
import type { GalleryImage } from '@/types/gallery';

const supabase = createClient();

interface UseGalleryReturn {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGallery(eventId?: string): UseGalleryReturn {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
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
      setError(err instanceof Error ? err.message : 'Error fetching gallery');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, error, refetch: fetchImages };
}