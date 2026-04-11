'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Container } from '@/components/layout/Container';
import { Users, Star, Briefcase, GraduationCap, Globe, ExternalLink } from 'lucide-react';

const audienceChips = [
  'Trabajadores del sector',
  'Estudiantes técnicos',
  'Empresas del rubro',
  'Docentes',
  'Público general',
];

const benefits = [
  {
    icon: Star,
    title: 'Conocér las últimas tendencias del sector...',
  },
  {
    icon: Users,
    title: 'Conectár con empresas líderes...',
  },
  {
    icon: GraduationCap,
    title: 'Accedér a charlas y capacitaciones gratuitas...',
  },
  {
    icon: Briefcase,
    title: 'Descubrír oportunidades laborales y educativas...',
  },
  {
    icon: Globe,
    title: 'Vivír una experiencia única de networking...',
  },
];

export function BienvenidaSection() {
  return (
    <Section id="bienvenida" variant="default">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Narrative & Audience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                EXPO FORMACIÓN 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Bienvenidos a Expo Formación UOCRA
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La Expo Formación nació de una convicción simple: el sector de la construcción merece un espacio propio para crecer, aprender y conectarse. 
                A lo largo de los años, hemos construido un encuentro que trasciende la simple exposición, convirtiéndose en un punto de encuentro fundamental 
                para profesionales, empresas y futuros trabajadores del sector.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                Este año, renovamos nuestro compromiso con la formación profesional y el desarrollo del capital humano de la industria de la construcción.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                ¿A quién está dirigido?
              </h3>
              <div className="flex flex-wrap gap-2">
                {audienceChips.map((chip, index) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 lg:border-l lg:border-slate-200 lg:pl-12"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">
              ¿Por qué participar?
            </h3>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">{benefit.title}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="https://fundacion.uocra.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Conocé más sobre Fundación UOCRA
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}