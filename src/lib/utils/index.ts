import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateQRCode(dni: string, baseUrl: string): string {
  return `${baseUrl}/qr/${dni}`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}

export function getInitials(name: string, lastname: string): string {
  return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
}