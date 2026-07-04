'use client';
import React, { useState } from 'react';
import { Shield, X, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

interface Props {
  onClose: () => void;
  onAuth: (user: any) => void;
}

export default function AuthModal({ onClose, onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email, password } : { email, password, name };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || 'Something went wrong'); setLoading(false); return; }
      onAuth(data.user);
      onClose();
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[150] p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">{mode === 'login' ? 'Sign In' : 'Create Account'}</div>
              <div className="text-xs text-zinc-500">Save cases, track court dates, get alerts</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 rounded-lg"><X className="w-4 h-4 text-zinc-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-violet-500" />
              </div>
            </div>
          )}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-violet-500" />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-violet-500" />
            </div>
          </div>

          {error && <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-violet-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
            {loading ? <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" /> :
              mode === 'login' ? <><LogIn className="w-4 h-4" /> Sign In</> : <><UserPlus className="w-4 h-4" /> Create Account</>}
          </button>

          <div className="text-center text-xs text-zinc-500">
            {mode === 'login' ? (
              <>No account? <button type="button" onClick={() => { setMode('register'); setError(''); }} className="text-violet-400 hover:underline">Create one</button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-violet-400 hover:underline">Sign in</button></>
            )}
          </div>
        </form>

        <div className="px-6 pb-4 text-[9px] text-zinc-600 text-center">
          Your data is stored securely. We never share personal information.
        </div>
      </div>
    </div>
  );
}
