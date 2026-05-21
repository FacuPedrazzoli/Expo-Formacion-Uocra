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

export const userSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  dni: z.string(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  userType: z.enum(['manual', 'web']),
  hasQR: z.boolean(),
  qrCode: z.string().nullable().optional(),
  checkedIn: z.boolean(),
  checkedInAt: z.string().optional(),
  howFoundId: z.string().optional(),
  createdAt: z.string(),
});

export const eventSchema = z.object({
  id: z.string(),
  year: z.number(),
  title: z.string(),
  date: z.string(),
  active: z.boolean(),
  description: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  createdAt: z.string(),
});

export const talkSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  speaker: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  capacity: z.number(),
  room: z.string(),
});

export const checkinSchema = z.object({
  dni: z.string().regex(DNI_REGEX, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  eventId: z.string().uuid('ID de evento inválido'),
});

export type CheckinFormData = z.infer<typeof checkinSchema>;

export const surveySchema = z.object({
  answers: z.record(z.string(), z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
  ])),
  questionIds: z.array(z.string()).optional(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;

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

export type SubmitSurveyData = z.infer<typeof submitSurveySchema>;

export { DNI_REGEX };
