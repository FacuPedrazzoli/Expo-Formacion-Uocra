'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/sections/Section';
import { Counter } from '@/components/ui/Counter';
import { Users, Building2, Mic2 } from 'lucide-react';

const STATS = [
  { icon: Mic2, value: 30, label: 'Charlas Técnicas' },
  { icon: Building2, value: 40, label: 'Empresas Expositoras' },
  { icon: Users, value: 3500, label: 'Participantes' },
];

export function SobreEventoSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <Container>
        <SectionTitle 
          title="Sobre el Evento" 
          subtitle="Un encuentro único para profesionales del sector"
          className="[&>h2]:text-white [&>p]:text-white/80"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="text-4xl font-bold text-accent mb-2">
                <Counter target={stat.value} suffix="+" className="text-4xl font-bold text-accent" />
              </div>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}