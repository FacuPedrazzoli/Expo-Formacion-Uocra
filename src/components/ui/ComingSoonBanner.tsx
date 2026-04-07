'use client';

import { motion } from 'framer-motion';
import { HardHat } from 'lucide-react';

interface ComingSoonBannerProps {
  titulo: string;
}

export function ComingSoonBanner({ titulo }: ComingSoonBannerProps) {
  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A853]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#D4A853]/15 rounded-full blur-3xl" />
      
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
              <HardHat className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#D4A853]" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4"
        >
          PRÓXIMAMENTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-[#D4A853] font-bold uppercase tracking-widest mb-4"
        >
          25 de Junio 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/95 font-medium mb-6 md:mb-8 max-w-md px-4"
        >
          {titulo}
        </motion.p>

        <div className="flex items-center gap-3">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#D4A853]/60" />
          <span className="text-[#D4A853] text-sm md:text-base">◆</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#D4A853]/60" />
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