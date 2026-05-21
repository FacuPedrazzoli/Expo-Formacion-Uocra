import { NextRequest, NextResponse } from 'next/server';
import { checkinService } from '@/lib/services/checkinService';

export async function POST(request: NextRequest) {
  try {
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
