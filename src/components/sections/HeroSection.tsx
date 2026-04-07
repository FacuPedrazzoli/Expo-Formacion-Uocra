'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaDisabled?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  eventDate?: string;
  eventDateIcs?: string;
  eventLocation?: string;
  eventAddress?: string;
  mapsUrl?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText = 'Registrate',
  ctaHref = '/register',
  ctaDisabled = false,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  eventDate = '25 de Junio 2026',
  eventDateIcs = '20260625',
  eventLocation = 'CFP N°3 UOCRA',
  eventAddress = 'Humberto 1º 2260, Buenos Aires',
  mapsUrl = 'https://maps.google.com/?q=CFP+N33+UOCRA+Humberto+1+2260+Buenos+Aires',
}: HeroSectionProps) {
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Expo+Formación+UOCRA+2026&dates=${eventDateIcs}T090000/${eventDateIcs}T180000&details=El+evento+anual+de+formación+profesional+para+el+sector+de+la+construcción&location=${eventLocation}+-+${encodeURIComponent(eventAddress)}`;

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d1b2a] via-[#0d3650] to-[#0d1b2a]">
      <div className="absolute inset-0 opacity-10 diagonal-pattern" />
      
      <motion.div 
        className="absolute top-10 left-0 w-48 h-48 bg-[#D4A853] rounded-full opacity-25"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(60px)' }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-64 h-64 bg-[#D4A853] rounded-full opacity-20"
        animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ filter: 'blur(80px)' }}
      />

      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(13, 27, 42, 0.85), rgba(13, 54, 80, 0.95)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Container className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10"
          >
            <img 
              src="/images/logo-expo-formacion-nuevo.png" 
              alt="Expo Formación UOCRA" 
              className="max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px] w-auto h-auto mx-auto drop-shadow-2xl"
            />
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-balance leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#D4A853]" />
              {eventDate}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <MapPin className="w-4 h-4" />
              {eventLocation}
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaDisabled ? (
              <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/50 text-primary/50 text-lg font-bold cursor-not-allowed">
                {ctaText}
              </span>
            ) : (
              <Link 
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#D4A853] text-white font-bold text-lg shadow-2xl shadow-[#D4A853]/30 hover:bg-[#B8923E] hover:shadow-2xl hover:shadow-[#D4A853]/40 transition-all duration-300"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            
            {secondaryCtaText && secondaryCtaHref && (
              <Link 
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white/90 font-medium hover:text-white transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}