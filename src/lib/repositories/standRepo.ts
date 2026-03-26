import { createClient } from '@supabase/supabase-js';
import type { Stand } from '@/types/stand';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export const standRepo = {
  async getStandsByEvent(eventId: string): Promise<Stand[]> {
    const { data, error } = await adminClient
      .from('stands')
      .select('*')
      .eq('event_id', eventId)
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching stands:', error);
      return [];
    }

    return (data || []) as Stand[];
  },

  async createStand(stand: Omit<Stand, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    const { data, error } = await adminClient
      .from('stands')
      .insert({
        event_id: stand.eventId,
        name: stand.name,
        description: stand.description,
        logo_url: stand.logoUrl,
        image_url: stand.imageUrl,
        category: stand.category,
        booth_number: stand.boothNumber,
        sort_order: stand.order,
        active: true,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating stand:', error);
      return null;
    }

    return data?.id || null;
  },

  async updateStand(standId: string, updates: Partial<Stand>): Promise<boolean> {
    const { error } = await adminClient
      .from('stands')
      .update({
        name: updates.name,
        description: updates.description,
        logo_url: updates.logoUrl,
        image_url: updates.imageUrl,
        category: updates.category,
        booth_number: updates.boothNumber,
        sort_order: updates.order,
      })
      .eq('id', standId);

    if (error) {
      console.error('Error updating stand:', error);
      return false;
    }

    return true;
  },

  async deleteStand(standId: string): Promise<boolean> {
    const { error } = await adminClient
      .from('stands')
      .update({ active: false })
      .eq('id', standId);

    if (error) {
      console.error('Error deleting stand:', error);
      return false;
    }

    return true;
  },
};