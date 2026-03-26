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
  subtitle = 'Capacitaciones y encuentros técnicos',
  talks = [],
}: TalksSectionProps) {
  return (
    <Section id={id} variant="default">
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
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                    <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg text-primary line-clamp-2">{talk.title}</CardTitle>
                        {talk.room && <Badge variant="secondary" className="shrink-0">{talk.room}</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {talk.description && (
                        <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{talk.description}</p>
                      )}
                      {talk.speaker && (
                        <p className="text-sm font-medium text-primary-dark">Speaker: {talk.speaker}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {talk.startTime} - {talk.endTime}
                        </span>
                        {talk.capacity && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {talk.registeredCount || 0}/{talk.capacity}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </div>
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
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                    <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-primary">Charla {index + 1}</CardTitle>
                        <Badge variant="secondary">Sala {index + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        Descripción de la charla técnica.
                      </p>
                      <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10:00 - 11:00
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