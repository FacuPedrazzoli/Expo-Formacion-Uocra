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

export interface UserRegistration {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  howFoundId?: string;
  talkIds: string[];
}

export interface UserSearchResult extends User {
  registeredTalks: string[];
}

export interface CheckinResult {
  success: boolean;
  user?: User;
  message: string;
}