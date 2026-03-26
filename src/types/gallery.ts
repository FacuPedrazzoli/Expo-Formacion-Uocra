export interface GalleryImage {
  id: string;
  eventId: string;
  src: string;
  alt?: string;
  caption?: string;
  order: number;
}

export interface GalleryCategory {
  id: string;
  name: string;
  images: GalleryImage[];
}