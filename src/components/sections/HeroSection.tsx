'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText = 'Registrarse',
  ctaHref = '/register',
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d1b2a] via-[#124565] to-[#124565]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 diagonal-pattern" />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(40px)' }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-48 h-48 bg-secondary rounded-full opacity-15"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ filter: 'blur(60px)' }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent rounded-full opacity-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ filter: 'blur(50px)' }}
      />
      
      {/* Geometric shapes */}
      <div className="absolute top-32 right-1/3 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-primary/20" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-accent/20 rotate-45" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-secondary to-accent opacity-20 rounded-lg rotate-12" />

      {/* Background image with overlay if provided */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(13, 27, 42, 0.8), rgba(18, 69, 101, 0.9)), url(${backgroundImage})`,
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance drop-shadow-lg"
          >
            {title}
          </motion.h1>

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