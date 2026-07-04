import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { incidentReports } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cityId, postalCode, neighborhood, incidentType, description, severity } = body;
    if (!cityId || !postalCode || !incidentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const [report] = await db.insert(incidentReports).values({
      cityId, postalCode, neighborhood: neighborhood || '', incidentType,
      description: description || '', severity: severity || 'medium',
    }).returning();
    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId') || 'buffalo-ny';
    const reports = await db.select().from(incidentReports)
      .where(eq(incidentReports.cityId, cityId))
      .orderBy(desc(incidentReports.createdAt)).limit(50);
    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
