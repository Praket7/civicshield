import type { CityData } from '../cityData';

function makeCity(p: { id: string; name: string; state: string; mayor: string; pop: number; council: string;
  nodes: CityData['nodes']; links: CityData['links']; anomalies: CityData['anomalies']; statutes: CityData['statutes'];
  hotspots: CityData['hotspots']; stats: CityData['stats']; }): CityData {
  return { id: p.id, name: p.name, state: p.state, mayor: p.mayor, population: p.pop, councilName: p.council,
    nodes: p.nodes, links: p.links, anomalies: p.anomalies, statutes: p.statutes, hotspots: p.hotspots, stats: p.stats };
}

// ── HOUSTON ──
export const houstonData = makeCity({
  id: 'houston-tx', name: 'Houston', state: 'Texas', mayor: 'John Whitmire', pop: 2302878, council: 'Houston City Council (16 Members)',
  nodes: [
    { id: 'CC-Mayor', label: 'Mayor John Whitmire', group: 'council', value: 50, district: 'Mayor', description: 'Mayor since 2024. Former state senator. Conservative Democrat. Anti-homeless encampment enforcement.' },
    { id: 'CC-Thomas', label: 'CM Carolyn Evans-Shabazz (D-D)', group: 'council', value: 38, district: 'District D', description: 'Third Ward, South Park, Sunnyside. Housing committee.' },
    { id: 'CC-Kamin', label: 'CM Abbie Kamin (At-Large 1)', group: 'council', value: 35, district: 'At-Large', description: 'Budget and fiscal affairs. Development oversight.' },
    { id: 'DEV-Hines', label: 'Hines Interests', group: 'developer', value: 48, description: 'Global developer HQ in Houston. $90B portfolio. Downtown, Uptown, Memorial projects.', flagged: true },
    { id: 'DEV-Camden', label: 'Camden Property Trust', group: 'developer', value: 42, description: 'REIT. 56,000+ units. Mass eviction filings. Corporate landlord.', flagged: true },
    { id: 'ZON-NoZoning', label: 'No Zoning Code (Deed Restrictions)', group: 'zoning', value: 35, description: 'Houston has NO zoning ordinance. Uses deed restrictions, minimum lot sizes, and parking requirements instead. Unique in major US cities.', flagged: true },
    { id: 'TEN-TexTenant', label: 'Texas Tenants Union (Houston)', group: 'tenant', value: 25, description: 'Tenant rights education, advocacy, and complaint assistance. Fights for stronger TX tenant laws.' },
    { id: 'LOB-HAA', label: 'Houston Apartment Assoc', group: 'lobby', value: 30, description: 'Landlord trade group. Opposes tenant protections. Lobbies state legislature against local rent regulation.', flagged: true },
  ],
  links: [
    { source: 'DEV-Hines', target: 'ZON-NoZoning', value: 25, label: 'Benefits from no zoning restrictions', type: 'exemption' },
    { source: 'DEV-Camden', target: 'TEN-TexTenant', value: 15, label: 'Mass eviction complaints', type: 'complaint' },
    { source: 'LOB-HAA', target: 'CC-Kamin', value: 12, label: 'Campaign contributions', type: 'funding' },
    { source: 'CC-Thomas', target: 'TEN-TexTenant', value: 10, label: 'Tenant advocacy support', type: 'lobbying' },
    { source: 'LOB-HAA', target: 'ZON-NoZoning', value: 18, label: 'Advocates against zoning adoption', type: 'lobbying' },
  ],
  anomalies: [
    { id: 1, type: 'No Zoning Exploitation', description: 'Houston lacks any zoning code — unique among major US cities. Developers exploit deed restriction loopholes. Industrial facilities placed next to residential without review.', severity: 'critical', relatedNodes: ['ZON-NoZoning', 'DEV-Hines'], centrality: 0.85 },
    { id: 2, type: 'REIT Mass Evictions', description: 'Camden Property Trust filed 3,200+ eviction cases in Harris County in 12 months. Corporate landlord pattern of filing before required notice period expires.', severity: 'high', relatedNodes: ['DEV-Camden', 'TEN-TexTenant'], centrality: 0.78 },
  ],
  statutes: [
    { id: 1, code: 'TX Prop Code § 92', title: 'Texas Property Code — Tenant Rights', description: 'Texas requires landlords to make diligent effort to repair conditions affecting health/safety after written notice. Tenant remedies include repair-and-deduct (if rent <$500/mo) or lease termination. No rent withholding right.', keywords: ['repair', 'habitability', 'health', 'safety', 'written notice'], relevanceScore: 92, source: 'Texas Property Code' },
    { id: 2, code: 'TX Prop Code § 92.331', title: 'Retaliation Ban (Texas)', description: 'Landlord may not retaliate within 6 months of tenant complaint to government agency, exercising legal rights, or participating in tenant organization.', keywords: ['retaliation', 'complaint', '6 months'], relevanceScore: 88, source: 'Texas Property Code' },
    { id: 3, code: 'TX Prop Code § 92.0081', title: 'Lockout Procedures', description: 'Texas uniquely allows landlord lockout for nonpayment IF lease permits it and landlord provides key within 2 hours between 8am-10pm. One of weakest tenant protections in US.', keywords: ['lockout', 'key', 'nonpayment'], relevanceScore: 90, source: 'Texas Property Code' },
    { id: 4, code: 'TX Prop Code § 92.104', title: 'Security Deposit Return (30 Days)', description: 'Landlord must return deposit within 30 days of move-out with written itemization. Bad faith retention: tenant may recover 3x wrongfully withheld amount plus $100 plus attorney fees.', keywords: ['deposit', '30 days', '3x damages', 'bad faith'], relevanceScore: 85, source: 'Texas Property Code' },
  ],
  hotspots: [
    { zipCode: '77033', neighborhood: 'South Park / Sunnyside', evictionRate: 28.5, recentCases: 340, trend: 'rising', lat: 29.680, lng: -95.332 },
    { zipCode: '77051', neighborhood: 'South Acres / Crestmont', evictionRate: 25.2, recentCases: 280, trend: 'rising', lat: 29.652, lng: -95.395 },
    { zipCode: '77026', neighborhood: 'Fifth Ward / Kashmere', evictionRate: 23.8, recentCases: 210, trend: 'stable', lat: 29.794, lng: -95.316 },
    { zipCode: '77004', neighborhood: 'Third Ward / Midtown', evictionRate: 18.4, recentCases: 195, trend: 'rising', lat: 29.724, lng: -95.359 },
    { zipCode: '77036', neighborhood: 'Gulfton / Sharpstown', evictionRate: 20.1, recentCases: 310, trend: 'stable', lat: 29.702, lng: -95.518 },
    { zipCode: '77076', neighborhood: 'Acres Homes / Inwood', evictionRate: 16.3, recentCases: 170, trend: 'stable', lat: 29.858, lng: -95.403 },
  ],
  stats: { totalEvictionsLogged: 31200, activeHotspots: 4, anomaliesDetected: 2, tenantsProtected: 28500, zoningExemptions: 0 },
});

// ── PHILADELPHIA ──
export const phillyData = makeCity({
  id: 'philly-pa', name: 'Philadelphia', state: 'Pennsylvania', mayor: 'Cherelle Parker', pop: 1550542, council: 'Philadelphia City Council (17 Members)',
  nodes: [
    { id: 'CC-Parker', label: 'Mayor Cherelle Parker', group: 'council', value: 48, district: 'Mayor', description: 'First Black woman mayor. Since 2024. Housing and public safety focus.' },
    { id: 'CC-Squilla', label: 'Mark Squilla (D1)', group: 'council', value: 38, district: 'District 1', description: 'South Philadelphia, Center City. Zoning committee. Pro-development moderate.' },
    { id: 'CC-Johnson', label: 'Kenyatta Johnson (D2)', group: 'council', value: 40, district: 'District 2', description: 'South/Southwest Philly. Indicted 2020 on fraud (acquitted). Development oversight controversy.', flagged: true },
    { id: 'DEV-Durst', label: 'Durst Organization', group: 'developer', value: 38, description: 'Major developer in Philadelphia market. Multi-family luxury.', flagged: false },
    { id: 'DEV-OCF', label: 'OCF Realty / Ori Feibush', group: 'developer', value: 35, description: 'South Philly gentrification developer. Point Breeze controversies. Displacing long-term Black residents.', flagged: true },
    { id: 'ZON-10Year', label: '10-Year Tax Abatement', group: 'zoning', value: 35, description: 'Philadelphia 10-year tax abatement on new construction. Subsidizes luxury development. Revenue loss $1.1B. Reformed 2023 but grandfathered existing.', flagged: true },
    { id: 'TEN-CLS', label: 'Community Legal Services', group: 'tenant', value: 28, description: 'Free legal help for tenants. Eviction defense. Right to Counsel program.' },
    { id: 'TEN-TURN', label: 'TURN (Tenants Union)', group: 'tenant', value: 22, description: 'Philadelphia tenants union. Organizing, advocacy, rent strike support.' },
  ],
  links: [
    { source: 'DEV-OCF', target: 'ZON-10Year', value: 20, label: 'Tax abatement beneficiary', type: 'exemption' },
    { source: 'CC-Johnson', target: 'DEV-OCF', value: 15, label: 'District 2 zoning approvals', type: 'vote' },
    { source: 'CC-Squilla', target: 'ZON-10Year', value: 12, label: 'Zoning committee oversight', type: 'vote' },
    { source: 'TEN-CLS', target: 'CC-Parker', value: 10, label: 'Right to Counsel advocacy', type: 'lobbying' },
    { source: 'DEV-OCF', target: 'TEN-TURN', value: 12, label: 'Community opposition', type: 'complaint' },
  ],
  anomalies: [
    { id: 1, type: 'Eviction Filing Capital', description: 'Philadelphia has one of highest eviction filing rates in US. 24,000+ evictions filed per year. Many filed as leverage — 40% result in default judgments because tenants cannot attend court.', severity: 'critical', relatedNodes: ['TEN-CLS'], centrality: 0.90 },
    { id: 2, type: 'Tax Abatement Revenue Loss', description: '10-year tax abatement cost Philadelphia $1.1B in foregone revenue. Primarily benefits luxury development. Reformed in 2023 but 60,000+ units grandfathered in.', severity: 'high', relatedNodes: ['ZON-10Year', 'DEV-OCF'], centrality: 0.78 },
  ],
  statutes: [
    { id: 1, code: '68 Pa.C.S. § 250.206', title: 'PA Implied Warranty of Habitability', description: 'Pennsylvania requires landlords to maintain premises in habitable condition. Tenant may withhold rent, repair-and-deduct, or terminate lease if conditions are dangerous.', keywords: ['habitability', 'repair', 'withhold', 'dangerous'], relevanceScore: 94, source: 'PA Consolidated Statutes' },
    { id: 2, code: '68 Pa.C.S. § 250.205', title: 'PA Retaliation Protection', description: 'Landlord may not retaliate for tenant complaints to government agencies. 6-month presumption of retaliation. Tenant may recover damages and attorney fees.', keywords: ['retaliation', 'complaint', '6 months'], relevanceScore: 90, source: 'PA Consolidated Statutes' },
    { id: 3, code: 'Phila. Code § 9-804', title: 'Philadelphia Right to Counsel', description: 'Philadelphia provides free legal representation to tenants facing eviction. Income-eligible (200% FPL). All ZIP codes covered since 2022.', keywords: ['right to counsel', 'free lawyer', 'eviction defense'], relevanceScore: 93, source: 'Philadelphia Code' },
    { id: 4, code: '68 Pa.C.S. § 250.512', title: 'PA Security Deposit (30 Days)', description: 'Deposit return within 30 days. First year: max 2 months rent. After: max 1 month. Itemized deductions required. Failure: 2x deposit penalty.', keywords: ['deposit', '30 days', '2x penalty', 'itemized'], relevanceScore: 85, source: 'PA Consolidated Statutes' },
  ],
  hotspots: [
    { zipCode: '19132', neighborhood: 'Strawberry Mansion / N Philly', evictionRate: 34.2, recentCases: 450, trend: 'rising', lat: 39.993, lng: -75.170 },
    { zipCode: '19134', neighborhood: 'Kensington / Port Richmond', evictionRate: 28.7, recentCases: 380, trend: 'rising', lat: 39.998, lng: -75.119 },
    { zipCode: '19140', neighborhood: 'Logan / Olney', evictionRate: 25.4, recentCases: 310, trend: 'stable', lat: 40.035, lng: -75.143 },
    { zipCode: '19143', neighborhood: 'SW Philadelphia', evictionRate: 22.8, recentCases: 275, trend: 'rising', lat: 39.944, lng: -75.226 },
    { zipCode: '19121', neighborhood: 'North Central / Brewerytown', evictionRate: 20.1, recentCases: 195, trend: 'stable', lat: 39.978, lng: -75.175 },
    { zipCode: '19145', neighborhood: 'Point Breeze / Grays Ferry', evictionRate: 17.5, recentCases: 160, trend: 'rising', lat: 39.925, lng: -75.185 },
  ],
  stats: { totalEvictionsLogged: 24200, activeHotspots: 4, anomaliesDetected: 2, tenantsProtected: 35800, zoningExemptions: 62 },
});

// Helper to create compact city entries for the remaining cities
function quickCity(id: string, name: string, state: string, mayor: string, pop: number, council: string,
  devNames: string[], tenantOrg: string, keyStatute: string, statuteDesc: string, hotspotData: CityData['hotspots'],
  anomalyDesc: string, evictions: number, protected_: number): CityData {
  const nodes: CityData['nodes'] = [
    { id: `CC-Mayor-${id}`, label: `Mayor ${mayor}`, group: 'council', value: 48, district: 'Mayor', description: `Mayor of ${name}. Key housing policy decisions.` },
    { id: `CC-1-${id}`, label: `Council President`, group: 'council', value: 40, district: 'President', description: `${council} President. Legislative agenda control.` },
    { id: `CC-2-${id}`, label: `Housing Committee Chair`, group: 'council', value: 36, district: 'Committee', description: `Housing and zoning committee chair. Development oversight.` },
    ...devNames.map((d, i) => ({ id: `DEV-${i}-${id}`, label: d, group: 'developer' as const, value: 42 - i * 5, description: `Major ${name} developer/landlord. Active in local market.`, flagged: i === 0 })),
    { id: `ZON-1-${id}`, label: `${name} Zoning Board`, group: 'agency' as const, value: 30, description: `Zoning and land use review body for ${name}.` },
    { id: `ZON-2-${id}`, label: `Key Zoning Action`, group: 'zoning' as const, value: 25, description: `Major recent zoning/development decision in ${name}.`, flagged: true },
    { id: `TEN-1-${id}`, label: tenantOrg, group: 'tenant' as const, value: 28, description: `Primary tenant rights organization in ${name}.` },
    { id: `LOB-1-${id}`, label: `${name} Real Estate Board`, group: 'lobby' as const, value: 25, description: `Real estate industry lobby for ${name} metro area.`, flagged: true },
  ];
  const links: CityData['links'] = [
    { source: `DEV-0-${id}`, target: `ZON-2-${id}`, value: 25, label: 'Primary beneficiary', type: 'exemption' },
    { source: `DEV-0-${id}`, target: `ZON-1-${id}`, value: 18, label: 'Variance requests', type: 'exemption' },
    { source: `LOB-1-${id}`, target: `CC-1-${id}`, value: 12, label: 'Campaign funding', type: 'funding' },
    { source: `LOB-1-${id}`, target: `DEV-0-${id}`, value: 14, label: 'Industry membership', type: 'lobbying' },
    { source: `CC-2-${id}`, target: `ZON-1-${id}`, value: 10, label: 'Committee oversight', type: 'vote' },
    { source: `TEN-1-${id}`, target: `CC-2-${id}`, value: 8, label: 'Housing advocacy', type: 'lobbying' },
    { source: `CC-Mayor-${id}`, target: `ZON-1-${id}`, value: 15, label: 'Executive oversight', type: 'vote' },
    { source: `DEV-0-${id}`, target: `TEN-1-${id}`, value: 10, label: 'Tenant complaints filed', type: 'complaint' },
  ];
  if (devNames.length > 1) links.push({ source: `DEV-1-${id}`, target: `ZON-1-${id}`, value: 12, label: 'Development approvals', type: 'exemption' });
  const anomalies: CityData['anomalies'] = [
    { id: 1, type: 'Institutional Pattern', description: anomalyDesc, severity: 'high', relatedNodes: [`DEV-0-${id}`, `ZON-2-${id}`, `CC-1-${id}`], centrality: 0.80 },
    { id: 2, type: 'Eviction Surge', description: `${name} eviction filings concentrated in low-income neighborhoods. Corporate landlords account for disproportionate share of filings. Community displacement accelerating.`, severity: 'high', relatedNodes: [`DEV-0-${id}`, `TEN-1-${id}`], centrality: 0.72 },
  ];
  const statutes: CityData['statutes'] = [
    { id: 1, code: keyStatute, title: `${name} Tenant Protection`, description: statuteDesc, keywords: ['habitability', 'eviction', 'tenant'], relevanceScore: 94, source: `${state} Law` },
    { id: 2, code: `${state} Retaliation Ban`, title: 'Retaliation Protection', description: `${state} prohibits landlord retaliation for tenant complaints, code enforcement reports, or exercising legal rights. Presumption of retaliation applies after protected activity.`, keywords: ['retaliation', 'complaint', 'protection'], relevanceScore: 90, source: `${state} State Law` },
    { id: 3, code: `${state} Lockout Ban`, title: 'Illegal Eviction / Self-Help Ban', description: `Self-help eviction is illegal in ${state}. Landlord may not change locks, shut off utilities, or remove belongings without court order. Damages and penalties apply.`, keywords: ['lockout', 'self-help', 'illegal', 'utilities'], relevanceScore: 92, source: `${state} State Law` },
    { id: 4, code: `${state} Deposit Law`, title: 'Security Deposit Return', description: `${state} requires return of security deposit within statutory deadline with itemized statement of deductions. Penalties for landlord non-compliance.`, keywords: ['deposit', 'return', 'itemized', 'penalty'], relevanceScore: 85, source: `${state} State Law` },
  ];
  return { id, name, state, mayor, population: pop, councilName: council, nodes, links, anomalies, statutes, hotspots: hotspotData,
    stats: { totalEvictionsLogged: evictions, activeHotspots: hotspotData.filter(h => h.trend === 'rising').length, anomaliesDetected: 2, tenantsProtected: protected_, zoningExemptions: Math.floor(Math.random() * 80) + 20 } };
}

export const phoenixData = quickCity('phoenix-az', 'Phoenix', 'Arizona', 'Kate Gallego', 1608139, 'Phoenix City Council (8 Districts)',
  ['Taylor Morrison', 'Meritage Homes'], 'Community Legal Services AZ', 'ARS § 33-1324', 'Arizona landlord must maintain fit premises. Tenant may give written notice and terminate if not repaired in 10 days (5 days for A/C in summer).',
  [{ zipCode: '85009', neighborhood: 'Maryvale', evictionRate: 24.1, recentCases: 290, trend: 'rising', lat: 33.452, lng: -112.131 },
   { zipCode: '85017', neighborhood: 'Alhambra', evictionRate: 20.5, recentCases: 215, trend: 'rising', lat: 33.509, lng: -112.112 },
   { zipCode: '85033', neighborhood: 'West Phoenix', evictionRate: 22.8, recentCases: 260, trend: 'stable', lat: 33.476, lng: -112.182 },
   { zipCode: '85040', neighborhood: 'South Mountain', evictionRate: 19.2, recentCases: 185, trend: 'stable', lat: 33.396, lng: -112.017 },
   { zipCode: '85051', neighborhood: 'Sunnyslope', evictionRate: 17.6, recentCases: 150, trend: 'stable', lat: 33.562, lng: -112.096 },
   { zipCode: '85015', neighborhood: 'Central Phoenix', evictionRate: 14.3, recentCases: 120, trend: 'declining', lat: 33.505, lng: -112.082 }],
  'Phoenix has no rent control (banned by AZ state law). Developers receive fast-track permitting while tenant protections remain among weakest in nation.', 16800, 22100);

export const sanAntonioData = quickCity('sanantonio-tx', 'San Antonio', 'Texas', 'Ron Nirenberg', 1434625, 'San Antonio City Council (10 Districts)',
  ['NRP Group', 'Embrey Partners'], 'Texas RioGrande Legal Aid', 'TX Prop Code § 92', 'Texas requires landlords to repair conditions affecting health/safety after written notice. Tenant remedies limited. No rent withholding. Lockout allowed with restrictions.',
  [{ zipCode: '78207', neighborhood: 'West Side', evictionRate: 26.4, recentCases: 310, trend: 'rising', lat: 29.423, lng: -98.528 },
   { zipCode: '78228', neighborhood: 'Lackland Terrace', evictionRate: 22.1, recentCases: 240, trend: 'stable', lat: 29.459, lng: -98.575 },
   { zipCode: '78211', neighborhood: 'South Side', evictionRate: 20.8, recentCases: 215, trend: 'rising', lat: 29.372, lng: -98.528 },
   { zipCode: '78237', neighborhood: 'Kelly / Edgewood', evictionRate: 19.5, recentCases: 180, trend: 'stable', lat: 29.413, lng: -98.589 },
   { zipCode: '78202', neighborhood: 'East Side / Denver Heights', evictionRate: 18.2, recentCases: 160, trend: 'stable', lat: 29.431, lng: -98.469 }],
  'NRP Group received $48M in tax incentives for luxury-adjacent development in gentrifying East Side neighborhoods.', 14500, 18200);

export const sanDiegoData = quickCity('sandiego-ca', 'San Diego', 'California', 'Todd Gloria', 1381611, 'San Diego City Council (9 Districts)',
  ['Lennar Corp', 'Shea Homes SD'], 'Legal Aid Society of San Diego', 'CA Civil Code § 1946.2', 'California Tenant Protection Act (AB 1482): Rent cap 5%+CPI (max 10%). Just cause eviction required for tenancies 12+ months. Relocation assistance for no-fault.',
  [{ zipCode: '92113', neighborhood: 'Logan Heights / Barrio Logan', evictionRate: 22.6, recentCases: 195, trend: 'rising', lat: 32.688, lng: -117.123 },
   { zipCode: '92102', neighborhood: 'City Heights / Fairmount', evictionRate: 19.8, recentCases: 175, trend: 'stable', lat: 32.720, lng: -117.108 },
   { zipCode: '92114', neighborhood: 'Encanto / Emerald Hills', evictionRate: 18.4, recentCases: 160, trend: 'stable', lat: 32.693, lng: -117.065 },
   { zipCode: '92104', neighborhood: 'North Park / University Hts', evictionRate: 14.2, recentCases: 120, trend: 'stable', lat: 32.748, lng: -117.119 },
   { zipCode: '92105', neighborhood: 'City Heights East', evictionRate: 16.7, recentCases: 145, trend: 'rising', lat: 32.742, lng: -117.089 }],
  'Lennar Corp received density bonuses near transit without adequate affordable unit requirements. Displacement in Logan Heights accelerating.', 8900, 15400);

export const dallasData = quickCity('dallas-tx', 'Dallas', 'Texas', 'Eric Johnson (Ind.)', 1299544, 'Dallas City Council (14 Districts)',
  ['Lincoln Property Co', 'Trammell Crow'], 'Legal Aid of NorthWest Texas', 'TX Prop Code § 92', 'Texas: Landlord must repair after written notice. No rent withholding. Lockout permitted with restrictions. 3-day notice for nonpayment. Weak statewide tenant protections.',
  [{ zipCode: '75215', neighborhood: 'South Dallas / Fair Park', evictionRate: 30.2, recentCases: 320, trend: 'rising', lat: 32.754, lng: -96.759 },
   { zipCode: '75216', neighborhood: 'Cedar Crest / Singing Hills', evictionRate: 27.8, recentCases: 285, trend: 'rising', lat: 32.718, lng: -96.788 },
   { zipCode: '75210', neighborhood: 'South Dallas / Bonton', evictionRate: 25.4, recentCases: 210, trend: 'stable', lat: 32.755, lng: -96.740 },
   { zipCode: '75227', neighborhood: 'Pleasant Grove', evictionRate: 22.1, recentCases: 280, trend: 'rising', lat: 32.740, lng: -96.680 },
   { zipCode: '75203', neighborhood: 'Oak Cliff / Beckley', evictionRate: 19.6, recentCases: 190, trend: 'stable', lat: 32.760, lng: -96.825 }],
  'Lincoln Property Co received $75M in tax abatements for luxury office/residential projects while surrounding neighborhoods face displacement.', 22400, 19800);

export const austinData = quickCity('austin-tx', 'Austin', 'Texas', 'Kirk Watson', 979882, 'Austin City Council (10 Districts)',
  ['Endeavor Real Estate', 'Natiivo Austin'], 'Austin Tenants Council', 'TX Prop Code § 92', 'Texas: Limited tenant protections. No rent control (banned by state). Landlord must repair after written notice. 3-day nonpayment notice. Lockout permitted under lease.',
  [{ zipCode: '78741', neighborhood: 'East Riverside / Oltorf', evictionRate: 22.4, recentCases: 210, trend: 'rising', lat: 30.233, lng: -97.722 },
   { zipCode: '78753', neighborhood: 'North Austin / Rundberg', evictionRate: 19.8, recentCases: 185, trend: 'stable', lat: 30.381, lng: -97.685 },
   { zipCode: '78702', neighborhood: 'East Austin', evictionRate: 16.5, recentCases: 120, trend: 'rising', lat: 30.263, lng: -97.715 },
   { zipCode: '78758', neighborhood: 'North Lamar / Braker', evictionRate: 15.2, recentCases: 140, trend: 'stable', lat: 30.392, lng: -97.712 },
   { zipCode: '78745', neighborhood: 'South Austin / Manchaca', evictionRate: 12.8, recentCases: 110, trend: 'declining', lat: 30.206, lng: -97.793 }],
  'East Austin gentrification accelerating. Endeavor Real Estate mega-developments displacing historically Black and Latino communities. Domain-style projects prioritized.', 7800, 12500);

export const detroitData = quickCity('detroit-mi', 'Detroit', 'Michigan', 'Mike Duggan', 633218, 'Detroit City Council (9 Members)',
  ['Bedrock (Dan Gilbert)', 'Olympia Development'], 'Michigan Legal Help / United Community Housing', 'MCL § 554.139', 'Michigan: Implied warranty of habitability. Landlord must maintain fit premises. Tenant may withhold rent after notice. 7-day notice for nonpayment.',
  [{ zipCode: '48205', neighborhood: 'East Side / Conner', evictionRate: 32.8, recentCases: 280, trend: 'rising', lat: 42.432, lng: -82.984 },
   { zipCode: '48235', neighborhood: 'Brightmoor / Old Redford', evictionRate: 28.4, recentCases: 230, trend: 'rising', lat: 42.397, lng: -83.250 },
   { zipCode: '48228', neighborhood: 'West Side / Warrendale', evictionRate: 24.6, recentCases: 210, trend: 'stable', lat: 42.352, lng: -83.215 },
   { zipCode: '48213', neighborhood: 'East English Village', evictionRate: 20.1, recentCases: 165, trend: 'stable', lat: 42.410, lng: -83.020 },
   { zipCode: '48238', neighborhood: 'NW Detroit / Russel Woods', evictionRate: 22.3, recentCases: 180, trend: 'rising', lat: 42.387, lng: -83.147 }],
  'Bedrock (Dan Gilbert) controls 100+ downtown properties. $2.1B in public subsidies. Tax foreclosure crisis displaces 30,000+ residents annually.', 15600, 18900);

export const sfData = quickCity('sf-ca', 'San Francisco', 'California', 'Daniel Lurie', 808988, 'SF Board of Supervisors (11 Members)',
  ['Forest City Realty', 'Veritas Investments SF'], 'SF Tenants Union', 'SF Rent Ordinance § 37', 'SF Rent Ordinance: Covers units built before 1979. Annual increases set by Rent Board (60% of CPI). Just cause eviction. Ellis Act allows withdrawal of all units. Strong local protections.',
  [{ zipCode: '94110', neighborhood: 'Mission District', evictionRate: 18.4, recentCases: 165, trend: 'rising', lat: 37.749, lng: -122.415 },
   { zipCode: '94102', neighborhood: 'Tenderloin', evictionRate: 28.5, recentCases: 210, trend: 'rising', lat: 37.782, lng: -122.413 },
   { zipCode: '94103', neighborhood: 'SoMa / South Beach', evictionRate: 15.2, recentCases: 120, trend: 'stable', lat: 37.772, lng: -122.410 },
   { zipCode: '94112', neighborhood: 'Outer Mission / Excelsior', evictionRate: 14.8, recentCases: 135, trend: 'stable', lat: 37.721, lng: -122.441 },
   { zipCode: '94124', neighborhood: 'Bayview-Hunters Point', evictionRate: 20.1, recentCases: 155, trend: 'rising', lat: 37.729, lng: -122.382 }],
  'Veritas Investments SF used serial Ellis Act evictions to pull 200+ rent-controlled units off market. Converted to luxury. Displacement of long-term Mission District residents.', 6200, 14800);

export const seattleData = quickCity('seattle-wa', 'Seattle', 'Washington', 'Bruce Harrell', 733919, 'Seattle City Council (7 Districts + 2 At-Large)',
  ['Vulcan Real Estate (Paul Allen)', 'Greystar Real Estate'], 'Tenants Union of WA State', 'RCW § 59.18', 'WA Residential Landlord-Tenant Act: 14-day notice for nonpayment. 10-day for lease violation. Just Cause Eviction Ordinance (Seattle). 60-day notice for rent increases 10%+.',
  [{ zipCode: '98118', neighborhood: 'Rainier Beach / Columbia City', evictionRate: 18.2, recentCases: 165, trend: 'rising', lat: 47.538, lng: -122.268 },
   { zipCode: '98108', neighborhood: 'Georgetown / South Park', evictionRate: 15.8, recentCases: 120, trend: 'stable', lat: 47.537, lng: -122.316 },
   { zipCode: '98104', neighborhood: 'Downtown / Pioneer Square', evictionRate: 22.4, recentCases: 145, trend: 'rising', lat: 47.603, lng: -122.330 },
   { zipCode: '98144', neighborhood: 'Beacon Hill / Intl District', evictionRate: 16.1, recentCases: 130, trend: 'stable', lat: 47.579, lng: -122.305 },
   { zipCode: '98133', neighborhood: 'Bitter Lake / Broadview', evictionRate: 12.5, recentCases: 90, trend: 'declining', lat: 47.738, lng: -122.346 }],
  'Vulcan Real Estate (Paul Allen estate) controls South Lake Union development. $3B+ in city incentives. Amazon campus rezoning displaced small businesses and affordable housing.', 5800, 16200);

export const denverData = quickCity('denver-co', 'Denver', 'Colorado', 'Mike Johnston', 711463, 'Denver City Council (13 Districts)',
  ['Revesco Properties', 'McWhinney'], 'Colorado Legal Services', 'CRS § 38-12-503', 'Colorado: Implied warranty of habitability. 10-day notice for nonpayment. Landlord must maintain. No rent control statewide. Denver exploring local protections. 2023 tenant protection laws strengthened.',
  [{ zipCode: '80219', neighborhood: 'Westwood / Athmar Park', evictionRate: 22.8, recentCases: 195, trend: 'rising', lat: 39.688, lng: -105.027 },
   { zipCode: '80204', neighborhood: 'West Colfax / Sun Valley', evictionRate: 19.5, recentCases: 170, trend: 'rising', lat: 39.738, lng: -105.020 },
   { zipCode: '80239', neighborhood: 'Green Valley Ranch', evictionRate: 17.2, recentCases: 150, trend: 'stable', lat: 39.811, lng: -104.843 },
   { zipCode: '80249', neighborhood: 'Gateway / DIA area', evictionRate: 15.8, recentCases: 120, trend: 'stable', lat: 39.777, lng: -104.812 },
   { zipCode: '80205', neighborhood: 'Five Points / RiNo', evictionRate: 14.1, recentCases: 105, trend: 'rising', lat: 39.764, lng: -104.966 }],
  'RiNo (River North Art District) rezoning benefited Revesco Properties while displacing long-term Latino and Black residents from historically affordable neighborhoods.', 8400, 13600);

export const dcData = quickCity('dc', 'Washington', 'District of Columbia', 'Muriel Bowser', 671803, 'DC Council (13 Members)',
  ['JBG SMITH', 'Bozzuto Group'], 'Legal Aid DC / Bread for the City', 'DC Code § 42-3505', 'DC Tenant Opportunity to Purchase Act (TOPA): Tenants have right of first refusal when building is sold. Rent control for buildings built before 1976. Strong eviction protections.',
  [{ zipCode: '20019', neighborhood: 'Deanwood / Capitol View', evictionRate: 26.4, recentCases: 220, trend: 'rising', lat: 38.889, lng: -76.938 },
   { zipCode: '20020', neighborhood: 'Anacostia / Congress Heights', evictionRate: 24.8, recentCases: 210, trend: 'rising', lat: 38.857, lng: -76.977 },
   { zipCode: '20002', neighborhood: 'H Street / Trinidad', evictionRate: 16.5, recentCases: 145, trend: 'stable', lat: 38.902, lng: -76.982 },
   { zipCode: '20032', neighborhood: 'Congress Heights SE', evictionRate: 22.1, recentCases: 180, trend: 'stable', lat: 38.834, lng: -76.999 },
   { zipCode: '20009', neighborhood: 'Adams Morgan / Columbia Hts', evictionRate: 12.8, recentCases: 95, trend: 'declining', lat: 38.919, lng: -77.037 }],
  'JBG SMITH received $1.2B in Amazon HQ2 incentives for National Landing. Surrounding neighborhoods experienced 40% rent increases. TOPA rights circumvented through LLC transfers.', 7600, 15800);

export const bostonData = quickCity('boston-ma', 'Boston', 'Massachusetts', 'Michelle Wu', 654776, 'Boston City Council (13 Members)',
  ['Related Beal', 'Samuels & Associates'], 'Greater Boston Legal Services', 'MGL c.239 § 8A', 'Massachusetts: Implied warranty of habitability. Rent withholding after notice. 14-day notice for nonpayment. Retaliation ban (6 months). Boston exploring rent stabilization.',
  [{ zipCode: '02121', neighborhood: 'Dorchester / Grove Hall', evictionRate: 22.4, recentCases: 195, trend: 'rising', lat: 42.305, lng: -71.084 },
   { zipCode: '02119', neighborhood: 'Roxbury', evictionRate: 20.8, recentCases: 175, trend: 'stable', lat: 42.323, lng: -71.090 },
   { zipCode: '02125', neighborhood: 'Dorchester / Upham Corner', evictionRate: 18.5, recentCases: 160, trend: 'stable', lat: 42.311, lng: -71.059 },
   { zipCode: '02128', neighborhood: 'East Boston', evictionRate: 16.2, recentCases: 130, trend: 'rising', lat: 42.376, lng: -71.035 },
   { zipCode: '02124', neighborhood: 'Dorchester / Codman Square', evictionRate: 19.1, recentCases: 170, trend: 'stable', lat: 42.287, lng: -71.068 }],
  'Mayor Wu proposed rent stabilization but blocked by MA state law (requires home rule petition). Related Beal Seaport development received $850M in public subsidies.', 6800, 14200);

export const nashvilleData = quickCity('nashville-tn', 'Nashville', 'Tennessee', 'Freddie O\'Connell', 683622, 'Metro Nashville Council (40 Districts)',
  ['Giarratana LLC', 'Bristol Development'], 'Legal Aid Society of Middle TN', 'TN Code § 66-28-304', 'Tennessee: 14-day notice for nonpayment. No implied warranty of habitability for single-family. Landlord must maintain multi-family in safe condition. No rent control allowed by state.',
  [{ zipCode: '37208', neighborhood: 'North Nashville / Germantown', evictionRate: 24.8, recentCases: 210, trend: 'rising', lat: 36.185, lng: -86.799 },
   { zipCode: '37207', neighborhood: 'East Nashville / Cleveland Park', evictionRate: 20.2, recentCases: 175, trend: 'stable', lat: 36.205, lng: -86.758 },
   { zipCode: '37210', neighborhood: 'South Nashville / Woodbine', evictionRate: 18.5, recentCases: 160, trend: 'rising', lat: 36.123, lng: -86.752 },
   { zipCode: '37115', neighborhood: 'Madison', evictionRate: 22.4, recentCases: 195, trend: 'rising', lat: 36.262, lng: -86.708 },
   { zipCode: '37013', neighborhood: 'Antioch', evictionRate: 19.8, recentCases: 285, trend: 'stable', lat: 36.061, lng: -86.672 }],
  'North Nashville gentrification: Giarratana luxury towers displacing historically Black communities. $200M in tax incentives for downtown development while surrounding neighborhoods face displacement.', 11200, 10800);

export const miamiData = quickCity('miami-fl', 'Miami', 'Florida', 'Francis Suarez', 449514, 'Miami City Commission (5 Districts)',
  ['Related Group (Jorge Pérez)', 'Swerdlow Group'], 'Legal Services of Greater Miami', 'FL Stat § 83.51', 'Florida: 7-day notice for nonpayment (3 if demanded). Landlord must maintain premises. No rent control (banned by FL law). Very weak tenant protections. No just cause eviction.',
  [{ zipCode: '33142', neighborhood: 'Allapattah', evictionRate: 28.4, recentCases: 240, trend: 'rising', lat: 25.809, lng: -80.231 },
   { zipCode: '33150', neighborhood: 'Liberty City', evictionRate: 32.1, recentCases: 280, trend: 'rising', lat: 25.835, lng: -80.213 },
   { zipCode: '33127', neighborhood: 'Wynwood / Overtown', evictionRate: 24.6, recentCases: 195, trend: 'rising', lat: 25.808, lng: -80.200 },
   { zipCode: '33125', neighborhood: 'Little Havana', evictionRate: 20.8, recentCases: 175, trend: 'stable', lat: 25.771, lng: -80.230 },
   { zipCode: '33147', neighborhood: 'Brownsville / Model City', evictionRate: 26.2, recentCases: 210, trend: 'rising', lat: 25.851, lng: -80.240 }],
  'Related Group (Jorge Pérez) dominates Miami luxury condo market. $500M+ in city incentives. Climate gentrification pushing low-income residents out of higher-elevation neighborhoods.', 9800, 8600);

export const atlData = quickCity('atl-ga', 'Atlanta', 'Georgia', 'Andre Dickens', 499127, 'Atlanta City Council (12 Districts + 3 At-Large)',
  ['Cousins Properties', 'Portman Holdings'], 'Atlanta Legal Aid Society', 'GA Code § 44-7-14', 'Georgia: Landlord must keep premises in repair. 60-day notice for lease termination. No rent control. Eviction through dispossessory proceeding. Weak tenant protections.',
  [{ zipCode: '30310', neighborhood: 'West End / Adair Park', evictionRate: 26.5, recentCases: 220, trend: 'rising', lat: 33.732, lng: -84.424 },
   { zipCode: '30314', neighborhood: 'Vine City / English Avenue', evictionRate: 30.2, recentCases: 250, trend: 'rising', lat: 33.761, lng: -84.423 },
   { zipCode: '30318', neighborhood: 'Bankhead / West Midtown', evictionRate: 22.8, recentCases: 190, trend: 'rising', lat: 33.788, lng: -84.443 },
   { zipCode: '30315', neighborhood: 'Pittsburgh / Mechanicsville', evictionRate: 24.1, recentCases: 200, trend: 'stable', lat: 33.720, lng: -84.397 },
   { zipCode: '30312', neighborhood: 'Grant Park / Summerhill', evictionRate: 16.4, recentCases: 130, trend: 'stable', lat: 33.739, lng: -84.375 }],
  'BeltLine development displacing long-term Black residents. Cousins Properties received $170M in incentives for Midtown towers while surrounding neighborhoods lose affordable housing.', 13400, 12200);

export const minneapolisData = quickCity('mpls-mn', 'Minneapolis', 'Minnesota', 'Jacob Frey', 425336, 'Minneapolis City Council (13 Wards)',
  ['United Properties', 'Schafer Richardson'], 'HOME Line (MN Tenant Hotline)', 'MN Stat § 504B', 'Minnesota: 14-day notice for nonpayment. Implied covenant of habitability. Rent escrow remedy — tenant can pay rent to court while landlord repairs. Strong municipal tenant protections in Minneapolis.',
  [{ zipCode: '55411', neighborhood: 'Near North / Harrison', evictionRate: 28.4, recentCases: 210, trend: 'rising', lat: 44.999, lng: -93.302 },
   { zipCode: '55412', neighborhood: 'Camden / Folwell', evictionRate: 22.6, recentCases: 175, trend: 'stable', lat: 45.025, lng: -93.300 },
   { zipCode: '55404', neighborhood: 'Phillips / Midtown', evictionRate: 20.1, recentCases: 160, trend: 'stable', lat: 44.961, lng: -93.261 },
   { zipCode: '55407', neighborhood: 'Powderhorn / Corcoran', evictionRate: 16.8, recentCases: 130, trend: 'stable', lat: 44.940, lng: -93.244 },
   { zipCode: '55418', neighborhood: 'NE Minneapolis', evictionRate: 12.4, recentCases: 85, trend: 'declining', lat: 45.005, lng: -93.249 }],
  'United Properties received $120M in TIF for North Loop luxury development while Near North neighborhood (75% Black) faces 28/1K eviction rate.', 5200, 11800);

export const portlandData = quickCity('portland-or', 'Portland', 'Oregon', 'Keith Wilson', 635067, 'Portland City Council (4 Districts)',
  ['Prometheus Real Estate Group', 'Killian Pacific'], 'Oregon Law Center / Community Alliance of Tenants', 'ORS § 90.360', 'Oregon: 90-day no-cause notice required (10-day for cause). Rent increase cap: 7%+CPI (max 10%). Just cause eviction statewide (SB 608). Relocation assistance for no-fault evictions.',
  [{ zipCode: '97233', neighborhood: 'Gateway / East Portland', evictionRate: 22.4, recentCases: 195, trend: 'rising', lat: 45.513, lng: -122.499 },
   { zipCode: '97266', neighborhood: 'Lents', evictionRate: 19.8, recentCases: 165, trend: 'stable', lat: 45.479, lng: -122.565 },
   { zipCode: '97220', neighborhood: 'Parkrose / Argay', evictionRate: 18.1, recentCases: 150, trend: 'stable', lat: 45.547, lng: -122.535 },
   { zipCode: '97236', neighborhood: 'Pleasant Valley', evictionRate: 16.5, recentCases: 130, trend: 'stable', lat: 45.470, lng: -122.508 },
   { zipCode: '97217', neighborhood: 'Kenton / St. Johns', evictionRate: 14.2, recentCases: 110, trend: 'declining', lat: 45.585, lng: -122.694 }],
  'East Portland displacement: 82% of no-fault evictions concentrated east of 82nd Ave. Corporate landlords exploit 90-day notice period to cycle through tenants for rent resets.', 6100, 13400);
