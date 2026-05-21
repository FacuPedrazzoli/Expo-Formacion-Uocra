import { describe, it, expect } from 'vitest';
import { registrationSchema, checkinSchema } from '@/lib/validation/schemas';
import { SOURCE_OPTIONS } from '@/lib/constants/source-options';

describe('registrationSchema', () => {
  const validData = {
    name: 'Juan',
    surname: 'Pérez',
    dni: '1234567',
    email: 'juan@example.com',
    source: 'Redes sociales' as const,
  };

  it('valida datos válidos', () => {
    const result = registrationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('valida DNI de 7 dígitos', () => {
    const result = registrationSchema.safeParse({ ...validData, dni: '1234567' });
    expect(result.success).toBe(true);
  });

  it('valida DNI de 8 dígitos', () => {
    const result = registrationSchema.safeParse({ ...validData, dni: '12345678' });
    expect(result.success).toBe(true);
  });

  it('rechaza DNI con letras', () => {
    const result = registrationSchema.safeParse({ ...validData, dni: '1234567a' });
    expect(result.success).toBe(false);
  });

  it('rechaza DNI con menos de 7 dígitos', () => {
    const result = registrationSchema.safeParse({ ...validData, dni: '123456' });
    expect(result.success).toBe(false);
  });

  it('rechaza DNI con más de 8 dígitos', () => {
    const result = registrationSchema.safeParse({ ...validData, dni: '123456789' });
    expect(result.success).toBe(false);
  });

  it('rechaza email sin @', () => {
    const result = registrationSchema.safeParse({ ...validData, email: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rechaza email sin dominio', () => {
    const result = registrationSchema.safeParse({ ...validData, email: 'user@' });
    expect(result.success).toBe(false);
  });

  it('rechaza nombre con menos de 2 caracteres', () => {
    const result = registrationSchema.safeParse({ ...validData, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rechaza source inválido', () => {
    const result = registrationSchema.safeParse({ ...validData, source: 'Fuente inventada' as unknown as typeof SOURCE_OPTIONS[number] });
    expect(result.success).toBe(false);
  });
});

describe('checkinSchema', () => {
  const validCheckin = {
    dni: '1234567',
    eventId: '550e8400-e29b-41d4-a716-446655440000',
  };

  it('valida datos válidos', () => {
    const result = checkinSchema.safeParse(validCheckin);
    expect(result.success).toBe(true);
  });

  it('rechaza DNI con formato inválido', () => {
    const result = checkinSchema.safeParse({ ...validCheckin, dni: 'abc' });
    expect(result.success).toBe(false);
  });

  it('rechaza eventId sin formato UUID', () => {
    const result = checkinSchema.safeParse({ ...validCheckin, eventId: 'not-a-uuid' });
    expect(result.success).toBe(false);
  });
});
