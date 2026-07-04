import type { CityData } from '../cityData';

export const nycData: CityData = {
  id: 'nyc-ny',
  name: 'New York City',
  state: 'New York',
  mayor: 'Eric Adams',
  population: 8258035,
  councilName: 'New York City Council (51 Members)',

  nodes: [
    // — KEY COUNCIL MEMBERS (Real NYC Council 2026) —
    { id: 'CC-Menin', label: 'Speaker Julie Menin', group: 'council', value: 55, district: 'District 5 (Upper East Side)', description: 'Speaker of the City Council since Jan 2026. East Midtown, Turtle Bay, UES, Yorkville. Controls legislative agenda and committee assignments.', flagged: true },
    { id: 'CC-Abreu', label: 'Shaun Abreu', group: 'council', value: 45, district: 'District 7 (Upper West Side / Harlem)', description: 'Majority Leader since Jan 2026. UWS, Manhattan Valley, Morningside Heights, Hamilton Heights, Washington Heights.', flagged: false },
    { id: 'CC-Williams', label: 'Nantasha Williams', group: 'council', value: 42, district: 'District 27 (SE Queens)', description: 'Deputy Speaker since Jan 2026. Jamaica, Springfield Gardens, St. Albans, Hollis, Queens Village, Cambria Heights.', flagged: false },
    { id: 'CC-Marte', label: 'Christopher Marte', group: 'council', value: 38, district: 'District 1 (Lower Manhattan)', description: 'FiDi, Tribeca, SoHo, Chinatown, Lower East Side. Two Bridges supertall controversy. Anti-displacement advocate.', flagged: true },
    { id: 'CC-Brewer', label: 'Gale Brewer', group: 'council', value: 40, district: 'District 6 (West Midtown / UWS)', description: "Hell's Kitchen, Times Square, Lincoln Square, Central Park. Former Manhattan Borough President. Land-use watchdog.", flagged: false },
    { id: 'CC-Salaam', label: 'Yusef Salaam', group: 'council', value: 36, district: 'District 9 (Central Harlem)', description: 'Central Harlem, Manhattanville, Morningside Heights. Exoneree of the Central Park Five. Focus on housing justice.', flagged: false },
    { id: 'CC-Caban', label: 'Tiffany Cabán', group: 'council', value: 38, district: 'District 22 (Astoria / Jackson Heights)', description: 'Astoria, Woodside, Jackson Heights. Progressive. DSA-backed. Anti-displacement, pro-tenant organizing.', flagged: false },
    { id: 'CC-Gutierrez', label: 'Jennifer Gutiérrez', group: 'council', value: 35, district: 'District 34 (Williamsburg / Bushwick)', description: 'Williamsburg, Bushwick, Ridgewood. Rezoning battles. Gentrification frontline district.', flagged: true },
    { id: 'CC-Sanchez', label: 'Pierina Sanchez', group: 'council', value: 34, district: 'District 14 (W Bronx)', description: 'University Heights, Morris Heights, Fordham. Chair of Housing committee (prev). Anti-displacement focus.', flagged: false },
    { id: 'CC-Carr', label: 'David Carr', group: 'council', value: 30, district: 'District 50 (Staten Island)', description: 'Minority Leader (Republican). Mid-Island Staten Island. Pro-development, anti-regulation stance.', flagged: false },

    // — DEVELOPERS & PROPERTY COMPANIES —
    { id: 'DEV-Related', label: 'Related Companies', group: 'developer', value: 58, description: 'Largest private developer in NYC. Hudson Yards ($25B). Stephen Ross, chairman. Major political donor. Luxury + affordable portfolio.', flagged: true },
    { id: 'DEV-Extell', label: 'Extell Development', group: 'developer', value: 50, description: 'Gary Barnett, founder. Supertall luxury towers. 50 West 66th St (775ft, 198ft mechanical void controversy). One57. Central Park Tower. 5th Ave rezoning application.', flagged: true },
    { id: 'DEV-SLGreen', label: 'SL Green Realty', group: 'developer', value: 45, description: "NYC's largest office landlord. One Vanderbilt. Midtown East rezoning beneficiary. Major political contributor.", flagged: false },
    { id: 'DEV-TwoBridges', label: 'Two Bridges Developers (JDS/Starrett/CIM)', group: 'developer', value: 42, description: '3 supertalls (1,008ft, 798ft, 728ft) approved as "minor modifications" in low-rise Two Bridges neighborhood. Court ordered full ULURP review.', flagged: true },
    { id: 'DEV-Brookfield', label: 'Brookfield Properties', group: 'developer', value: 40, description: 'Manhattan West, Greenpoint Landing. Canadian-based. Large-scale mixed-use. 421-a tax exemption beneficiary.', flagged: false },
    { id: 'DEV-Kushner', label: 'Kushner Companies', group: 'shell', value: 35, description: 'Jared Kushner family company. History of tenant harassment complaints. Multiple HPD violations. East Village, Williamsburg properties.', flagged: true },
    { id: 'DEV-Pinnacle', label: 'Pinnacle City Living', group: 'shell', value: 28, description: 'Property management firm. Multiple tenant harassment lawsuits. Accused of using construction to force out rent-stabilized tenants.', flagged: true },

    // — ZONING & GOVERNMENT BODIES —
    { id: 'ZON-CPC', label: 'City Planning Commission', group: 'agency', value: 40, description: 'Daniel Garodnick, Chair (2022–present). Approves rezonings. Criticized for developer capture. Two Bridges "minor modification" controversy.', flagged: true },
    { id: 'ZON-BSA', label: 'Board of Standards & Appeals', group: 'agency', value: 35, description: 'Grants zoning variances. Approved Extell mechanical void. 200 Amsterdam illegal lot assemblage. Developer-friendly pattern.', flagged: true },
    { id: 'ZON-HudsonYards', label: 'Rezoning: Hudson Yards', group: 'zoning', value: 30, description: '2005 rezoning. $6B in public subsidies. Tax-free financing via PILOT. Related Companies primary beneficiary. Displacement of Hells Kitchen tenants.', flagged: true },
    { id: 'ZON-MidtownEast', label: 'Rezoning: Greater East Midtown', group: 'zoning', value: 28, description: '2017 rezoning allowing taller office towers around Grand Central. Landmark air rights transfers. SL Green One Vanderbilt.', flagged: false },
    { id: 'ZON-TwoBridges', label: 'Rezoning: Two Bridges (court-ordered)', group: 'zoning', value: 32, description: '3 supertalls in low-rise LES. Planning Commission approved as "minor modifications" to avoid ULURP. State Supreme Court intervened.', flagged: true },
    { id: 'ZON-421a', label: 'Tax Program: 421-a / 485-x', group: 'zoning', value: 25, description: 'Property tax exemption for new construction with affordable units. Critics: subsidizes luxury. $1.77B annual cost. Replaced by 485-x in 2024.', flagged: true },
    { id: 'ZON-HPD', label: 'Housing Preservation & Development', group: 'agency', value: 30, description: 'HPD enforces housing code. Issues violations for heat, lead, mold. Tenant complaint hotline 311.', flagged: false },
    { id: 'ZON-ULURP', label: 'ULURP Process', group: 'agency', value: 22, description: 'Uniform Land Use Review Procedure. 7-month process. Community Board → Borough President → CPC → Council. Developers try to circumvent it.', flagged: false },

    // — LOBBYISTS & POLITICAL ACTORS —
    { id: 'LOB-REBNY', label: 'REBNY (Real Estate Board of NY)', group: 'lobby', value: 42, description: 'NYC real estate industry lobby. Most powerful lobby in city. $10M+ annual political spending. Opposes rent regulation, supports rezonings.', flagged: true },
    { id: 'LOB-HousingPAC', label: 'Jobs for New York PAC', group: 'lobby', value: 32, description: 'REBNY-affiliated Super PAC. Funded council campaigns. $5M+ spent in 2021 elections. Backed pro-development candidates.', flagged: true },
    { id: 'LOB-RossFound', label: 'Stephen Ross (Related)', group: 'lobby', value: 28, description: 'Related Companies founder. Major political fundraiser. Trump fundraiser controversy. Hudson Yards public subsidy advocate.', flagged: true },

    // — TENANT ORGANIZATIONS —
    { id: 'TEN-RTC', label: 'Right to Counsel NYC Coalition', group: 'tenant', value: 35, description: 'Won universal right to free legal counsel in eviction cases (Local Law 136 of 2017). 84% of represented tenants remain housed.', flagged: false },
    { id: 'TEN-HousingJustice', label: 'Housing Justice for All (HJFA)', group: 'tenant', value: 30, description: 'Statewide coalition. Won Good Cause Eviction (2024) and HSTPA (2019). Rent regulation advocacy.', flagged: false },
    { id: 'TEN-MetCouncil', label: 'Met Council on Housing', group: 'tenant', value: 28, description: 'Oldest tenant organizing group in NYC. Tenant hotline. Anti-eviction defense. Rent strike support.', flagged: false },
    { id: 'TEN-CASA', label: 'CASA (Community Action for Safe Apartments)', group: 'tenant', value: 22, description: 'Bronx-based. Tenant organizing in low-income housing. Lead paint, mold, heat complaints.', flagged: false },
  ],

  links: [
    // Developer → Zoning actions
    { source: 'DEV-Related', target: 'ZON-HudsonYards', value: 35, label: 'Primary beneficiary of $6B subsidy', type: 'exemption' },
    { source: 'DEV-Extell', target: 'ZON-BSA', value: 28, label: '775ft tower mechanical void approved', type: 'exemption' },
    { source: 'DEV-SLGreen', target: 'ZON-MidtownEast', value: 25, label: 'One Vanderbilt rezoning beneficiary', type: 'exemption' },
    { source: 'DEV-TwoBridges', target: 'ZON-TwoBridges', value: 30, label: '3 supertalls as "minor modifications"', type: 'exemption' },
    { source: 'DEV-TwoBridges', target: 'ZON-CPC', value: 22, label: 'CPC approved without ULURP', type: 'exemption' },
    { source: 'DEV-Related', target: 'ZON-421a', value: 20, label: '421-a tax exemption on luxury projects', type: 'exemption' },
    { source: 'DEV-Brookfield', target: 'ZON-421a', value: 18, label: '421-a beneficiary', type: 'exemption' },

    // REBNY lobbying network
    { source: 'LOB-REBNY', target: 'ZON-CPC', value: 20, label: 'Lobbying for developer-friendly zoning', type: 'lobbying' },
    { source: 'LOB-REBNY', target: 'ZON-BSA', value: 18, label: 'Variance advocacy', type: 'lobbying' },
    { source: 'LOB-REBNY', target: 'DEV-Related', value: 15, label: 'Industry membership', type: 'lobbying' },
    { source: 'LOB-REBNY', target: 'DEV-Extell', value: 14, label: 'Industry membership', type: 'lobbying' },
    { source: 'LOB-REBNY', target: 'DEV-SLGreen', value: 13, label: 'Industry membership', type: 'lobbying' },
    { source: 'LOB-HousingPAC', target: 'CC-Menin', value: 12, label: 'Campaign funding', type: 'funding' },
    { source: 'LOB-HousingPAC', target: 'CC-Williams', value: 10, label: 'Campaign funding', type: 'funding' },
    { source: 'LOB-RossFound', target: 'DEV-Related', value: 25, label: 'Founder / Chairman', type: 'ownership' },
    { source: 'LOB-RossFound', target: 'ZON-HudsonYards', value: 18, label: 'Public subsidy advocate', type: 'lobbying' },

    // Council → Zoning oversight
    { source: 'CC-Marte', target: 'ZON-TwoBridges', value: 18, label: 'Opposed supertalls in district', type: 'complaint' },
    { source: 'CC-Brewer', target: 'ZON-BSA', value: 12, label: 'Oversight hearings on variances', type: 'vote' },
    { source: 'CC-Gutierrez', target: 'ZON-CPC', value: 10, label: 'Williamsburg rezoning concerns', type: 'vote' },
    { source: 'CC-Menin', target: 'ZON-CPC', value: 15, label: 'Legislative oversight of ULURP', type: 'vote' },
    { source: 'CC-Sanchez', target: 'ZON-HPD', value: 12, label: 'Housing committee enforcement push', type: 'vote' },

    // Tenant harassment connections
    { source: 'DEV-Kushner', target: 'TEN-MetCouncil', value: 15, label: 'Multiple harassment complaints filed', type: 'complaint' },
    { source: 'DEV-Pinnacle', target: 'TEN-CASA', value: 12, label: 'Construction harassment reports', type: 'complaint' },
    { source: 'DEV-Kushner', target: 'ZON-HPD', value: 18, label: 'Hundreds of HPD violations', type: 'complaint' },
    { source: 'DEV-Pinnacle', target: 'ZON-HPD', value: 14, label: 'Heat and lead violations', type: 'complaint' },

    // Tenant org → government advocacy
    { source: 'TEN-RTC', target: 'CC-Menin', value: 10, label: 'Right to Counsel expansion', type: 'lobbying' },
    { source: 'TEN-HousingJustice', target: 'CC-Salaam', value: 12, label: 'Good Cause Eviction advocacy', type: 'lobbying' },
    { source: 'TEN-MetCouncil', target: 'CC-Caban', value: 8, label: 'Tenant organizing support', type: 'lobbying' },

    // Agency connections
    { source: 'ZON-CPC', target: 'ZON-ULURP', value: 10, label: 'ULURP review pipeline', type: 'connection' },
    { source: 'ZON-HPD', target: 'ZON-CPC', value: 8, label: 'Housing enforcement data', type: 'connection' },
  ],

  anomalies: [
    {
      id: 1,
      type: 'ULURP Circumvention',
      description: 'Two Bridges: CPC approved 3 supertalls (up to 1,008ft) in low-rise Lower East Side as "minor modifications," bypassing ULURP public review. State Supreme Court intervened, ordering full ULURP. Developer-CPC coordination to avoid community input.',
      severity: 'critical',
      relatedNodes: ['DEV-TwoBridges', 'ZON-CPC', 'ZON-TwoBridges', 'CC-Marte'],
      detectedAt: '2024-08',
      centrality: 0.91,
    },
    {
      id: 2,
      type: 'Mechanical Void Abuse',
      description: 'Extell\'s 50 West 66th St: BSA approved 775ft tower with 198ft of "mechanical void" space (legitimately requiring <20ft). Gaming zoning to maximize luxury apartment views above neighborhood. Pattern of BSA-developer alignment.',
      severity: 'high',
      relatedNodes: ['DEV-Extell', 'ZON-BSA'],
      detectedAt: '2024-03',
      centrality: 0.84,
    },
    {
      id: 3,
      type: 'Public Subsidy Capture',
      description: 'Hudson Yards: Related Companies received ~$6B in public subsidies including tax-free financing via PILOT for what became ultra-luxury commercial/residential. $1.2B in tax exemptions for project generating $25B+ in private value. Stephen Ross major political fundraiser.',
      severity: 'critical',
      relatedNodes: ['DEV-Related', 'ZON-HudsonYards', 'LOB-RossFound', 'ZON-421a'],
      detectedAt: '2023-12',
      centrality: 0.88,
    },
    {
      id: 4,
      type: 'REBNY Political Capture',
      description: 'REBNY (Real Estate Board of NY) and affiliated PAC "Jobs for New York" spent $5M+ on 2021 council elections. Multiple beneficiary council members subsequently voted for developer-friendly rezonings. Degree centrality in funding network: 0.79.',
      severity: 'high',
      relatedNodes: ['LOB-REBNY', 'LOB-HousingPAC', 'CC-Menin', 'CC-Williams'],
      detectedAt: '2025-06',
      centrality: 0.79,
    },
    {
      id: 5,
      type: 'Tenant Harassment Pattern',
      description: 'Kushner Companies: Hundreds of HPD violations across East Village and Williamsburg properties. Pattern of construction-as-harassment to drive out rent-stabilized tenants. AG investigation. Connected to Pinnacle City Living via property management overlap.',
      severity: 'high',
      relatedNodes: ['DEV-Kushner', 'DEV-Pinnacle', 'ZON-HPD', 'TEN-MetCouncil'],
      detectedAt: '2025-01',
      centrality: 0.76,
    },
  ],

  statutes: [
    {
      id: 1,
      code: 'NY RPL § 235-b',
      title: 'Warranty of Habitability',
      description: 'Every residential lease includes implied warranty of habitability. Landlord must maintain premises fit for human habitation. Tenant defense in eviction. Rent abatement available. Non-waivable. Applies to all housing types including rent-stabilized, market-rate, and subsidized units.',
      keywords: ['habitability', 'repair', 'mold', 'heat', 'water', 'vermin', 'lead'],
      relevanceScore: 96,
      source: 'NY Real Property Law',
    },
    {
      id: 2,
      code: 'Good Cause Eviction (2024)',
      title: 'Good Cause Eviction Law',
      description: 'Effective April 20, 2024. Market-rate tenants now protected from eviction without "good cause." Rent increases above local rent standard (CPI + 5%, max 10%) can be challenged. Landlord must prove legitimate reason for eviction or above-standard rent hike. 2025 NYC rent standard: 8.79%.',
      keywords: ['good cause', 'market rate', 'rent increase', 'eviction defense', 'CPI'],
      relevanceScore: 94,
      source: 'NY State Law (2024)',
    },
    {
      id: 3,
      code: 'NYC Admin Code § 26-1301',
      title: 'Right to Counsel (Free Attorney in Eviction)',
      description: 'Local Law 136 of 2017. Income-eligible tenants (≤200% federal poverty level) guaranteed free legal representation in Housing Court eviction proceedings. All 5 boroughs since 2023. 84% of represented tenants stay in homes. The most impactful tenant protection in US history.',
      keywords: ['right to counsel', 'free lawyer', 'housing court', 'legal aid', 'income eligible'],
      relevanceScore: 93,
      source: 'NYC Administrative Code',
    },
    {
      id: 4,
      code: 'HSTPA 2019 / NY RPL § 226-c',
      title: 'Housing Stability & Tenant Protection Act',
      description: 'Landmark 2019 reform. Permanent rent stabilization (removed sunset clause). Eliminated vacancy decontrol. 14-day rent demand required before eviction filing. 1-year presumption of retaliation after tenant complaints. Security deposit: return within 14 days, max 1 month.',
      keywords: ['HSTPA', 'rent stabilization', 'vacancy decontrol', '14 days', 'retaliation', 'deposit'],
      relevanceScore: 95,
      source: 'NY State Law',
    },
    {
      id: 5,
      code: 'NY RPL § 235 / RPAPL § 853',
      title: 'Illegal Lockout & Self-Help Eviction Ban',
      description: 'Self-help eviction is illegal. No lock changes, utility shutoffs, removal of belongings, or threats without court order. Warrant of Eviction required (sheriff/marshal only). Treble (3x) damages for illegal eviction. Criminal prosecution possible.',
      keywords: ['lockout', 'self-help', 'illegal eviction', 'treble damages', 'utilities', 'sheriff'],
      relevanceScore: 92,
      source: 'NY Real Property Law / RPAPL',
    },
    {
      id: 6,
      code: 'FARE Act (2025)',
      title: 'FARE Act — Broker Fee Shift',
      description: 'Effective June 2025. Shifts broker fee responsibility to landlord (party who hired the broker). Saves tenants $10,000+ per lease in NYC. Applies to all residential rentals. Reduces financial barriers to housing mobility.',
      keywords: ['broker fee', 'FARE', 'landlord pays', 'move-in cost', 'rental'],
      relevanceScore: 80,
      source: 'NYC Local Law (2025)',
    },
    {
      id: 7,
      code: 'Rent Stabilization Code § 2524',
      title: 'Rent Stabilization Eviction Protections',
      description: 'Rent-stabilized tenants (1M+ apartments) have right to lease renewal. Rent increases set annually by RGB (2.75% one-year, 5.25% two-year for Oct 2024). No vacancy decontrol. Senior citizens, disabled persons, and 20+ year tenants have extra anti-eviction protections.',
      keywords: ['rent stabilized', 'RGB', 'lease renewal', 'senior', 'disabled', 'vacancy'],
      relevanceScore: 90,
      source: 'NYC Rent Stabilization Code',
    },
    {
      id: 8,
      code: 'NYC Admin Code § 27-2005',
      title: 'Housing Maintenance Code — Violations',
      description: 'NYC Housing Maintenance Code. Class A (non-hazardous), B (hazardous, 30 days to fix), C (immediately hazardous — heat, lead, gas leak, no water). HPD inspection via 311 complaint. Open violations as eviction defense. Over 1.2M violations issued annually.',
      keywords: ['housing code', 'violation', 'Class C', 'HPD', '311', 'heat', 'lead', 'mold'],
      relevanceScore: 88,
      source: 'NYC Administrative Code',
    },
  ],

  hotspots: [
    { zipCode: '10029', neighborhood: 'East Harlem', evictionRate: 24.8, recentCases: 312, trend: 'rising', lat: 40.791, lng: -73.943 },
    { zipCode: '10456', neighborhood: 'Morrisania / Melrose (Bronx)', evictionRate: 28.3, recentCases: 487, trend: 'rising', lat: 40.831, lng: -73.908 },
    { zipCode: '10457', neighborhood: 'Tremont (Bronx)', evictionRate: 26.1, recentCases: 398, trend: 'rising', lat: 40.846, lng: -73.898 },
    { zipCode: '11233', neighborhood: 'Bedford-Stuyvesant (Brooklyn)', evictionRate: 19.4, recentCases: 245, trend: 'stable', lat: 40.681, lng: -73.927 },
    { zipCode: '11212', neighborhood: 'Brownsville (Brooklyn)', evictionRate: 31.2, recentCases: 520, trend: 'rising', lat: 40.663, lng: -73.912 },
    { zipCode: '11207', neighborhood: 'East New York (Brooklyn)', evictionRate: 22.7, recentCases: 380, trend: 'rising', lat: 40.670, lng: -73.894 },
    { zipCode: '11434', neighborhood: 'Jamaica (Queens)', evictionRate: 15.8, recentCases: 195, trend: 'stable', lat: 40.677, lng: -73.775 },
    { zipCode: '10002', neighborhood: 'Lower East Side (Manhattan)', evictionRate: 12.3, recentCases: 142, trend: 'stable', lat: 40.715, lng: -73.985 },
    { zipCode: '10453', neighborhood: 'Morris Heights (Bronx)', evictionRate: 23.9, recentCases: 356, trend: 'rising', lat: 40.852, lng: -73.913 },
    { zipCode: '10301', neighborhood: 'St. George (Staten Island)', evictionRate: 10.5, recentCases: 78, trend: 'declining', lat: 40.643, lng: -74.077 },
    { zipCode: '11216', neighborhood: 'Crown Heights (Brooklyn)', evictionRate: 17.6, recentCases: 210, trend: 'stable', lat: 40.680, lng: -73.949 },
    { zipCode: '10035', neighborhood: 'East Harlem South', evictionRate: 21.4, recentCases: 278, trend: 'rising', lat: 40.799, lng: -73.934 },
  ],

  stats: {
    totalEvictionsLogged: 47820,
    activeHotspots: 8,
    anomaliesDetected: 5,
    tenantsProtected: 128400,
    zoningExemptions: 142,
  },
};
