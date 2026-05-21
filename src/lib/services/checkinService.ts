import { createClient } from '@supabase/supabase-js';
import { userRepo } from '@/lib/repositories/userRepo';
import type { User } from '@/types/user';
import { logger } from '@/lib/logger';
import { verifyQRHash } from '@/lib/qr';

let _adminClient: ReturnType<typeof createClient> | null = null;

function getAdminClient() {
  if (!_adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    _adminClient = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _adminClient;
}

export interface CheckinResult {
  success: boolean;
  user?: User;
  message: string;
}

const DNI_REGEX = /^\d{7,8}$/;

function validateDNI(dni: string): boolean {
  return DNI_REGEX.test(dni.trim());
}

export const checkinService = {
  async checkinByQR(qrData: string, eventId: string): Promise<CheckinResult> {
    try {
      const parts = qrData.split(':');
      if (parts.length !== 3 || parts[0] !== 'EXPO2026') {
        return { success: false, message: 'QR inválido' };
      }

      const dni = parts[1];
      const hash = parts[2];

      if (!validateDNI(dni)) {
        return { success: false, message: 'DNI en QR inválido' };
      }

      if (!verifyQRHash(dni, hash)) {
        return { success: false, message: 'QR no válido' };
      }

      return this.checkinByDNI(dni, eventId);
    } catch (error) {
      logger.error('Checkin by QR error', error);
      return { success: false, message: 'Error al procesar QR' };
    }
  },

  async checkinByDNI(dni: string, eventId: string): Promise<CheckinResult> {
    try {
      const trimmedDni = dni.trim();
      
      if (!validateDNI(trimmedDni)) {
        return { success: false, message: 'DNI debe tener 7 u 8 dígitos' };
      }

      const user = await userRepo.getUserByDNI(trimmedDni, eventId);

      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      if (user.checkedIn) {
        return { 
          success: false, 
          user,
          message: 'Ya registrado previamente' 
        };
      }

      const updated = await userRepo.markAsCheckedIn(user.id);

      if (!updated) {
        return { success: false, message: 'Error al realizar el check-in' };
      }

      const updatedUser = await userRepo.getUserById(user.id);

      return { 
        success: true, 
        user: updatedUser || undefined,
        message: `Check-in OK ✓ - ${user.name} ${user.lastname}` 
      };
    } catch (error) {
      logger.error('Checkin error', error);
      return { success: false, message: 'Error inesperado al realizar el check-in' };
    }
  },

  async verifyUser(dni: string, eventId: string): Promise<CheckinResult> {
    try {
      const trimmedDni = dni.trim();
      
      if (!validateDNI(trimmedDni)) {
        return { success: false, message: 'DNI debe tener 7 u 8 dígitos' };
      }

      const user = await userRepo.getUserByDNI(trimmedDni, eventId);

      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      if (user.checkedIn) {
        return { 
          success: false, 
          user,
          message: 'Ya registrado previamente' 
        };
      }

      return { 
        success: true, 
        user,
        message: 'Usuario válido para check-in' 
      };
    } catch (error) {
      logger.error('Verify error', error);
      return { success: false, message: 'Error inesperado' };
    }
  },

  async searchUsers(eventId: string, query: string): Promise<User[]> {
    return userRepo.searchUsers(eventId, query);
  },

  async getCheckinStats(eventId: string): Promise<{ total: number; checkedIn: number }> {
    const total = await userRepo.getUsersCount(eventId);

    const { count } = await getAdminClient()
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('checked_in', true);

    return { total, checkedIn: count || 0 };
  },

  async getActiveEventId(): Promise<string | null> {
    const { data, error } = await getAdminClient()
      .from('events')
      .select('id')
      .eq('active', true)
      .single();

    if (error || !data) return null;
    return (data as { id: string }).id;
  },

  async getUserByDNI(dni: string): Promise<User | null> {
    const eventId = await this.getActiveEventId();
    if (!eventId) return null;
    return userRepo.getUserByDNI(dni, eventId);
  },
};