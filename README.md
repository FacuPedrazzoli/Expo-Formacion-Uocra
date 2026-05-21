# Expo Formación UOCRA

Plataforma de gestión para el evento anual de capacitación de UOCRA.

## Funcionalidades

- **Registro de asistentes** (carga masiva por CSV)
- **Check-in el día del evento** (validación por DNI)
- **Sistema de encuestas** post-evento
- **Panel de administración** completo

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Supabase (PostgreSQL + Auth + Storage)
- TailwindCSS + shadcn/ui
- Zod + React Hook Form

## Requisitos

- Node.js 20+
- npm o yarn
- Cuenta de Supabase

## Instalación

```bash
npm install
cp .env.example .env.local
# Completar variables de entorno
npm run dev
```

## Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (servidor) | Sí |
| `NEXT_PUBLIC_BASE_URL` | URL base de la app | No |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN de Sentry | No |

## Flujo de Uso

### Carga Masiva

1. Ir a Admin > Carga Masiva
2. Descargar template CSV
3. Completar datos y subir
4. Verificar resultados

### Día del Evento

1. Admin abre panel de check-in
2. Escanea QR o ingresa DNI
3. Click en "Validar"
4. Sistema marca check-in automáticamente

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo |
| `npm run build` | Producción |
| `npm start` | Iniciar producción |
| `npm run lint` | Linting |
| `npm run typecheck` | TypeScript |
| `npm test` | Tests |
| `npm run test:coverage` | Coverage |

## Deployment

Deploy automático a Vercel en push a main.

## Licencia

Proprietario - UOCRA
