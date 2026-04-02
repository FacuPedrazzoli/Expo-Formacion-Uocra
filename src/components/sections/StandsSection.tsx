'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { MapPin } from 'lucide-react';
import type { Stand } from '@/types/stand';

interface StandsSectionProps {
  title?: string;
  subtitle?: string;
  stands?: Stand[];
}

export function StandsSection({
  title = 'Stands y Expositores',
  subtitle = 'Conocé a los principales actores del sector',
  stands = [],
}: StandsSectionProps) {
  return (
    <Section variant="accent">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />
        
        <SectionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stands.length > 0 ? (
              stands.map((stand, index) => (
                <motion.div
                  key={stand.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">{stand.name}</h3>
                    {stand.ubicacion && (
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{stand.ubicacion}</span>
                      </div>
                    )}
                    {stand.descripcion && (
                      <p className="text-muted-foreground text-sm">{stand.descripcion}</p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">Stand {index + 1}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Zona A - Stand {index + 1}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Descripción del stand expositor.
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </SectionContent>
      </Container>
    </Section>
  );
}