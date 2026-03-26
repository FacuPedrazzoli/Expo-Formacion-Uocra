'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { StandsSection } from '@/components/sections/StandsSection';
import { TalksSection } from '@/components/sections/TalksSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { SponsorsSection } from '@/components/sections/SponsorsSection';
import { VideoSection } from '@/components/sections/VideoSection';
import { Section, SectionTitle, SectionContent } from '@/components/sections/Section';
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
          title={event?.title || 'Expo Formación UOCRA'}
          subtitle={event?.description || 'El evento anual de formación profesional para el sector de la construcción'}
          ctaText="Registrarse"
          ctaHref="/register"
          secondaryCtaText="Ver Charlas"
          secondaryCtaHref="#talks"
          backgroundImage={event?.imageUrl}
        />

        <VideoSection videoUrl={eventData.video} />

        <Section id="about">
          <Container>
            <SectionTitle 
              title="Sobre el Evento" 
              subtitle="Un encuentro único para profesionales del sector"
            />
            <SectionContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{talks.length}+</div>
                  <p className="text-muted-foreground">Charlas Técnicas</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stands.length > 0 ? stands.length : eventData.empresas.construccion.length}+</div>
                  <p className="text-muted-foreground">Empresas Expositoras</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                  <p className="text-muted-foreground">Asistentes</p>
                </div>
              </div>
            </SectionContent>
          </Container>
        </Section>

        <StandsSection stands={stands.length > 0 ? stands : eventData.empresas.construccion.map((e, i) => ({ id: String(i), eventId: '1', name: e.nombre, description: e.descripcion, logoUrl: e.logo, order: i }))} />
        
        <TalksSection id="talks" talks={talks} />
        
        <GallerySection images={images} />

        <SponsorsSection />

        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="text-center">
              <SectionTitle 
                title="¿Aún no te registraste?" 
                subtitle="Asegurá tu lugar en el evento más importante del año"
                className="text-primary-foreground [&>h2]:text-white [&>p]:text-white/80"
              />
              <Link 
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 text-lg font-medium transition-colors hover:bg-white/90"
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