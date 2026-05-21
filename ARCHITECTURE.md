# Arquitectura - Expo Formación UOCRA

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Landing   │  │  Registro   │  │   Panel Admin           │  │
│  │   Page      │  │  Encuesta    │  │   Check-in              │  │
│  └──────┬──────┘  └──────┬──────┘  │   Gestión CSV           │  │
│         │                │         └───────────┬─────────────┘  │
└─────────┼────────────────┼─────────────────────┼─────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS 16 (App Router)                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Server Components                        │ │
│  │  - Rutas públicas (ssr)                                    │ │
│  │  - Rutas admin (ssr con auth)                             │ │
│  │  - Server Actions para mutaciones                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Client Components                        │ │
│  │  - shadcn/ui components                                    │ │
│  │  - React Hook Form + Zod                                   │ │
│  │  - Framer Motion animations                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SUPABASE (Backend)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ PostgreSQL  │  │    Auth     │  │       Storage           │  │
│  │  Database   │  │   (RLS)     │  │  (CSV files, assets)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rutas públicas
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Layout público
│   │   ├── register/            # Registro de usuarios
│   │   ├── survey/              # Encuesta post-evento
│   │   ├── empresas/             # Página de empresas
│   │   └── stands/              # Página de stands
│   ├── admin/                    # Panel de administración
│   │   ├── layout.tsx            # Layout admin
│   │   ├── page.tsx              # Dashboard
│   │   ├── checkin/              # Sistema de check-in
│   │   ├── credentials/          # Credenciales
│   │   └── csv/                  # Carga masiva CSV
│   ├── api/                      # API routes
│   │   └── checkin/              # Endpoint de check-in
│   ├── qr/[dni]/                 # Generación de QR por DNI
│   ├── actions/                  # Server Actions
│   │   ├── register.ts           # Registro de usuarios
│   │   ├── checkin.ts            # Check-in
│   │   ├── survey.ts             # Encuestas
│   │   ├── talk.ts               # Charlas
│   │   └── data.ts               # Datos generales
│   ├── layout.tsx                # Root layout
│   ├── global-error.tsx          # Error boundary global
│   ├── error.tsx                 # Error page
│   └── globals.css               # Estilos globales
├── components/
│   ├── ui/                       # Componentes base shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── checkbox.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── ComingSoonBanner.tsx
│   │   ├── Counter.tsx
│   │   ├── PremiumSectionTitle.tsx
│   │   ├── AgentationWrapper.tsx
│   │   └── ProximamenteOverlay.tsx
│   ├── sections/                 # Secciones de la landing
│   │   ├── HeroSection.tsx
│   │   ├── BienvenidaSection.tsx
│   │   ├── SobreEventoSection.tsx
│   │   ├── TalksSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── EmpresasSection.tsx
│   │   ├── StandsSection.tsx
│   │   ├── VideoSection.tsx
│   │   └── Section.tsx
│   ├── layout/                   # Componentes de layout
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── forms/                    # Formularios complejos
│       └── SurveyForm.tsx
├── lib/
│   ├── supabase/                 # Cliente Supabase
│   │   ├── client.ts             # Cliente público (browser)
│   │   ├── server.ts             # Cliente servidor
│   │   └── browser.ts            # Cliente browser
│   ├── services/                 # Lógica de negocio
│   │   ├── checkinService.ts
│   │   ├── registerService.ts
│   │   ├── surveyService.ts
│   │   ├── talkService.ts
│   │   └── eventService.ts
│   ├── repositories/             # Acceso a datos
│   │   ├── userRepo.ts
│   │   ├── eventRepo.ts
│   │   ├── talkRepo.ts
│   │   ├── surveyRepo.ts
│   │   └── standRepo.ts
│   ├── models/                   # Modelos de dominio
│   │   ├── userModel.ts
│   │   ├── eventModel.ts
│   │   └── talkModel.ts
│   ├── validation/               # Schemas Zod
│   │   ├── schemas.ts
│   │   └── util.ts
│   ├── qr/                       # Utilidades QR
│   │   └── index.ts
│   ├── utils/                    # Utilidades
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── errors.ts                 # Manejo de errores
│   ├── logger.ts                 # Logging
│   ├── design-system.ts          # Sistema de diseño
│   └── constants/                 # Constantes
│       └── source-options.ts
├── hooks/                        # Custom React hooks
│   ├── useTalks.ts
│   ├── useStands.ts
│   ├── useEvent.ts
│   └── useGallery.ts
├── types/                        # Tipos TypeScript
│   ├── index.ts
│   ├── user.ts
│   ├── event.ts
│   ├── talk.ts
│   ├── sponsor.ts
│   ├── how-found.ts
│   ├── gallery.ts
│   └── stand.ts
├── config/                       # Configuración
│   └── theme.ts
└── data/                         # Datos estáticos
    └── event-data.json
```

## Flujo de Datos

### Registro de Usuario

```
1. Usuario llena formulario (Client Component)
         │
         ▼
2. React Hook Form valida con Zod schema
         │
         ▼
3. Server Action: register()
         │
         ▼
4. registerService.createUser()
         │
         ▼
5. userRepo.insert() → Supabase
         │
         ▼
6. QR generado con DNI del usuario
         │
         ▼
7. Respuesta al cliente
```

### Check-in

```
1. Admin ingresa DNI o escanea QR
         │
         ▼
2. Server Action: checkin()
         │
         ▼
3. checkinService.validateDni()
         │
         ▼
4. userRepo.updateCheckin() → Supabase
         │
         ▼
5. UI actualiza estado
```

### Encuesta Post-Evento

```
1. Usuario accede a /survey con token
         │
         ▼
2. Server carga datos del evento
         │
         ▼
3. Usuario completa formulario
         │
         ▼
4. Server Action: submitSurvey()
         │
         ▼
5. surveyRepo.insert() → Supabase
         │
         ▼
6. Confirmación al usuario
```

## Decisiones Técnicas

### Server Actions vs API Routes

Se usan Server Actions para mutaciones de datos (registro, check-in, encuestas) porque:
- Eliminación de endpoints API redundantes
- Type-safety directo desde los componentes
- Mejor integración con React Hook Form

### Repository Pattern

Se usa repository pattern para aislar la lógica de acceso a datos:
- `userRepo` - Operaciones de usuarios
- `eventRepo` - Operaciones de eventos
- `talkRepo` - Operaciones de charlas
- `surveyRepo` - Operaciones de encuestas

### Service Layer

Los servicios contienen la lógica de negocio:
- `registerService` - Valida y crea usuarios
- `checkinService` - Valida y marca check-in
- `surveyService` - Procesa respuestas de encuestas

### Supabase RLS (Row Level Security)

Políticas de seguridad a nivel de fila:
- Usuarios solo pueden ver/editar sus propios datos
- Admins tienen acceso completo via service role key
- Check-in requiere validación de DNI

### Estado de Componentes

- **Server Components**: Datos que no requieren interactividad
- **Client Components**: Formularios, animaciones, estado local
- **Server Actions**: Mutaciones de datos

### Manejo de Errores

- `lib/errors.ts` - Clases de errores personalizadas
- `lib/logger.ts` - Logging estructurado
- `global-error.tsx` - Error boundary global
- `error.tsx` - Página de error 500
