import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_PATHS = ['/admin'];
const PUBLIC_PATHS = ['/admin/login'];
const SESSION_SECRET = process.env.SESSION_SECRET || 'expo2026-session-secret';

function validateSessionToken(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [payloadBase64, signature] = parts;
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

    const expectedSignature = createHmac('sha256', SESSION_SECRET)
      .update(payloadBase64)
      .digest('hex');

    if (signature !== expectedSignature) return false;

    if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
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

    if (!validateSessionToken(sessionCookie.value)) {
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
