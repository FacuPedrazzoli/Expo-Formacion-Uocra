'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Stand } from '@/types/stand';

interface StandsSectionProps {
  title?: string;
  subtitle?: string;
  stands?: Stand[];
}

export function StandsSection({
  title = 'Stands y Expositores',
  subtitle = 'Conoce a los principales actores del sector',
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
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg overflow-hidden">
                    {stand.imageUrl && (
                      <div 
                        className="h-48 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${stand.imageUrl})` }}
                      />
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">{stand.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{stand.description}</p>
                    </CardContent>
                  </div>
                </motion.div>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">Stand {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        Descripción del stand expositor.
                      </p>
                    </CardContent>
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