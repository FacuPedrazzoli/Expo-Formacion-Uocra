import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export const surveyRepo = {
  async getQuestionsByEvent(eventId: string): Promise<SurveyQuestion[]> {
    const { data, error } = await adminClient
      .from('survey_questions')
      .select('*')
      .eq('event_id', eventId)
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching questions:', error);
      return [];
    }

    return (data || []) as SurveyQuestion[];
  },

  async saveAnswers(eventId: string, dni: string, answers: Record<string, unknown>): Promise<boolean> {
    const { error } = await adminClient
      .from('survey_answers')
      .upsert({
        event_id: eventId,
        dni: dni,
        answers_json: answers,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'event_id,dni',
      });

    if (error) {
      console.error('Error saving survey answers:', error);
      return false;
    }

    return true;
  },

  async getAnswersByEvent(eventId: string): Promise<SurveyAnswer[]> {
    const { data, error } = await adminClient
      .from('survey_answers')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching answers:', error);
      return [];
    }

    return (data || []) as SurveyAnswer[];
  },

  async hasAnswered(eventId: string, dni: string): Promise<boolean> {
    const { data, error } = await adminClient
      .from('survey_answers')
      .select('id')
      .eq('event_id', eventId)
      .eq('dni', dni)
      .single();

    return !error && !!data;
  },
};

interface SurveyQuestion {
  id: string;
  event_id: string;
  question: string;
  question_type: string;
  options: string[];
  required: boolean;
  sort_order: number;
}

interface SurveyAnswer {
  id: string;
  event_id: string;
  dni: string;
  answers_json: Record<string, unknown>;
  created_at: string;
}