import { NextRequest, NextResponse } from 'next/server';
import { eventRepo } from '@/lib/repositories/eventRepo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await eventRepo.getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, year, date, location, active } = body;

    if (!title || !year) {
      return NextResponse.json(
        { error: 'Title and year are required' },
        { status: 400 }
      );
    }

    const newEvent = await eventRepo.createEvent({
      title,
      year,
      date: date || '',
      location,
      active: active || false,
    });

    if (!newEvent) {
      return NextResponse.json(
        { error: 'Error creating event' },
        { status: 500 }
      );
    }

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Error creating event' },
      { status: 500 }
    );
  }
}
