import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

export async function getEventStats(eventId: string) {
  const supabase = adminClient;
  
  const [totalResult, checkedInResult, surveyResult] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('event_id', eventId),
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('event_id', eventId).eq('checked_in', true),
    supabase.from('survey_answers').select('*', { count: 'exact', head: true }).eq('event_id', eventId),
  ]);
  
  return {
    totalInscriptos: totalResult.count || 0,
    totalCheckIns: checkedInResult.count || 0,
    totalSurveyResponses: surveyResult.count || 0,
    checkInPercentage: totalResult.count ? Math.round((checkedInResult.count! / totalResult.count) * 100) : 0,
  };
}

export async function getTodayCheckinCount(eventId: string): Promise<number> {
  const supabase = adminClient;
  const today = new Date().toISOString().split('T')[0];
  
  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('checked_in', true)
    .gte('checked_in_at', `${today}T00:00:00`)
    .lte('checked_in_at', `${today}T23:59:59`);
  
  return count || 0;
}
