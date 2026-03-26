'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { BienvenidaSection } from '@/components/sections/BienvenidaSection';
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

        <BienvenidaSection />

        <Section variant="secondary">
          <Container>
            <SectionTitle 
              title="Sobre el Evento" 
              subtitle="Un encuentro único para profesionales del sector"
            />
            <SectionContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-100">
                  <div className="text-4xl font-bold text-primary mb-2">{talks.length}+</div>
                  <p className="text-muted-foreground">Charlas Técnicas</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-100">
                  <div className="text-4xl font-bold text-primary mb-2">{stands.length > 0 ? stands.length : eventData.empresas.construccion.length}+</div>
                  <p className="text-muted-foreground">Empresas Expositoras</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-100">
                  <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                  <p className="text-muted-foreground">Asistentes</p>
                </div>
              </div>
            </SectionContent>
          </Container>
        </Section>

        <VideoSection videoUrl={eventData.video} />

        <StandsSection stands={stands.length > 0 ? stands : eventData.empresas.construccion.map((e, i) => ({ id: String(i), eventId: '1', name: e.nombre, description: e.descripcion, logoUrl: e.logo, order: i }))} />
        
        <TalksSection id="talks" talks={talks} />
        
        <GallerySection images={images} />

        <SponsorsSection />

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