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
    <div className="relative min-h-[500px] md:min-h-[700px] lg:min-h-[800px] w-full bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#56bcb8]/25 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#56bcb8]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#e2c048]/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-16 md:py-24 lg:py-32">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-white mb-6 md:mb-8 drop-shadow-[0_0_40px_rgba(86,188,184,0.6)]"
        >
          PRÓXIMAMENTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl lg:text-4xl text-white/95 font-medium mb-8 md:mb-12 max-w-lg"
        >
          {titulo}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-8 md:gap-14 lg:gap-16"
        >
          <div className="w-14 h-14 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.4)]">
            <Wrench className="w-7 h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 text-[#56bcb8]" />
          </div>
          <div className="w-14 h-14 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.4)]">
            <HardHat className="w-7 h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 text-[#56bcb8]" />
          </div>
          <div className="w-14 h-14 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 group hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(86,188,184,0.4)]">
            <Cog className="w-7 h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 text-[#56bcb8]" />
          </div>
        </motion.div>
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