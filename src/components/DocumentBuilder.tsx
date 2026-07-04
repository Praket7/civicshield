'use client';
import React, { useState } from 'react';
import { FileText, Download, ChevronRight, CheckCircle, Scale } from 'lucide-react';
import { DOCUMENT_TYPES, type DocumentType } from '@/lib/documentTemplates';
import type { CityData } from '@/lib/cityData';

export default function DocumentBuilder({ cityData, tenantName, landlordName, address }: { cityData: CityData; tenantName: string; landlordName: string; address: string }) {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [extras, setExtras] = useState({ depositAmount: '', rentAmount: '', increaseAmount: '', issues: [''] });

  const generate = async (type: DocumentType) => {
    setLoading(true); setSelectedType(type);
    try {
      const res = await fetch('/api/compile-document', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId: cityData.id, documentType: type, tenantName, landlordName, address,
          date: new Date().toISOString().split('T')[0], ...extras, issues: extras.issues.filter(Boolean) })
      });
      const data = await res.json();
      setDocument(data.document);
    } catch { setDocument('Error generating document.'); }
    setLoading(false);
  };

  const download = () => {
    if (!document) return;
    const blob = new Blob([document], { type: 'text/plain' });
    const a = window.document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `CivicShield_${selectedType}_${cityData.name.replace(/\s/g, '_')}.txt`;
    window.document.body.appendChild(a); a.click(); window.document.body.removeChild(a);
  };

  if (document) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Document Generated</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
              {DOCUMENT_TYPES.find(d => d.id === selectedType)?.label}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={download} className="px-4 py-2 bg-white text-black rounded-xl text-xs font-medium hover:bg-amber-300 transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button onClick={() => { setDocument(null); setSelectedType(null); }} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs hover:bg-zinc-700 transition-colors">
              New Document
            </button>
          </div>
        </div>
        <div className="p-5 max-h-[500px] overflow-auto">
          <pre className="text-xs text-zinc-200 whitespace-pre-wrap font-mono leading-relaxed bg-zinc-900 p-4 rounded-xl border border-zinc-800">{document}</pre>
        </div>
        <div className="px-5 py-3 border-t border-zinc-800 text-[10px] text-zinc-600 flex items-center gap-1">
          <Scale className="w-3 h-3" /> Compiled by deterministic FSM • Zero LLM hallucinations in output • Based on {cityData.state} law
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-5 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-violet-400" />
          <h3 className="font-semibold">Legal Document Builder</h3>
          <span className="text-[10px] text-zinc-500">5 Templates • {cityData.name}, {cityData.state}</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-1 gap-3">
        {DOCUMENT_TYPES.map(dt => (
          <button key={dt.id} onClick={() => generate(dt.id)} disabled={loading}
            className="w-full flex items-center gap-4 p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-2xl transition-all text-left disabled:opacity-50 group">
            <div className="text-2xl">{dt.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">{dt.label}</div>
              <div className="text-xs text-zinc-300">{dt.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>
      {loading && (
        <div className="px-5 py-4 border-t border-zinc-800 flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-zinc-600 border-t-violet-500 rounded-full animate-spin" />
          <span className="text-xs text-zinc-400">Compiling {DOCUMENT_TYPES.find(d => d.id === selectedType)?.label} using FSM template engine...</span>
        </div>
      )}
    </div>
  );
}
