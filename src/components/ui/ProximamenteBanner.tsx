'use client';

import { motion } from 'framer-motion';

export default function ProximamenteBanner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-6 py-16 max-w-2xl"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-widest text-[#56bcb8] mb-6"
        >
          PRÓXIMAMENTE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-white mb-8"
        >
          ¡Estamos preparando algo especial para vos!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 text-4xl mb-8"
        >
          <span>🔨</span>
          <span>🏗️</span>
          <span>⚙️</span>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-white/80 italic mb-8"
        >
          Para vos, tu familia y amigos
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-[#56bcb8]/30 pt-6"
        >
          <p className="text-[#e2c048] font-semibold tracking-wide">
            Expo Formación UOCRA 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}