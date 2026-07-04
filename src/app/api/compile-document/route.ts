import { NextRequest, NextResponse } from 'next/server';
import { getCityData } from '@/lib/cityData';
import { compileDocument, type DocumentType } from '@/lib/documentTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cityId, documentType, tenantName, landlordName, address, date, postalCode,
      depositAmount, rentAmount, increaseAmount, issues } = body;

    const cityData = getCityData(cityId || 'buffalo-ny');
    if (!cityData) return NextResponse.json({ error: 'City not found' }, { status: 404 });

    const doc = compileDocument(documentType as DocumentType, {
      tenantName: tenantName || 'Tenant Name',
      landlordName: landlordName || 'Landlord Name',
      address: address || 'Address',
      date: date || new Date().toISOString().split('T')[0],
      city: cityData.name,
      state: cityData.state,
      statutes: cityData.statutes,
      postalCode, depositAmount, rentAmount, increaseAmount, issues,
    }, cityData);

    return NextResponse.json({ success: true, document: doc, type: documentType });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compile document' }, { status: 500 });
  }
}
