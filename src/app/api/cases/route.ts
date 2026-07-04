import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { savedCases } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ cases: [] });
  const cases = await db.select().from(savedCases)
    .where(eq(savedCases.userId, session.id))
    .orderBy(desc(savedCases.createdAt)).limit(20);
  return NextResponse.json({ cases });
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  try {
    const { caseId, courtDate, notes, status } = await request.json();
    if (!caseId) return NextResponse.json({ error: 'Missing caseId' }, { status: 400 });
    const updates: Record<string, string> = {};
    if (courtDate !== undefined) updates.courtDate = courtDate;
    if (notes !== undefined) updates.notes = notes;
    if (status !== undefined) updates.status = status;
    await db.update(savedCases).set(updates).where(and(eq(savedCases.id, caseId), eq(savedCases.userId, session.id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
