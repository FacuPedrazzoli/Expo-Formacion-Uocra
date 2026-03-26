'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';

interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
}

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
            {images.length > 0 ? (
              images.map((image, index) => (
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
              ))
            ) : (
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="aspect-square bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-white/50 text-sm">Imagen {index + 1}</span>
                </motion.div>
              ))
            )}
          </div>
        </SectionContent>
      </Container>
    </Section>
  );
}