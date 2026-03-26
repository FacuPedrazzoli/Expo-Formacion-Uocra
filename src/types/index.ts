export type UserType = 'manual' | 'web';

export interface Event {
  id: string;
  year: number;
  title: string;
  date: string;
  active: boolean;
  created_at: string;
}

export interface User {
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

export interface HowFound {
  id: string;
  label: string;
  active: boolean;
}

export interface Talk {
  id: string;
  event_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  capacity: number;
  room: string;
}

export interface TalkRegistration {
  id: string;
  user_id: string;
  talk_id: string;
}

export interface SurveyAnswer {
  id: string;
  event_id: string;
  dni: string;
  answers_json: Record<string, unknown>;
  created_at: string;
}

export interface EventContent {
  id: string;
  event_id: string;
  section: string;
  title: string;
  content: string;
  image_url: string | null;
  order: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}