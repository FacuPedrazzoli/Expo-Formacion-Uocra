export interface Sponsor {
  id: string;
  eventId: string;
  name: string;
  logoUrl?: string;
  website?: string;
  tier: string;
  order: number;
}
