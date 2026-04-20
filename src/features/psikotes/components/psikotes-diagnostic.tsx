'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Sparkles, RotateCcw, Bot, User, Keyboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const CHATBOT_API = process.env.NEXT_PUBLIC_CHATBOT_URL || 'http://localhost:8001'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GUIDED_STEPS: string[][] = [
  // Step 1: Masalah utama
  [
    'Sering cemas & overthinking',
    'Burnout / kelelahan mental',
    'Bingung arah karir',
    'Masalah hubungan / pasangan',
    'Kurang percaya diri',
    'Trauma masa lalu',
    'Kesepian & isolasi',
    'Stres kerja / akademik',
    'Konflik keluarga',
    'Ingin mengenal diri lebih dalam',
  ],
  // Step 2: Sudah berapa lama
  [
    'Baru beberapa hari',
    'Sudah berminggu-minggu',
    'Sudah berbulan-bulan',
    'Sudah bertahun-tahun',
    'Hilang timbul / kambuhan',
    'Makin parah akhir-akhir ini',
    'Sejak kejadian tertentu',
    'Tidak yakin kapan mulainya',
  ],
  // Step 3: Dampak ke kehidupan
  [
    'Sulit tidur / insomnia',
    'Produktivitas menurun',
    'Hubungan jadi renggang',
    'Sering marah tanpa sebab',
    'Kehilangan motivasi',
    'Menarik diri dari sosial',
    'Sulit konsentrasi',
    'Makan berlebihan / tidak nafsu',
    'Sering menangis',
    'Merasa hampa / kosong',
  ],
  // Step 4: Apa yang sudah dicoba
  [
    'Belum pernah coba apa-apa',
    'Curhat ke teman / keluarga',
    'Baca buku self-help',
    'Meditasi / mindfulness',
    'Olahraga rutin',
    'Pernah ke psikolog',
    'Konsumsi konten motivasi',
    'Journaling / menulis',
    'Mencoba mengabaikannya',
    'Sudah coba banyak hal tapi belum berhasil',
  ],
  // Step 5: Apa yang diharapkan
  [
    'Ingin tahu kondisi mental saya',
    'Butuh rekomendasi tes yang tepat',
    'Ingin bicara dengan psikolog',
    'Cari solusi praktis sehari-hari',
    'Ingin memahami pola pikir saya',
    'Butuh validasi perasaan saya',
    'Ingin berubah tapi bingung mulai dari mana',
    'Sekadar curhat dulu',
  ],
]

const STEP_LABELS = [
  'Apa yang sedang kamu rasakan?',
  'Sudah berapa lama kamu merasakannya?',
  'Bagaimana dampaknya ke keseharianmu?',
  'Apa yang sudah kamu coba sebelumnya?',
  'Apa yang kamu harapkan dari sesi ini?',
]

export function PsikotesDiagnostic() {
  const [messages, setMessages] = useState<Message[]>([])
  const [guidedStep, setGuidedStep] = useState(0)
  const [freeMode, setFreeMode] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const isGuided = guidedStep < GUIDED_STEPS.length && !freeMode

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const adjustHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  async function sendToBot(allMessages: Message[]): Promise<string> {
    try {
      const res = await fetch(`${CHATBOT_API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      return data.reply
    } catch {
      return 'Maaf, terjadi gangguan koneksi. Coba lagi ya.'
    }
  }

  async function handleSelect(text: string) {
    if (loading) return

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setLoading(true)

    const reply = await sendToBot(updated)
    setMessages([...updated, { role: 'assistant', content: reply }])
    setGuidedStep(prev => prev + 1)
    setLoading(false)
  }

  async function handleFreeSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    const reply = await sendToBot(updated)
    setMessages([...updated, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  function switchToFreeMode() {
    setFreeMode(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  function reset() {
    setMessages([])
    setGuidedStep(0)
    setFreeMode(false)
    setInput('')
    setLoading(false)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="w-full space-y-6">

      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-black text-white/70 uppercase tracking-[0.2em]">
          AI Counsellor — Ceritakan Masalahmu
        </p>
      </div>

      {/* Chat Container */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

          {/* Messages Area */}
          {hasMessages && (
            <div ref={scrollRef} className="max-h-[360px] overflow-y-auto p-5 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-700 rounded-bl-md'
                  )}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Guided Tabs */}
          {isGuided && !loading && (
            <div className={cn('p-5', hasMessages && 'border-t border-slate-100')}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-xs font-bold text-slate-600">
                  {STEP_LABELS[guidedStep]}
                </span>
                <span className="text-[10px] text-slate-400 ml-auto">
                  {guidedStep + 1}/{GUIDED_STEPS.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {GUIDED_STEPS[guidedStep].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={switchToFreeMode}
                className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
              >
                <Keyboard className="w-3 h-3" /> Atau ketik sendiri
              </button>
            </div>
          )}

          {/* Free Mode / Post-Guided Input */}
          {(!isGuided || freeMode) && !loading && (
            <div className={cn('p-4', hasMessages && 'border-t border-slate-100')}>
              {!hasMessages && (
                <p className="text-xs text-slate-400 font-medium mb-3 text-center">
                  Ceritakan apa yang sedang kamu rasakan...
                </p>
              )}
              <form onSubmit={handleFreeSubmit} className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); adjustHeight() }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleFreeSubmit(e)
                    }
                  }}
                  placeholder="Ketik ceritamu di sini..."
                  className="flex-1 min-h-[44px] max-h-[120px] px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary-400 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Reset */}
          {hasMessages && !loading && (
            <div className="px-5 pb-4">
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" /> Mulai dari awal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
