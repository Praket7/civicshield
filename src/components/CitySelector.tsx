'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Building2, Check, Users, AlertTriangle } from 'lucide-react';
import { getAvailableCities, getCityData } from '@/lib/cityData';

interface CitySelectorProps {
  currentCityId: string;
  onCityChange: (cityId: string) => void;
  cityName: string;
  cityState: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ currentCityId, onCityChange, cityName, cityState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cities = getAvailableCities();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-2xl hover:border-violet-500/50 transition-all text-sm"
      >
        <MapPin className="w-4 h-4 text-violet-400" />
        <span className="font-medium text-white">{cityName}</span>
        <span className="text-zinc-500">{cityState}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">SELECT CITY</div>
            <div className="text-[10px] text-emerald-400 font-mono">{cities.length} CITIES LIVE</div>
          </div>
          <div className="max-h-80 overflow-auto">
            {cities.map(city => {
              const data = getCityData(city.id);
              const isActive = city.id === currentCityId;
              return (
                <button
                  key={city.id}
                  onClick={() => { onCityChange(city.id); setIsOpen(false); }}
                  className={`w-full px-4 py-3.5 flex items-start gap-3 text-left hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 last:border-0
                    ${isActive ? 'bg-violet-500/10' : ''}`}
                >
                  <Building2 className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-violet-400' : 'text-zinc-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-white">{city.name}</div>
                      <div className="text-[10px] text-zinc-500">{city.state}</div>
                    </div>
                    {data && (
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" />
                          {data.population.toLocaleString()}
                        </span>
                        <span>{data.nodes.length} nodes</span>
                        <span className="flex items-center gap-1 text-red-400/70">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {data.anomalies.length}
                        </span>
                        <span>{data.hotspots.length} hotspots</span>
                      </div>
                    )}
                  </div>
                  {isActive && <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />}
                </button>
              );
            })}
          </div>
          <div className="p-3 border-t border-zinc-800 bg-zinc-950/50">
            <div className="text-[10px] text-zinc-600 text-center">More cities coming soon — contribute data at github.com/civicshield</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
