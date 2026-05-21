import eventData from '@/data/event-data.json';
import type { TalkWithCapacity } from '@/types/talk';

function mapJsonToTalkWithCapacity(talk: typeof eventData.talks[0]): TalkWithCapacity {
  return {
    id: talk.id,
    eventId: 'static-event',
    title: talk.title,
    description: talk.description,
    speaker: talk.speaker,
    startTime: talk.startTime,
    endTime: talk.endTime,
    room: talk.room,
    capacity: 0,
    registeredCount: 0,
    isFull: false,
    availableSpots: 0,
  };
}

export const talkService = {
  async getTalks(_eventId?: string): Promise<TalkWithCapacity[]> {
    const talks = eventData.talks.map(mapJsonToTalkWithCapacity);
    return talks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  },

  async getTalkById(talkId: string): Promise<TalkWithCapacity | null> {
    const talk = eventData.talks.find((t) => t.id === talkId);
    if (!talk) return null;
    return mapJsonToTalkWithCapacity(talk);
  },

  async getTalksByRoom(room: string): Promise<TalkWithCapacity[]> {
    const talks = eventData.talks
      .filter((t) => t.room === room)
      .map(mapJsonToTalkWithCapacity);
    return talks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  },

  async getTalksBySpeaker(speaker: string): Promise<TalkWithCapacity[]> {
    const lowerSpeaker = speaker.toLowerCase();
    const talks = eventData.talks
      .filter((t) => t.speaker?.toLowerCase().includes(lowerSpeaker))
      .map(mapJsonToTalkWithCapacity);
    return talks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  },
};