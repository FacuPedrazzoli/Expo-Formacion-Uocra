import { createClient } from '@supabase/supabase-js';

let _adminClient: ReturnType<typeof createClient> | null = null;

function getAdminClient() {
  if (!_adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    _adminClient = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _adminClient;
}

export interface EventStats {
  totalInscriptos: number;
  totalCheckIns: number;
  totalSurveyResponses: number;
  checkInPercentage: number;
}

export async function getEventStats(eventId: string): Promise<EventStats> {
  const supabase = getAdminClient();

  try {
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
  } catch (error) {
    console.error('Error fetching event stats:', error);
    return {
      totalInscriptos: 0,
      totalCheckIns: 0,
      totalSurveyResponses: 0,
      checkInPercentage: 0,
    };
  }
}

export async function getTodayCheckinCount(eventId: string): Promise<number> {
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  try {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('checked_in', true)
      .gte('checked_in_at', `${today}T00:00:00`)
      .lte('checked_in_at', `${today}T23:59:59`);

    return count || 0;
  } catch (error) {
    console.error('Error fetching today checkin count:', error);
    return 0;
  }
}
