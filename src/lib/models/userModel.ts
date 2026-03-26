import type { User, UserRegistration, UserType } from '@/types/user';

export interface UserRow {
  id: string;
  event_id: string;
  dni: string;
  name: string;
  lastname: string;
  email: string;
  user_type: UserType;
  has_qr: boolean;
  qr_code: string | null;
  checked_in: boolean;
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
    userType: row.user_type,
    hasQR: row.has_qr,
    qrCode: row.qr_code ?? undefined,
    checkedIn: row.checked_in,
    createdAt: row.created_at,
  };
}

export function mapUserToRow(user: Partial<User>): Partial<UserRow> {
  return {
    event_id: user.eventId,
    dni: user.dni,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    user_type: user.userType ?? 'web',
    has_qr: user.hasQR ?? false,
    qr_code: user.qrCode ?? null,
    checked_in: user.checkedIn ?? false,
  };
}

export function validateDNI(dni: string): boolean {
  return /^\d{7,10}$/.test(dni);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatUserName(user: User): string {
  return `${user.name} ${user.lastname}`;
}

export function getUserInitials(user: User): string {
  return `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
}