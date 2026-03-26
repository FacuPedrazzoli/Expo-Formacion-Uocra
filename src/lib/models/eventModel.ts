import type { Event, EventStats } from '@/types/event';

export interface EventRow {
  id: string;
  year: number;
  title: string;
  date: string;
  active: boolean;
  description: string | null;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

export function mapRowToEvent(row: EventRow): Event {
  return {
    id: row.id,
    year: row.year,
    title: row.title,
    date: row.date,
    active: row.active,
    description: row.description ?? undefined,
    location: row.location ?? undefined,
    imageUrl: row.image_url ?? undefined,
    createdAt: row.created_at,
  };
}

export function mapRowToEventStats(row: Record<string, unknown>): EventStats {
  return {
    totalUsers: Number(row.total_users) || 0,
    registeredUsers: Number(row.registered_users) || 0,
    checkedInUsers: Number(row.checked_in_users) || 0,
    totalTalks: Number(row.total_talks) || 0,
    totalStands: Number(row.total_stands) || 0,
  };
}

export function createEmptyEvent(year: number): Event {
  return {
    id: '',
    year,
    title: `Expo Formación UOCRA ${year}`,
    date: '',
    active: false,
    createdAt: new Date().toISOString(),
  };
}