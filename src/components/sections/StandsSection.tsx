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

function ProximamenteBanner({ titulo }: { titulo: string }) {
  return (
    <div className="relative min-h-[450px] md:min-h-[600px] lg:min-h-[750px] w-full bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#56bcb8]/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#56bcb8]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#e2c048]/25 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
      
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#56bcb8]/40 rounded-full animate-pulse" />
      <div className="absolute top-32 right-16 w-3 h-3 bg-[#e2c048]/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-60 right-24 w-3 h-3 bg-[#56bcb8]/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 py-14 md:py-20 lg:py-28">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#56bcb8]/60" />
          <span className="text-[#56bcb8] text-sm md:text-base">◆</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#56bcb8]/60" />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-wider text-white mb-4 md:mb-6 drop-shadow-[0_0_50px_rgba(86,188,184,0.8)]"
        >
          PRÓXIMAMENTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xs sm:text-sm md:text-base text-[#e2c048] font-medium tracking-widest uppercase mb-4 md:mb-6"
        >
          2 de Julio 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/95 font-medium mb-6 md:mb-10 max-w-md px-4"
        >
          {titulo}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.5)]">
            <Wrench className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors duration-300" />
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.5)]">
            <HardHat className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors duration-300" />
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.5)]">
            <Cog className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors duration-300" />
          </div>
        </motion.div>

        <div className="flex items-center gap-3 mt-8 md:mt-12">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#e2c048]/50" />
          <span className="text-[#e2c048] text-sm md:text-base">●</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#e2c048]/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
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
        <ProximamenteBanner titulo="Vamos a dar a conocer los stands que participerán" />
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
      )}
    </Section>
  );
}