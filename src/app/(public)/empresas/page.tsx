'use client';

import { motion } from 'framer-motion';
import { EmpresasSection } from '@/components/sections/EmpresasSection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import eventData from '@/data/event-data.json';
import ProximamenteBanner from '@/components/ui/ProximamenteBanner';

export default function EmpresasPage() {
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
              Empresas Participantes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70"
            >
              Conocé a las {eventData.empresas.length} empresas que participan en Expo Formación UOCRA 2026
            </motion.p>
          </div>
        </div>
        <EmpresasSection empresas={eventData.empresas.map((e) => ({
          id: e.id,
          name: e.name,
          logo: e.logo,
          website: e.website,
        }))} />
      </main>
      <Footer />
    </div>
  );
}