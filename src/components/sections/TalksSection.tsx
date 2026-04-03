'use client';

import { motion } from 'framer-motion';
import { Section, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ComingSoonBanner } from '@/components/ui/ComingSoonBanner';
import { PremiumSectionTitle } from '@/components/ui/PremiumSectionTitle';
import type { TalkWithCapacity } from '@/types/talk';

interface TalksSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  talks?: TalkWithCapacity[];
  showOverlay?: boolean;
}

export function TalksSection({
  id,
  title = 'Charlas y Workshops',
  subtitle = 'Capacitaciones y encuentros técnicos',
  talks = [],
  showOverlay = false,
}: TalksSectionProps) {
  return (
    <Section id={id} variant="default" className="relative">
      {showOverlay ? (
        <ComingSoonBanner titulo="Enterate de todas las capacitaciones y workshops" />
      ) : (
        <Container>
          <PremiumSectionTitle title={title} subtitle={subtitle} />
          
          <SectionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {talks.length > 0 ? (
                talks.map((talk, index) => (
                  <motion.div
                    key={talk.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="group h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4A853]/50 hover:-translate-y-0.5">
                      <div className="h-1.5 bg-gradient-to-r from-[#D4A853] via-[#E8C47A] to-[#D4A853] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <CardHeader className="pb-2 bg-gradient-to-r from-[#D4A853]/5 to-transparent">
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
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="h-1.5 bg-gradient-to-r from-[#D4A853] via-[#E8C47A] to-[#D4A853]" />
                      <CardHeader className="pb-2 bg-gradient-to-r from-[#D4A853]/5 to-transparent">
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
      )}
    </Section>
  );
}