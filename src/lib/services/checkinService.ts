import { createClient } from '@supabase/supabase-js';
import { userRepo } from '@/lib/repositories/userRepo';
import type { User } from '@/types/user';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export interface CheckinResult {
  success: boolean;
  user?: User;
  message: string;
}

export const checkinService = {
  async checkinByDNI(dni: string, eventId: string): Promise<CheckinResult> {
    try {
      const user = await userRepo.getUserByDNI(dni, eventId);

      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      if (user.checkedIn) {
        return { 
          success: false, 
          user,
          message: `El usuario ${user.name} ${user.lastname} ya realizó el check-in anteriormente` 
        };
      }

      const updated = await userRepo.checkinUser(dni, eventId);

      if (!updated) {
        return { success: false, message: 'Error al realizar el check-in' };
      }

      const updatedUser = await userRepo.getUserById(user.id);

      return { 
        success: true, 
        user: updatedUser || undefined,
        message: `¡Bienvenido ${user.name} ${user.lastname}! Check-in realizado con éxito.` 
      };
    } catch (error) {
      console.error('Checkin error:', error);
      return { success: false, message: 'Error inesperado al realizar el check-in' };
    }
  },

  async searchUsers(eventId: string, query: string): Promise<User[]> {
    return userRepo.searchUsers(eventId, query);
  },

  async getCheckinStats(eventId: string): Promise<{ total: number; checkedIn: number }> {
    const total = await userRepo.getUsersCount(eventId);

    const { count } = await adminClient
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('checked_in', true);

    return { total, checkedIn: count || 0 };
  },
};