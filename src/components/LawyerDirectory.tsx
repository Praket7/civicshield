'use client';
import React, { useState } from 'react';
import { Phone, Globe, Scale, CheckCircle, Filter } from 'lucide-react';
import { getLawyers, type LawyerEntry } from '@/lib/lawyerDirectory';

export default function LawyerDirectory({ cityId, cityName }: { cityId: string; cityName: string }) {
  const lawyers = getLawyers(cityId);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? lawyers : filter === 'free' ? lawyers.filter(l => l.freeService) : lawyers.filter(l => l.type === filter);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-5 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Lawyer Directory — {cityName}</h3>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">{lawyers.filter(l => l.freeService).length} FREE SERVICES</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[['all', 'All'], ['free', 'Free Only'], ['legal-aid', 'Legal Aid'], ['nonprofit', 'Nonprofit'], ['hotline', 'Hotlines']].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)}
              className={`px-3 py-1 text-[10px] rounded-full border transition-all ${filter === id ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-zinc-800 max-h-[500px] overflow-auto">
        {filtered.map((l, i) => (
          <div key={i} className="p-5 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm">{l.name}</span>
                  {l.freeService && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" /> FREE
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-500 capitalize mt-0.5">{l.type.replace('-', ' ')}</div>
              </div>
              <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                <Phone className="w-3 h-3" /> {l.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {l.specialties.map((s, j) => (
                <span key={j} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full">{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
              {l.website && (
                <a href={l.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-violet-400 transition-colors">
                  <Globe className="w-3 h-3" /> Website
                </a>
              )}
              {l.languages && l.languages.length > 1 && (
                <span>Languages: {l.languages.join(', ')}</span>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-zinc-600 text-xs">No results for this filter.</div>
        )}
      </div>
    </div>
  );
}
