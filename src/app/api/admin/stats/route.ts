import { NextResponse } from 'next/server';
import { db } from '@/db';
import { evictionLogs, incidentReports, savedCases, users } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [caseCount] = await db.select({ count: sql<number>`count(*)` }).from(savedCases);
    const [evictionCount] = await db.select({ count: sql<number>`count(*)` }).from(evictionLogs);
    const [incidentCount] = await db.select({ count: sql<number>`count(*)` }).from(incidentReports);

    const topCities = await db.select({
      cityId: evictionLogs.cityId,
      count: sql<number>`count(*)`,
    }).from(evictionLogs).groupBy(evictionLogs.cityId).orderBy(sql`count(*) DESC`).limit(10);

    const topIncidents = await db.select({
      type: incidentReports.incidentType,
      count: sql<number>`count(*)`,
    }).from(incidentReports).groupBy(incidentReports.incidentType).orderBy(sql`count(*) DESC`).limit(10);

    const recentCases = await db.select({
      id: savedCases.id, caseToken: savedCases.caseToken, cityId: savedCases.cityId,
      tenantName: savedCases.tenantName, status: savedCases.status, createdAt: savedCases.createdAt,
    }).from(savedCases).orderBy(sql`${savedCases.createdAt} DESC`).limit(10);

    return NextResponse.json({
      users: Number(userCount.count),
      cases: Number(caseCount.count),
      evictions: Number(evictionCount.count),
      incidents: Number(incidentCount.count),
      topCities,
      topIncidents,
      recentCases,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
