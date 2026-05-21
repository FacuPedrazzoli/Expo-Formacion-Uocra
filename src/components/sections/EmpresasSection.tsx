'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Section } from './Section';
import { Container } from '@/components/layout/Container';
import { PremiumSectionTitle } from '@/components/ui/PremiumSectionTitle';

interface Empresa {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface EmpresasSectionProps {
  id?: string;
  empresas?: Empresa[];
}

export const EmpresasSection = React.memo(function EmpresasSection({ id, empresas = [] }: EmpresasSectionProps) {
  const sortedEmpresas = useMemo(() => {
    return [...empresas].sort((a, b) => a.name.localeCompare(b.name));
  }, [empresas]);

  const tripleEmpresas = useMemo(() => {
    return [...sortedEmpresas, ...sortedEmpresas, ...sortedEmpresas];
  }, [sortedEmpresas]);

  return (
    <Section id={id} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-900">
      <Container className="relative z-10">
        <PremiumSectionTitle 
          title="Empresas"
          subtitle={`${empresas.length} empresas nos acompañan`}
        />

        {sortedEmpresas.length > 0 && (
          <div 
            className="relative mb-16 overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
            
              <div className="overflow-hidden">
              <div 
                className="flex gap-4 carousel-track"
              >
                {tripleEmpresas.map((empresa, i) => (
                  <a 
                    key={`${empresa.id}-${i}`} 
                    href={empresa.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-28 h-28 p-3 bg-slate-300 rounded-xl border border-slate-400 flex items-center justify-center hover:bg-slate-400 hover:border-slate-500 hover:shadow-lg hover:shadow-accent/20 hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center rounded-lg p-1">
                      <Image 
                        src={empresa.logo} 
                        alt={empresa.name}
                        width={112}
                        height={112}
                        className="object-contain"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {sortedEmpresas.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {sortedEmpresas.map((empresa, index) => (
              <motion.a
                key={empresa.id}
                href={empresa.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center p-1.5 bg-slate-300 rounded-lg border border-slate-400 hover:bg-slate-400 hover:border-slate-500 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-full aspect-square flex items-center justify-center bg-slate-300 rounded-lg p-0.5">
                  <Image 
                    src={empresa.logo} 
                    alt={empresa.name}
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Próximamente se conocerán las empresas participantes
          </div>
        )}
      </Container>

      <style jsx>{`
        .carousel-track {
          width: max-content;
          animation: carouselInfinite 60s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
});
