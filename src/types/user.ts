export type UserType = 'manual' | 'web';

export interface User {
  id: string;
  eventId: string;
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  userType: UserType;
  hasQR: boolean;
  qrCode?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  howFoundId?: string;
  createdAt: string;
}
