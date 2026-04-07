'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';

interface NavbarProps {
  eventTitle?: string;
}

export function Navbar({ eventTitle = 'Expo Formación UOCRA' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#bienvenida', label: 'Bienvenida', sectionId: 'bienvenida' },
    { href: '#empresas', label: 'Empresas', sectionId: 'empresas' },
    { href: '#talks', label: 'Charlas', sectionId: 'talks' },
    { href: '#registro', label: 'Registrate', sectionId: 'registro' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm' : 'bg-white/80'} backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b`}>
      <Container className="max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo-expo-formacion-nuevo.png" alt="Expo Formación UOCRA" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.sectionId)}
                className="relative text-sm font-medium text-slate-600 transition-colors hover:text-primary py-2 cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('registro')}
              className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A853] text-white font-semibold text-sm shadow-lg shadow-[#D4A853]/25 hover:bg-[#D4A853] hover:shadow-xl hover:shadow-[#D4A853]/30 transition-all duration-200 cursor-pointer border-none"
            >
              Registrate
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <Container className="py-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-sm font-medium text-slate-600 hover:text-primary py-2 cursor-pointer bg-transparent border-none text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('registro')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A853] text-white font-semibold text-sm w-full cursor-pointer border-none"
                >
                  Registrate
                </button>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}