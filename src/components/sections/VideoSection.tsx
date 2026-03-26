'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Section';
import { Container } from '@/components/layout/Container';

interface VideoSectionProps {
  videoUrl?: string;
  title?: string;
}

export function VideoSection({ videoUrl, title = 'Video del Evento' }: VideoSectionProps) {
  if (!videoUrl) return null;

  const embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0];

  return (
    <Section variant="default">
      <Container>
        <SectionTitle title={title} />
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200"
          >
            <iframe
              src={embedUrl}
              title="Video del Evento"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </SectionContent>
      </Container>
    </Section>
  );
}