'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { BienvenidaSection } from '@/components/sections/BienvenidaSection';
import { StandsSection } from '@/components/sections/StandsSection';
import { EmpresasSection } from '@/components/sections/EmpresasSection';
import { TalksSection } from '@/components/sections/TalksSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { SobreEventoSection } from '@/components/sections/SobreEventoSection';
import { Section, SectionTitle } from '@/components/sections/Section';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { useEvent } from '@/hooks/useEvent';
import { useTalks } from '@/hooks/useTalks';
import { useStands } from '@/hooks/useStands';
import { useGallery } from '@/hooks/useGallery';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import eventData from '@/data/event-data.json';

export default function HomePage() {
  const { event } = useEvent();
  const { talks } = useTalks();
  const { stands } = useStands();
  const { images } = useGallery();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar eventTitle={event?.title} />
      <main className="flex-1">
        <HeroSection
          title={event?.title || 'Expo Formación UOCRA 2026'}
          subtitle={event?.description || 'El evento anual de formación profesional para el sector de la construcción'}
          ctaText="Registrarse"
          ctaHref="/register"
          backgroundImage={event?.imageUrl}
          eventDate={eventData.eventInfo.date}
          eventDateIcs={eventData.eventInfo.dateIcs}
          eventLocation={eventData.eventInfo.location}
          eventAddress={eventData.eventInfo.address}
          mapsUrl={eventData.eventInfo.mapsUrl}
        />

        <BienvenidaSection />

        <SobreEventoSection />

        <TalksSection id="talks" talks={talks} />

        <EmpresasSection 
          id="empresas" 
          empresas={eventData.stands
            .filter(s => s.category === 'Construcción' || s.category === 'Sanitarias' || s.category === 'Electricidad')
            .slice(0, 20)
            .map((e) => ({ 
              id: e.id, 
              name: e.name, 
              logo: e.logo || '', 
              url: e.url || '#' 
            }))}
        />
        
        <StandsSection stands={stands} />
        
        <GallerySection images={images} videoUrl={eventData.video} />

        <Section variant="dark" className="py-20">
          <Container>
            <div className="text-center">
              <SectionTitle 
                title="¿Aún no te registraste?" 
                subtitle="Asegurá tu lugar en el evento más importante del año"
                className="text-white [&>h2]:text-white [&>p]:text-white/80"
              />
              <Link 
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-accent hover:scale-105 shadow-lg"
              >
                Registrarse Ahora
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer year={event?.year} eventTitle={event?.title} />
    </div>
  );
}