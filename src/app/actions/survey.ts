'use server';

import { surveyService } from '@/lib/services/surveyService';
import { revalidatePath } from 'next/cache';
import { submitSurveySchema } from '@/lib/validation/schemas';

export async function submitSurvey(eventId: string, dni: string, answers: Record<string, unknown>) {
  const result = submitSurveySchema.safeParse({ eventId, dni, answers });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Datos de encuesta inválidos',
    };
  }

  const existingAnswers = await surveyService.getAnswers(eventId);
  const userAnswers = existingAnswers.filter(a => a.dni === dni);

  if (userAnswers.length > 0) {
    return {
      success: false,
      error: 'Ya has respondido esta encuesta',
    };
  }

  const submitResult = await surveyService.submitSurvey(eventId, dni, {
    ...answers,
    submittedAt: new Date().toISOString(),
  });

  if (submitResult.success) {
    revalidatePath('/survey');
  }

  return submitResult;
}
