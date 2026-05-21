'use client';

import { motion } from 'framer-motion';
import { HardHat, Wrench, Cog } from 'lucide-react';

export type Language = 'es' | 'en';

interface ComingSoonBannerProps {
  language?: Language;
  showDetails?: boolean;
}

const translations = {
  es: {
    title: 'PRÓXIMAMENTE',
    subtitle: '25 de junio de 2026',
    description: '¡Estamos preparando algo especial!',
    iconsLabel: 'Para vos, tu familia y amigos',
    icons: [
      { icon: Wrench, label: 'Construyendo' },
      { icon: HardHat, label: 'Diseñando' },
      { icon: Cog, label: 'Innovando' },
    ],
  },
  en: {
    title: 'COMING SOON',
    subtitle: 'June 25, 2026',
    description: 'We are preparing something special!',
    iconsLabel: 'For you, your family and friends',
    icons: [
      { icon: Wrench, label: 'Building' },
      { icon: HardHat, label: 'Designing' },
      { icon: Cog, label: 'Innovating' },
    ],
  },
};

export function ComingSoonBanner({ language = 'es', showDetails = false }: ComingSoonBannerProps) {
  const t = translations[language];

  if (showDetails) {
    return (
      <div className="relative min-h-full bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-r from-transparent via-[#56bcb8]/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#56bcb8]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#e2c048]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-6 py-20 text-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#56bcb8]/50" />
            <span className="text-[#56bcb8]">◆</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#56bcb8]/50" />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm tracking-[0.3em] text-[#56bcb8] uppercase mb-2"
          >
            Expo Formación UOCRA
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-light tracking-[0.5em] text-white mb-8"
          >
            2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-wider mb-6 bg-gradient-to-r from-[#56bcb8] via-white to-[#56bcb8] bg-clip-text text-transparent"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 font-medium"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 md:gap-12 mb-12"
          >
            {t.icons.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group hover:scale-110 transition-transform cursor-pointer">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#56bcb8] group-hover:text-[#e2c048] transition-colors" />
                </div>
                <span className="text-xs md:text-sm text-white/70">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-white/60 italic mb-8"
          >
            {t.iconsLabel}
          </motion.p>

          <div className="flex items-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#e2c048]/50" />
            <span className="text-[#e2c048]">●</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#e2c048]/50" />
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full bg-gradient-to-br from-[#0d1b2a] via-primary to-[#0d1b2a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 py-14 md:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-xl" />
            <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_80px_rgba(212,168,83,0.4)] animate-subtle-pulse">
              <HardHat className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-accent" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-accent font-bold uppercase tracking-widest mb-4"
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/95 font-medium mb-6 md:mb-8 max-w-md px-4"
        >
          {t.description}
        </motion.p>

          <div className="flex items-center gap-3">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-accent/60" />
          <span className="text-accent text-sm md:text-base">◆</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-accent/60" />
        </div>
      </div>

      <style jsx>{`
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}