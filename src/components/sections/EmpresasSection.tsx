'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Container } from '@/components/layout/Container';

interface Empresa {
  id: string;
  name: string;
  logo: string;
  url?: string;
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
      {/* Formas decorativas */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-accent/20 rotate-12 rounded-lg" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            EMPRESAS
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {empresas.length > 0 ? (
            empresas.map((empresa, index) => (
              <motion.div
                key={empresa.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <a
                  href={empresa.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={empresa.logo}
                      alt={empresa.name}
                      className="max-h-16 md:max-h-20 w-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
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
                className="p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-lg" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </Section>
  );
}