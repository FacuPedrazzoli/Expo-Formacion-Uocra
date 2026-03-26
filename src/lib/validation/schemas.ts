import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  lastname: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  dni: z.string().min(7, 'DNI debe tener al menos 7 dígitos').max(10, 'DNI debe tener máximo 10 dígitos'),
  how_found_id: z.string().optional(),
  talks: z.array(z.string()).optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const userSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  dni: z.string(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  user_type: z.enum(['manual', 'web']),
  has_qr: z.boolean(),
  qr_code: z.string().nullable(),
  checked_in: z.boolean(),
  created_at: z.string(),
});

export const eventSchema = z.object({
  id: z.string(),
  year: z.number(),
  title: z.string(),
  date: z.string(),
  active: z.boolean(),
  created_at: z.string(),
});

export const talkSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  title: z.string(),
  description: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  capacity: z.number(),
  room: z.string(),
});

export const checkinSchema = z.object({
  dni: z.string().min(7, 'DNI inválido'),
});

export type CheckinFormData = z.infer<typeof checkinSchema>;

export const surveySchema = z.record(z.string(), z.union([
  z.string(),
  z.number(),
  z.array(z.string()),
]));

export type SurveyFormData = z.infer<typeof surveySchema>;