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
}

export function GallerySection({
  title = 'Galería',
  subtitle = 'Momentos del evento',
  images = [],
}: GallerySectionProps) {
  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <Section variant="primary">
      <Container>
        <SectionTitle 
          title={title} 
          subtitle={subtitle}
          className="[&>h2]:text-white [&>p]:text-white/80"
        />
        
        <SectionContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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