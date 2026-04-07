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
          ctaHref="#registro"
          backgroundImage={event?.imageUrl}
          eventDate={eventData.eventInfo.date}
          eventDateIcs={eventData.eventInfo.dateIcs}
          eventLocation={eventData.eventInfo.location}
          eventAddress={eventData.eventInfo.address}
          mapsUrl={eventData.eventInfo.mapsUrl}
        />

        <BienvenidaSection />

        <SobreEventoSection />

        <TalksSection id="talks" talks={talks} showOverlay={true} />

        <EmpresasSection 
          id="empresas" 
          empresas={eventData.empresas.map((e) => ({ 
            id: e.id, 
            name: e.name, 
            logo: e.logo || '', 
            website: e.website || '#' 
          }))}
        />
        
        <StandsSection stands={stands} showOverlay={true} />
        
        <GallerySection images={images} videoUrl={eventData.video} />

        <Section id="registro" variant="dark" className="py-20">
          <Container>
            <div className="text-center">
              <SectionTitle 
                title="¿Aún no te registraste?" 
                subtitle="Asegurá tu lugar en el evento más importante del año"
                className="text-white [&>h2]:text-white [&>p]:text-white/80"
              />
              {eventData.features?.registrationDisabled ? (
                <button 
                  disabled
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#56bcb8] to-[#25848d] text-white px-10 py-4 text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_0_30px_rgba(86,188,184,0.5)] animate-pulse cursor-pointer"
                >
                  Proximamente
                </button>
              ) : (
                <Link 
                  href="#registro"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#56bcb8] to-[#25848d] text-white px-10 py-4 text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_0_30px_rgba(86,188,184,0.5)]"
                >
                  Proximamente
                </Link>
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer year={event?.year} eventTitle={event?.title} />
    </div>
  );
}