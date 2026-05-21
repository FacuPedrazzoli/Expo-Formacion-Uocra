# Contribuir - Expo Formación UOCRA

## Setup Local

### Requisitos Previos

- Node.js 20+
- npm o yarn
- Git
- Cuenta de Supabase (para desarrollo local)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <repo-url>
cd expo-formacion-uocra
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Editar `.env.local` con las credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Convenciones de Código

### TypeScript

- Usar tipos explícitos para props y funciones públicas
- Preferir `interface` sobre `type` para objetos
- Usar `unknown` en lugar de `any` cuando el tipo no es conocido

```typescript
// Correcto
interface UserProps {
  name: string;
  email: string;
}

// Evitar
type UserProps = {
  name: any;
  email: any;
};
```

### Nombres de Archivos

- Componentes React: `PascalCase.tsx`
- Utilidades y hooks: `camelCase.ts`
- Constantes: `SCREAMING_SNAKE_CASE` o `camelCase` según contexto

### Componentes

- Usar `function` en lugar de `const` para componentes
- Props siempre con tipos explícitos
- Un componente por archivo

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return <button className={variant}>{children}</button>;
}
```

### Server Actions

- Nombrar con verbo: `register`, `checkin`, `submitSurvey`
- Usar `use server` al final del archivo
- Validar inputs con Zod antes de procesar

```typescript
'use server';

import { z } from 'zod';

const RegisterSchema = z.object({
  dni: z.string().min(7).max(8),
  name: z.string().min(2),
  email: z.string().email(),
});

export async function register(formData: FormData) {
  const validated = RegisterSchema.parse(Object.fromEntries(formData));
  // procesamiento...
}
```

### Supabase

- Usar repository pattern para acceso a datos
- Nunca exponer service role key en el cliente
- Usar RLS policies para seguridad

## Estructura de Commits

Usar commits convencionales:

```
feat: agregar nuevo feature
fix: corregir bug
docs: actualizar documentación
style: cambios de formato (sin cambio de lógica)
refactor: refactorizar código
test: agregar tests
chore: tareas de mantenimiento
```

Ejemplos:

```bash
git commit -m "feat: agregar sistema de check-in por DNI"
git commit -m "fix: corregir validación de email en registro"
git commit -m "docs: actualizar README con nuevas variables de entorno"
```

## Tests

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Coverage
npm run test:coverage
```

### Escribir Tests

Los tests usan Vitest con React Testing Library:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });
});
```

### Archivos de Test

- Ubicación: junto al archivo que testea
- Nombrado: `nombre.test.tsx` o `nombre.spec.tsx`
- Setup: `src/test/setup.ts`

## Pull Request Guidelines

### Antes de Crear PR

1. ** Asegurar que el código pasa lint y typecheck**

```bash
npm run lint
npm run typecheck
```

2. **Ejecutar tests**

```bash
npm test
```

3. **Commits descriptivos**

Seguir la estructura de commits mencionada arriba.

### Template de PR

```markdown
## Descripción
Breve descripción del cambio.

## Tipo de Cambio
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentación

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Lint pasa
- [ ] Typecheck pasa
- [ ] Documentación actualizada (si aplica)

## Screenshots (si aplica)
```

### Proceso de Review

1. Un reviewer debe aprobar antes de merge
2. Resolver todos los comentarios antes de merge
3. Squash commits si hay muchos commits pequeños

## Ramas

- `main` - Rama principal, deploy automático a producción
- `develop` - Rama de desarrollo (si aplica)
- `feat/*` - Nuevas features
- `fix/*` - Correcciones de bugs

Ejemplo:

```bash
git checkout -b feat/nuevo-registro
git checkout -b fix/checkin-qr
```
