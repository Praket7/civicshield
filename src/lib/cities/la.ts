import type { CityData } from '../cityData';

export const laData: CityData = {
  id: 'la-ca',
  name: 'Los Angeles',
  state: 'California',
  mayor: 'Karen Bass',
  population: 3898747,
  councilName: 'Los Angeles City Council (15 Members)',

  nodes: [
    // — COUNCIL MEMBERS (Real LA City Council 2026) —
    { id: 'CC-HarrisDawson', label: 'Marqueece Harris-Dawson', group: 'council', value: 52, district: 'District 8 (South LA)', description: 'Council President since Sept 2024. South LA, Leimert Park, Baldwin Hills, View Park. Controls legislative agenda. Term-limited 2028.', flagged: true },
    { id: 'CC-Blumenfield', label: 'Bob Blumenfield', group: 'council', value: 40, district: 'District 3 (West SFV)', description: 'President Pro Tempore. Woodland Hills, Tarzana, Reseda, Canoga Park. Term-limited 2026. Since 2013.', flagged: false },
    { id: 'CC-Hernandez', label: 'Eunisses Hernandez', group: 'council', value: 42, district: 'District 1 (NE LA)', description: 'Lincoln Heights, Boyle Heights, El Sereno, Highland Park. Progressive. DSA-backed. Anti-displacement.', flagged: false },
    { id: 'CC-Raman', label: 'Nithya Raman', group: 'council', value: 48, district: 'District 4 (Hollywood / Silver Lake)', description: 'Hollywood, Silver Lake, Sherman Oaks, Encino. DSA-backed. Running for Mayor 2026. Homelessness and housing focus.', flagged: true },
    { id: 'CC-Yaroslavsky', label: 'Katy Yaroslavsky', group: 'council', value: 38, district: 'District 5 (Westside)', description: 'Fairfax District, Pico-Robertson, Westwood, Beverly Grove, Miracle Mile. Land-use committee.', flagged: false },
    { id: 'CC-Padilla', label: 'Imelda Padilla', group: 'council', value: 36, district: 'District 6 (East SFV)', description: 'Arleta, Pacoima, North Hollywood, Sun Valley. Affordable housing advocate.', flagged: false },
    { id: 'CC-Rodriguez', label: 'Monica Rodriguez', group: 'council', value: 38, district: 'District 7 (NE SFV)', description: 'Sylmar, Sunland-Tujunga, Pacoima, Lake View Terrace. Running unopposed 2026.', flagged: false },
    { id: 'CC-Price', label: 'Curren Price Jr.', group: 'council', value: 44, district: 'District 9 (South Central)', description: 'South Central, Historic South-Central, Florence. Term-limited 2026. Corruption probe 2023 (charges dropped). Since 2013.', flagged: true },
    { id: 'CC-Hutt', label: 'Heather Hutt', group: 'council', value: 36, district: 'District 10 (Mid-City)', description: 'Mid-Wilshire, Koreatown, West Adams, Crenshaw. Appointed 2022 (after Ridley-Thomas removal). Affordable housing focus.', flagged: false },
    { id: 'CC-Park', label: 'Traci Park', group: 'council', value: 42, district: 'District 11 (Westside)', description: 'Brentwood, Pacific Palisades, Venice, Playa del Rey. Palisades Fire impact. Moderate. Encampment enforcement.', flagged: true },
    { id: 'CC-SotoMartinez', label: 'Hugo Soto-Martínez', group: 'council', value: 40, district: 'District 13 (Hollywood)', description: 'Hollywood, East Hollywood, Silver Lake, Echo Park, Westlake. DSA-backed. Tenant organizer background. Facing competitive 2026 race.', flagged: false },
    { id: 'CC-Jurado', label: 'Ysabel Jurado', group: 'council', value: 38, district: 'District 14 (NE LA / DTLA)', description: 'Downtown LA, Boyle Heights, Eagle Rock, Glassell Park, El Sereno. Progressive. Tenant rights attorney.', flagged: false },
    { id: 'CC-McOsker', label: 'Tim McOsker', group: 'council', value: 36, district: 'District 15 (Harbor)', description: 'San Pedro, Wilmington, Watts, Harbor City. Port of LA issues. Former city attorney chief of staff.', flagged: false },

    // — DEVELOPERS & PROPERTY COMPANIES —
    { id: 'DEV-Caruso', label: 'Caruso (Rick Caruso)', group: 'developer', value: 52, description: 'Rick Caruso. The Grove, The Americana at Brand. Ran for mayor 2022 (lost to Bass). Spent $100M+ on campaign. Major political donor. Switched party registration from R to D.', flagged: true },
    { id: 'DEV-CIM', label: 'CIM Group', group: 'developer', value: 45, description: 'Major LA developer. Hollywood, DTLA projects. Mixed-use. Political contributor. Hollywood Palladium development controversy.', flagged: true },
    { id: 'DEV-Brookfield', label: 'Brookfield Properties', group: 'developer', value: 40, description: 'Owner of multiple DTLA office towers. Figueroa corridor. Large-scale mixed-use developments.', flagged: false },
    { id: 'DEV-GH-Palmer', label: 'GH Palmer Associates', group: 'developer', value: 38, description: 'Geoffrey Palmer. Luxury apartment complexes: Orsini, Medici, Lorenzo. Italian-themed mega-complexes. Union-busting history. 1,000+ units.', flagged: true },
    { id: 'DEV-VeritasInv', label: 'Veritas Investments / Large LLCs', group: 'shell', value: 32, description: 'Corporate landlord. Hundreds of units across LA. Pattern of rent increases at max RSO limits. Tenant harassment complaints. Multiple LLC shell structure.', flagged: true },
    { id: 'DEV-EllisAct', label: 'Ellis Act Evictors (Various LLCs)', group: 'shell', value: 28, description: 'Multiple anonymous LLCs using Ellis Act to pull RSO-protected buildings off rental market. Demolish and rebuild as luxury condos. Displaces long-term tenants.', flagged: true },

    // — ZONING & GOVERNMENT BODIES —
    { id: 'ZON-LACPC', label: 'LA City Planning Commission', group: 'agency', value: 38, description: 'Approves conditional use permits, zone changes, and general plan amendments. Criticized for developer influence on planning decisions.', flagged: true },
    { id: 'ZON-LAHD', label: 'LA Housing Department (LAHD)', group: 'agency', value: 35, description: 'Enforces RSO rent limits. Registers RSO units. Processes relocation assistance. Tenant complaint hotline. Issues Just Cause violation notices.', flagged: false },
    { id: 'ZON-RSO', label: 'Rent Stabilization Ordinance (RSO)', group: 'zoning', value: 30, description: 'LA RSO covers units built before Oct 1978 (~650,000 units). Annual increases set by LAHD (3% for 2025-26). Just cause eviction. Relocation assistance required for no-fault.', flagged: false },
    { id: 'ZON-EllisAct', label: 'Ellis Act (State Law)', group: 'zoning', value: 28, description: 'California state law allowing landlords to evict all tenants and "go out of the rental business." Used to demolish RSO buildings for luxury condos. No local opt-out. Relocation required.', flagged: true },
    { id: 'ZON-TOC', label: 'Transit Oriented Communities (TOC)', group: 'zoning', value: 25, description: 'Density bonus incentive near transit. Developers get height/density bonuses in exchange for affordable units. Criticized for inadequate affordability requirements.', flagged: false },
    { id: 'ZON-JCO', label: 'Just Cause Ordinance (JCO)', group: 'zoning', value: 28, description: 'Effective Jan 2023. All rental properties including SFH require "just cause" for eviction. No-fault evictions require Declaration of Intent + relocation assistance. Strongest local protection.', flagged: false },
    { id: 'ZON-Measure-ULA', label: 'Measure ULA (Mansion Tax)', group: 'zoning', value: 22, description: '2023 ballot measure. 4% transfer tax on properties $5M+, 5.5% on $10M+. Funds affordable housing and homelessness. Challenged in court. Supported by tenant orgs.', flagged: true },

    // — LOBBYISTS & POLITICAL ACTORS —
    { id: 'LOB-ApartmentAssoc', label: 'Apartment Association of LA (AAGLA)', group: 'lobby', value: 35, description: 'LA landlord lobby. Opposes rent regulation expansion. Fights RSO enforcement. Political spending on council races. Challenged Measure ULA.', flagged: true },
    { id: 'LOB-BIA', label: 'BIA/BOMA (Building Industry)', group: 'lobby', value: 30, description: 'Building Industry Association + Building Owners/Managers. Lobby against tenant protections. Support density bonuses and reduced affordable housing requirements.', flagged: false },
    { id: 'LOB-Caruso-PAC', label: 'Caruso Political Network', group: 'lobby', value: 28, description: 'Rick Caruso spent $104M on 2022 mayoral race. Continued political influence. Major donor to multiple council races. Pro-development network.', flagged: true },

    // — TENANT ORGANIZATIONS —
    { id: 'TEN-LAHC', label: 'LA Tenants Union', group: 'tenant', value: 32, description: 'Largest tenant union in LA. Direct action. Rent strike support. Anti-eviction defense. RSO enforcement advocacy. Chapter-based organizing.', flagged: false },
    { id: 'TEN-SAJE', label: 'SAJE (Strategic Actions for a Just Economy)', group: 'tenant', value: 28, description: 'South LA-based. Anti-displacement. Won Just Cause Ordinance expansion. Measure ULA coalition. Community land trust advocacy.', flagged: false },
    { id: 'TEN-HousingNow', label: 'Housing Now! California', group: 'tenant', value: 25, description: 'Statewide coalition. Anti-homelessness. Affordable housing advocacy. Connected to Rae Chen Huang mayoral campaign.', flagged: false },
    { id: 'TEN-BASTA', label: 'BASTA (Building a Stronger Tenants Alliance)', group: 'tenant', value: 22, description: 'Eastside tenant organizing. Boyle Heights anti-gentrification. Legal clinics. Language-accessible services. RSO education.', flagged: false },
  ],

  links: [
    // Developer → Zoning actions
    { source: 'DEV-Caruso', target: 'ZON-LACPC', value: 25, label: '$104M political spending influence', type: 'lobbying' },
    { source: 'DEV-CIM', target: 'ZON-TOC', value: 20, label: 'TOC density bonus projects', type: 'exemption' },
    { source: 'DEV-GH-Palmer', target: 'ZON-LACPC', value: 18, label: 'Mega-complex permits', type: 'exemption' },
    { source: 'DEV-EllisAct', target: 'ZON-EllisAct', value: 30, label: 'Ellis Act evictions to demolish RSO', type: 'exemption' },
    { source: 'DEV-VeritasInv', target: 'ZON-RSO', value: 15, label: 'Max rent increases on RSO units', type: 'connection' },
    { source: 'DEV-Brookfield', target: 'ZON-TOC', value: 16, label: 'DTLA transit density projects', type: 'exemption' },

    // Lobby → Council & agencies
    { source: 'LOB-ApartmentAssoc', target: 'CC-Park', value: 14, label: 'Campaign contributions', type: 'funding' },
    { source: 'LOB-ApartmentAssoc', target: 'CC-Price', value: 12, label: 'Campaign contributions', type: 'funding' },
    { source: 'LOB-ApartmentAssoc', target: 'ZON-LAHD', value: 10, label: 'Opposition to RSO enforcement', type: 'lobbying' },
    { source: 'LOB-ApartmentAssoc', target: 'ZON-Measure-ULA', value: 18, label: 'Legal challenge to Mansion Tax', type: 'complaint' },
    { source: 'LOB-BIA', target: 'ZON-LACPC', value: 12, label: 'Density bonus advocacy', type: 'lobbying' },
    { source: 'LOB-Caruso-PAC', target: 'DEV-Caruso', value: 25, label: '$104M self-funded campaign', type: 'ownership' },
    { source: 'LOB-Caruso-PAC', target: 'CC-HarrisDawson', value: 10, label: 'Political network', type: 'funding' },
    { source: 'LOB-Caruso-PAC', target: 'CC-Park', value: 12, label: 'Political network', type: 'funding' },

    // Council → Zoning oversight
    { source: 'CC-HarrisDawson', target: 'ZON-LACPC', value: 18, label: 'Council President oversight', type: 'vote' },
    { source: 'CC-Raman', target: 'ZON-RSO', value: 15, label: 'RSO reform advocacy', type: 'vote' },
    { source: 'CC-SotoMartinez', target: 'ZON-JCO', value: 14, label: 'Just Cause expansion support', type: 'vote' },
    { source: 'CC-Hernandez', target: 'ZON-EllisAct', value: 12, label: 'Anti-Ellis Act advocacy', type: 'complaint' },
    { source: 'CC-Park', target: 'ZON-LACPC', value: 10, label: 'Palisades rebuild planning', type: 'vote' },
    { source: 'CC-Price', target: 'ZON-LACPC', value: 15, label: 'South Central development votes', type: 'vote' },

    // Tenant complaints
    { source: 'DEV-VeritasInv', target: 'TEN-LAHC', value: 15, label: 'Tenant harassment reports', type: 'complaint' },
    { source: 'DEV-EllisAct', target: 'TEN-SAJE', value: 18, label: 'Anti-Ellis Act organizing', type: 'complaint' },
    { source: 'DEV-GH-Palmer', target: 'TEN-BASTA', value: 10, label: 'Displacement complaints', type: 'complaint' },

    // Tenant org advocacy
    { source: 'TEN-LAHC', target: 'CC-SotoMartinez', value: 12, label: 'Tenant organizing support', type: 'lobbying' },
    { source: 'TEN-SAJE', target: 'CC-Hernandez', value: 14, label: 'Just Cause expansion partnership', type: 'lobbying' },
    { source: 'TEN-SAJE', target: 'ZON-Measure-ULA', value: 16, label: 'Measure ULA coalition lead', type: 'lobbying' },
    { source: 'TEN-HousingNow', target: 'CC-Raman', value: 10, label: 'Homelessness policy alignment', type: 'lobbying' },
    { source: 'TEN-BASTA', target: 'CC-Jurado', value: 10, label: 'Boyle Heights organizing', type: 'lobbying' },

    // Agency connections
    { source: 'ZON-LAHD', target: 'ZON-RSO', value: 12, label: 'RSO enforcement', type: 'connection' },
    { source: 'ZON-LAHD', target: 'ZON-JCO', value: 10, label: 'JCO enforcement', type: 'connection' },
    { source: 'ZON-LACPC', target: 'ZON-TOC', value: 8, label: 'TOC permit approvals', type: 'connection' },
  ],

  anomalies: [
    {
      id: 1,
      type: 'Ellis Act Displacement Wave',
      description: 'Multiple anonymous LLCs filed Ellis Act evictions across Hollywood, Echo Park, and Koreatown, pulling 340+ RSO-protected units off the rental market since 2023. Pattern suggests coordinated corporate landlord strategy to demolish rent-stabilized buildings and rebuild as luxury condos. Shell company ownership obscures beneficial owners.',
      severity: 'critical',
      relatedNodes: ['DEV-EllisAct', 'ZON-EllisAct', 'TEN-SAJE', 'CC-SotoMartinez'],
      detectedAt: '2025-06',
      centrality: 0.88,
    },
    {
      id: 2,
      type: 'Political Spending Capture',
      description: 'Rick Caruso spent $104M on 2022 mayoral race (most expensive in US city history). Lost to Bass but continued political influence through donor network. Multiple council members received contributions from Caruso-connected PACs. Caruso companies benefit from city planning decisions.',
      severity: 'high',
      relatedNodes: ['DEV-Caruso', 'LOB-Caruso-PAC', 'CC-HarrisDawson', 'CC-Park'],
      detectedAt: '2024-11',
      centrality: 0.82,
    },
    {
      id: 3,
      type: 'Mansion Tax Legal Challenge',
      description: 'AAGLA and real estate industry groups filed lawsuit challenging Measure ULA (4-5.5% transfer tax on properties $5M+). While under legal challenge, $150M in expected affordable housing and homelessness funding delayed. Lobby spending to block voter-approved tenant relief.',
      severity: 'high',
      relatedNodes: ['LOB-ApartmentAssoc', 'ZON-Measure-ULA', 'TEN-SAJE'],
      detectedAt: '2025-02',
      centrality: 0.75,
    },
    {
      id: 4,
      type: 'Corporate Landlord Shell Network',
      description: 'Veritas Investments and affiliated LLCs manage 500+ rental units across LA using layered shell company structures. Pattern: max RSO rent increases (3%), aggressive maintenance cost pass-throughs, tenant harassment through renovation noise. HPD complaint rate 3x city average.',
      severity: 'high',
      relatedNodes: ['DEV-VeritasInv', 'ZON-LAHD', 'TEN-LAHC'],
      detectedAt: '2025-08',
      centrality: 0.72,
    },
    {
      id: 5,
      type: 'Palisades Fire Displacement Risk',
      description: 'After Palisades Fire (Jan 2025), CD11 (Park) received emergency rebuild planning authority. Corporate developers positioning for rebuilds without RSO protections on new construction. Risk of permanent displacement of 2,800+ renters whose buildings burned. Price gouging complaints spiking.',
      severity: 'critical',
      relatedNodes: ['CC-Park', 'ZON-LACPC', 'LOB-BIA'],
      detectedAt: '2025-01',
      centrality: 0.85,
    },
  ],

  statutes: [
    {
      id: 1,
      code: 'LAMC § 151 (RSO)',
      title: 'LA Rent Stabilization Ordinance',
      description: 'Covers ~650,000 units built before Oct 1, 1978. Annual rent increase capped at 3% (2025-26) plus 1% each for landlord-paid gas/electric. Just cause eviction required. No-fault evictions require Declaration of Intent + relocation assistance. Strongest local rent control in CA.',
      keywords: ['RSO', 'rent stabilization', 'rent control', '3%', 'just cause', 'relocation'],
      relevanceScore: 96,
      source: 'LA Municipal Code',
    },
    {
      id: 2,
      code: 'LAMC § 165 (JCO)',
      title: 'Just Cause Ordinance (All Rentals)',
      description: 'Effective Jan 27, 2023. Applies to ALL rental properties including single-family homes and condos. Landlord must have legal reason to evict: at-fault (nonpayment, lease violation, nuisance) or no-fault (owner move-in, demolition, Ellis Act). No-fault requires relocation assistance. Protections start after 6 months or first lease term.',
      keywords: ['just cause', 'eviction', 'single family', 'no-fault', 'relocation', 'at-fault'],
      relevanceScore: 95,
      source: 'LA Municipal Code',
    },
    {
      id: 3,
      code: 'CA Civil Code § 1946.2 (AB 1482)',
      title: 'California Tenant Protection Act',
      description: 'Statewide. Applies to non-RSO units built 15+ years ago. Rent increase cap: 5% + CPI (max 10%). For 2025-26: max 8%. Just cause eviction required. Exemption: single-family homes not owned by corporations/REITs (with written notice). Requires 90-day notice for 10%+ increases.',
      keywords: ['AB 1482', 'tenant protection act', 'CPI', '10%', 'statewide', 'rent cap'],
      relevanceScore: 92,
      source: 'California Civil Code',
    },
    {
      id: 4,
      code: 'CA Gov Code § 7060 (Ellis Act)',
      title: 'Ellis Act — Right to Go Out of Business',
      description: 'State law allowing landlords to evict all tenants and withdraw units from rental market. No local opt-out. Requires 120-day notice (1-year for seniors/disabled). Relocation assistance required. Used to demolish RSO buildings for luxury condos. 340+ units lost in LA since 2023.',
      keywords: ['Ellis Act', 'withdrawal', 'demolition', 'relocation', 'RSO loss', 'conversion'],
      relevanceScore: 90,
      source: 'California Government Code',
    },
    {
      id: 5,
      code: 'CA Civil Code § 789.3',
      title: 'Illegal Lockout / Utility Shutoff',
      description: 'California law prohibiting landlord from changing locks, removing doors/windows, shutting off utilities, or removing tenant property to force eviction. Actual damages + $100/day for each day of violation. Injunctive relief available. No self-help eviction permitted.',
      keywords: ['lockout', 'utilities', 'self-help', 'illegal eviction', 'damages', 'injunction'],
      relevanceScore: 93,
      source: 'California Civil Code',
    },
    {
      id: 6,
      code: 'LAMC § 45.33 (Anti-Harassment)',
      title: 'LA Tenant Anti-Harassment Ordinance',
      description: 'Prohibits landlord harassment including threats, intimidation, reducing services, construction interference, refusing repairs, and filing frivolous eviction cases. Private right of action for tenants. Damages + attorney fees. Applies to all rental units.',
      keywords: ['harassment', 'intimidation', 'reduced services', 'frivolous eviction', 'private action'],
      relevanceScore: 88,
      source: 'LA Municipal Code',
    },
    {
      id: 7,
      code: 'Right to Counsel (2025)',
      title: 'LA Right to Counsel Program',
      description: 'Effective Aug 20, 2025. Landlords must provide Notice of Right to Counsel to tenants at beginning of tenancy and before eviction proceedings. Income-eligible tenants entitled to free legal representation. Modeled on NYC program.',
      keywords: ['right to counsel', 'free lawyer', 'eviction defense', 'legal aid', 'notice'],
      relevanceScore: 85,
      source: 'LA City Ordinance (2025)',
    },
    {
      id: 8,
      code: 'Measure ULA (Transfer Tax)',
      title: 'Measure ULA — Homelessness Prevention Tax',
      description: 'Voter-approved 2023. 4% transfer tax on property sales $5M+ and 5.5% on $10M+. Funds affordable housing construction, tenant legal defense, rent assistance, and homelessness programs. Under legal challenge by real estate industry. Expected $150M+ annually.',
      keywords: ['mansion tax', 'transfer tax', 'affordable housing', 'homelessness', 'Measure ULA'],
      relevanceScore: 78,
      source: 'City of LA Ballot Measure (2023)',
    },
  ],

  hotspots: [
    { zipCode: '90011', neighborhood: 'South Central / Florence', evictionRate: 28.4, recentCases: 412, trend: 'rising', lat: 33.993, lng: -118.258 },
    { zipCode: '90044', neighborhood: 'Athens / Willowbrook', evictionRate: 24.7, recentCases: 356, trend: 'rising', lat: 33.929, lng: -118.291 },
    { zipCode: '90019', neighborhood: 'Mid-City / Pico Union', evictionRate: 21.3, recentCases: 287, trend: 'rising', lat: 34.049, lng: -118.338 },
    { zipCode: '90057', neighborhood: 'Westlake / MacArthur Park', evictionRate: 26.8, recentCases: 398, trend: 'rising', lat: 34.063, lng: -118.279 },
    { zipCode: '90028', neighborhood: 'Hollywood', evictionRate: 18.5, recentCases: 234, trend: 'stable', lat: 34.101, lng: -118.327 },
    { zipCode: '90006', neighborhood: 'Koreatown', evictionRate: 22.1, recentCases: 310, trend: 'rising', lat: 34.060, lng: -118.299 },
    { zipCode: '90033', neighborhood: 'Boyle Heights', evictionRate: 19.8, recentCases: 195, trend: 'stable', lat: 34.044, lng: -118.209 },
    { zipCode: '90026', neighborhood: 'Echo Park / Silver Lake', evictionRate: 15.6, recentCases: 142, trend: 'stable', lat: 34.079, lng: -118.261 },
    { zipCode: '90291', neighborhood: 'Venice', evictionRate: 12.4, recentCases: 89, trend: 'declining', lat: 33.991, lng: -118.466 },
    { zipCode: '90012', neighborhood: 'Downtown LA / Chinatown', evictionRate: 17.2, recentCases: 178, trend: 'rising', lat: 34.061, lng: -118.240 },
    { zipCode: '91331', neighborhood: 'Pacoima (SFV)', evictionRate: 14.8, recentCases: 167, trend: 'stable', lat: 34.255, lng: -118.409 },
    { zipCode: '91605', neighborhood: 'North Hollywood', evictionRate: 16.3, recentCases: 203, trend: 'rising', lat: 34.196, lng: -118.397 },
  ],

  stats: {
    totalEvictionsLogged: 28450,
    activeHotspots: 7,
    anomaliesDetected: 5,
    tenantsProtected: 64200,
    zoningExemptions: 89,
  },
};
