import {
  Sparkles,
  Brain,
  Target,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

import {
  PsikotesDiagnostic,
} from './psikotes-diagnostic'

const HERO_BENEFITS = [
  {
    label: 'Self-Awareness',
    desc: 'Kenali kekuatan dan kelemahan'
      + ' diri secara objektif.',
    icon: Brain,
  },
  {
    label: 'Good Pragmatism',
    desc: 'Fokus pada langkah yang benar-'
      + 'benar berhasil dalam hidup.',
    icon: Target,
  },
  {
    label: 'Continuous Growth',
    desc: 'Tumbuh satu persen lebih baik'
      + ' setiap harinya.',
    icon: Zap,
  },
  {
    label: 'Mental Resilience',
    desc: 'Bangun ketahanan mental'
      + ' menghadapi tantangan.',
    icon: ShieldCheck,
  },
]

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-800 via-primary-700 to-primary-600 pt-32 pb-16 md:pt-44 md:pb-24">
      
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      {/* 1. Subtle Topographic Line Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: TOPO_WHITE,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Header Content */}
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-accent-400 fill-accent-400" />
              <span className="text-[9px] font-black tracking-[0.2em] text-primary-50 uppercase">
                Psychology Assistant
              </span>
            </div>
            
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-sm">
                Kenali Dirimu, <span className="text-accent-300">Potensimu</span> Menanti.
              </h1>
              <p className="text-sm md:text-base text-primary-50/80 max-w-xl mx-auto leading-relaxed font-medium text-pretty">
                Metode asesmen ilmiah untuk memahami kepribadian dan bakatmu secara akurat.
              </p>
            </div>
          </div>

          {/* Redesigned Diagnostic Area - Chatbot Style */}
          <div className="w-full max-w-4xl mx-auto relative mt-4 mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <PsikotesDiagnostic />
            
            {/* Subtle ambient glows instead of floating icons */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-accent-400/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Benefits Grid - Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-8">
            {HERO_BENEFITS.map((b, idx) => (
              <div key={b.label} 
                   className={cn(
                     "flex flex-col items-center text-center gap-4 p-6 rounded-3xl border transition-all duration-500 hover:-translate-y-2",
                     "bg-primary-700/40 border-primary-500/30 backdrop-blur-md hover:bg-primary-700/60 hover:shadow-2xl hover:shadow-primary-900/40"
                   )}
                   style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="bg-white/10 p-3 rounded-2xl shrink-0 text-accent-300 border border-white/10 shadow-inner">
                  <b.icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <p className="font-black text-white text-sm mb-2 uppercase tracking-wide">{b.label}</p>
                  <p className="text-primary-100/70 text-xs leading-relaxed font-medium">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary CTA area */}
          <div className="flex flex-col items-center gap-4 pt-4">
             <div className="flex items-center gap-4">
                <span className="text-[10px] text-primary-200 font-black uppercase tracking-widest">Harga Layanan Mulai Dari</span>
                <span className="text-3xl font-black text-white tracking-tight">Rp25.000</span>
             </div>
             <p className="text-primary-200/60 text-[10px] font-bold uppercase tracking-[0.3em]">Bekerjasama dengan Psikolog Profesional</p>
          </div>

        </div>
      </div>
    </section>
  )
}