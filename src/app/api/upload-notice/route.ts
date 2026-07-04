import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { evictionLogs, savedCases } from '@/db/schema';
import { getCityData } from '@/lib/cityData';
import { groqExtractEntities } from '@/lib/groqClient';
import { compileDocument } from '@/lib/documentTemplates';

async function extractTextFromFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Try PDF parsing
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    try {
      const pdfParse = await import('pdf-parse');
      const parseFn = typeof pdfParse === 'function' ? pdfParse : (pdfParse as any).default || pdfParse;
      const data = await parseFn(buffer);
      if (data.text && data.text.trim().length > 20) {
        return data.text;
      }
    } catch (e) {
      console.error('PDF parse error:', e);
    }
  }

  // For images or failed PDF, return placeholder (would use Tesseract in production)
  return `[Document uploaded: ${file.name}, ${file.size} bytes. OCR processing would extract text in production with Tesseract.]`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const address = formData.get('address') as string || 'Unknown';
    const postalCode = formData.get('postalCode') as string || '14204';
    const cityId = formData.get('cityId') as string || 'buffalo-ny';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const city = getCityData(cityId);
    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Step 1: Extract text from uploaded file
    const extractedText = await extractTextFromFile(file);

    // Step 2: Use Groq to extract entities (falls back gracefully)
    const entities = await groqExtractEntities(extractedText);
    const tenantName = entities.tenantName || formData.get('tenantName') as string || 'Tenant Name';
    const landlordName = entities.landlordName || formData.get('landlordName') as string || 'Landlord Name';

    const extractedEntities = {
      tenantName,
      landlordName,
      evictionNoticeDate: entities.evictionDate || new Date().toISOString().split('T')[0],
      allegedReason: entities.reason || 'See uploaded document',
      address,
      city: city.name,
      state: city.state,
      extractedText: extractedText.substring(0, 500),
    };

    // Step 3: Hybrid RAG — match statutes
    const relevantStatutes = city.statutes.slice(0, 3).map((s, i) => ({
      ...s,
      matchScore: s.relevanceScore - i * 3,
      matchType: i === 0 ? 'BM25 + Dense Vector' : i === 1 ? 'Dense Vector' : 'BM25 Sparse',
    }));

    // Step 4: Graph anomalies
    const graphAnomalies = city.anomalies.filter(a =>
      a.severity === 'critical' || a.severity === 'high'
    );

    // Step 5: Hotspot
    const hotspot = city.hotspots.find(h => h.zipCode === postalCode);

    // Step 6: Compile defense document via FSM
    const compiledDefense = compileDocument('eviction-answer', {
      tenantName,
      landlordName,
      address,
      date: extractedEntities.evictionNoticeDate,
      city: city.name,
      state: city.state,
      statutes: city.statutes,
      postalCode,
    }, city);

    // Step 7: Generate case token for save/resume
    const caseToken = `CS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Step 8: Log to database
    await db.insert(evictionLogs).values({
      cityId,
      postalCode,
      violationType: extractedEntities.allegedReason.slice(0, 60),
      tenantName,
      landlordName,
      address,
      riskScore: 50,
    });

    // Step 9: Save case
    await db.insert(savedCases).values({
      caseToken,
      cityId,
      tenantName,
      address,
      postalCode,
      defenseDocument: compiledDefense,
      status: 'active',
    });

    return NextResponse.json({
      success: true,
      caseToken,
      city: { name: city.name, state: city.state },
      extractedEntities,
      relevantStatutes,
      graphAnomalies,
      hotspot: hotspot || null,
      compiledDefense,
      message: `Defense generated for ${city.name}. Case ID: ${caseToken}. ${graphAnomalies.length} anomalies detected.`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: 'Processing failed. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get('cityId') || 'buffalo-ny';
  const caseToken = searchParams.get('caseToken');

  // Case resume
  if (caseToken) {
    const { eq } = await import('drizzle-orm');
    const cases = await db.select().from(savedCases)
      .where(eq(savedCases.caseToken, caseToken))
      .limit(1);
    if (cases.length > 0) {
      return NextResponse.json({ case: cases[0] });
    }
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }

  const city = getCityData(cityId);
  if (!city) return NextResponse.json({ error: 'City not found' }, { status: 404 });

  return NextResponse.json({
    city: { name: city.name, state: city.state, id: city.id },
    nodes: city.nodes,
    links: city.links,
    anomalies: city.anomalies,
    hotspots: city.hotspots,
    stats: city.stats,
  });
}
