# Expo Formación UOCRA

Plataforma profesional de gestión de eventos anuales para Expo Formación UOCRA.

## Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Storage, Auth)
- **Forms**: React Hook Form, Zod
- **QR**: qrcode library
- **Deploy**: Vercel

## Estructura del Proyecto

```
/
├── src/
│   ├── app/
│   │   ├── (public)/           # Rutas públicas
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── layout.tsx      # Layout público
│   │   │   └── register/       # Registro de usuarios
│   │   ├── admin/              # Panel de administración
│   │   │   ├── layout.tsx      # Layout admin
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── checkin/        # Sistema de check-in
│   │   │   ├── users/          # Gestión de usuarios
│   │   │   ├── talks/          # Gestión de charlas
│   │   │   ├── events/         # Gestión de eventos
│   │   │   ├── content/        # Gestión de contenido
│   │   │   ├── surveys/        # Ver encuestas
│   │   │   └── csv/            # Subir CSV
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── talks/
│   │   │   └── events/
│   │   ├── qr/[dni]/           # Página de QR
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Estilos globales
│   ├── components/
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   ├── sections/           # Componentes de secciones
│   │   └── admin/              # Componentes admin
│   ├── lib/
│   │   ├── supabase/           # Cliente Supabase
│   │   ├── utils/              # Utilidades
│   │   ├── validation/         # Schemas Zod
│   │   └── qr/                 # Utilidades QR
│   ├── types/                  # Tipos TypeScript
│   ├── config/                # Configuración
│   ├── hooks/                  # Custom hooks
│   └── styles/                 # Estilos adicionales
├── supabase/
│   └── schema.sql              # Schema de base de datos
├── .env.example                # Variables de entorno ejemplo
├── tailwind.config.ts          # Config Tailwind
├── next.config.ts              # Config Next.js
└── tsconfig.json               # Config TypeScript
```

## Configuración

1. **Clonar el repositorio**
2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Crear archivo .env**:
   Copiar `.env.example` a `.env` y completar las variables.

4. **Configurar Supabase**:
   - Crear proyecto en Supabase
   - Ejecutar `supabase/schema.sql`
   - Obtener credenciales

5. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Características

### Para Usuarios
- Ver información del evento
- Registrarse online
- Seleccionar charlas (sin superposición)
- Check-in con QR o DNI
- Responder encuesta post-evento

### Para Administradores
- Dashboard con estadísticas
- Gestión de usuarios (CRUD)
- Sistema de check-in rápido
- Gestión de charlas y capacidad
- Gestión multi-anual de eventos
- Editor de contenido
- Subir usuarios por CSV
- Ver encuestas

## Modelo de Datos

- **events**: Eventos anuales (año, título, fecha, activo)
- **users**: Usuarios registrados (DNI, nombre, email, tipo, QR, check-in)
- **how_found**: Opciones de cómo encontraron el evento
- **talks**: Charlas del evento (horario, capacidad, sala)
- **talk_registrations**: Registro de usuarios a charlas
- **survey_answers**: Respuestas de encuestas
- **event_content**: Contenido editable del sitio

## Reglas de Negocio

1. **QR**: Solo usuarios manuales tienen QR generado
2. **Charlas**: No permite superposición de horarios
3. **Capacidad**: No permite registrar más que la capacidad máxima
4. **Encuesta**: Solo una por usuario por evento
5. **Multi-año**: Todos los datos referencian event_id

## Despliegue a Vercel

1. Conectar repositorio a Vercel
2. Agregar variables de entorno
3. Deploy automático en push

## Comandos

```bash
npm run dev          # Iniciar desarrollo
npm run build        # Build producción
npm run start        # Iniciar producción
npm run lint         # Verificar código
```

## Licencia

MIT