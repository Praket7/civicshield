import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { incidentReports } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await db.update(incidentReports)
      .set({ upvotes: sql`${incidentReports.upvotes} + 1` })
      .where(eq(incidentReports.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upvote' }, { status: 500 });
  }
}
