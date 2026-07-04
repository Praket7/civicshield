'use client';

import React, { useState } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import type { CityData, EvictionHotspot } from '@/lib/cityData';

interface HotspotMapProps {
  cityData: CityData;
}

const HotspotMap: React.FC<HotspotMapProps> = ({ cityData }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<EvictionHotspot | null>(null);

  const maxRate = Math.max(...cityData.hotspots.map(h => h.evictionRate));
  const totalCases = cityData.hotspots.reduce((sum, h) => sum + h.recentCases, 0);

  const getBarColor = (rate: number) => {
    const pct = rate / maxRate;
    if (pct > 0.7) return 'bg-red-500';
    if (pct > 0.4) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <TrendingUp className="w-3 h-3 text-red-400" />;
    if (trend === 'declining') return <TrendingDown className="w-3 h-3 text-emerald-400" />;
    return <Minus className="w-3 h-3 text-zinc-500" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'rising') return 'text-red-400';
    if (trend === 'declining') return 'text-emerald-400';
    return 'text-zinc-500';
  };

  return (
    <div id="hotspots" className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{cityData.name} Eviction Hotspot Map</h3>
              <p className="text-xs text-zinc-500">Neighborhood predatory alert system • {totalCases} recent cases tracked • SDG 11</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> HIGH RISK</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> MODERATE</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> LOW</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 divide-x divide-zinc-800">
        {/* Neighborhood Grid Map */}
        <div className="col-span-7 p-6">
          <div className="grid grid-cols-3 gap-3">
            {cityData.hotspots.sort((a, b) => b.evictionRate - a.evictionRate).map((hotspot) => {
              const pct = hotspot.evictionRate / maxRate;
              const isSelected = selectedHotspot?.zipCode === hotspot.zipCode;
              return (
                <button
                  key={hotspot.zipCode}
                  onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                  className={`relative p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98]
                    ${isSelected
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'
                    }`}
                >
                  {hotspot.trend === 'rising' && (
                    <div className="absolute top-2 right-2">
                      <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
                    </div>
                  )}
                  <div className="font-mono text-[10px] text-zinc-500 mb-1">{hotspot.zipCode}</div>
                  <div className="text-sm font-medium text-white truncate">{hotspot.neighborhood}</div>
                  <div className="mt-3 flex items-end gap-2">
                    <div className="text-2xl font-mono font-bold" style={{
                      color: pct > 0.7 ? '#ef4444' : pct > 0.4 ? '#f59e0b' : '#10b981'
                    }}>
                      {hotspot.evictionRate}
                    </div>
                    <div className="text-[10px] text-zinc-500 pb-1">per 1K units</div>
                  </div>
                  <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getBarColor(hotspot.evictionRate)}`}
                      style={{ width: `${pct * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">{hotspot.recentCases} cases</span>
                    <span className={`flex items-center gap-1 ${getTrendColor(hotspot.trend)}`}>
                      {getTrendIcon(hotspot.trend)} {hotspot.trend}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-5 p-6">
          {selectedHotspot ? (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">NEIGHBORHOOD ANALYSIS</div>
              <h4 className="text-2xl font-semibold text-white mb-1">{selectedHotspot.neighborhood}</h4>
              <div className="font-mono text-zinc-400 text-sm mb-6">ZIP {selectedHotspot.zipCode} • {cityData.name}, {cityData.state}</div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 mb-1">EVICTION RATE</div>
                    <div className="text-3xl font-mono font-bold" style={{
                      color: (selectedHotspot.evictionRate / maxRate) > 0.7 ? '#ef4444' : '#f59e0b'
                    }}>
                      {selectedHotspot.evictionRate}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">per 1,000 rental units</div>
                  </div>
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 mb-1">RECENT CASES</div>
                    <div className="text-3xl font-mono font-bold text-white">{selectedHotspot.recentCases}</div>
                    <div className={`text-[10px] mt-1 flex items-center gap-1 ${getTrendColor(selectedHotspot.trend)}`}>
                      {getTrendIcon(selectedHotspot.trend)} Trend: {selectedHotspot.trend}
                    </div>
                  </div>
                </div>

                {/* Connected anomalies */}
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">LINKED ANOMALIES</div>
                  {cityData.anomalies.filter(a =>
                    a.description.toLowerCase().includes(selectedHotspot.zipCode) ||
                    a.description.toLowerCase().includes(selectedHotspot.neighborhood.split('/')[0].trim().toLowerCase())
                  ).length > 0 ? (
                    cityData.anomalies.filter(a =>
                      a.description.toLowerCase().includes(selectedHotspot.zipCode) ||
                      a.description.toLowerCase().includes(selectedHotspot.neighborhood.split('/')[0].trim().toLowerCase())
                    ).map(a => (
                      <div key={a.id} className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl mb-2">
                        <div className="text-xs font-medium text-red-400">{a.type}</div>
                        <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{a.description}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-500 text-center">
                      No direct anomaly linkage detected.<br />Cross-reference with graph for indirect connections.
                    </div>
                  )}
                </div>

                {/* Relevant statutes */}
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">TOP TENANT PROTECTIONS</div>
                  {cityData.statutes.slice(0, 3).map(s => (
                    <div key={s.id} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-2">
                      <div className="flex justify-between items-baseline">
                        <div className="text-xs font-mono text-violet-400">{s.code}</div>
                        <div className="text-[10px] text-emerald-400">{s.relevanceScore}%</div>
                      </div>
                      <div className="text-[11px] text-zinc-300 mt-1">{s.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <MapPin className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
                <div className="text-zinc-400 text-sm font-medium">Select a neighborhood</div>
                <div className="text-zinc-600 text-xs mt-2 max-w-[200px] mx-auto">
                  Click any hotspot tile to see detailed eviction data, linked anomalies, and applicable tenant protections
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;
