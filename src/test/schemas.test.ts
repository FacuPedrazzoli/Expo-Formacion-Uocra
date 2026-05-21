import { describe, it, expect } from 'vitest';
import { registrationSchema, checkinSchema, surveySchema, userSchema, eventSchema, talkSchema } from '@/lib/validation/schemas';
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

describe('surveySchema', () => {
  it('valida respuestas de tipo string', () => {
    const result = surveySchema.safeParse({
      answers: { q1: 'Mi respuesta' },
    });
    expect(result.success).toBe(true);
  });

  it('valida respuestas de tipo number', () => {
    const result = surveySchema.safeParse({
      answers: { q1: 5 },
    });
    expect(result.success).toBe(true);
  });

  it('valida respuestas de tipo array', () => {
    const result = surveySchema.safeParse({
      answers: { q1: ['opcion1', 'opcion2'] },
    });
    expect(result.success).toBe(true);
  });

  it('permite answers vacío', () => {
    const result = surveySchema.safeParse({
      answers: {},
    });
    expect(result.success).toBe(true);
  });

  it('valida questionIds opcional', () => {
    const result = surveySchema.safeParse({
      answers: {},
      questionIds: ['q1', 'q2'],
    });
    expect(result.success).toBe(true);
  });
});

describe('userSchema', () => {
  const validUser = {
    id: 'user-1',
    eventId: 'event-1',
    dni: '1234567',
    name: 'Juan',
    lastname: 'Pérez',
    email: 'juan@example.com',
    userType: 'manual' as const,
    hasQR: true,
    qrCode: null,
    checkedIn: false,
    createdAt: '2024-01-01T00:00:00Z',
  };

  it('valida usuario válido', () => {
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('rechaza userType inválido', () => {
    const result = userSchema.safeParse({ ...validUser, userType: 'invalid' as unknown as 'manual' | 'web' });
    expect(result.success).toBe(false);
  });

  it('acepta phone opcional', () => {
    const result = userSchema.safeParse({ ...validUser, phone: '1234567890' });
    expect(result.success).toBe(true);
  });
});

describe('eventSchema', () => {
  const validEvent = {
    id: 'event-1',
    year: 2024,
    title: 'Evento UOCRA',
    date: '2024-12-01',
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
  };

  it('valida evento válido', () => {
    const result = eventSchema.safeParse(validEvent);
    expect(result.success).toBe(true);
  });

  it('acepta campos opcionales', () => {
    const result = eventSchema.safeParse({ ...validEvent, description: 'Descripción', location: 'Buenos Aires' });
    expect(result.success).toBe(true);
  });
});

describe('talkSchema', () => {
  const validTalk = {
    id: 'talk-1',
    eventId: 'event-1',
    title: 'Charla técnica',
    startTime: '10:00',
    endTime: '11:00',
    capacity: 50,
    room: 'Sala A',
  };

  it('valida talk válido', () => {
    const result = talkSchema.safeParse(validTalk);
    expect(result.success).toBe(true);
  });

  it('acepta campos opcionales', () => {
    const result = talkSchema.safeParse({ ...validTalk, description: 'Descripción', speaker: 'Juan Pérez' });
    expect(result.success).toBe(true);
  });
});