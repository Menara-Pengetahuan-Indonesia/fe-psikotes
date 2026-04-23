'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, RotateCcw, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INITIAL_BUBBLES } from '../constants/diagnostic-bubbles.constants'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ProductRecommendation {
  id: string
  name: string
  category: string
  priceFrom: number
  href: string
}

interface DiagnosticApiResponse {
  reply: string
  followUpBubbles: string[] | null
  recommendations: ProductRecommendation[] | null
}

const CHATBOT_URL = process.env.NEXT_PUBLIC_CHATBOT_URL ?? ''

export function PsikotesDiagnostic() {
  const [phase, setPhase] = useState<'initial' | 'chatting'>('initial')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [followUpBubbles, setFollowUpBubbles] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setFollowUpBubbles([])
    setLoading(true)
    setPhase('chatting')

    try {
      const res = await fetch(`${CHATBOT_URL}/diagnostic/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.ok) throw new Error('API error')
      const data: DiagnosticApiResponse = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      setFollowUpBubbles(data.followUpBubbles ?? [])
      if (data.recommendations) setRecommendations(data.recommendations)
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Maaf, ada gangguan koneksi. Coba lagi ya.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    sendMessage(input)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function reset() {
    setPhase('initial')
    setMessages([])
    setInput('')
    setFollowUpBubbles([])
    setRecommendations(null)
  }

  if (phase === 'initial') {
    return (
      <div className="w-full space-y-4">
        <div className="text-center">
          <p className="text-sm font-black text-primary-600 uppercase tracking-[0.2em]">
            AI Counsellor siap mendengarkanmu.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                  rows={2}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ceritakan masalahmu di sini..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 self-end rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-30 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-slate-400 text-center pt-1">atau pilih topik yang paling kamu rasakan:</p>
              <div className="flex flex-wrap gap-2">
                {INITIAL_BUBBLES.map((bubble) => (
                  <button
                    key={bubble.id}
                    onClick={() => sendMessage(bubble.text)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 active:scale-95',
                      bubble.bgColor, bubble.textColor, bubble.borderColor
                    )}
                  >
                    <span>{bubble.emoji}</span>
                    <span>{bubble.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <p className="text-sm font-black text-primary-600 uppercase tracking-[0.2em]">
          AI Counsellor — Ceritakan Masalahmu
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div ref={scrollRef} className="max-h-[320px] overflow-y-auto p-5 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-700 rounded-bl-md'
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center">
                <div className="bg-slate-100 px-4 py-2.5 rounded-2xl rounded-bl-md text-xs text-slate-500 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Moela sedang mengetik...
                </div>
              </div>
            )}
          </div>

          {followUpBubbles.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap gap-2">
              {followUpBubbles.map((bubble, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(bubble)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-medium hover:bg-primary-100 transition-colors disabled:opacity-40"
                >
                  {bubble}
                </button>
              ))}
            </div>
          )}

          {recommendations && recommendations.length > 0 && (
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Rekomendasi Asesmen</p>
              <div className="grid gap-2">
                {recommendations.map((rec) => (
                  <a
                    key={rec.id}
                    href={rec.href}
                    className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700">{rec.name}</p>
                      <p className="text-xs text-slate-500">{rec.category} · mulai Rp{rec.priceFrom.toLocaleString('id-ID')}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-500 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-slate-100">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ceritakan hal lain..."
                disabled={loading}
                className="flex-1 min-h-[40px] px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 transition-colors resize-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-30 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="px-5 pb-4">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
            >
              <RotateCcw className="w-3 h-3" /> Mulai Dari Awal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
