'use client';
import React, { useState, useEffect } from 'react';
import { Bookmark, Calendar, FileText, ChevronRight, Clock, Edit3, Check, AlertTriangle } from 'lucide-react';

interface SavedCase { id: number; caseToken: string; cityId: string; tenantName: string | null; landlordName: string | null; address: string | null; postalCode: string | null; status: string | null; courtDate: string | null; notes: string | null; createdAt: string; defenseDocument: string | null; }

export default function MyCases() {
  const [cases, setCases] = useState<SavedCase[]>([]);
  const [selected, setSelected] = useState<SavedCase | null>(null);
  const [editing, setEditing] = useState(false);
  const [courtDate, setCourtDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCases(); }, []);
  const loadCases = async () => {
    try {
      const r = await fetch('/api/cases'); const d = await r.json();
      setCases(d.cases || []);
    } catch {} finally { setLoading(false); }
  };

  const updateCase = async (caseId: number) => {
    await fetch('/api/cases', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId, courtDate, notes }) });
    setEditing(false); loadCases();
    if (selected) setSelected({ ...selected, courtDate, notes });
  };

  const download = (c: SavedCase) => {
    if (!c.defenseDocument) return;
    const a = window.document.createElement('a');
    a.href = URL.createObjectURL(new Blob([c.defenseDocument], { type: 'text/plain' }));
    a.download = `CivicShield_${c.caseToken}.txt`;
    window.document.body.appendChild(a); a.click(); window.document.body.removeChild(a);
  };

  if (loading) return <div className="text-center py-12 text-zinc-500 text-sm">Loading your cases...</div>;

  if (selected) {
    const daysUntilCourt = selected.courtDate ? Math.ceil((new Date(selected.courtDate).getTime() - Date.now()) / 86400000) : null;
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
          <button onClick={() => { setSelected(null); setEditing(false); }} className="text-xs text-zinc-400 hover:text-white">← All Cases</button>
          <span className="font-mono text-violet-400 text-xs">{selected.caseToken}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{selected.address || 'Case Details'}</h3>
            <span className={`px-2.5 py-0.5 text-[10px] rounded-full font-medium uppercase ${selected.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : selected.status === 'resolved' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-700 text-zinc-400'}`}>{selected.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-zinc-900 rounded-xl"><div className="text-[10px] text-zinc-500 mb-1">TENANT</div><div className="text-sm text-white">{selected.tenantName || '—'}</div></div>
            <div className="p-3 bg-zinc-900 rounded-xl"><div className="text-[10px] text-zinc-500 mb-1">LANDLORD</div><div className="text-sm text-white">{selected.landlordName || '—'}</div></div>
            <div className="p-3 bg-zinc-900 rounded-xl"><div className="text-[10px] text-zinc-500 mb-1">CREATED</div><div className="text-sm text-white">{new Date(selected.createdAt).toLocaleDateString()}</div></div>
            <div className="p-3 bg-zinc-900 rounded-xl">
              <div className="text-[10px] text-zinc-500 mb-1">COURT DATE</div>
              {editing ? (
                <input type="date" value={courtDate} onChange={e => setCourtDate(e.target.value)} className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1 text-sm outline-none text-white w-full" />
              ) : (
                <div className="text-sm text-white flex items-center gap-2">
                  {selected.courtDate || 'Not set'}
                  {daysUntilCourt !== null && daysUntilCourt > 0 && daysUntilCourt <= 14 && (
                    <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><AlertTriangle className="w-2.5 h-2.5" /> {daysUntilCourt}d</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {editing ? (
            <div className="mb-4">
              <div className="text-[10px] text-zinc-500 mb-1">NOTES</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-violet-500" placeholder="Add notes about your case..." />
              <div className="flex gap-2 mt-2">
                <button onClick={() => updateCase(selected.id)} className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Save</button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              {selected.notes && <div className="p-3 bg-zinc-900 rounded-xl text-sm text-zinc-300 mb-2">{selected.notes}</div>}
              <button onClick={() => { setEditing(true); setCourtDate(selected.courtDate || ''); setNotes(selected.notes || ''); }}
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"><Edit3 className="w-3 h-3" /> Edit court date & notes</button>
            </div>
          )}

          {selected.defenseDocument && (
            <div>
              <div className="text-[10px] text-zinc-500 mb-2">DEFENSE DOCUMENT</div>
              <pre className="text-[11px] text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl p-3 max-h-[200px] overflow-auto whitespace-pre-wrap font-mono">{selected.defenseDocument.substring(0, 800)}...</pre>
              <button onClick={() => download(selected)} className="mt-2 px-4 py-2 bg-white text-black rounded-xl text-xs font-medium hover:bg-amber-300 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Download Full Document
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2"><Bookmark className="w-5 h-5 text-violet-400" /><h3 className="font-semibold">My Cases</h3></div>
        <span className="text-[10px] text-zinc-500">{cases.length} cases saved</span>
      </div>
      <div className="divide-y divide-zinc-800">
        {cases.length > 0 ? cases.map(c => {
          const daysUntil = c.courtDate ? Math.ceil((new Date(c.courtDate).getTime() - Date.now()) / 86400000) : null;
          return (
            <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left px-5 py-4 hover:bg-zinc-900/50 transition-colors flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-violet-400">{c.caseToken}</span>
                  <span className={`px-1.5 py-0.5 text-[9px] rounded-full ${c.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'}`}>{c.status}</span>
                  {daysUntil !== null && daysUntil > 0 && daysUntil <= 14 && (
                    <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" /> Court in {daysUntil}d</span>
                  )}
                </div>
                <div className="text-sm text-zinc-200 truncate">{c.address || 'No address'}</div>
                <div className="text-[10px] text-zinc-600 mt-0.5 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {new Date(c.createdAt).toLocaleDateString()}
                  {c.landlordName && <span>• vs {c.landlordName}</span>}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
            </button>
          );
        }) : (
          <div className="px-5 py-12 text-center text-zinc-600 text-xs">
            No cases yet. Upload an eviction notice to create your first case.
          </div>
        )}
      </div>
    </div>
  );
}
