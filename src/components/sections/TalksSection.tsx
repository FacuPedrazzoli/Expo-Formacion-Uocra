'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TalkWithCapacity } from '@/types/talk';

interface TalksSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  talks?: TalkWithCapacity[];
}

export function TalksSection({
  id,
  title = 'Charlas y Workshops',
  subtitle = 'Capacitaciónes y encuentros técnicos',
  talks = [],
}: TalksSectionProps) {
  return (
    <Section id={id}>
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />
        
        <SectionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talks.length > 0 ? (
              talks.map((talk, index) => (
                <motion.div
                  key={talk.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{talk.title}</CardTitle>
                        {talk.room && <Badge variant="secondary">{talk.room}</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {talk.description && (
                        <p className="text-muted-foreground mb-2">{talk.description}</p>
                      )}
                      {talk.speaker && (
                        <p className="text-sm font-medium">Speaker: {talk.speaker}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {talk.startTime} - {talk.endTime}
                      </p>
                      {talk.capacity && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Capacidad: {talk.registeredCount || 0}/{talk.capacity}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Charla {index + 1}</CardTitle>
                        <Badge variant="secondary">Sala {index + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Descripción de la charla técnica.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        10:00 - 11:00
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