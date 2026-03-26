'use server';

import { registerService, type RegisterInput } from '@/lib/services/registerService';
import { revalidatePath } from 'next/cache';

export async function registerUser(formData: RegisterInput) {
  const result = await registerService.register(formData);
  
  if (result.success) {
    revalidatePath('/');
    revalidatePath('/register');
  }
  
  return result;
}

export async function registerFromCSV(data: { dni: string; name: string; lastname: string; email: string }[], eventId: string) {
  return registerService.registerFromCSV(data, eventId);
}