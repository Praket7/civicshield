'use client';
import React, { useState } from 'react';
import { Search, AlertTriangle, Building2, Link2, FileWarning, X } from 'lucide-react';
import type { CityData } from '@/lib/cityData';

interface LookupResult {
  node: any; connections: any[]; anomalies: any[]; hotspots: any[];
  riskLevel: string; totalConnections: number; evictionFilings: number; violationCount: number;
}

export default function LandlordLookup({ cityData }: { cityData: CityData }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LookupResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<LookupResult | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true); setSearched(true);
    try {
      const res = await fetch(`/api/lookup?cityId=${cityData.id}&q=${encodeURIComponent(query)}&type=landlord`);
      const data = await res.json();
      setResults(data.results || []);
    } catch { setResults([]); }
    setLoading(false);
  };

  const riskColor = (l: string) => l === 'high' ? 'text-red-400' : l === 'medium' ? 'text-amber-400' : 'text-emerald-400';
  const riskBg = (l: string) => l === 'high' ? 'bg-red-500/10 border-red-500/30' : l === 'medium' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30';

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold">Landlord & Entity Lookup</h3>
          <span className="text-[10px] text-zinc-500 ml-2">{cityData.name}</span>
        </div>
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Search landlord, developer, LLC, or council member..."
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500" />
          <button onClick={search} disabled={loading} className="px-6 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-violet-300 transition-colors disabled:opacity-50">
            {loading ? '...' : 'Search'}
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {['Ciminelli', 'Sinatra', 'Kushner', 'Caruso', 'Related'].filter(name => 
            cityData.nodes.some(n => n.label.toLowerCase().includes(name.toLowerCase()))
          ).slice(0, 4).map(name => (
            <button key={name} onClick={() => { setQuery(name); setTimeout(() => { setQuery(name); search(); }, 0); }}
              className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors">
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {loading && <div className="text-center py-8 text-zinc-500 text-sm">Searching graph...</div>}
        {!loading && searched && results.length === 0 && <div className="text-center py-8 text-zinc-600 text-sm">No entities found matching &quot;{query}&quot; in {cityData.name}.</div>}
        {!loading && results.length > 0 && !selected && (
          <div className="space-y-3">
            {results.map((r, i) => (
              <button key={i} onClick={() => setSelected(r)} className="w-full text-left p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-2xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-zinc-400" />
                    <span className="font-medium text-white">{r.node.label}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded-full capitalize">{r.node.group}</span>
                  </div>
                  <div className={`text-[10px] px-2 py-0.5 rounded-full border ${riskBg(r.riskLevel)} ${riskColor(r.riskLevel)} uppercase font-medium`}>
                    {r.riskLevel} RISK
                  </div>
                </div>
                <div className="text-xs text-zinc-300 line-clamp-1">{r.node.description}</div>
                <div className="flex gap-4 mt-2 text-[10px] text-zinc-600">
                  <span>{r.totalConnections} connections</span>
                  <span>{r.anomalies.length} anomalies</span>
                  <span>{r.evictionFilings} filings</span>
                  <span>{r.violationCount} violations</span>
                </div>
              </button>
            ))}
          </div>
        )}
        {selected && (
          <div>
            <button onClick={() => setSelected(null)} className="text-xs text-zinc-500 hover:text-white mb-4 flex items-center gap-1">← Back to results</button>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xl font-semibold text-white">{selected.node.label}</div>
                <div className="text-xs text-zinc-500 capitalize">{selected.node.group} {selected.node.district ? `• ${selected.node.district}` : ''}</div>
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium ${riskBg(selected.riskLevel)} ${riskColor(selected.riskLevel)}`}>
                {selected.riskLevel.toUpperCase()} RISK
              </div>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed mb-6">{selected.node.description}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-zinc-900 rounded-xl text-center">
                <div className="text-xl font-mono font-bold text-white">{selected.totalConnections}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Connections</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl text-center">
                <div className="text-xl font-mono font-bold text-red-400">{selected.evictionFilings}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Eviction Filings</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl text-center">
                <div className="text-xl font-mono font-bold text-amber-400">{selected.violationCount}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Violations</div>
              </div>
            </div>
            {selected.anomalies.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-widest text-red-400 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> LINKED ANOMALIES</div>
                {selected.anomalies.map((a: any, i: number) => (
                  <div key={i} className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl mb-2 text-xs">
                    <div className="font-medium text-red-300">{a.type} ({a.severity})</div>
                    <div className="text-zinc-500 mt-1 line-clamp-2">{a.description}</div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1"><Link2 className="w-3 h-3" /> NETWORK CONNECTIONS</div>
              <div className="space-y-1.5 max-h-48 overflow-auto">
                {selected.connections.map((c: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs p-2 bg-zinc-900 rounded-lg">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.group === 'council' ? '#3b82f6' : c.group === 'developer' ? '#ef4444' : c.group === 'tenant' ? '#10b981' : '#64748b' }} />
                    <span className="text-zinc-300">{c.label}</span>
                    {c.linkLabel && <span className="text-zinc-600 ml-auto text-[10px] truncate max-w-[200px]">{c.linkLabel}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!searched && !loading && (
          <div className="text-center py-8 text-zinc-600 text-xs">
            Search for any landlord, developer, LLC, or council member to see their violation history, graph connections, and linked anomalies.
          </div>
        )}
      </div>
    </div>
  );
}
