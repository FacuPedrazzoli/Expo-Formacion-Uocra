'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';

interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
}

const defaultImages: GalleryImage[] = [
  { id: '1', src: '/images/legacy/imagen (1).jpeg', alt: 'Imagen del evento 1' },
  { id: '2', src: '/images/legacy/imagen (2).jpeg', alt: 'Imagen del evento 2' },
  { id: '3', src: '/images/legacy/imagen (3).jpeg', alt: 'Imagen del evento 3' },
  { id: '4', src: '/images/legacy/imagen (4).jpeg', alt: 'Imagen del evento 4' },
  { id: '5', src: '/images/legacy/imagen (5).jpeg', alt: 'Imagen del evento 5' },
  { id: '6', src: '/images/legacy/imagen (6).jpeg', alt: 'Imagen del evento 6' },
  { id: '7', src: '/images/legacy/imagen (7).jpeg', alt: 'Imagen del evento 7' },
  { id: '8', src: '/images/legacy/imagen (8).jpeg', alt: 'Imagen del evento 8' },
  { id: '9', src: '/images/legacy/imagen (9).jpeg', alt: 'Imagen del evento 9' },
];

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  videoUrl?: string;
}

export function GallerySection({
  title = 'Galería',
  subtitle = 'Momentos del evento',
  images = [],
  videoUrl,
}: GallerySectionProps) {
  const displayImages = images.length > 0 ? images : defaultImages;
  const embedUrl = videoUrl?.replace('watch?v=', 'embed/').split('&')[0];

  return (
    <Section variant="primary" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/3 left-0 w-32 h-32 bg-[#e2c048]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-white/20 rotate-12" />
      
      <Container className="relative z-10">
        <SectionTitle 
          title={title} 
          subtitle={subtitle}
          className="[&>h2]:text-white [&>p]:text-white/80"
        />
        
        <SectionContent>
          {embedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <iframe
                  src={embedUrl}
                  title="Video del Evento"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, delay: index * 0.02 }}
                viewport={{ once: true }}
                className="aspect-square relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt || ''}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </SectionContent>
      </Container>
    </Section>
  );
}