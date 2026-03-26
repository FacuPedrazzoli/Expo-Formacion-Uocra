export interface Event {
  id: string;
  year: number;
  title: string;
  date: string;
  active: boolean;
  description?: string;
  location?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface EventContent {
  id: string;
  eventId: string;
  section: string;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export interface EventStats {
  totalUsers: number;
  registeredUsers: number;
  checkedInUsers: number;
  totalTalks: number;
  totalStands: number;
}