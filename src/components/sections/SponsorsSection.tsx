'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';
import type { SponsorWithTier } from '@/types/sponsor';

interface SponsorsSectionProps {
  title?: string;
  subtitle?: string;
  sponsors?: SponsorWithTier[];
}

export function SponsorsSection({
  title = 'Sponsors',
  subtitle = 'Empresas que nos acompañan',
  sponsors = [],
}: SponsorsSectionProps) {
  return (
    <Section variant="secondary">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />
        
        <SectionContent>
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md hover:border-[#D4A853] transition-all duration-300"
                >
                  <div className="text-center">
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={sponsor.name}
                        className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-primary">{sponsor.name}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Próximamente sponsors confirmados
            </div>
          )}
        </SectionContent>
      </Container>
    </Section>
  );
}