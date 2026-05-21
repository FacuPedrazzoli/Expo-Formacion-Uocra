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

export type TalkWithCapacity = Talk & {
  isFull: boolean;
  availableSpots: number;
};
