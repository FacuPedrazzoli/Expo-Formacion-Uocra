'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, HardHat, Cog } from 'lucide-react';
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
      {showOverlay && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-r from-transparent via-[#56bcb8]/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#56bcb8]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#e2c048]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-6 py-20 text-center h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#56bcb8]/50" />
              <span className="text-[#56bcb8]">◆</span>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#56bcb8]/50" />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs md:text-sm tracking-[0.3em] text-[#56bcb8] uppercase mb-2"
            >
              Expo Formación UOCRA
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-light tracking-[0.5em] text-white mb-8"
            >
              2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-wider mb-6 bg-gradient-to-r from-[#56bcb8] via-white to-[#56bcb8] bg-clip-text text-transparent"
            >
              PRÓXIMAMENTE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-12 font-medium"
            >
              Enterate de todas las capacitaciones y workshops
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 md:gap-12 mb-12"
            >
              {[
                { icon: Wrench, label: 'Construyendo' },
                { icon: HardHat, label: 'Diseñando' },
                { icon: Cog, label: 'Innovando' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group hover:scale-110 transition-transform cursor-pointer">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm text-white/70">{label}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#e2c048]/50" />
              <span className="text-[#e2c048]">●</span>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#e2c048]/50" />
            </div>
          </div>

          <style jsx>{`
            @keyframes shimmer {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      <div className={showOverlay ? 'opacity-0 pointer-events-none' : ''}>
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
                    transition={{ duration: 0.2, delay: index * 0.05 }}
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
      </div>
    </Section>
  );
}