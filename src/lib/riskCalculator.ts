import type { CityData } from './cityData';

export interface RiskInput {
  cityId: string;
  postalCode: string;
  landlordName: string;
  leaseType: 'month-to-month' | 'fixed-term' | 'expired' | 'none';
  tenancyLength: 'under-1' | '1-2' | '2-5' | 'over-5';
  hasWrittenLease: boolean;
  issueType: 'nonpayment' | 'lease-violation' | 'no-cause' | 'owner-move-in' | 'demolition' | 'harassment' | 'retaliation' | 'habitability';
  hasDocumentation: boolean;
  hasReportedToCity: boolean;
  rentStabilized: boolean;
}

export interface RiskResult {
  score: number; // 0-100
  level: 'low' | 'moderate' | 'high' | 'critical';
  factors: { label: string; impact: number; positive: boolean }[];
  recommendations: string[];
  topStatutes: string[];
  defenseStrength: 'strong' | 'moderate' | 'weak';
}

export function calculateRiskScore(input: RiskInput, cityData: CityData): RiskResult {
  const factors: { label: string; impact: number; positive: boolean }[] = [];
  let baseRisk = 50;

  // Hotspot risk
  const hotspot = cityData.hotspots.find(h => h.zipCode === input.postalCode);
  if (hotspot) {
    if (hotspot.trend === 'rising') {
      baseRisk += 12;
      factors.push({ label: `${hotspot.neighborhood} is a rising eviction hotspot (${hotspot.evictionRate}/1K)`, impact: 12, positive: false });
    } else if (hotspot.evictionRate > 20) {
      baseRisk += 8;
      factors.push({ label: `High eviction rate area: ${hotspot.evictionRate}/1K units`, impact: 8, positive: false });
    } else {
      factors.push({ label: `Moderate eviction rate: ${hotspot.evictionRate}/1K`, impact: 3, positive: false });
      baseRisk += 3;
    }
  }

  // Landlord anomaly check
  const landlordLower = input.landlordName.toLowerCase();
  const flaggedDev = cityData.nodes.find(n =>
    (n.group === 'developer' || n.group === 'shell') && n.flagged &&
    n.label.toLowerCase().includes(landlordLower.split(' ')[0])
  );
  if (flaggedDev) {
    baseRisk += 18;
    factors.push({ label: `Landlord "${input.landlordName}" matches flagged entity: ${flaggedDev.label}`, impact: 18, positive: false });
  }

  // Issue type impact
  const issueRisk: Record<string, number> = {
    'nonpayment': 8, 'lease-violation': 6, 'no-cause': -5, 'owner-move-in': 4,
    'demolition': 10, 'harassment': -8, 'retaliation': -12, 'habitability': -10,
  };
  const ir = issueRisk[input.issueType] || 0;
  baseRisk += ir;
  if (ir > 0) {
    factors.push({ label: `${input.issueType.replace(/-/g, ' ')} cases are harder to defend`, impact: ir, positive: false });
  } else {
    factors.push({ label: `${input.issueType.replace(/-/g, ' ')} is a strong affirmative defense`, impact: Math.abs(ir), positive: true });
  }

  // Protections
  if (input.rentStabilized) {
    baseRisk -= 20;
    factors.push({ label: 'Rent stabilization provides strong eviction protections', impact: 20, positive: true });
  }
  if (input.hasDocumentation) {
    baseRisk -= 10;
    factors.push({ label: 'Documentation strengthens your defense', impact: 10, positive: true });
  }
  if (input.hasReportedToCity) {
    baseRisk -= 8;
    factors.push({ label: 'City complaint on file triggers retaliation presumption', impact: 8, positive: true });
  }
  if (input.hasWrittenLease) {
    baseRisk -= 5;
    factors.push({ label: 'Written lease provides clear terms for defense', impact: 5, positive: true });
  }
  if (input.tenancyLength === 'over-5') {
    baseRisk -= 8;
    factors.push({ label: 'Long tenancy (5+ years) provides additional protections and 90-day notice', impact: 8, positive: true });
  } else if (input.tenancyLength === '2-5') {
    baseRisk -= 4;
    factors.push({ label: '2-5 year tenancy requires 90-day notice', impact: 4, positive: true });
  }
  if (input.leaseType === 'expired' || input.leaseType === 'none') {
    baseRisk += 8;
    factors.push({ label: 'No active lease increases vulnerability', impact: 8, positive: false });
  }

  const score = Math.max(5, Math.min(95, baseRisk));
  const level = score >= 75 ? 'critical' : score >= 55 ? 'high' : score >= 35 ? 'moderate' : 'low';
  const defenseStrength = score <= 35 ? 'strong' : score <= 60 ? 'moderate' : 'weak';

  const recommendations: string[] = [];
  if (!input.hasDocumentation) recommendations.push('Document all issues in writing with photos and dates immediately');
  if (!input.hasReportedToCity) recommendations.push(`File a complaint with ${cityData.name} code enforcement to establish retaliation protection`);
  if (!input.hasWrittenLease) recommendations.push('Request a written lease from your landlord');
  if (score > 50) recommendations.push('Contact a tenant legal aid organization in your area for free representation');
  recommendations.push(`Download and review your ${cityData.state} tenant rights guide`);
  if (hotspot && hotspot.trend === 'rising') recommendations.push(`Connect with local tenant organizing groups in ${hotspot.neighborhood}`);

  const topStatutes = cityData.statutes.slice(0, 3).map(s => s.code);

  return { score, level, factors: factors.sort((a, b) => b.impact - a.impact), recommendations, topStatutes, defenseStrength };
}
