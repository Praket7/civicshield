'use client';
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ThumbsUp, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import type { CityData } from '@/lib/cityData';

const INCIDENT_TYPES = [
  { id: 'illegal-lockout', label: '🔒 Illegal Lockout', severity: 'critical' },
  { id: 'utility-shutoff', label: '⚡ Utility Shutoff', severity: 'critical' },
  { id: 'harassment', label: '😤 Landlord Harassment', severity: 'high' },
  { id: 'no-repairs', label: '🔧 Refusal to Repair', severity: 'medium' },
  { id: 'illegal-rent-increase', label: '📈 Illegal Rent Increase', severity: 'medium' },
  { id: 'retaliation', label: '🎯 Retaliatory Eviction', severity: 'high' },
  { id: 'deposit-theft', label: '💰 Deposit Not Returned', severity: 'medium' },
  { id: 'construction-harassment', label: '🏗️ Construction Harassment', severity: 'medium' },
  { id: 'code-violation', label: '⚠️ Code Violation (mold, lead, pest)', severity: 'high' },
];

interface Report { id: number; createdAt: string; incidentType: string; postalCode: string; neighborhood: string; description: string; severity: string; upvotes: number; }

export default function IncidentReporter({ cityData }: { cityData: CityData }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ incidentType: '', postalCode: cityData.hotspots[0]?.zipCode || '', description: '' });

  useEffect(() => {
    fetch(`/api/incidents?cityId=${cityData.id}`).then(r => r.json()).then(d => setReports(d.reports || [])).catch(() => {});
  }, [cityData.id]);

  useEffect(() => { setForm(f => ({ ...f, postalCode: cityData.hotspots[0]?.zipCode || '' })); setShowForm(false); setSubmitted(false); }, [cityData.id]);

  const submit = async () => {
    const t = INCIDENT_TYPES.find(t => t.id === form.incidentType);
    if (!t) return;
    const hotspot = cityData.hotspots.find(h => h.zipCode === form.postalCode);
    try {
      await fetch('/api/incidents', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId: cityData.id, postalCode: form.postalCode, neighborhood: hotspot?.neighborhood || '', incidentType: form.incidentType, description: form.description, severity: t.severity })
      });
      setSubmitted(true); setShowForm(false);
      fetch(`/api/incidents?cityId=${cityData.id}`).then(r => r.json()).then(d => setReports(d.reports || []));
    } catch (err) {
      console.error('Incident submit error:', err);
      alert('Failed to submit report. Please try again.');
    }
  };

  const upvote = async (id: number) => {
    await fetch('/api/incidents/upvote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setReports(prev => prev.map(r => r.id === id ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r));
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold">Community Incident Reports</h3>
          <span className="text-[10px] text-zinc-500">{cityData.name}</span>
        </div>
        <button onClick={() => { setShowForm(!showForm); setSubmitted(false); }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${showForm ? 'bg-zinc-700 text-zinc-300' : 'bg-amber-500 text-black hover:bg-amber-400'}`}>
          {showForm ? 'Cancel' : '+ Report Incident'}
        </button>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle className="w-4 h-4" /> Report submitted anonymously. It will appear in the community feed.
        </div>
      )}

      {showForm && (
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="text-xs text-zinc-400 mb-4">All reports are anonymous. No personal information is collected.</div>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-zinc-500 mb-2">INCIDENT TYPE</div>
              <div className="grid grid-cols-3 gap-2">
                {INCIDENT_TYPES.map(t => (
                  <button key={t.id} onClick={() => setForm(f => ({ ...f, incidentType: t.id }))}
                    className={`px-2 py-2 text-[11px] rounded-xl border text-left transition-all ${form.incidentType === t.id ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-zinc-500 mb-1">ZIP CODE</div>
                <select value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs outline-none appearance-none">
                  {cityData.hotspots.map(h => <option key={h.zipCode} value={h.zipCode}>{h.zipCode} — {h.neighborhood}</option>)}
                </select>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 mb-1">DETAILS (optional)</div>
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description..." className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-amber-500" />
              </div>
            </div>
            <button onClick={submit} disabled={!form.incidentType} className="w-full py-2.5 bg-amber-500 text-black rounded-xl text-sm font-medium hover:bg-amber-400 disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
              <Send className="w-3.5 h-3.5" /> Submit Anonymous Report
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-zinc-800 max-h-[400px] overflow-auto">
        {reports.length > 0 ? reports.map(r => {
          const type = INCIDENT_TYPES.find(t => t.id === r.incidentType);
          return (
            <div key={r.id} className="px-6 py-4 hover:bg-zinc-900/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{type?.label?.split(' ')[0] || '⚠️'}</span>
                    <span className="text-sm font-medium text-white">{type?.label?.substring(3) || r.incidentType}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-medium ${r.severity === 'critical' ? 'bg-red-500/20 text-red-400' : r.severity === 'high' ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-zinc-400'}`}>
                      {r.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {r.postalCode} {r.neighborhood && `— ${r.neighborhood}`}</span>
                    <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  {r.description && <div className="text-xs text-zinc-300 mt-1 line-clamp-1">{r.description}</div>}
                </div>
                <button onClick={() => upvote(r.id)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-amber-400 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800">
                  <ThumbsUp className="w-3 h-3" /> {r.upvotes || 0}
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="px-6 py-12 text-center text-xs text-zinc-600">
            No reports yet for {cityData.name}. Be the first to report an incident.
          </div>
        )}
      </div>
    </div>
  );
}
