'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Container } from '@/components/layout/Container';

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

export function EmpresasSection({
  id,
  empresas = [],
}: EmpresasSectionProps) {
  return (
    <Section id={id} className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a]">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-accent/20 rotate-12 rounded-lg" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Empresas Participantes
          </h2>
          <p className="text-lg text-white/70 mt-3 max-w-xl mx-auto">
            Conocelas en el evento
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
          {empresas.length > 0 ? (
            [...empresas].sort((a, b) => a.name.localeCompare(b.name)).map((empresa, index) => (
              <motion.div
                key={empresa.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href={empresa.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 hover:border-[#56bcb8] hover:shadow-[0_0_20px_rgba(86,188,184,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square flex items-center justify-center p-1 sm:p-2">
                    <img
                      src={empresa.logo}
                      alt={empresa.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            Array.from({ length: 18 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-3 bg-white/95 rounded-lg border border-white/20"
              >
                <div className="aspect-square flex items-center justify-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </Section>
  );
}