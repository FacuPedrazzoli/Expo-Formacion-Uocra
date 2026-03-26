export interface Sponsor {
  id: string;
  eventId: string;
  name: string;
  logoUrl?: string;
  website?: string;
  tier: SponsorTier;
  order: number;
}

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'support';

export interface SponsorWithTier extends Sponsor {
  tierLabel: string;
  tierColor: string;
}