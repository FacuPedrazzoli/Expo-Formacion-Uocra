import type { User, UserType } from '@/types/user';

export interface UserRow {
  id: string;
  event_id: string;
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  user_type: UserType;
  has_qr: boolean;
  qr_code: string | null;
  checked_in: boolean;
  checked_in_at?: string;
  how_found_id?: string;
  created_at: string;
}

export function mapRowToUser(row: UserRow): User {
  return {
    id: row.id,
    eventId: row.event_id,
    dni: row.dni,
    name: row.name,
    lastname: row.lastname,
    email: row.email,
    phone: row.phone,
    userType: row.user_type,
    hasQR: row.has_qr,
    qrCode: row.qr_code ?? undefined,
    checkedIn: row.checked_in,
    checkedInAt: row.checked_in_at,
    howFoundId: row.how_found_id,
    createdAt: row.created_at,
  };
}
