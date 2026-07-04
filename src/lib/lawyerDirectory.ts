export interface LawyerEntry {
  name: string;
  type: 'legal-aid' | 'nonprofit' | 'private' | 'hotline';
  phone: string;
  website?: string;
  specialties: string[];
  freeService: boolean;
  languages?: string[];
}

export const cityLawyers: Record<string, LawyerEntry[]> = {
  'buffalo-ny': [
    { name: 'Legal Aid Bureau of Buffalo', type: 'legal-aid', phone: '(716) 853-9555', website: 'https://legalaidbuffalo.org', specialties: ['Eviction defense', 'Habitability', 'Lockout'], freeService: true, languages: ['English', 'Spanish'] },
    { name: 'Neighborhood Legal Services', type: 'nonprofit', phone: '(716) 847-0650', website: 'https://nls.org', specialties: ['Housing', 'Public benefits', 'Consumer'], freeService: true },
    { name: 'Western NY Law Center', type: 'nonprofit', phone: '(716) 855-0203', specialties: ['Tenant rights', 'Code enforcement'], freeService: true },
    { name: 'PUSH Buffalo', type: 'nonprofit', phone: '(716) 882-2672', website: 'https://pushbuffalo.org', specialties: ['Organizing', 'Anti-displacement', 'Green Code'], freeService: true },
    { name: 'Erie County Bar Association Lawyer Referral', type: 'private', phone: '(716) 852-8687', specialties: ['Landlord-tenant', 'Real estate'], freeService: false },
  ],
  'nyc-ny': [
    { name: 'NYC Right to Counsel (via 311)', type: 'legal-aid', phone: '311', website: 'https://www.righttocounselnyc.org', specialties: ['Eviction defense', 'All housing'], freeService: true, languages: ['English', 'Spanish', 'Chinese', 'Haitian Creole', 'Russian', 'Arabic'] },
    { name: 'Legal Aid Society', type: 'legal-aid', phone: '(212) 577-3300', website: 'https://legalaidnyc.org', specialties: ['Eviction', 'NYCHA', 'Rent overcharge'], freeService: true },
    { name: 'Met Council on Housing Hotline', type: 'hotline', phone: '(212) 979-0611', website: 'https://metcouncilonhousing.org', specialties: ['Tenant hotline', 'Rent stabilization', 'Harassment'], freeService: true },
    { name: 'Housing Court Help Center', type: 'legal-aid', phone: '(646) 386-5554', specialties: ['Court navigation', 'Pro se assistance'], freeService: true },
    { name: 'CASA (Community Action for Safe Apartments)', type: 'nonprofit', phone: '(718) 716-8000', specialties: ['Bronx housing', 'Lead paint', 'Mold'], freeService: true, languages: ['English', 'Spanish'] },
    { name: 'Legal Services NYC', type: 'legal-aid', phone: '(917) 661-4500', website: 'https://legalservicesnyc.org', specialties: ['Eviction', 'Benefits', 'Immigration'], freeService: true },
  ],
  'la-ca': [
    { name: 'LA Right to Counsel', type: 'legal-aid', phone: '(213) 985-4357', specialties: ['Eviction defense', 'RSO', 'JCO'], freeService: true, languages: ['English', 'Spanish', 'Korean', 'Chinese'] },
    { name: 'Legal Aid Foundation of LA (LAFLA)', type: 'legal-aid', phone: '(800) 399-4529', website: 'https://lafla.org', specialties: ['Housing', 'Domestic violence', 'Immigration'], freeService: true },
    { name: 'LA Tenants Union', type: 'nonprofit', phone: '(213) 986-8266', specialties: ['Tenant organizing', 'Rent strikes', 'Anti-displacement'], freeService: true },
    { name: 'SAJE (Strategic Actions for a Just Economy)', type: 'nonprofit', phone: '(213) 745-9961', website: 'https://sfraje.org', specialties: ['South LA housing', 'Anti-gentrification'], freeService: true, languages: ['English', 'Spanish'] },
    { name: 'Bet Tzedek Legal Services', type: 'legal-aid', phone: '(323) 939-0506', specialties: ['Elder abuse', 'Housing', 'Employment'], freeService: true },
    { name: 'LAHD Rent Registry Hotline', type: 'hotline', phone: '(866) 557-7368', specialties: ['RSO registration', 'Rent limits', 'REAP'], freeService: true },
  ],
  'chicago-il': [
    { name: 'Legal Aid Chicago', type: 'legal-aid', phone: '(312) 341-1070', website: 'https://legalaidchicago.org', specialties: ['Eviction', 'Foreclosure', 'RLTO'], freeService: true },
    { name: 'Metropolitan Tenants Organization', type: 'hotline', phone: '(773) 292-4988', website: 'https://tenants-rights.org', specialties: ['Tenant hotline', 'RLTO violations', 'Organizing'], freeService: true },
    { name: 'Lawyers Committee for Better Housing', type: 'nonprofit', phone: '(312) 347-7600', specialties: ['Affordable housing', 'Fair housing', 'Eviction defense'], freeService: true },
  ],
};

// Fallback for cities without specific entries
export function getLawyers(cityId: string): LawyerEntry[] {
  if (cityLawyers[cityId]) return cityLawyers[cityId];
  // Generic based on state
  return [
    { name: 'Legal Aid Hotline (Statewide)', type: 'hotline', phone: '211', specialties: ['Referral service', 'Housing', 'Benefits'], freeService: true },
    { name: 'Local Bar Association Referral', type: 'private', phone: 'Search your local bar association', specialties: ['Landlord-tenant', 'Real estate'], freeService: false },
  ];
}
