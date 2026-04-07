'use client';

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

const categoryMap: Record<string, string> = {
  'Durlock': 'Materiales',
  'Cerámica San Lorenzo': 'Materiales',
  'Loma Negra': 'Materiales',
  'Retak': 'Materiales',
  'Later-Cer': 'Materiales',
  'Aluar': 'Materiales',
  'Saint Gobain': 'Materiales',
  'Fischer': 'Herramientas',
  'Bremen': 'Herramientas',
  'El Galgo': 'Herramientas',
  'Gamma': 'Herramientas',
  'Mekano': 'Herramientas',
  'Sinteplast': 'Pinturas',
  'Alba': 'Pinturas',
  'Plavicon': 'Pinturas',
  'Klaukol': 'Pinturas',
  'Schneider Electric': 'Electricidad',
  'Sica': 'Electricidad',
  'Legrand': 'Electricidad',
  'FV': 'Electricidad',
  'Genrod': 'Electricidad',
  'Conextube': 'Electricidad',
  'Gralf': 'Electricidad',
  'Micro Control': 'Electricidad',
  'Zoloda': 'Electricidad',
  'Cambre': 'Electricidad',
  'Dinatecnica': 'Electricidad',
  'Fundación UOCRA': 'Organizaciones',
  'UOCRA Mujeres': 'Organizaciones',
  'MOECRA': 'Organizaciones',
  'INET': 'Organizaciones',
  'CAMARCO': 'Organizaciones',
  'Consejo de Bomberos': 'Organizaciones',
  'Construir TV': 'Organizaciones',
  '3D Insumos': 'Tecnología',
  'Parsecs': 'Tecnología',
  'Realidad Virtual UOCRA': 'Tecnología',
  'Rotoplas': 'Sanitarios',
  'Grupo DEMA': 'Sanitarios',
  'Ferrum S.A.': 'Sanitarios',
  'Dun Dun': 'Químicos',
};

function getCategory(name: string): string {
  return categoryMap[name] || 'General';
}

export function EmpresasSection({ id, empresas = [] }: EmpresasSectionProps) {
  const sortedEmpresas = [...empresas].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Section id={id} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-900">
      <Container className="relative z-10">
        <PremiumSectionTitle 
          title="Empresas"
          subtitle={`${empresas.length} empresas nos acompañan`}
        />

        {sortedEmpresas.length > 0 && (
          <div className="relative mb-16 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-marquee">
                {[...sortedEmpresas, ...sortedEmpresas].map((empresa, i) => (
                  <a 
                    key={`${empresa.id}-${i}`} 
                    href={empresa.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-24 h-24 p-3 bg-slate-300 rounded-xl border border-slate-400 flex items-center justify-center hover:bg-slate-400 hover:border-slate-500 hover:shadow-lg hover:shadow-[#D4A853]/20 hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center rounded-lg p-1">
                      <img 
                        src={empresa.logo} 
                        alt={empresa.name}
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

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
              className="group flex flex-col items-center p-4 bg-slate-300 rounded-2xl border border-slate-400 hover:bg-slate-400 hover:border-slate-500 hover:shadow-xl hover:shadow-[#D4A853]/20 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-full aspect-square flex items-center justify-center bg-slate-300 rounded-xl p-2">
                <img 
                  src={empresa.logo} 
                  alt={empresa.name}
                  className="w-full h-full object-contain" 
                />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @keyframes carouselInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: carouselInfinite 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
