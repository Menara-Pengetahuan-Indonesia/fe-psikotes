'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Sparkles, RotateCcw, ArrowRight, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTED = [
  'Saya sering merasa cemas',
  'Bingung pilih karir',
  'Sulit fokus bekerja',
  'Hubungan tidak harmonis',
]

const REPLIES: Record<number, string> = {
  1: 'Terima kasih sudah mau berbagi. Bisa ceritakan lebih lanjut bagaimana hal ini mempengaruhi keseharianmu?',
  2: 'Saya mulai menangkap polanya. Adakah momen spesifik yang biasanya memicu perasaan ini?',
  3: 'Dari semua yang kamu ceritakan, mana yang paling mendesak untuk diselesaikan?',
  4: 'Analisis saya menunjukkan kamu sedang dalam fase transisi penting. Butuh panduan konkret?',
}

export function PsikotesDiagnostic() {
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'chat'>('idle')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, phase])

  const send = (text: string) => {
    const q = text.trim()
    if (!q || phase === 'thinking') return
    const next = [...messages, { role: 'user' as const, text: q }]
    setMessages(next)
    setInput('')
    setPhase('thinking')
    const count = next.filter(m => m.role === 'user').length
    setTimeout(() => {
      const reply = REPLIES[count] ?? 'Pemetaan ceritamu sudah mendalam. Mari pilih solusi yang paling pas untukmu.'
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
      setPhase('chat')
    }, 1400)
  }

  const reset = () => { setPhase('idle'); setMessages([]); setInput('') }
  const userCount = messages.filter(m => m.role === 'user').length
  const showRec = userCount >= 3 && phase === 'chat'

  return (
    <div className="flex flex-col">

      {/* Top bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-gray-800 leading-none">AI Counsellor</p>
          <p className="text-[10px] text-emerald-500 font-medium mt-0.5">Online sekarang</p>
        </div>
        {messages.length > 0 && (
          <button onClick={reset} className="p-1 rounded-lg text-gray-300 hover:text-gray-500 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col">

        {/* Suggested chips — only before first message */}
        {phase === 'idle' && (
          <div className="px-4 py-3 space-y-2">
            <p className="text-[10px] text-gray-400 font-semibold">Mulai dari sini:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-2.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="max-h-48 overflow-y-auto px-4 py-3 space-y-2 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start gap-2')}>
                {m.role === 'ai' && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[80%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed',
                  m.role === 'user'
                    ? 'bg-emerald-500 text-white rounded-br-sm font-medium'
                    : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                )}>
                  {m.text}
                </div>
              </div>
            ))}

            {phase === 'thinking' && (
              <div className="flex gap-2 items-end">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i*120}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {showRec && (
              <a href="/premium" className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors group mt-1">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <Brain className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-gray-800">Psikotes Premium</p>
                  <p className="text-[10px] text-gray-500">Asesmen mendalam untukmu</p>
                </div>
                <ArrowRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="px-3 pb-3 pt-2 border-t border-gray-100">
          <form
            onSubmit={e => { e.preventDefault(); send(input) }}
            className="flex items-end gap-2 bg-gray-50 rounded-2xl px-3 py-2 focus-within:bg-white focus-within:ring-1 focus-within:ring-emerald-200 transition-colors"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              disabled={phase === 'thinking'}
              onChange={e => {
                setInput(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ceritakan yang kamu rasakan..."
              className="flex-1 min-h-[32px] max-h-20 bg-transparent border-none focus:outline-none text-[12px] text-gray-700 placeholder:text-gray-400 resize-none overflow-hidden leading-relaxed disabled:opacity-40 py-1"
            />
            <button
              type="submit"
              disabled={!input.trim() || phase === 'thinking'}
              className="p-1.5 rounded-xl bg-emerald-500 text-white disabled:opacity-30 hover:bg-emerald-600 transition-colors shrink-0"
            >
              {phase === 'thinking' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            </button>
          </form>
          <div className="flex gap-3 mt-2 px-1">
            {['Gratis', 'Tanpa Daftar', 'Privasi Terjaga'].map((t, i) => (
              <span key={t} className={cn('text-[9px] font-bold text-gray-400 uppercase tracking-widest', i > 0 && 'before:content-["·"] before:mr-3 before:text-gray-300')}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
