export interface Stand {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  imageUrl?: string;
  category?: string;
  boothNumber?: string;
  order: number;
}

export interface StandCategory {
  id: string;
  name: string;
  order: number;
}