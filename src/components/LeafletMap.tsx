'use client';
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import type { CityData } from '@/lib/cityData';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function LeafletMap({ cityData }: { cityData: CityData }) {
  const center = useMemo(() => {
    if (!cityData.hotspots.length) return [40.7, -74.0] as [number, number];
    const avgLat = cityData.hotspots.reduce((s, h) => s + h.lat, 0) / cityData.hotspots.length;
    const avgLng = cityData.hotspots.reduce((s, h) => s + h.lng, 0) / cityData.hotspots.length;
    return [avgLat, avgLng] as [number, number];
  }, [cityData]);

  const maxRate = Math.max(...cityData.hotspots.map(h => h.evictionRate));

  const getColor = (rate: number) => {
    const pct = rate / maxRate;
    if (pct > 0.7) return '#ef4444';
    if (pct > 0.4) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-400" />
          <h3 className="font-semibold">{cityData.name} Eviction Heatmap</h3>
          <span className="text-[10px] text-zinc-500">{cityData.hotspots.length} neighborhoods tracked</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> High</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</span>
        </div>
      </div>
      <div style={{ height: '400px' }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%', background: '#09090b' }}
          attributionControl={false} zoomControl={true}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {cityData.hotspots.map(h => (
            <CircleMarker key={h.zipCode} center={[h.lat, h.lng]}
              radius={Math.sqrt(h.recentCases) * 1.2 + 5}
              pathOptions={{ fillColor: getColor(h.evictionRate), color: getColor(h.evictionRate), weight: 1, opacity: 0.8, fillOpacity: 0.4 }}>
              <Popup>
                <div style={{ color: '#000', fontSize: '12px', lineHeight: '1.4' }}>
                  <strong>{h.neighborhood}</strong><br />
                  ZIP: {h.zipCode}<br />
                  Eviction Rate: {h.evictionRate}/1K<br />
                  Recent Cases: {h.recentCases}<br />
                  Trend: {h.trend}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
