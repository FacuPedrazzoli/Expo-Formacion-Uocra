import { createClient } from '@/lib/supabase/client';
import type { User } from '@/types/user';

export interface AuthUser {
  id: string;
  email: string;
  user: User;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    user: {
      id: user.id,
      eventId: '',
      dni: '',
      name: user.user_metadata?.name || '',
      lastname: user.user_metadata?.lastname || '',
      email: user.email || '',
      userType: 'web',
      hasQR: false,
      checkedIn: false,
      createdAt: user.created_at,
    },
  };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
