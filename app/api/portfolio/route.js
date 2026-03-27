import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getData, updateSection } from '@/lib/data';

export async function GET() {
  const data = await getData();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  });
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { section, value } = body;
    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }
    const updated = await updateSection(section, value);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
