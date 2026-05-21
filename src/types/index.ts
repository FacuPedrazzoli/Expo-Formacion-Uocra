export type { User, UserType, UserRegistration, UserSearchResult, CheckinResult } from './user';

export type { Event, EventContent, EventStats } from './event';

export type { Talk, TalkRegistration, TalkWithCapacity } from './talk';

export type { HowFound } from './how-found';

export type { Stand } from './stand';

export type { Sponsor } from './sponsor';

export type { Gallery } from './gallery';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  code?: string;
}
