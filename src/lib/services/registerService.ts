import { createClient } from '@supabase/supabase-js';
import { userRepo } from '@/lib/repositories/userRepo';
import { talkRepo } from '@/lib/repositories/talkRepo';
import type { User } from '@/types/user';
import type { TalkWithCapacity } from '@/types/talk';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export interface RegisterInput {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  howFoundId?: string;
  talkIds: string[];
  eventId: string;
}

export interface RegisterResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const registerService = {
  async register(input: RegisterInput): Promise<RegisterResult> {
    try {
      const existingUser = await userRepo.getUserByDNI(input.dni, input.eventId);
      if (existingUser) {
        return { success: false, error: 'Ya existe un usuario registrado con este DNI' };
      }

      const user = await userRepo.createUser({
        eventId: input.eventId,
        dni: input.dni,
        name: input.name,
        lastname: input.lastname,
        email: input.email,
        userType: 'web',
        hasQR: false,
        checkedIn: false,
        howFoundId: input.howFoundId,
      });

      if (!user) {
        return { success: false, error: 'Error al crear el usuario' };
      }

      if (input.talkIds && input.talkIds.length > 0) {
        const talks = await talkRepo.getTalksByEvent(input.eventId);
        
        for (const talkId of input.talkIds) {
          const talk = talks.find(t => t.id === talkId);
          
          if (!talk) continue;
          
          if (talk.isFull) {
            continue;
          }

          const { error: regError } = await adminClient
            .from('talk_registrations')
            .insert({ user_id: user.id, talk_id: talkId });

          if (regError) {
            console.error('Error registering for talk:', regError);
          }
        }
      }

      return { success: true, user };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error inesperado en el registro' };
    }
  },

  async registerFromCSV(data: { dni: string; name: string; lastname: string; email: string }[], eventId: string): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const row of data) {
      try {
        const existingUser = await userRepo.getUserByDNI(row.dni, eventId);
        if (existingUser) {
          failed++;
          continue;
        }

        const user = await userRepo.createUser({
          eventId,
          dni: row.dni,
          name: row.name,
          lastname: row.lastname,
          email: row.email,
          userType: 'manual',
          hasQR: true,
          qrCode: `/qr/${row.dni}`,
          checkedIn: false,
        });

        if (user) {
          success++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error('CSV import error:', error);
        failed++;
      }
    }

    return { success, failed };
  },
};