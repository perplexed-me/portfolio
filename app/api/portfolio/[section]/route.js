import { NextResponse } from 'next/server';
import { getSection } from '@/lib/data';

const VALID_SECTIONS = ['profile', 'skills', 'projects', 'experience'];

export async function GET(request, { params }) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 404 });
  }

  const data = getSection(section);
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
