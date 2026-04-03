'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'Materiales', label: 'Materiales' },
  { id: 'Herramientas', label: 'Herramientas' },
  { id: 'Electricidad', label: 'Electricidad' },
  { id: 'Pinturas', label: 'Pinturas' },
  { id: 'Organizaciones', label: 'Organizaciones' },
  { id: 'Tecnología', label: 'Tecnología' },
  { id: 'Sanitarios', label: 'Sanitarios' },
];

export function EmpresasSection({ id, empresas = [] }: EmpresasSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const sortedEmpresas = [...empresas].sort((a, b) => a.name.localeCompare(b.name));

  const filteredEmpresas = activeFilter === 'all'
    ? sortedEmpresas
    : sortedEmpresas.filter(emp => getCategory(emp.name) === activeFilter);

  return (
    <Section id={id} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-900">
      <Container className="relative z-10">
        <PremiumSectionTitle 
          title="Empresas"
          subtitle={`${empresas.length} empresas nos acompañan`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat.id
                  ? "bg-[#D4A853] text-[#1A1918] shadow-lg shadow-[#D4A853]/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {filteredEmpresas.length > 0 && (
          <div className="relative mb-16 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-marquee">
                {[...filteredEmpresas, ...filteredEmpresas].map((empresa, i) => (
                  <a 
                    key={`${empresa.id}-${i}`} 
                    href={empresa.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-24 h-24 p-3 bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center hover:bg-[#D4A853]/20 hover:border-[#D4A853]/50 hover:shadow-lg hover:shadow-[#D4A853]/20 hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-lg p-1">
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
          {filteredEmpresas.map((empresa, index) => (
            <motion.a
              key={empresa.id}
              href={empresa.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/15 hover:bg-[#D4A853]/20 hover:border-[#D4A853]/50 hover:shadow-xl hover:shadow-[#D4A853]/20 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 mb-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-xl" />
                <img 
                  src={empresa.logo} 
                  alt={empresa.name}
                  className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              
              <span className="text-xs text-white/80 text-center font-medium group-hover:text-[#D4A853] transition-colors line-clamp-2 text-center w-full">
                {empresa.name}
              </span>
              
              <span className="mt-1 px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-[10px] group-hover:bg-[#D4A853]/20 group-hover:text-[#D4A853] transition-colors">
                {getCategory(empresa.name)}
              </span>
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