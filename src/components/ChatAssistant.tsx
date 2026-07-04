'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function ChatAssistant({ cityId, cityName }: { cityId: string; cityName: string }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cityIdRef = useRef(cityId);

  // Keep ref in sync
  useEffect(() => { cityIdRef.current = cityId; }, [cityId]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);
  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open, minimized]);
  useEffect(() => { setMessages([]); }, [cityId]);

  async function doSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
    setLoading(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, cityId: cityIdRef.current }),
      });

      const data = await resp.json();

      if (resp.ok && data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Sorry, something went wrong. Please try again.' }]);
      }
    } catch (err) {
      console.error('Chat fetch error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error — please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    if (!input.trim() || loading) return;
    const msg = input;
    setInput('');
    doSend(msg);
  }

  function handleQuick(q: string) {
    if (loading) return;
    doSend(q);
  }

  const quickQuestions = [
    "I'm being evicted",
    "My landlord won't fix repairs",
    "My rent increased too much",
    "My locks were changed",
    "Tell me about zoning anomalies",
  ];

  function renderMarkdown(text: string) {
    return text.split('\n').map((line, li) => (
      <span key={li}>
        {li > 0 && <br />}
        {line.split(/(\*\*[^*]+\*\*)/).map((seg, si) => {
          if (seg.startsWith('**') && seg.endsWith('**')) {
            return <strong key={si} className="text-white font-semibold">{seg.slice(2, -2)}</strong>;
          }
          return <span key={si}>{seg}</span>;
        })}
      </span>
    ));
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/30 hover:scale-110 active:scale-95 transition-transform"
        aria-label="Open AI chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className={`fixed z-50 ${minimized ? 'bottom-6 right-6 w-72' : 'bottom-6 right-6 w-[380px]'} transition-all`}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: minimized ? '48px' : '560px' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700 cursor-pointer shrink-0"
          onClick={() => { if (minimized) setMinimized(false); }}
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium">CivicShield AI — {cityName}</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={e => { e.stopPropagation(); setMinimized(!minimized); }}
              className="p-1 hover:bg-zinc-700 rounded"
            >
              {minimized ? <Maximize2 className="w-3.5 h-3.5 text-zinc-400" /> : <Minimize2 className="w-3.5 h-3.5 text-zinc-400" />}
            </button>
            <button
              onClick={e => { e.stopPropagation(); setOpen(false); }}
              className="p-1 hover:bg-zinc-700 rounded"
            >
              <X className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3" style={{ minHeight: '260px', maxHeight: '400px' }}>
              {messages.length === 0 && !loading && (
                <div className="text-center py-6">
                  <Bot className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <div className="text-sm text-zinc-200 mb-4">Ask me about your tenant rights in {cityName}</div>
                  <div className="space-y-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuick(q)}
                        className="w-full text-left px-3 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-300 transition-colors border border-zinc-700/50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && <Bot className="w-5 h-5 text-violet-400 shrink-0 mt-1" />}
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-violet-600 text-white'
                        : 'bg-zinc-800 text-zinc-100'
                    }`}
                  >
                    {renderMarkdown(msg.content)}
                  </div>
                  {msg.role === 'user' && <User className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <Bot className="w-5 h-5 text-violet-400 shrink-0" />
                  <div className="bg-zinc-800 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-700 shrink-0">
              <form
                onSubmit={e => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Describe your situation..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-violet-500 transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-3 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="text-[9px] text-zinc-600 mt-2 text-center">
                Legal information only — not legal advice
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
