'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, RotateCcw, Brain, MessageSquare, Send, Loader2, Sparkles, Search, User, Sunrise } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PsikotesDiagnostic() {
  const [phase, setPhase] = useState<'input' | 'thinking' | 'result'>('input')
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, phase])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = inputValue.trim()
    if (!query || phase === 'thinking') return
    
    const newUserMessage = { role: 'user' as const, content: query }
    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')
    setPhase('thinking')
    
    triggerAnalysis(query)
  }

  const triggerAnalysis = (query: string) => {
    const userMessages = messages.filter(m => m.role === 'user')
    const userMessageCount = userMessages.length + 1
    const val = query.toLowerCase()
    
    setTimeout(() => {
      let resultText = ""
      
      // LOGIKA DATA DUMMY BERTAHAP & VARIATIF
      if (userMessageCount === 1) {
        resultText = "Terima kasih sudah mau berbagi. Saya mendengarkan dengan seksama. Bisa ceritakan lebih lanjut bagaimana hal ini mempengaruhi keseharian atau perasaanmu saat ini?"
      } else if (userMessageCount === 2) {
        resultText = "Saya mulai menangkap polanya. Sepertinya ada beban yang cukup dalam di sana. Selain itu, adakah momen spesifik yang biasanya memicu perasaan ini muncul?"
      } else if (userMessageCount === 3) {
        resultText = "Catatan saya semakin lengkap. Kamu sudah sangat terbuka, dan itu langkah awal yang hebat. Dari semua yang kamu ceritakan, mana yang menurutmu paling mendesak untuk segera diselesaikan?"
      } else if (userMessageCount === 4) {
        resultText = "Saya mengerti. Analisis saya menunjukkan kamu sedang dalam fase transisi penting. Apakah kamu sudah merasa butuh panduan konkret (seperti tes atau sesi privat) untuk melangkah ke tahap selanjutnya?"
      } else {
        // TAHAP SOLUSI / RESPON LANJUTAN
        const randomEndings = [
          "Pemetaan ceritamu sudah sangat mendalam. Saya melihat potensi 'The New You' mulai terbentuk. Mari kita pilih solusi yang paling pas di bawah ini.",
          "Setiap detail yang kamu berikan membantu saya merumuskan solusi yang lebih akurat. Berdasarkan progres ini, inilah rekomendasi terbaik untukmu.",
          "Transformasi membutuhkan keberanian, dan kamu sudah menunjukkannya lewat ceritamu. Mari kita konkretkan perubahan ini dengan langkah berikut."
        ]
        
        if (val.includes('stres') || val.includes('depresi') || val.includes('lelah')) {
          resultText = "Berdasarkan ceritamu yang mendalam, kamu sedang berada di titik lelah emosional yang tinggi. Kamu membutuhkan panduan profesional agar bisa kembali bertumbuh tanpa beban masa lalu."
        } else if (val.includes('karir') || val.includes('kerja') || val.includes('bakat')) {
          resultText = "Potensimu sangat besar, namun saat ini terhalang oleh keraguan arah. Kita perlu memetakan kembali kekuatan dirimu agar langkah karirmu lebih presisi dan sukses."
        } else {
          resultText = randomEndings[userMessageCount % randomEndings.length]
        }
      }

      setMessages(prev => [...prev, { role: 'assistant' as const, content: resultText }])
      setPhase('result')
    }, 1500)
  }

  const reset = () => {
    setPhase('input')
    setInputValue('')
    setMessages([])
  }

  const getRecommendation = () => {
    const userMessageCount = messages.filter(m => m.role === 'user').length
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || ''
    
    // Tombol hanya muncul jika sudah 3x chat atau minta solusi
    const needsSolution = userMessageCount >= 3 || lastUserMessage.includes('solusi') || lastUserMessage.includes('bantu') || lastUserMessage.includes('gimana')
    
    if (!needsSolution) return null

    const isIntense = lastUserMessage.length > 50 || lastUserMessage.includes('parah') || lastUserMessage.includes('stres') || lastUserMessage.includes('depresi')
    
    return isIntense ? {
      title: 'Psikotes Premium',
      desc: 'Asesmen mendalam untuk membebaskanmu dari kendala masa lalu.',
      href: '/premium',
      icon: Brain,
      theme: 'bg-primary-600 text-white',
    } : {
      title: 'Psikotes & Asesmen',
      desc: 'Pemetaan diri untuk merancang masa depan yang indah.',
      href: '/premium',
      icon: Brain,
      theme: 'bg-primary-600 text-white',
    }
  }

  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  const adjustHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    adjustHeight()
  }

  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')?.content || ''
  const rec = (phase === 'result' || phase === 'thinking') && messages.length > 0 ? getRecommendation() : null

  return (
    <div className="w-full space-y-8">
      
      {/* Persisting label above everything */}
      <div className="text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <p className="text-[14px] font-black text-white uppercase tracking-[0.3em] max-w-4xl mx-auto">
            Ceritakan masalahmu, AI Counsellor akan mendengarkanmu
          </p>
      </div>

      {/* 1. INITIAL INPUT PHASE (Big Search Bar) */}
      {phase === 'input' && (
        <div className={cn(
          "mx-auto flex flex-col gap-6 transition-all duration-700 ease-in-out",
          isInputFocused ? "max-w-4xl" : "max-w-xl"
        )}>
          <form 
            onSubmit={handleManualSubmit}
            className={cn(
              "relative flex items-start transition-all duration-500",
              "bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-2.5",
              isInputFocused ? "ring-8 ring-primary-500/10 -translate-y-1" : ""
            )}
          >
            <div className="pl-4 pr-2 pt-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleManualSubmit(e)
                }
              }}
              placeholder="Ceritakan kendala yang kamu rasakan saat ini..."
              className={cn(
                "flex-1 min-h-[56px] py-4 bg-transparent border-none focus:outline-none focus:ring-0",
                "text-slate-700 font-medium placeholder:text-slate-300 placeholder:font-normal resize-none overflow-hidden leading-relaxed"
              )}
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={cn(
                "mt-1.5 h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shrink-0",
                inputValue.trim() 
                  ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20" 
                  : "bg-slate-50 text-slate-300 cursor-not-allowed"
              )}
            >
              Mulai Analisis
            </button>
          </form>
          
          <div className="flex justify-center gap-4 opacity-60">
             <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent-300" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">Mental Health Insight</span>
             </div>
             <div className="w-px h-2 bg-white/20 mt-1" />
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">Always Active</span>
             </div>
          </div>
        </div>
      )}

      {/* 2. THINKING PHASE */}
      {phase === 'thinking' && messages.length === 1 && (
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
          <div className="space-y-1">
            <h3 className="text-white font-black uppercase text-xs tracking-widest">Merumuskan Solusi</h3>
            <p className="text-white/60 text-xs font-medium">Asisten sedang memetakan potensi &quot;The New You&quot;...</p>
          </div>
        </div>
      )}

      {/* 3. RESULT/CHAT PHASE */}
      {(phase === 'result' || (phase === 'thinking' && messages.length > 1)) && (
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-700 w-full pt-4">
            
            {/* LEFT CARD: USER HISTORY (FIXED HEIGHT, HIDDEN SCROLLBAR) */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 flex flex-col gap-6 text-left relative h-[500px]">
            
            {/* FLOATING TOP LABEL (The "Cap") */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
               <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-top-4 duration-1000">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest">Ceritakan Masalahmu</span>
               </div>
            </div>
            
            <div 
              ref={messagesContainerRef}
              className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar scroll-smooth mt-4"
            >
              {messages.filter(m => m.role === 'user').map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="p-4 rounded-2xl text-sm font-medium leading-relaxed bg-primary-600 text-white rounded-tr-none shadow-lg shadow-primary-900/20">
                    {msg.content}
                  </div>
                  <span className="text-xs font-black text-white/30 uppercase tracking-widest px-1">
                    Masalah #{idx + 1}
                  </span>
                </div>
              ))}
              {phase === 'thinking' && (
                <div className="flex items-center gap-2 text-white/40 italic text-xs animate-pulse pt-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Bermoela sedang menganalisis tambahan ceritamu...
                </div>
              )}
            </div>

            {/* Re-input Area */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <span className="text-xs font-black text-white/40 uppercase tracking-widest">Lanjutkan ceritamu...</span>
              <form 
                onSubmit={handleManualSubmit}
                className="relative flex items-end bg-white/10 rounded-2xl border border-white/20 p-1 focus-within:bg-white/20 transition-all"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  disabled={phase === 'thinking'}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleManualSubmit(e)
                    }
                  }}
                  placeholder="Ceritakan hal lain..."
                  className="flex-1 min-h-[40px] max-h-32 bg-transparent border-none focus:outline-none focus:ring-0 text-white text-xs px-3 py-2.5 placeholder:text-white/30 resize-none overflow-hidden leading-relaxed disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || phase === 'thinking'}
                  className="mb-1 p-2 rounded-xl bg-white text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            <button 
              onClick={reset}
              className="text-xs font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 self-start"
            >
              <RotateCcw className="w-3 h-3" /> Mulai Dari Awal
            </button>
          </div>

          {/* RIGHT CARD: LATEST INSIGHT (DYNAMIC) */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 text-left relative h-[500px]">
            
            {/* FLOATING TOP LABEL (The "Cap") */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
               <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-in slide-in-from-top-4 duration-1000">
                  <div className="w-7 h-7 rounded-lg bg-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
                    <Sunrise className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Respon AI Counsellor</span>
               </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden mt-2">
              <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
                <div key={lastAssistantMessage} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-500 mb-4">
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">Tanggapan Bermoela:</span>
                   <p className="text-slate-700 font-bold text-lg leading-relaxed">
                     {lastAssistantMessage}
                   </p>
                </div>
              </div>
              
              <div className="shrink-0 pt-4 border-t border-slate-50 mt-auto">
                {rec ? (
                  <div key={rec.title} className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Rekomendasi Solusi:</span>
                    <a 
                      href={rec.href}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm",
                        rec.theme
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <rec.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black tracking-tight">{rec.title}</h4>
                          <p className="text-xs opacity-80 font-medium">{rec.desc}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-center">
                     <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-loose">
                        AI sedang mendalami ceritamu.<br/>Lanjutkan untuk mendapatkan solusi.
                     </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    phase === 'thinking' ? "bg-amber-400" : "bg-emerald-500"
                  )} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                    {phase === 'thinking' ? 'Menganalisis...' : 'Analisis Aktif'}
                  </span>
               </div>
               <Sparkles className="w-4 h-4 text-accent-400" />
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  )
}
