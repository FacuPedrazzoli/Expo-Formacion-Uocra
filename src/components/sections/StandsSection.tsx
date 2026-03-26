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
    <Section className="bg-muted/30">
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
                >
                  <Card hover className="h-full">
                    {stand.imageUrl && (
                      <div 
                        className="h-48 w-full bg-cover bg-center rounded-t-xl"
                        style={{ backgroundImage: `url(${stand.imageUrl})` }}
                      />
                    )}
                    <CardHeader>
                      <CardTitle>{stand.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{stand.description}</p>
                    </CardContent>
                  </Card>
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
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <CardTitle>Stand {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Descripción del stand expositor.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </SectionContent>
      </Container>
    </Section>
  );
}