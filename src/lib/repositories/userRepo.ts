import { createClient } from '@supabase/supabase-js';
import type { User } from '@/types/user';
import { mapRowToUser } from '@/lib/models/userModel';
import { NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export const userRepo = {
  async getUserByDNI(dni: string, eventId: string): Promise<User | null> {
    const { data, error } = await adminClient
      .from('users')
      .select('*')
      .eq('dni', dni)
      .eq('event_id', eventId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      logger.error('Error fetching user', error);
      return null;
    }

    return data ? mapRowToUser(data as any) : null;
  },

  async getUserById(userId: string): Promise<User> {
    const { data, error } = await adminClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundError('Usuario');
    }

    return mapRowToUser(data as any);
  },

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
    const { data, error } = await adminClient
      .from('users')
      .insert({
        event_id: user.eventId,
        dni: user.dni,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        user_type: user.userType,
        has_qr: user.hasQR,
        qr_code: user.qrCode,
        checked_in: user.checkedIn,
        how_found_id: user.howFoundId,
      })
      .select('*')
      .single();

    if (error) {
      logger.error('Error creating user', error);
      return null;
    }

    return data ? mapRowToUser(data as any) : null;
  },

  async searchUsers(eventId: string, query: string, limit = 10): Promise<User[]> {
    const { data, error } = await adminClient
      .from('users')
      .select('*')
      .eq('event_id', eventId)
      .or(`dni.ilike.%${query}%,name.ilike.%${query}%,lastname.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Error searching users', error);
      return [];
    }

    return (data || []).map(row => mapRowToUser(row as any));
  },

  async getUsersByEvent(eventId: string, page = 1, limit = 20): Promise<User[]> {
    const offset = (page - 1) * limit;
    
    const { data, error } = await adminClient
      .from('users')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error('Error fetching users', error);
      return [];
    }

    return (data || []).map(row => mapRowToUser(row as any));
  },

  async getUsersCount(eventId: string): Promise<number> {
    const { count, error } = await adminClient
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId);

    return count || 0;
  },

  async checkinUser(dni: string, eventId: string): Promise<boolean> {
    const { error } = await adminClient
      .from('users')
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq('dni', dni)
      .eq('event_id', eventId);

    if (error) {
      logger.error('Error checking in user', error);
      return false;
    }

    return true;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<boolean> {
    const { error } = await adminClient
      .from('users')
      .update({
        name: updates.name,
        lastname: updates.lastname,
        email: updates.email,
        phone: updates.phone,
      })
      .eq('id', userId);

    if (error) {
      logger.error('Error updating user', error);
      return false;
    }

    return true;
  },

  async deleteUser(userId: string): Promise<boolean> {
    const { error } = await adminClient
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      logger.error('Error deleting user', error);
      return false;
    }

    return true;
  },

  async markAsCheckedIn(userId: string): Promise<boolean> {
    const { error } = await adminClient
      .from('users')
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      logger.error('Error marking user as checked in', error);
      return false;
    }

    return true;
  },

  async isCheckedIn(userId: string): Promise<boolean> {
    const { data, error } = await adminClient
      .from('users')
      .select('checked_in')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return false;
    }

    return data.checked_in === true;
  },
};