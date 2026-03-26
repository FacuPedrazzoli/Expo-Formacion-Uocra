import type { Talk, TalkWithCapacity } from '@/types/talk';

export interface TalkRow {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  speaker: string | null;
  start_time: string;
  end_time: string;
  room: string;
  capacity: number;
}

export function mapRowToTalk(row: TalkRow, registeredCount: number = 0): Talk {
  return {
    id: row.id,
    eventId: row.event_id,
    title: row.title,
    description: row.description ?? undefined,
    speaker: row.speaker ?? undefined,
    startTime: row.start_time,
    endTime: row.end_time,
    room: row.room,
    capacity: row.capacity,
    registeredCount,
  };
}

export function mapRowToTalkWithCapacity(row: TalkRow, registeredCount: number = 0): TalkWithCapacity {
  const availableSpots = row.capacity - registeredCount;
  return {
    ...mapRowToTalk(row, registeredCount),
    isFull: availableSpots <= 0,
    availableSpots: Math.max(0, availableSpots),
  };
}

export function formatTalkTime(startTime: string, endTime: string): string {
  const start = startTime.slice(0, 5);
  const end = endTime.slice(0, 5);
  return `${start} - ${end}`;
}

export function getTalkDuration(startTime: string, endTime: string): number {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  return Math.round((end.getTime() - start.getTime()) / 60000);
}