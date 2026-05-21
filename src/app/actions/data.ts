'use server';

import { userRepo } from '@/lib/repositories/userRepo';
import { surveyRepo } from '@/lib/repositories/surveyRepo';
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

export async function getUsers(eventId: string, page = 1, limit = 20) {
  return userRepo.getUsersByEvent(eventId, page, limit);
}

export async function getUsersCount(eventId: string) {
  return userRepo.getUsersCount(eventId);
}

export async function getUserById(userId: string) {
  return userRepo.getUserById(userId);
}

export async function updateUser(userId: string, updates: { name?: string; lastname?: string; email?: string; phone?: string }) {
  return userRepo.updateUser(userId, updates);
}

export async function getUserSurveyAnswers(eventId: string, dni: string) {
  const answers = await surveyRepo.getAnswersByEvent(eventId);
  return answers.find(a => a.dni === dni) || null;
}

export async function exportUsersToCSV(eventId: string): Promise<string> {
  const { data: users, error } = await getAdminClient()
    .from('users')
    .select('dni, name, lastname, email, checked_in, created_at')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });
  
  if (error || !users) {
    throw new Error('Error al obtener usuarios');
  }
  
  const headers = ['DNI', 'Nombre', 'Apellido', 'Email', 'Check-in', 'Fecha Registro'];
  const rows = (users as unknown as { dni: string; name: string; lastname: string; email: string; checked_in: boolean; created_at: string }[]).map(user => [
    user.dni,
    user.name,
    user.lastname,
    user.email,
    user.checked_in ? 'Sí' : 'No',
    new Date(user.created_at).toLocaleDateString('es-AR'),
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  return csvContent;
}

export async function getCheckinStats(eventId: string) {
  const [totalResult, checkedInResult] = await Promise.all([
    getAdminClient().from('users').select('*', { count: 'exact', head: true }).eq('event_id', eventId),
    getAdminClient().from('users').select('*', { count: 'exact', head: true }).eq('event_id', eventId).eq('checked_in', true),
  ]);
  
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
  const { count: todayCount } = await getAdminClient()
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('checked_in', true)
    .gte('checked_in_at', `${today}T00:00:00`)
    .lte('checked_in_at', `${today}T23:59:59`);
  
  return {
    total: totalResult.count || 0,
    checkedIn: checkedInResult.count || 0,
    todayCheckins: todayCount || 0,
    percentage: totalResult.count ? Math.round((checkedInResult.count! / totalResult.count) * 100) : 0,
  };
}

export async function undoCheckin(userId: string, eventId: string): Promise<boolean> {
  const { error } = await getAdminClient()
    .from('users')
    .update({ checked_in: false, checked_in_at: null } as never)
    .eq('id', userId)
    .eq('event_id', eventId);
  
  return !error;
}
