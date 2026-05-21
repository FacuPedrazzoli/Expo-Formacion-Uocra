import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PATHS = ['/admin'];
const PUBLIC_PATHS = ['/admin/login'];
const SESSION_SECRET = process.env.SESSION_SECRET || 'expo2026-session-secret';

async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [payloadBase64, signature] = parts;
    const payload = JSON.parse(atob(payloadBase64));

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadBase64));
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (signature !== expectedSignature) return false;

    if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath = ADMIN_PATHS.some(path => pathname.startsWith(path));
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));

  if (isAdminPath && !isPublicPath) {
    const sessionCookie = request.cookies.get('session');
    
    if (!sessionCookie || !sessionCookie.value || sessionCookie.value.trim() === '') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!(await validateSessionToken(sessionCookie.value))) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
