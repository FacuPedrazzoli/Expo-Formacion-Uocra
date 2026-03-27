'use client';

import { Counter } from '@/components/ui/Counter';
import { HeroSection } from '@/components/sections/HeroSection';
import { BienvenidaSection } from '@/components/sections/BienvenidaSection';
import { StandsSection } from '@/components/sections/StandsSection';
import { EmpresasSection } from '@/components/sections/EmpresasSection';
import { TalksSection } from '@/components/sections/TalksSection';
import { GallerySection } from '@/components/sections/GallerySection';
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
          title={event?.title || 'Expo Formación UOCRA 2025'}
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

        <Section className="bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a] text-white">
          <Container>
            <SectionTitle 
              title="Sobre el Evento" 
              subtitle="Un encuentro único para profesionales del sector"
              className="[&>h2]:text-white [&>p]:text-white/80"
            />
            <SectionContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Counter target={14} suffix="+" className="text-4xl font-bold text-accent mb-2" />
                  <p className="text-white/80">Charlas Técnicas</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Counter target={39} suffix="+" className="text-4xl font-bold text-accent mb-2" />
                  <p className="text-white/80">Empresas Expositoras</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Counter target={3500} suffix="+" className="text-4xl font-bold text-accent mb-2" />
                  <p className="text-white/80">Participantes</p>
                </div>
              </div>
            </SectionContent>
          </Container>
        </Section>

        <TalksSection 
          id="talks" 
          talks={talks.length > 0 ? talks : eventData.charlas.map((c) => ({
            id: c.id,
            eventId: 'evt-001',
            title: c.titulo,
            description: c.descripcion,
            startTime: c.horario.split(' - ')[0],
            endTime: c.horario.split(' - ')[1],
            capacity: c.capacidad,
            room: c.sala,
            registeredCount: 0,
            isFull: false,
            availableSpots: c.capacidad,
          }))} 
        />

        <EmpresasSection 
          id="empresas" 
          empresas={[
            ...eventData.empresas.construccion,
            ...eventData.empresas.sanitarias,
            ...eventData.empresas.electricidad,
            ...eventData.empresas.informatica,
            ...eventData.empresas.instituciones,
          ].map((e) => ({ id: e.nombre, name: e.nombre, logo: e.logo, url: e.url }))}
        />
        
        <StandsSection stands={stands.length > 0 ? stands : eventData.empresas.construccion.map((e, i) => ({ id: String(i), eventId: '1', name: e.nombre, description: e.descripcion, logoUrl: e.logo, order: i }))} />
        
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