'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import { MapPin, Wrench, HardHat, Cog } from 'lucide-react';
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
      {showOverlay && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#124565]/90 via-35% to-[#124565]/60 to-75% from-[#0d1b2a]" />
          
          <div className="absolute top-0 left-1/4 w-72 h-40 bg-[#56bcb8]/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-72 h-40 bg-[#e2c048]/10 rounded-full blur-3xl" />
          
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#e8f4f7]/60 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center min-h-[250px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#56bcb8]/50" />
              <span className="text-[#56bcb8] text-xs">◆</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#56bcb8]/50" />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] tracking-[0.2em] text-[#56bcb8] uppercase mb-1"
            >
              Expo Formación UOCRA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black tracking-wider mb-3 bg-gradient-to-r from-[#56bcb8] via-white to-[#56bcb8] bg-clip-text text-transparent"
            >
              PRÓXIMAMENTE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs md:text-sm text-white/85 mb-5 font-medium max-w-sm"
            >
              Vamos a dar a conocer los stands que participerán
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-5 md:gap-6"
            >
              {[
                { icon: Wrench, label: 'Construyendo' },
                { icon: HardHat, label: 'Diseñando' },
                { icon: Cog, label: 'Innovando' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group hover:scale-110 transition-transform cursor-pointer">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-white/60">{label}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#e2c048]/50" />
              <span className="text-[#e2c048] text-xs">●</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#e2c048]/50" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#e8f4f7]/80 to-transparent pointer-events-none" />
        </div>
      )}

      <div className={showOverlay ? 'opacity-0 pointer-events-none' : ''}>
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
      </div>
    </Section>
  );
}