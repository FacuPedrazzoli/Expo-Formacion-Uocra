'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { StandsSection } from '@/components/sections/StandsSection';
import { TalksSection } from '@/components/sections/TalksSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { SponsorsSection } from '@/components/sections/SponsorsSection';
import { Section, SectionTitle } from '@/components/sections/Section';
import { Container } from '@/components/layout/Container';
import { SobreEventoSection } from '@/components/sections/SobreEventoSection';
import Link from 'next/link';
import { useEvent } from '@/hooks/useEvent';
import { useTalks } from '@/hooks/useTalks';
import { useStands } from '@/hooks/useStands';
import { useGallery } from '@/hooks/useGallery';
import eventData from '@/data/event-data.json';

export default function HomePage() {
  const { event } = useEvent();
  const { talks } = useTalks();
  const { stands } = useStands();
  const { images } = useGallery();

  return (
    <>
      <HeroSection
        title={event?.title || 'Expo Formación UOCRA'}
        subtitle={event?.description || 'El evento anual de formación profesional para el sector de la construcción'}
        ctaText="Inscribite proximamente!!"
        ctaHref="/register"
        ctaDisabled={true}
        secondaryCtaText="Ver Charlas"
        secondaryCtaHref="#talks"
        backgroundImage={event?.imageUrl}
        eventDate={eventData.eventInfo.date}
        eventDateIcs={eventData.eventInfo.dateIcs}
        eventLocation={eventData.eventInfo.location}
        eventAddress={eventData.eventInfo.address}
        mapsUrl={eventData.eventInfo.mapsUrl}
      />

      <SobreEventoSection />

      <StandsSection id="stands" stands={stands} showOverlay={true} />
      
      <TalksSection id="talks" talks={talks} showOverlay={true} />
      
      <GallerySection images={images} videoUrl={eventData.video} />

      <SponsorsSection />

      <Section id="registro" className="bg-primary text-primary-foreground">
        <Container>
          <div className="text-center">
            <SectionTitle 
              title="¿Aún no te registraste?" 
              subtitle="Asegurá tu lugar en el evento más importante del año"
              className="text-primary-foreground [&>h2]:text-white [&>p]:text-white/80"
            />
            <span className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#56bcb8] to-[#25848d] text-white px-10 py-4 text-xl font-bold shadow-lg hover:shadow-[0_0_30px_rgba(86,188,184,0.5)] animate-pulse cursor-default">
              Inscribite proximamente!!
            </span>
          </div>
        </Container>
      </Section>
    </>
  );
}