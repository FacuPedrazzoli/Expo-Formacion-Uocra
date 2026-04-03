'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { MapPin } from 'lucide-react';
import { ComingSoonBanner } from '@/components/ui/ComingSoonBanner';
import type { Stand } from '@/types/stand';

interface StandsSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  stands?: Stand[];
  showOverlay?: boolean;
}

export function StandsSection({
  id,
  title = 'Stands y Expositores',
  subtitle = 'Conocé a los principales actores del sector',
  stands = [],
  showOverlay = false,
}: StandsSectionProps) {
  return (
    <Section id={id} variant="accent" className="relative">
      {showOverlay ? (
        <ComingSoonBanner titulo="Vamos a dar a conocer los stands que participerán" />
      ) : (
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
                    <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-xl hover:border-accent/50 hover:-translate-y-0.5">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                        <MapPin className="w-5 h-5 text-accent group-hover:text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{stand.name}</h3>
                      {stand.ubicacion && (
                        <p className="text-sm text-slate-500 mb-3">{stand.ubicacion}</p>
                      )}
                      {stand.descripcion && (
                        <p className="text-sm text-slate-600 leading-relaxed">{stand.descripcion}</p>
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
                    <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Stand {index + 1}</h3>
                      <p className="text-sm text-slate-500 mb-3">Zona A - Stand {index + 1}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Descripción del stand expositor.
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </SectionContent>
        </Container>
      )}
    </Section>
  );
}