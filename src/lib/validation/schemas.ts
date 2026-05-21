import { z } from 'zod';
import { SOURCE_OPTIONS } from '@/lib/constants/source-options';

const DNI_REGEX = /^\d{7,8}$/;

export const registrationSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  surname: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  dni: z.string().regex(DNI_REGEX, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  email: z.string().email('Ingresá un email válido'),
  source: z.enum(SOURCE_OPTIONS),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const checkinSchema = z.object({
  dni: z.string().regex(DNI_REGEX, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  eventId: z.string().uuid('ID de evento inválido'),
});

export const submitSurveySchema = z.object({
  eventId: z.string().uuid('ID de evento inválido'),
  dni: z.string().regex(DNI_REGEX, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  answers: z.record(z.string(), z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
  ])),
}).refine((data) => {
  const requiredIds = ['overall', 'content', 'organization', 'venue', 'recommend'];
  return requiredIds.every(id => data.answers[id] !== undefined && data.answers[id] !== '');
}, {
  message: 'Todas las preguntas requeridas deben ser respondidas',
  path: ['answers'],
});
