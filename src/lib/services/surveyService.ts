import { createClient } from '@supabase/supabase-js';
import { surveyRepo } from '@/lib/repositories/surveyRepo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export interface SurveyQuestion {
  id: string;
  event_id: string;
  question: string;
  question_type: string;
  options: string[];
  required: boolean;
  sort_order: number;
}

export interface SurveyResult {
  success: boolean;
  error?: string;
}

export const surveyService = {
  async getQuestions(eventId: string): Promise<SurveyQuestion[]> {
    return surveyRepo.getQuestionsByEvent(eventId);
  },

  async submitSurvey(eventId: string, dni: string, answers: Record<string, unknown>): Promise<SurveyResult> {
    try {
      const hasAnswered = await surveyRepo.hasAnswered(eventId, dni);
      if (hasAnswered) {
        return { success: false, error: 'Ya has completado la encuesta anteriormente' };
      }

      const saved = await surveyRepo.saveAnswers(eventId, dni, answers);
      
      if (!saved) {
        return { success: false, error: 'Error al guardar las respuestas' };
      }

      return { success: true };
    } catch (error) {
      console.error('Survey submit error:', error);
      return { success: false, error: 'Error inesperado al enviar la encuesta' };
    }
  },

  async getAnswers(eventId: string): Promise<{ dni: string; answers: Record<string, unknown>; createdAt: string }[]> {
    const answers = await surveyRepo.getAnswersByEvent(eventId);
    return answers.map(a => ({
      dni: a.dni,
      answers: a.answers_json,
      createdAt: a.created_at,
    }));
  },

  async getSurveyStats(eventId: string): Promise<{ total: number }> {
    const { count } = await adminClient
      .from('survey_answers')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId);

    return { total: count || 0 };
  },
};