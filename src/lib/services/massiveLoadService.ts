import { createClient } from '@supabase/supabase-js';
import { registrationSchema } from '@/lib/validation/schemas';
import { logger } from '@/lib/logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export interface ParsedRow {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono?: string;
}

export interface MassLoadResult {
  success: number;
  errors: { row: number; dni: string; error: string }[];
}

export async function processMassiveLoad(
  rows: ParsedRow[],
  eventId: string,
  onProgress?: (current: number, total: number) => void
): Promise<MassLoadResult> {
  const errors: MassLoadResult['errors'] = [];
  let success = 0;

  const validRows: { name: string; lastname: string; dni: string; email: string; phone: string | null; rowNumber: number }[] = [];
  const rowErrors: { row: number; dni: string; error: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2;

    const validation = registrationSchema.safeParse({
      name: row.nombre,
      surname: row.apellido,
      dni: row.dni,
      email: row.email,
      source: 'csv',
    });

    if (!validation.success) {
      rowErrors.push({
        row: rowNumber,
        dni: row.dni,
        error: validation.error.issues.map(e => e.message).join(', '),
      });
    } else {
      validRows.push({
        name: row.nombre,
        lastname: row.apellido,
        dni: row.dni,
        email: row.email,
        phone: row.telefono || null,
        rowNumber,
      });
    }

    onProgress?.(i + 1, rows.length);
  }

  if (validRows.length > 0) {
    const usersToInsert = validRows.map(r => ({
      name: r.name,
      lastname: r.lastname,
      dni: r.dni,
      email: r.email,
      phone: r.phone,
      event_id: eventId,
      checked_in: false,
      user_type: 'web',
    }));

    const batchSize = 100;
    for (let i = 0; i < usersToInsert.length; i += batchSize) {
      const batch = usersToInsert.slice(i, i + batchSize);
      const { error } = await adminClient.from('users').insert(batch);

      if (error) {
        for (let j = 0; j < batch.length; j++) {
          const user = batch[j];
          if (error.code === '23505') {
            errors.push({ row: validRows[i + j].rowNumber, dni: user.dni, error: 'DNI duplicado' });
          } else {
            errors.push({ row: validRows[i + j].rowNumber, dni: user.dni, error: error.message });
          }
        }
        logger.error('Massive load batch insert error', error);
      } else {
        success += batch.length;
      }
    }
  }

  errors.push(...rowErrors);

  return { success, errors };
}
