// ============================================================
// CivicShield AI — City-Specific Institutional Graph Data
// ============================================================
// Each city has: council members, developers, lobbyists, zoning items,
// tenant orgs, neighborhoods, statutes, anomalies, and hotspot data.
// ============================================================

export interface CityNode {
  id: string;
  label: string;
  group: 'council' | 'developer' | 'zoning' | 'lobby' | 'tenant' | 'agency' | 'property' | 'shell';
  value: number;
  district?: string;
  description?: string;
  flagged?: boolean;
}

export interface CityLink {
  source: string;
  target: string;
  value: number;
  label?: string;
  type?: 'vote' | 'funding' | 'ownership' | 'lobbying' | 'complaint' | 'exemption' | 'connection';
}

export interface CityAnomaly {
  id: number;
  type: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  relatedNodes: string[];
  detectedAt?: string;
  centrality?: number;
}

export interface CityStatute {
  id: number;
  code: string;
  title: string;
  description: string;
  keywords: string[];
  relevanceScore: number;
  source?: string;
}

export interface EvictionHotspot {
  zipCode: string;
  neighborhood: string;
  evictionRate: number; // per 1000 units
  recentCases: number;
  trend: 'rising' | 'stable' | 'declining';
  lat: number;
  lng: number;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  mayor: string;
  population: number;
  councilName: string;
  nodes: CityNode[];
  links: CityLink[];
  anomalies: CityAnomaly[];
  statutes: CityStatute[];
  hotspots: EvictionHotspot[];
  stats: {
    totalEvictionsLogged: number;
    activeHotspots: number;
    anomaliesDetected: number;
    tenantsProtected: number;
    zoningExemptions: number;
  };
}

// ============================================================
// BUFFALO, NEW YORK — Full City Data
// ============================================================
export const buffaloData: CityData = {
  id: 'buffalo-ny',
  name: 'Buffalo',
  state: 'New York',
  mayor: 'Sean Ryan',
  population: 278349,
  councilName: 'Buffalo Common Council',

  nodes: [
    // — COUNCIL MEMBERS (Real Buffalo Common Council 2026) —
    { id: 'CC-Feroleto', label: 'Joel Feroleto', group: 'council', value: 48, district: 'Delaware', description: 'Council President. Delaware District. Serves since 2016. Oversees Hertel & Elmwood commercial corridors.', flagged: false },
    { id: 'CC-HaltonPope', label: 'Leah Halton-Pope', group: 'council', value: 42, district: 'Ellicott', description: 'Majority Leader. Ellicott District. Reelected 2024. Priorities: budget oversight, midterm hearings.', flagged: true },
    { id: 'CC-Nowakowski', label: 'Mitchell Nowakowski', group: 'council', value: 35, district: 'Fillmore', description: 'Fillmore District. Serves since 2020. Civil Service, Legislation, Police Oversight committees.', flagged: false },
    { id: 'CC-Bollman', label: 'Bryan Bollman', group: 'council', value: 33, district: 'Lovejoy', description: 'Lovejoy District. Serves since 2020. Finance, Civil Service, BURA committees.', flagged: false },
    { id: 'CC-Everhart', label: 'Zeneta Everhart', group: 'council', value: 44, district: 'Masten', description: 'President Pro-Temp. Masten District. Top priority: housing policy reform across all districts.', flagged: true },
    { id: 'CC-Rivera', label: 'David Rivera', group: 'council', value: 40, district: 'Niagara', description: 'Niagara District. Longest-serving (since 2008). Claims, Community Dev, Legislation, Budget, Transportation, Police Oversight.', flagged: true },
    { id: 'CC-Golombek', label: 'Joseph Golombek', group: 'council', value: 38, district: 'North', description: 'North District. Serves since 1999. Community Dev, Police Oversight, Claims, Legislation, Budget, Education, BURA.', flagged: false },
    { id: 'CC-Scanlon', label: 'Christopher Scanlon', group: 'council', value: 46, district: 'South', description: 'South District. Former Acting Mayor (2025). Finance, Civil Service, Waterfront Dev, Transportation, Budget.', flagged: true },
    { id: 'CC-Wyatt', label: 'Rasheed Wyatt', group: 'council', value: 37, district: 'University', description: 'University District. Serves since 2014. Education and community development focus.', flagged: false },

    // — DEVELOPERS & PROPERTY COMPANIES —
    { id: 'DEV-Ciminelli', label: 'Ciminelli Real Estate', group: 'developer', value: 55, description: 'Major Buffalo developer. 201 Ellicott St project: 201 affordable apartments + Braymiller Market. Received 14 Green Code variances.', flagged: true },
    { id: 'DEV-Termini', label: 'Rocco Termini / TM Montante', group: 'developer', value: 42, description: 'Downtown developer. Part-owner Hotel @ the Lafayette. Sued over 201 Ellicott parking reduction. Called project "bait-and-switch".', flagged: false },
    { id: 'DEV-Sinatra', label: 'Sinatra & Co Real Estate', group: 'developer', value: 50, description: 'Large property management firm. Community complaints about maintenance, bait-and-switch apartments, utility billing issues. 13 properties for sale in 2026.', flagged: true },
    { id: 'DEV-Uniland', label: 'Uniland Development', group: 'developer', value: 38, description: 'Commercial and mixed-use developer in WNY region. Multiple downtown and suburban projects.', flagged: false },
    { id: 'DEV-Symphony', label: 'Symphony Property Mgmt', group: 'developer', value: 35, description: 'LLC behind "The Lawrence" 133-unit development in Fruit Belt. Received 11 Green Code variances via 3-2 ZBA vote. Lawsuit filed by residents.', flagged: true },
    { id: 'DEV-Greenlea', label: 'Greenlea Lane Holdings LLC', group: 'shell', value: 22, description: 'Shell LLC connected to multiple eviction filings in East Side zip codes. Ownership trail leads through 3 intermediary companies.', flagged: true },

    // — ZONING & GOVERNMENT ACTIONS —
    { id: 'ZON-201Ellicott', label: 'Zoning: 201 Ellicott St Variances', group: 'zoning', value: 30, description: '14 Green Code variances granted for Ciminelli project. 800 parking spaces reduced to 29. Planning Board + ZBA approval 2023-2025.', flagged: true },
    { id: 'ZON-Lawrence', label: 'Zoning: The Lawrence (Fruit Belt)', group: 'zoning', value: 28, description: '11 Green Code variances for 133-unit complex. 3-2 ZBA vote. Lawsuit: "decimating the Green Code" and enabling gentrification.', flagged: true },
    { id: 'ZON-GreenCode', label: 'Buffalo Green Code / UDO', group: 'zoning', value: 25, description: 'Unified Development Ordinance adopted 2017. Replaces traditional zoning. No parking minimums. Form-based code system.', flagged: false },
    { id: 'ZON-BURA', label: 'Buffalo Urban Renewal Agency', group: 'agency', value: 32, description: 'BURA oversees federal community development funds, urban renewal, and disposition of city-owned land for development.', flagged: false },
    { id: 'ZON-PlanBoard', label: 'City Planning Board', group: 'agency', value: 28, description: 'Reviews environmental impact and land use for major developments. Unanimous approval of 201 Ellicott.', flagged: false },
    { id: 'ZON-ZBA', label: 'Zoning Board of Appeals', group: 'agency', value: 35, description: 'Grants variances from Green Code. Chair: Rev. James A. Lewis. Controversial 3-2 votes on developer-friendly exemptions.', flagged: true },

    // — LOBBYISTS & PACs —
    { id: 'LOB-REBNY', label: 'WNY Real Estate Board', group: 'lobby', value: 20, description: 'Regional real estate industry association. Advocacy for developer-friendly zoning and reduced regulations.' },
    { id: 'LOB-HousingPAC', label: 'Buffalo Housing PAC', group: 'lobby', value: 18, description: 'Political action committee funding council campaigns. Contributions linked to pro-development votes.' },
    { id: 'LOB-Davison', label: 'Matt Davison (Ciminelli Spokesman)', group: 'lobby', value: 15, description: 'Project spokesman for Ciminelli. Presented 201 Ellicott to boards. "We\'re excited about the community impact."' },

    // — TENANT ORGANIZATIONS —
    { id: 'TEN-PUSH', label: 'PUSH Buffalo', group: 'tenant', value: 30, description: 'People United for Sustainable Housing. Community land trust, anti-displacement advocacy, Green Code watchdog.' },
    { id: 'TEN-PPG', label: 'PPG Buffalo', group: 'tenant', value: 25, description: 'Partnership for the Public Good. Eviction research, tenant rights guides, policy reform advocacy.' },
    { id: 'TEN-LegalAid', label: 'Legal Aid Bureau of Buffalo', group: 'tenant', value: 28, description: 'Free legal representation for low-income tenants facing eviction. Emergency lock-out restoration.' },
    { id: 'TEN-WNYLAW', label: 'WNY Law Center', group: 'tenant', value: 22, description: 'Legal services for tenant habitability complaints, rent disputes, and code enforcement actions.' },
  ],

  links: [
    // Council → Zoning votes
    { source: 'CC-Scanlon', target: 'ZON-201Ellicott', value: 18, label: 'Supported variance approval', type: 'vote' },
    { source: 'CC-HaltonPope', target: 'ZON-201Ellicott', value: 15, label: 'Budget oversight of project', type: 'vote' },
    { source: 'CC-Rivera', target: 'ZON-201Ellicott', value: 12, label: 'Committee review', type: 'vote' },
    { source: 'CC-Everhart', target: 'ZON-Lawrence', value: 14, label: 'Housing priority conflict', type: 'vote' },
    { source: 'CC-Rivera', target: 'ZON-Lawrence', value: 10, label: 'Community development review', type: 'vote' },
    
    // Developer → Zoning
    { source: 'DEV-Ciminelli', target: 'ZON-201Ellicott', value: 30, label: '14 variances requested & granted', type: 'exemption' },
    { source: 'DEV-Symphony', target: 'ZON-Lawrence', value: 25, label: '11 variances via 3-2 ZBA vote', type: 'exemption' },
    { source: 'DEV-Ciminelli', target: 'ZON-PlanBoard', value: 20, label: 'Unanimous Planning Board approval', type: 'exemption' },
    { source: 'DEV-Ciminelli', target: 'ZON-ZBA', value: 22, label: 'ZBA variance hearing', type: 'exemption' },
    { source: 'DEV-Symphony', target: 'ZON-ZBA', value: 18, label: '3-2 controversial vote', type: 'exemption' },
    
    // Lobbying connections
    { source: 'LOB-Davison', target: 'DEV-Ciminelli', value: 15, label: 'Project spokesman', type: 'lobbying' },
    { source: 'LOB-Davison', target: 'ZON-PlanBoard', value: 12, label: 'Presented to board', type: 'lobbying' },
    { source: 'LOB-HousingPAC', target: 'CC-Scanlon', value: 10, label: 'Campaign contributions', type: 'funding' },
    { source: 'LOB-HousingPAC', target: 'CC-Rivera', value: 8, label: 'Campaign contributions', type: 'funding' },
    { source: 'LOB-REBNY', target: 'DEV-Ciminelli', value: 14, label: 'Industry advocacy', type: 'lobbying' },
    { source: 'LOB-REBNY', target: 'DEV-Sinatra', value: 11, label: 'Industry membership', type: 'lobbying' },
    
    // Developer rivalries and conflicts
    { source: 'DEV-Termini', target: 'DEV-Ciminelli', value: 16, label: 'Lawsuit threat re: parking', type: 'connection' },
    { source: 'DEV-Termini', target: 'ZON-201Ellicott', value: 12, label: 'Publicly opposed project', type: 'complaint' },
    
    // Sinatra tenant complaints
    { source: 'DEV-Sinatra', target: 'TEN-LegalAid', value: 15, label: 'Multiple tenant complaints filed', type: 'complaint' },
    { source: 'DEV-Sinatra', target: 'TEN-PUSH', value: 10, label: 'Community opposition', type: 'complaint' },
    
    // Shell company connections
    { source: 'DEV-Greenlea', target: 'DEV-Sinatra', value: 8, label: 'Intermediary LLC ownership trail', type: 'ownership' },
    { source: 'DEV-Greenlea', target: 'CC-Rivera', value: 5, label: 'Properties in Niagara District', type: 'connection' },
    
    // Tenant org connections to government
    { source: 'TEN-PUSH', target: 'CC-Everhart', value: 12, label: 'Housing policy advocacy', type: 'lobbying' },
    { source: 'TEN-PPG', target: 'CC-Everhart', value: 10, label: 'Eviction research partnership', type: 'lobbying' },
    { source: 'TEN-PPG', target: 'ZON-GreenCode', value: 8, label: 'Green Code reform advocacy', type: 'lobbying' },
    { source: 'TEN-LegalAid', target: 'ZON-ZBA', value: 7, label: 'Tenant representation at hearings', type: 'complaint' },
    
    // Agency connections
    { source: 'ZON-BURA', target: 'CC-Bollman', value: 9, label: 'Committee membership', type: 'connection' },
    { source: 'ZON-BURA', target: 'CC-Golombek', value: 9, label: 'Committee membership', type: 'connection' },
    { source: 'ZON-BURA', target: 'DEV-Ciminelli', value: 15, label: 'City-owned land disposition', type: 'exemption' },
    { source: 'ZON-PlanBoard', target: 'ZON-ZBA', value: 10, label: 'Sequential review pipeline', type: 'connection' },
  ],

  anomalies: [
    {
      id: 1,
      type: 'Variance Clustering',
      description: 'Ciminelli Real Estate received 14 Green Code variances for 201 Ellicott St, reducing parking from 800 to 29 spaces. The project was backed by the Brown administration and received unanimous Planning Board approval despite community opposition.',
      severity: 'high',
      relatedNodes: ['DEV-Ciminelli', 'ZON-201Ellicott', 'ZON-PlanBoard', 'ZON-ZBA'],
      detectedAt: '2025-01',
      centrality: 0.89,
    },
    {
      id: 2,
      type: 'Split Vote Pattern',
      description: 'ZBA Chair Rev. James A. Lewis led a 3-2 vote granting Symphony Property Management 11 Green Code variances for "The Lawrence" in the Fruit Belt. Residents filed a lawsuit alleging the ZBA "decimated the Green Code" and enabled gentrification.',
      severity: 'critical',
      relatedNodes: ['DEV-Symphony', 'ZON-Lawrence', 'ZON-ZBA'],
      detectedAt: '2024-06',
      centrality: 0.82,
    },
    {
      id: 3,
      type: 'Shell LLC Network',
      description: 'Greenlea Lane Holdings LLC connected through 3 intermediary companies to Sinatra & Co properties. Multiple eviction filings in East Side zip codes (14204, 14211, 14212) traced back to this ownership chain. Sinatra cited as "slumlord" with bait-and-switch, maintenance, and utility billing complaints.',
      severity: 'high',
      relatedNodes: ['DEV-Greenlea', 'DEV-Sinatra', 'TEN-LegalAid'],
      detectedAt: '2025-08',
      centrality: 0.74,
    },
    {
      id: 4,
      type: 'Council Centrality Spike',
      description: 'Council Member David Rivera (Niagara District, serving since 2008) sits on Claims, Community Dev, Legislation, Budget, Transportation, MBE, and Police Oversight committees. Degree centrality 0.71 — connected to both developer-linked zoning actions and shell LLC property addresses in his district.',
      severity: 'medium',
      relatedNodes: ['CC-Rivera', 'ZON-201Ellicott', 'ZON-Lawrence', 'DEV-Greenlea'],
      detectedAt: '2026-01',
      centrality: 0.71,
    },
    {
      id: 5,
      type: 'BURA Land Disposition',
      description: 'Buffalo Urban Renewal Agency transferred city-owned land at 201 Ellicott to Ciminelli at below-market terms. The same parcel that previously held 375 public parking spaces is now a private development with 29 parking spots. Public asset converted to private benefit.',
      severity: 'medium',
      relatedNodes: ['ZON-BURA', 'DEV-Ciminelli', 'ZON-201Ellicott'],
      detectedAt: '2025-03',
      centrality: 0.65,
    },
  ],

  statutes: [
    {
      id: 1,
      code: 'NY RPL § 235-b',
      title: 'Warranty of Habitability',
      description: 'New York Real Property Law § 235-b requires landlords to maintain all residential units in habitable condition. Tenants may raise a habitability defense in eviction proceedings, seek rent abatement, or pay rent into court escrow while repairs are made. Landlords of multiple dwellings must keep apartments and public areas in good repair, clean, and free of vermin.',
      keywords: ['habitability', 'repair', 'defect', 'maintenance', 'vermin', 'heat', 'water'],
      relevanceScore: 95,
      source: 'NY Real Property Law',
    },
    {
      id: 2,
      code: 'NY RPL § 223-b',
      title: 'Retaliatory Eviction Protection',
      description: 'No landlord may evict a tenant in retaliation for good faith complaints about code violations or exercising legal rights. Presumption of retaliation for 1 year after a tenant complaint. Burden shifts to landlord to prove non-retaliatory motive. Applies to complaints to code enforcement, health department, or housing court.',
      keywords: ['retaliation', 'complaint', 'code violation', 'good faith', 'defense'],
      relevanceScore: 92,
      source: 'Housing Stability & Tenant Protection Act 2019',
    },
    {
      id: 3,
      code: 'RPAPL § 711(2)',
      title: '14-Day Written Rent Demand',
      description: 'Before filing for non-payment eviction, landlord must serve a written 14-day rent demand (changed from 3 days by HSTPA 2019). If tenant pays within 14 days and deposits with court, eviction is dismissed. Both parties have right to 14-day adjournment.',
      keywords: ['non-payment', 'rent demand', '14 days', 'written notice', 'adjournment'],
      relevanceScore: 90,
      source: 'Real Property Actions & Proceedings Law',
    },
    {
      id: 4,
      code: 'NY RPL § 226-c',
      title: 'Advance Notice of Rent Increase or Non-Renewal',
      description: 'For rent increases over 5% or lease non-renewals: 30 days notice if tenancy under 1 year, 60 days if 1-2 years, 90 days if 2+ years. Buffalo has no rent control — landlords may raise rent by any amount between lease terms, but must comply with these notice requirements.',
      keywords: ['rent increase', 'non-renewal', 'notice', '30 days', '60 days', '90 days'],
      relevanceScore: 88,
      source: 'Housing Stability & Tenant Protection Act 2019',
    },
    {
      id: 5,
      code: 'NY RPL § 235 / RPAPL § 853',
      title: 'Prohibition of Self-Help Eviction (Illegal Lockout)',
      description: 'Self-help eviction is illegal in New York. Landlord may not change locks, remove belongings, shut off heat/water/electricity, or use threats. Only a sheriff, marshal, or constable can execute a Warrant of Eviction. Tenants can seek emergency court restoration and may be entitled to treble (triple) damages.',
      keywords: ['lockout', 'self-help', 'illegal eviction', 'utilities', 'locks changed', 'triple damages'],
      relevanceScore: 94,
      source: 'NY Real Property Law / RPAPL',
    },
    {
      id: 6,
      code: 'NY GOL § 7-108',
      title: 'Security Deposit Return (14 Days)',
      description: 'Landlord must return security deposit with itemized written statement of deductions within 14 days of tenant vacating. If landlord fails to provide statement within 14 days, landlord forfeits all right to retain any portion — must return full amount even if actual damage occurred.',
      keywords: ['security deposit', '14 days', 'itemized', 'deductions', 'forfeiture'],
      relevanceScore: 85,
      source: 'NY General Obligations Law',
    },
    {
      id: 7,
      code: 'Buffalo Green Code § 3.3',
      title: 'Neighborhood Zone Protections (Green Code)',
      description: 'Buffalo\'s Unified Development Ordinance (Green Code) establishes form-based zoning with neighborhood character protections. Variances require ZBA approval. Projects exceeding zone parameters require environmental and community impact review. No parking minimums required for new developments.',
      keywords: ['green code', 'zoning', 'variance', 'neighborhood', 'parking', 'form-based'],
      relevanceScore: 78,
      source: 'City of Buffalo Unified Development Ordinance',
    },
    {
      id: 8,
      code: 'NY MDL § 78 & § 80',
      title: 'Multiple Dwelling Code Enforcement',
      description: 'City of Buffalo Inspection & Permit Services enforces dwelling code violations. Landlords must maintain electrical, plumbing, sanitary, heating, and ventilating systems. Tenants can file complaints for code enforcement inspections. Violations can be used as defense in eviction proceedings.',
      keywords: ['code enforcement', 'inspection', 'plumbing', 'heating', 'electrical', 'dwelling'],
      relevanceScore: 82,
      source: 'NY Multiple Dwelling Law',
    },
  ],

  hotspots: [
    { zipCode: '14204', neighborhood: 'Ellicott / Fruit Belt', evictionRate: 18.4, recentCases: 47, trend: 'rising', lat: 42.892, lng: -78.856 },
    { zipCode: '14211', neighborhood: 'East Side / Kensington', evictionRate: 22.1, recentCases: 63, trend: 'rising', lat: 42.918, lng: -78.825 },
    { zipCode: '14212', neighborhood: 'Broadway-Fillmore', evictionRate: 16.8, recentCases: 34, trend: 'rising', lat: 42.903, lng: -78.826 },
    { zipCode: '14208', neighborhood: 'Masten / MLK Park', evictionRate: 15.2, recentCases: 31, trend: 'stable', lat: 42.912, lng: -78.856 },
    { zipCode: '14213', neighborhood: 'West Side / Grant', evictionRate: 12.7, recentCases: 52, trend: 'rising', lat: 42.917, lng: -78.893 },
    { zipCode: '14215', neighborhood: 'Kensington-Bailey', evictionRate: 11.3, recentCases: 68, trend: 'stable', lat: 42.933, lng: -78.813 },
    { zipCode: '14207', neighborhood: 'Black Rock / Riverside', evictionRate: 9.8, recentCases: 38, trend: 'declining', lat: 42.940, lng: -78.905 },
    { zipCode: '14201', neighborhood: 'Allentown / Elmwood Village', evictionRate: 7.2, recentCases: 14, trend: 'stable', lat: 42.900, lng: -78.876 },
    { zipCode: '14209', neighborhood: 'North Buffalo / Hamlin Park', evictionRate: 8.5, recentCases: 15, trend: 'stable', lat: 42.925, lng: -78.862 },
    { zipCode: '14206', neighborhood: 'South Buffalo / Seneca', evictionRate: 6.9, recentCases: 23, trend: 'declining', lat: 42.876, lng: -78.820 },
  ],

  stats: {
    totalEvictionsLogged: 385,
    activeHotspots: 5,
    anomaliesDetected: 5,
    tenantsProtected: 1284,
    zoningExemptions: 25,
  },
};

// ============================================================
// CITY REGISTRY
// ============================================================
import { nycData } from './cities/nyc';
import { laData } from './cities/la';
import { chicagoData } from './cities/chicago';
import { houstonData, phillyData, phoenixData, sanAntonioData, sanDiegoData, dallasData, austinData, detroitData, sfData, seattleData, denverData, dcData, bostonData, nashvilleData, miamiData, atlData, minneapolisData, portlandData } from './cities/more';

export const cityRegistry: Record<string, CityData> = {
  'buffalo-ny': buffaloData,
  'nyc-ny': nycData,
  'la-ca': laData,
  'chicago-il': chicagoData,
  'philly-pa': phillyData,
  'houston-tx': houstonData,
  'phoenix-az': phoenixData,
  'sanantonio-tx': sanAntonioData,
  'sandiego-ca': sanDiegoData,
  'dallas-tx': dallasData,
  'austin-tx': austinData,
  'detroit-mi': detroitData,
  'sf-ca': sfData,
  'seattle-wa': seattleData,
  'denver-co': denverData,
  'dc': dcData,
  'boston-ma': bostonData,
  'nashville-tn': nashvilleData,
  'miami-fl': miamiData,
  'atl-ga': atlData,
  'mpls-mn': minneapolisData,
  'portland-or': portlandData,
};

// Helper to get available cities
export const getAvailableCities = (): { id: string; name: string; state: string }[] => {
  return Object.values(cityRegistry).map(c => ({
    id: c.id,
    name: c.name,
    state: c.state,
  }));
};

// Helper to get city data by ID
export const getCityData = (cityId: string): CityData | null => {
  return cityRegistry[cityId] || null;
};
