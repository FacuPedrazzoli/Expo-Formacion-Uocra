export interface Talk {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  speaker?: string;
  startTime: string;
  endTime: string;
  room: string;
  capacity: number;
  registeredCount?: number;
}

export interface TalkRegistration {
  id: string;
  userId: string;
  talkId: string;
}

export type TalkWithCapacity = Talk & {
  isFull: boolean;
  availableSpots: number;
};