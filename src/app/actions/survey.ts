'use server';

import { surveyService } from '@/lib/services/surveyService';
import { revalidatePath } from 'next/cache';

export async function submitSurvey(eventId: string, dni: string, answers: Record<string, unknown>) {
  const result = await surveyService.submitSurvey(eventId, dni, answers);
  
  if (result.success) {
    revalidatePath('/survey');
  }
  
  return result;
}

export async function getSurveyQuestions(eventId: string) {
  return surveyService.getQuestions(eventId);
}

export async function getSurveyAnswers(eventId: string) {
  return surveyService.getAnswers(eventId);
}

export async function getSurveyStats(eventId: string) {
  return surveyService.getSurveyStats(eventId);
}