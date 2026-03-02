'use client'

import {
  Sparkles,
  ArrowDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'
import { PsikotesDiagnostic } from './psikotes-diagnostic'
import { BermoelaText } from './bermoela-text'

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-800 via-primary-700 to-primary-600 pt-32 pb-16 md:pt-44 md:pb-24">
      
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: TOPO_WHITE,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Header Content */}
          <div className="flex flex-col items-center space-y-6 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-accent-400 fill-accent-400" />
              <span className="text-[9px] font-black tracking-[0.2em] text-primary-50 uppercase">
                The New You Transformation
              </span>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-sm">
                Mental Health untuk <span className="text-accent-300 italic">Tumbuh dan Sukses</span>
              </h1>
              <p className="text-sm md:text-base text-primary-50/80 max-w-xl mx-auto leading-relaxed font-medium text-pretty">
                Lepaskan kendala masa lalu untuk mendapatkan <span className="text-white font-bold italic">"The New You"</span>, dirimu yang baru, penuh potensi kuat menyambut masa depan yang indah.
              </p>
            </div>
          </div>

          {/* Diagnostic Area - CENTERED */}
          <div className="w-full max-w-4xl mx-auto relative group">
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <PsikotesDiagnostic />
            </div>
            
            {/* Subtle ambient glows */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </div>

          {/* Footer of Hero */}
          <div className="pt-12 flex flex-col items-center gap-4">
             <p className="text-primary-200/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                Semua bisa <BermoelaText className="text-primary-200/60" /> dari sini
             </p>
             <div className="animate-bounce opacity-20">
                <ArrowDown className="w-4 h-4 text-white" />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
