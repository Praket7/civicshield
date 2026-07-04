// Groq AI integration — falls back to keyword matching if no API key
import { getCityData } from './cityData';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface GroqMessage { role: 'system' | 'user' | 'assistant'; content: string; }

export async function groqChat(userMessage: string, cityId: string): Promise<string> {
  const city = getCityData(cityId);
  if (!city) return "City not found. Please select a city from the dropdown.";

  // If no Groq key, use enhanced local matching
  if (!GROQ_API_KEY) return localResponse(userMessage, cityId);

  const tenantOrgs = city.nodes.filter(n => n.group === 'tenant').slice(0, 3);
  const topStatutes = city.statutes.slice(0, 5);
  const systemPrompt = `You are CivicShield AI, a tenant rights assistant for ${city.name}, ${city.state}. Cite specific statutes. Give numbered steps. Be empathetic but factual. End with disclaimer.

STATUTES:
${topStatutes.map(s => `• ${s.code} — ${s.title}: ${s.description.substring(0, 120)}`).join('\n')}

TENANT ORGS: ${tenantOrgs.map(n => n.label).join(', ')}

RULES: Cite statute codes. Give 3-5 steps. Mention tenant org by name. End with: "⚠️ This is legal information, not legal advice." Use **bold** for key terms.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ] as GroqMessage[],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error('Groq API error:', response.status);
      return localResponse(userMessage, cityId);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || localResponse(userMessage, cityId);
  } catch (err) {
    console.error('Groq fetch error:', err);
    return localResponse(userMessage, cityId);
  }
}

export async function groqExtractEntities(text: string): Promise<{
  tenantName: string; landlordName: string; address: string;
  evictionDate: string; reason: string; rentAmount: string;
}> {
  if (!GROQ_API_KEY) {
    return { tenantName: '', landlordName: '', address: '', evictionDate: '', reason: '', rentAmount: '' };
  }
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{
          role: 'system',
          content: 'Extract entities from this eviction notice. Return ONLY valid JSON with these exact keys: tenantName, landlordName, address, evictionDate, reason, rentAmount. If a field is not found, use empty string "".'
        }, {
          role: 'user',
          content: text.substring(0, 3000),
        }],
        temperature: 0,
        max_tokens: 300,
      }),
    });
    if (!response.ok) return { tenantName: '', landlordName: '', address: '', evictionDate: '', reason: '', rentAmount: '' };
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return { tenantName: '', landlordName: '', address: '', evictionDate: '', reason: '', rentAmount: '' };
  } catch {
    return { tenantName: '', landlordName: '', address: '', evictionDate: '', reason: '', rentAmount: '' };
  }
}

// Enhanced local response (no Groq needed)
function localResponse(userMessage: string, cityId: string): string {
  const city = getCityData(cityId);
  if (!city) return "City not found.";
  const msg = userMessage.toLowerCase();

  const tenantOrg = city.nodes.find(n => n.group === 'tenant')?.label || 'your local tenant organization';
  const disclaimer = '\n\n⚠️ This is legal information, not legal advice. Contact a licensed attorney for your specific case.';

  if (msg.includes('evict') || msg.includes('kicked out') || msg.includes('notice to quit') || msg.includes('leave')) {
    const s = city.statutes.find(s => s.keywords.some(k => k.includes('eviction') || k.includes('just cause') || k.includes('lockout')));
    return `🛡️ **Eviction Defense for ${city.name}, ${city.state}:**\n\nYour landlord CANNOT evict you without proper legal procedure.\n\n**Key Protection:** ${s?.code || 'Local housing code'} — ${s?.title || 'Eviction protections'}\n\n${s?.description?.substring(0, 280) || 'Contact legal aid.'}...\n\n**Steps:**\n1. DO NOT leave voluntarily\n2. Document everything in writing\n3. File complaint with ${city.name} code enforcement\n4. Contact **${tenantOrg}** for free help${disclaimer}`;
  }
  if (msg.includes('repair') || msg.includes('fix') || msg.includes('broken') || msg.includes('heat') || msg.includes('mold') || msg.includes('water') || msg.includes('pest') || msg.includes('roach') || msg.includes('leak')) {
    const s = city.statutes.find(s => s.keywords.some(k => k.includes('habitab') || k.includes('repair') || k.includes('maintenance')));
    return `🏚️ **Habitability Rights in ${city.name}:**\n\nYour landlord is **legally required** to maintain habitable conditions.\n\n**Key Law:** ${s?.code || 'Housing code'} — ${s?.title || 'Warranty of Habitability'}\n\n${s?.description?.substring(0, 280) || 'Landlords must fix health/safety issues.'}...\n\n**Steps:**\n1. Send WRITTEN repair request (certified mail/email)\n2. Take dated photos\n3. File complaint with ${city.name} inspection department\n4. Contact **${tenantOrg}**\n5. Generate a Habitability Complaint letter using the Documents tab${disclaimer}`;
  }
  if (msg.includes('rent') && (msg.includes('increase') || msg.includes('raise') || msg.includes('hike') || msg.includes('too much') || msg.includes('went up'))) {
    const s = city.statutes.find(s => s.keywords.some(k => k.includes('rent') || k.includes('increase') || k.includes('stabiliz')));
    return `📈 **Rent Increase Rules in ${city.name}:**\n\n**Key Law:** ${s?.code || 'Rent regulation'} — ${s?.title || 'Rent limits'}\n\n${s?.description?.substring(0, 300) || 'Check local rent laws.'}...\n\n**Check:**\n1. Is your unit rent-stabilized/controlled?\n2. Did landlord give proper written notice?\n3. Does increase exceed the legal max?\n\n**If illegal:** Use the Rent Overcharge template in Documents tab.\nUse the **Risk Calculator** tab to assess your situation.${disclaimer}`;
  }
  if (msg.includes('deposit') || msg.includes('security')) {
    const s = city.statutes.find(s => s.keywords.some(k => k.includes('deposit')));
    return `💰 **Security Deposit in ${city.name}:**\n\n**Key Law:** ${s?.code || 'Deposit law'} — ${s?.title || 'Deposit return'}\n\n${s?.description?.substring(0, 250) || 'Landlord must return deposit within statutory deadline.'}...\n\n**Your rights:**\n1. Deposit return within statutory deadline\n2. Itemized written statement required\n3. Failure to itemize = forfeit deductions\n\nGenerate a **Security Deposit Demand** letter in the Documents tab.${disclaimer}`;
  }
  if (msg.includes('lock') || msg.includes('shut off') || msg.includes('utility') || msg.includes('illegal') || msg.includes('changed the lock')) {
    const s = city.statutes.find(s => s.keywords.some(k => k.includes('lockout') || k.includes('self-help')));
    return `🚨 **EMERGENCY — Illegal Eviction in ${city.name}:**\n\n**THIS IS ILLEGAL.** Your landlord CANNOT change locks, shut off utilities, or remove belongings.\n\n**Key Law:** ${s?.code || 'Self-help ban'} — ${s?.title || 'Lockout ban'}\n\n${s?.description?.substring(0, 200) || 'Severe penalties apply.'}...\n\n**IMMEDIATE STEPS:**\n1. 🚔 Call the police\n2. 📱 Call **${tenantOrg}**\n3. 📸 Document everything\n4. ⚖️ You may be entitled to **TRIPLE DAMAGES**\n\n**Do not leave.** Only a sheriff with a court Warrant can remove you.${disclaimer}`;
  }
  if (msg.includes('harass') || msg.includes('threaten') || msg.includes('intimidat') || msg.includes('scare')) {
    return `🚨 **Landlord Harassment in ${city.name}:**\n\nHarassment is illegal:\n- Verbal threats\n- Construction noise to force you out\n- Reducing services\n- Refusing repairs\n- Frivolous eviction filings\n\n**Steps:**\n1. Document EVERY incident\n2. File complaint with ${city.name} Housing Dept\n3. Contact **${tenantOrg}**\n4. Generate a **Harassment Complaint** in Documents tab${disclaimer}`;
  }
  if (msg.includes('anomal') || msg.includes('corrupt') || msg.includes('developer') || msg.includes('zoning') || msg.includes('graph')) {
    return `🔍 **Institutional Anomalies in ${city.name}:**\n\nCivicShield detected **${city.anomalies.length} anomalies**:\n\n${city.anomalies.slice(0, 3).map((a, i) => `${i + 1}. **${a.type}** (${a.severity.toUpperCase()}${a.centrality ? `, centrality: ${a.centrality}` : ''})\n   ${a.description.substring(0, 130)}...`).join('\n\n')}\n\nExplore the **Institutional Graph** tab for the full network.`;
  }
  if (msg.includes('lawyer') || msg.includes('attorney') || msg.includes('legal help') || msg.includes('legal aid')) {
    const orgs = city.nodes.filter(n => n.group === 'tenant');
    return `⚖️ **Legal Help in ${city.name}:**\n\n${orgs.map(o => `• **${o.label}**\n  ${o.description || 'Tenant rights assistance'}`).join('\n\n')}\n\nMany offer free representation to income-eligible tenants.\nCheck the **Lawyer Directory** section for more options.${disclaimer}`;
  }
  if (msg.includes('court') || msg.includes('hearing') || msg.includes('court date')) {
    return `📅 **Court Preparation for ${city.name}:**\n\n**Before your hearing:**\n1. Bring ALL documentation (photos, letters, receipts)\n2. Bring copies of your lease\n3. Arrive 30 minutes early\n4. Dress professionally\n5. Bring a witness if possible\n\n**Key:** Ask for a **Right to Counsel** attorney — you may qualify for free representation.\n\nUse the **Documents** tab to generate your Answer to Eviction before court.${disclaimer}`;
  }
  // Default
  return `👋 **CivicShield AI — ${city.name}, ${city.state}**\n\nI can help you with:\n\n• 🏠 **Eviction defense** — "I'm being evicted"\n• 🔧 **Repair issues** — "My heat is broken"\n• 💰 **Security deposits** — "I didn't get my deposit back"\n• 📈 **Rent increases** — "My rent went up too much"\n• 🚨 **Illegal lockouts** — "My locks were changed"\n• 🏗️ **Harassment** — "My landlord is threatening me"\n• 🔍 **Corruption** — "Tell me about zoning anomalies"\n• ⚖️ **Legal help** — "I need a lawyer"\n• 📅 **Court prep** — "I have a court date"\n\nDescribe your situation and I'll cite ${city.state} laws.\n\nFor your case, contact **${tenantOrg}**.${disclaimer}`;
}
