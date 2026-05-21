export interface Stand {
  id: string;
  eventId: string;
  name: string;
  ubicacion?: string;
  descripcion?: string;
  logoUrl?: string;
  imageUrl?: string;
  category?: string;
  boothNumber?: string;
  order: number;
}
