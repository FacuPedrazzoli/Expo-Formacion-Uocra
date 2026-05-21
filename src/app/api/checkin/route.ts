import { NextRequest, NextResponse } from 'next/server';
import { checkinService } from '@/lib/services/checkinService';

export const dynamic = 'force-dynamic';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_ATTEMPTS = 10;

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { success: false, message: 'Demasiadas solicitudes. Intenta en 1 minuto.' },
        { status: 429 }
      );
    }
    const body = await request.json();
    const { dni } = body;

    if (!dni || typeof dni !== 'string') {
      return NextResponse.json(
        { success: false, message: 'DNI es requerido' },
        { status: 400 }
      );
    }

    const eventId = await checkinService.getActiveEventId();
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'No hay evento activo' },
        { status: 400 }
      );
    }

    const result = await checkinService.checkinByDNI(dni.trim(), eventId);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400 }
    );
  } catch (error) {
    console.error('API Checkin error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
