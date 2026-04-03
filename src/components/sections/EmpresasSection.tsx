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
  const sortedEmpresas = [...empresas].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Section id={id} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-900">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Empresas Participantes
          </h2>
          <p className="text-white/70 text-lg">
            Conocé a las {empresas.length} empresas que nos acompañan
          </p>
        </motion.div>

        {empresas.length > 0 && (
          <div className="relative mb-16">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <div className="flex gap-6 animate-marquee whitespace-nowrap">
                {[...sortedEmpresas, ...sortedEmpresas].map((empresa, i) => (
                  <a 
                    key={`${empresa.id}-${i}`} 
                    href={empresa.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-32 h-32 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-[#D4A853]/50 hover:shadow-lg hover:shadow-[#D4A853]/20 transition-all duration-300 hover:scale-105"
                  >
                    <img 
                      src={empresa.logo} 
                      alt={empresa.name}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
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
              className="group flex flex-col items-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#D4A853]/50 hover:shadow-xl hover:shadow-[#D4A853]/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
                <img 
                  src={empresa.logo} 
                  alt={empresa.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}