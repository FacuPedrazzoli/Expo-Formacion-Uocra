'use client';

import { motion } from 'framer-motion';
import { StandsSection } from '@/components/sections/StandsSection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useStands } from '@/hooks/useStands';
import ProximamenteBanner from '@/components/ui/ProximamenteBanner';

export default function StandsPage() {
  const { stands } = useStands();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProximamenteBanner />
        <div className="pt-24 pb-12 bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a]">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Stands y Expositores
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70"
            >
              Visitá los {stands.length} stands disponibles en Expo Formación UOCRA 2026
            </motion.p>
          </div>
        </div>
        <StandsSection stands={stands} />
      </main>
      <Footer />
    </div>
  );
}