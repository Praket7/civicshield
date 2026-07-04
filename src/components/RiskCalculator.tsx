'use client';
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ChevronRight, BarChart3 } from 'lucide-react';
import type { CityData } from '@/lib/cityData';
import { calculateRiskScore, type RiskInput, type RiskResult } from '@/lib/riskCalculator';

interface Props { cityData: CityData; postalCode: string; }

export default function RiskCalculator({ cityData, postalCode }: Props) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [input, setInput] = useState<RiskInput>({
    cityId: cityData.id, postalCode, landlordName: '', leaseType: 'fixed-term',
    tenancyLength: '1-2', hasWrittenLease: true, issueType: 'nonpayment',
    hasDocumentation: false, hasReportedToCity: false, rentStabilized: false,
  });

  const compute = () => { setResult(calculateRiskScore({ ...input, postalCode }, cityData)); setStep(99); };

  const questions: { label: string; field: keyof RiskInput; options?: { value: string; label: string }[]; type?: string }[] = [
    { label: "What is your landlord's name or management company?", field: 'landlordName', type: 'text' },
    { label: 'What type of lease do you have?', field: 'leaseType', options: [
      { value: 'fixed-term', label: 'Fixed-term lease (active)' }, { value: 'month-to-month', label: 'Month-to-month' },
      { value: 'expired', label: 'Lease expired' }, { value: 'none', label: 'No written lease' },
    ]},
    { label: 'How long have you lived here?', field: 'tenancyLength', options: [
      { value: 'under-1', label: 'Under 1 year' }, { value: '1-2', label: '1-2 years' },
      { value: '2-5', label: '2-5 years' }, { value: 'over-5', label: '5+ years' },
    ]},
    { label: 'What is the primary issue?', field: 'issueType', options: [
      { value: 'nonpayment', label: 'Non-payment of rent' }, { value: 'lease-violation', label: 'Alleged lease violation' },
      { value: 'no-cause', label: 'No cause given' }, { value: 'owner-move-in', label: 'Owner move-in' },
      { value: 'habitability', label: 'Habitability / repairs' }, { value: 'retaliation', label: 'Retaliation for complaints' },
      { value: 'harassment', label: 'Landlord harassment' }, { value: 'demolition', label: 'Demolition / Ellis Act' },
    ]},
  ];

  const boolQuestions: { label: string; field: 'hasDocumentation' | 'hasReportedToCity' | 'rentStabilized' | 'hasWrittenLease' }[] = [
    { label: 'Do you have written documentation of issues?', field: 'hasDocumentation' },
    { label: 'Have you reported issues to city agencies?', field: 'hasReportedToCity' },
    { label: 'Is your unit rent-stabilized/controlled?', field: 'rentStabilized' },
  ];

  if (result) {
    const ringColor = result.level === 'critical' ? '#ef4444' : result.level === 'high' ? '#f59e0b' : result.level === 'moderate' ? '#3b82f6' : '#10b981';
    const circumference = 2 * Math.PI * 45;
    const dashOffset = circumference - (result.score / 100) * circumference;
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold">Risk Assessment Complete</h3>
        </div>
        <div className="flex items-center gap-8 mb-6">
          <div className="relative w-28 h-28 shrink-0">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="6" />
              <circle cx="50" cy="50" r="45" fill="none" stroke={ringColor} strokeWidth="6"
                strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-mono font-bold" style={{ color: ringColor }}>{result.score}</div>
              <div className="text-[9px] uppercase tracking-wider text-zinc-500">RISK</div>
            </div>
          </div>
          <div>
            <div className={`text-sm font-semibold uppercase px-3 py-1 rounded-full inline-block mb-2`}
              style={{ backgroundColor: ringColor + '20', color: ringColor }}>{result.level} RISK</div>
            <div className="text-sm text-zinc-400">Defense Strength: <span className={`font-semibold ${result.defenseStrength === 'strong' ? 'text-emerald-400' : result.defenseStrength === 'moderate' ? 'text-amber-400' : 'text-red-400'}`}>{result.defenseStrength.toUpperCase()}</span></div>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">RISK FACTORS</div>
          {result.factors.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              {f.positive ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
              <span className={f.positive ? 'text-zinc-300' : 'text-zinc-400'}>{f.label}</span>
              <span className={`ml-auto text-[10px] font-mono ${f.positive ? 'text-emerald-500' : 'text-red-500'}`}>{f.positive ? '-' : '+'}{f.impact}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 mb-4">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">RECOMMENDATIONS</div>
          {result.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
              <ChevronRight className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setResult(null); setStep(0); }} className="text-xs text-zinc-500 hover:text-white transition-colors">← Recalculate</button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-violet-400" />
        <h3 className="text-lg font-semibold">Risk Score Calculator</h3>
        <div className="ml-auto text-[10px] text-zinc-500 font-mono">{step + 1}/{questions.length + 1}</div>
      </div>
      <div className="h-1 bg-zinc-800 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-violet-500 transition-all" style={{ width: `${((step + 1) / (questions.length + 1)) * 100}%` }} />
      </div>
      {step < questions.length ? (
        <div>
          <div className="text-sm text-zinc-200 mb-4">{questions[step].label}</div>
          {questions[step].type === 'text' ? (
            <input type="text" value={String(input[questions[step].field] || '')}
              onChange={e => setInput(p => ({ ...p, [questions[step].field]: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 mb-4"
              placeholder="Enter name..." />
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {questions[step].options?.map(opt => (
                <button key={opt.value} onClick={() => setInput(p => ({ ...p, [questions[step].field]: opt.value }))}
                  className={`px-3 py-2.5 text-xs rounded-xl border text-left transition-all ${input[questions[step].field] === opt.value ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setStep(s => s + 1)} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-colors">Next →</button>
        </div>
      ) : (
        <div>
          <div className="text-sm text-zinc-200 mb-4">Additional protections:</div>
          <div className="space-y-3 mb-6">
            {boolQuestions.map(bq => (
              <label key={bq.field} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${input[bq.field] ? 'bg-violet-500 border-violet-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}
                  onClick={() => setInput(p => ({ ...p, [bq.field]: !p[bq.field] }))}>
                  {input[bq.field] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-xs text-zinc-300">{bq.label}</span>
              </label>
            ))}
          </div>
          <button onClick={compute} className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-emerald-300 transition-colors">Calculate Risk Score</button>
        </div>
      )}
    </div>
  );
}
