import { NextRequest, NextResponse } from 'next/server';
import { getCityData } from '@/lib/cityData';
import { calculateRiskScore, type RiskInput } from '@/lib/riskCalculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RiskInput;
    const cityData = getCityData(body.cityId);
    if (!cityData) return NextResponse.json({ error: 'City not found' }, { status: 404 });
    const result = calculateRiskScore(body, cityData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate risk' }, { status: 500 });
  }
}
