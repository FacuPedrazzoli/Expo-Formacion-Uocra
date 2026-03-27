'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
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
  ctaText = 'Registrarse',
  ctaHref = '/register',
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  eventDate = '2 de Julio 2025',
  eventDateIcs = '20250702',
  eventLocation = 'CFP N°33 UOCRA',
  eventAddress = 'Humberto 1º 2260, Buenos Aires',
  mapsUrl = 'https://maps.google.com/?q=CFP+N33+UOCRA+Humberto+1+2260+Buenos+Aires',
}: HeroSectionProps) {
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Expo+Formación+UOCRA+2026&dates=${eventDateIcs}T090000/${eventDateIcs}T180000&details=El+evento+anual+de+formación+profesional+para+el+sector+de+la+construcción&location=${eventLocation}+-+${encodeURIComponent(eventAddress)}`;

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d1b2a] via-[#0d3650] to-[#0d1b2a]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 diagonal-pattern" />
      
      {/* Enhanced floating decorative elements */}
      <motion.div 
        className="absolute top-10 left-0 w-40 h-40 bg-primary rounded-full opacity-30"
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(50px)' }}
      />
      <motion.div 
        className="absolute top-1/3 right-10 w-56 h-56 bg-secondary rounded-full opacity-25"
        animate={{ y: [0, 40, 0], rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ filter: 'blur(70px)' }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-48 h-48 bg-accent rounded-full opacity-20"
        animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ filter: 'blur(60px)' }}
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-32 h-32 bg-[#e2c048] rounded-full opacity-15"
        animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ filter: 'blur(40px)' }}
      />
      
      {/* More geometric shapes */}
      <div className="absolute top-20 right-1/4 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[80px] border-b-primary/30" />
      <div className="absolute bottom-32 left-16 w-28 h-28 border-2 border-accent/30 rotate-45" />
      <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-secondary to-accent opacity-25 rounded-lg rotate-12" />
      <div className="absolute bottom-1/4 right-20 w-16 h-16 border border-[#e2c048]/20 rotate-12 rounded-full" />
      <div className="absolute top-1/2 right-1/3 w-24 h-24 border border-white/10 rotate-45" />
      <div className="absolute top-10 left-1/4 w-3 h-3 bg-white/50 rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-white/40 rounded-full" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }} />

      {/* Background image with overlay if provided */}
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

      {/* Content */}
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
              className="mb-8"
            >
              <img 
                src="/images/logo-expo-formacion-nuevo.jpeg" 
                alt="Expo Formación UOCRA" 
                className="max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] w-auto h-auto mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto text-balance leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Event Info Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              {eventDate}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
            >
              <MapPin className="w-5 h-5" />
              {eventLocation}
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-accent hover:scale-105 shadow-lg"
            >
              {ctaText}
            </Link>
            
            {secondaryCtaText && secondaryCtaHref && (
              <Link 
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/60"
              >
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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