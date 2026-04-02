import { createClient } from '@supabase/supabase-js';
import { userRepo } from '@/lib/repositories/userRepo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export interface RegisterInput {
  name: string;
  surname: string;
  dni: string;
  email: string;
  source: string;
}

export interface RegisterResult {
  success: boolean;
  userId?: string;
  dni?: string;
  error?: string;
}

async function getActiveEventId(): Promise<string | null> {
  const { data, error } = await adminClient
    .from('events')
    .select('id')
    .eq('active', true)
    .single();

  if (error || !data) return null;
  return data.id;
}

async function getHowFoundIdByLabel(label: string): Promise<string | undefined> {
  const { data, error } = await adminClient
    .from('how_found')
    .select('id')
    .eq('label', label)
    .eq('active', true)
    .single();

  if (error || !data) return undefined;
  return data.id;
}

export const registerService = {
  async register(input: RegisterInput): Promise<RegisterResult> {
    try {
      const eventId = await getActiveEventId();
      if (!eventId) {
        return { success: false, error: 'No hay un evento activo' };
      }

      const existingUser = await userRepo.getUserByDNI(input.dni, eventId);
      if (existingUser) {
        return { success: false, error: 'Ya existe un usuario registrado con este DNI' };
      }

      const howFoundId = await getHowFoundIdByLabel(input.source);

      const user = await userRepo.createUser({
        eventId,
        dni: input.dni,
        name: input.name,
        lastname: input.surname,
        email: input.email,
        userType: 'web',
        hasQR: false,
        checkedIn: false,
        howFoundId,
      });

      if (!user) {
        return { success: false, error: 'Error al crear el usuario' };
      }

      return { success: true, userId: user.id, dni: user.dni };
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