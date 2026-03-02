'use client'

import { useState, useRef } from 'react'
import { ArrowRight, RotateCcw, Brain, MessageSquare, Send, Loader2, CheckCircle2, Sparkles, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PsikotesDiagnostic() {
  const [phase, setPhase] = useState<'input' | 'thinking' | 'result'>('input')
  const [inputValue, setInputValue] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    triggerAnalysis()
  }

  const triggerAnalysis = () => {
    setLastQuestion(inputValue)
    setPhase('thinking')
    
    // Simulating AI Analysis
    setTimeout(() => {
      const val = inputValue.toLowerCase()
      let resultText = "Berdasarkan ceritamu, kamu sedang mengalami fase yang menantang. Memahami akar masalah dan mencari strategi yang tepat akan sangat membantumu kembali stabil."
      
      if (val.length > 50 || val.includes('parah') || val.includes('banget') || val.includes('stres')) {
        resultText = "Kondisi yang kamu alami terlihat cukup mengganggu aktivitas harianmu. Sangat disarankan untuk mendapatkan panduan yang lebih personal dan mendalam."
      } else if (val.includes('bakat') || val.includes('bingung') || val.includes('karir')) {
        resultText = "Kamu sepertinya sedang berada di persimpangan jalan mengenai potensi diri. Melakukan pemetaan kekuatan diri adalah langkah awal yang sangat cerdas."
      }

      setAnalysis(resultText)
      setInputValue('') // Clear input for next question
      
      setTimeout(() => {
        setPhase('result')
      }, 1000)
    }, 2000)
  }

  const reset = () => {
    setPhase('input')
    setInputValue('')
    setLastQuestion('')
    setAnalysis('')
  }

  const getRecommendation = () => {
    const val = lastQuestion.toLowerCase()
    const isIntense = val.length > 50 || val.includes('parah') || val.includes('stres') || val.includes('depresi')
    
    return isIntense ? {
      title: 'Konseling Profesional',
      desc: 'Sesi privat dengan psikolog ahli untuk membantu mengurai masalahmu secara tuntas.',
      href: '/konseling',
      icon: MessageSquare,
      theme: 'bg-indigo-600 text-white',
      label: 'Rekomendasi Utama'
    } : {
      title: 'Psikotes & Asesmen',
      desc: 'Pahami profil kepribadian dan potensi dirimu untuk menentukan langkah yang paling efektif.',
      href: '/psikotes/premium',
      icon: Brain,
      theme: 'bg-primary-600 text-white',
      label: 'Saran Langkah Awal'
    }
  }

  const rec = phase === 'result' ? getRecommendation() : null

  return (
    <div className="w-full">
      
      {/* 1. INITIAL INPUT PHASE (Big Search Bar) */}
      {phase === 'input' && (
        <div className="max-w-xl mx-auto flex flex-col gap-4">
          <form 
            onSubmit={handleManualSubmit}
            className={cn(
              "relative flex items-center transition-all duration-500",
              "bg-white rounded-3xl shadow-2xl overflow-hidden p-2",
              isInputFocused ? "ring-4 ring-primary-500/20 translate-y-[-2px]" : ""
            )}
          >
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ceritakan masalah atau kendala yang kamu rasakan..."
              className={cn(
                "flex-1 h-14 bg-transparent border-none focus:outline-none focus:ring-0",
                "text-slate-700 font-medium placeholder:text-slate-300 placeholder:font-normal"
              )}
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={cn(
                "h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                inputValue.trim() 
                  ? "bg-primary-600 text-white hover:bg-primary-700" 
                  : "bg-slate-50 text-slate-300 cursor-not-allowed"
              )}
            >
              Analisis
            </button>
          </form>
          
          <div className="flex justify-center gap-4 opacity-60">
             <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent-300" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">AI Analysis</span>
             </div>
             <div className="w-px h-2 bg-white/20 mt-1" />
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Always Active</span>
             </div>
          </div>
        </div>
      )}

      {/* 2. THINKING PHASE */}
      {phase === 'thinking' && (
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
          <div className="space-y-1">
            <h3 className="text-white font-black uppercase text-xs tracking-widest">Menganalisis</h3>
            <p className="text-white/60 text-xs font-medium">Asisten sedang merumuskan solusi terbaik untukmu...</p>
          </div>
        </div>
      )}

      {/* 3. RESULT PHASE (2 Cards: Left - User Question, Right - AI Answer) */}
      {phase === 'result' && rec && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* LEFT CARD: USER QUESTION & RE-INPUT */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 flex flex-col gap-6 text-left relative overflow-hidden group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Pertanyaan Anda</span>
            </div>
            
            <div className="flex-1">
              <p className="text-white font-bold text-lg leading-relaxed italic">
                &quot;{lastQuestion}&quot;
              </p>
            </div>

            {/* Re-input Area */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Ingin bertanya hal lain?</span>
              <form 
                onSubmit={handleManualSubmit}
                className="relative flex items-center bg-white/10 rounded-2xl border border-white/20 p-1 focus-within:bg-white/20 transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pertanyaan lanjutan..."
                  className="flex-1 h-10 bg-transparent border-none focus:outline-none focus:ring-0 text-white text-xs px-3 placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-xl bg-white text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            <button 
              onClick={reset}
              className="text-[9px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 self-start"
            >
              <RotateCcw className="w-3 h-3" /> Mulai Dari Awal
            </button>
          </div>

          {/* RIGHT CARD: AI ANALYSIS */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analisis Psikolog AI</span>
            </div>
            
            <div className="flex-1">
              <p className="text-slate-700 font-bold text-lg leading-relaxed">
                {analysis}
              </p>
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Rekomendasi Layanan:</span>
              <a 
                href={rec.href}
                className={cn(
                  "flex items-center justify-between p-5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm",
                  rec.theme
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">{rec.title}</h4>
                    <p className="text-[10px] opacity-80 font-medium">Lihat Detail Program</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
