'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type Phase = 'input' | 'thinking' | 'result'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SCRIPTED_RESPONSES = [
  'Terima kasih sudah mau berbagi ceritamu. Aku mendengar kamu, dan apa yang kamu rasakan itu nyata. Ceritakan lebih lanjut — aku di sini untuk mendengarkan.',
  'Saya mulai menangkap polanya dari apa yang kamu ceritakan. Ini bukan hal yang mudah untuk dihadapi sendirian. Apa lagi yang ingin kamu bagikan?',
  'Catatan saya semakin lengkap sekarang. Kamu sudah sangat berani untuk mau membuka diri seperti ini. Ada hal lain yang ingin kamu tambahkan?',
  'Ini adalah fase transisi penting dalam hidupmu. Aku bisa melihat betapa kerasnya kamu berusaha. Terus ceritakan — setiap detail membantu.',
]

const RANDOM_ENDINGS = [
  'Pemetaan ceritamu sudah cukup lengkap. Berdasarkan semua yang kamu bagikan, aku punya gambaran yang lebih jelas tentang apa yang kamu butuhkan.',
  'Setiap detail yang kamu ceritakan membantu aku memahami situasimu lebih dalam. Kamu sudah melakukan hal yang tepat dengan mau berbicara.',
  'Transformasi membutuhkan keberanian, dan kamu sudah menunjukkannya hari ini. Mari kita lihat apa yang bisa membantu perjalananmu.',
]

function getScriptedResponse(userMessageCount: number, lastMessage: string): string {
  if (userMessageCount <= 4) return SCRIPTED_RESPONSES[userMessageCount - 1]
  const lower = lastMessage.toLowerCase()
  if (lower.includes('stres') || lower.includes('depresi') || lower.includes('cemas')) {
    return 'Aku bisa merasakan titik lelah emosional yang kamu ceritakan. Ini bukan kelemahan — ini tanda bahwa kamu butuh dukungan yang tepat.'
  }
  if (lower.includes('karir') || lower.includes('kerja') || lower.includes('pekerjaan')) {
    return 'Potensimu sangat besar, dan aku bisa melihat itu dari cara kamu bercerita. Kebingungan soal karir adalah hal yang wajar di fase ini.'
  }
  return RANDOM_ENDINGS[Math.floor(Math.random() * RANDOM_ENDINGS.length)]
}

function getRecommendation(messages: Message[], userMessageCount: number) {
  const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content ?? ''
  const needsSolution = userMessageCount >= 3 || lastUserMsg.toLowerCase().includes('solusi')
  if (!needsSolution) return { show: false, intense: false }
  const allText = messages.filter(m => m.role === 'user').map(m => m.content).join(' ')
  const isIntense = (allText.toLowerCase().includes('stres') || allText.toLowerCase().includes('depresi')) && allText.length > 80
  return { show: true, intense: isIntense }
}

export function PsikotesDiagnostic() {
  const [phase, setPhase] = useState<Phase>('input')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const isThinking = phase === 'thinking'

  const userMessageCount = messages.filter(m => m.role === 'user').length
  const rec = getRecommendation(messages, userMessageCount)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, phase])

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || isThinking) return

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setPhase('thinking')

    const newUserCount = newMessages.filter(m => m.role === 'user').length
    setTimeout(() => {
      const reply = getScriptedResponse(newUserCount, text)
      setMessages([...newMessages, { role: 'assistant', content: reply }])
      setPhase('result')
    }, 1500)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function reset() {
    setPhase('input')
    setMessages([])
    setInput('')
  }

  if (phase === 'input' || (phase === 'thinking' && messages.filter(m => m.role === 'assistant').length === 0)) {
    return (
      <div className="w-full space-y-4">
        <div className="text-center">
          <p className="text-sm font-black text-white/70 uppercase tracking-[0.2em]">
            AI Counsellor — Ceritakan Masalahmu
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold">Mental Health Insight</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">Always Active</span>
              </div>
              {phase === 'thinking' ? (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                  <span className="text-sm font-bold text-slate-600">Merumuskan Solusi</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <textarea
                    rows={3}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ceritakan kendala yang kamu rasakan saat ini..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="mt-3 w-full py-3 rounded-2xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Mulai Analisis
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <p className="text-sm font-black text-white/70 uppercase tracking-[0.2em]">
          AI Counsellor — Ceritakan Masalahmu
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-bold text-slate-600">Respon AI Counsellor</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">Analisis Aktif</span>
          </div>

          <div ref={scrollRef} className="max-h-[300px] overflow-y-auto p-5 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ceritakan Masalahmu</p>
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
            {isThinking && (
              <div className="flex gap-2 items-center">
                <div className="bg-slate-100 px-4 py-2.5 rounded-2xl rounded-bl-md text-xs text-slate-500 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Bermoela sedang menganalisis...
                </div>
              </div>
            )}
          </div>

          {rec.show ? (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-xs font-bold text-slate-600 mb-2">Rekomendasi Solusi:</p>
              <div className="flex gap-2">
                {rec.intense ? (
                  <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">Psikotes Premium</span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold">Psikotes & Asesmen</span>
                )}
              </div>
            </div>
          ) : (
            <div className="px-5 py-3 border-t border-slate-100">
              <p className="text-xs text-slate-400 italic">AI sedang mendalami ceritamu...</p>
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
                disabled={isThinking}
                className="flex-1 min-h-[40px] px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 transition-colors resize-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
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
