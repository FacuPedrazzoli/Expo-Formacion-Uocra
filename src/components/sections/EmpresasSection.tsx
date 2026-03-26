'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Container } from '@/components/layout/Container';

interface Stand {
  id: string;
  eventId?: string;
  name: string;
  description?: string;
  logoUrl?: string;
  imageUrl?: string;
  order?: number;
}

interface EmpresasSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  stands?: Stand[];
}

export function EmpresasSection({
  id,
  title = 'EMPRESAS PARTICIPANTES 2026',
  subtitle = 'Conocè a las empresas del sector',
  stands = [],
}: EmpresasSectionProps) {
  return (
    <Section id={id} variant="dark">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
            CONOCÉ A LAS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stands.length > 0 ? (
            stands.map((stand, index) => (
              <motion.div
                key={stand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  {stand.logoUrl ? (
                    <img 
                      src={stand.logoUrl} 
                      alt={stand.name}
                      className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : stand.imageUrl ? (
                    <img 
                      src={stand.imageUrl} 
                      alt={stand.name}
                      className="h-16 w-auto object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">
                        {stand.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-white font-semibold text-center text-sm">
                    {stand.name}
                  </h3>
                </div>
                {stand.description && (
                  <p className="text-white/50 text-xs text-center mt-2 line-clamp-2">
                    {stand.description}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-center text-sm">
                    Empresa {index + 1}
                  </h3>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </Section>
  );
}