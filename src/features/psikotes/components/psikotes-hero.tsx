'use client'

import {
  Sparkles,
  ArrowDown,
  Plus,
  Circle,
  Hexagon,
  Diamond,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'
import { PsikotesDiagnostic } from './psikotes-diagnostic'
import { BermoelaText } from './bermoela-text'

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-900 via-primary-800 to-primary-600 pt-32 pb-16 md:pt-44 md:pb-24">
      
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      {/* 1. Topographic Pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: TOPO_WHITE,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      {/* 2. Large Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 3. Floating Geometric Icons */}
      <Plus className="absolute top-[15%] left-[10%] text-white/10 w-8 h-8 animate-float-slow" />
      <Circle className="absolute top-[40%] right-[5%] text-accent-400/10 w-12 h-12 animate-float-medium" />
      <Hexagon className="absolute bottom-[20%] left-[5%] text-primary-300/10 w-20 h-20 -rotate-12 animate-float-slow" />
      <Diamond className="absolute top-[60%] left-[15%] text-white/5 w-10 h-10 rotate-12 animate-float-medium" />
      <Star className="absolute top-[25%] right-[25%] text-accent-300/20 w-4 h-4 fill-accent-300/20 animate-pulse" />
      <Star className="absolute bottom-[35%] left-[30%] text-white/10 w-3 h-3 fill-white/10 animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Header Content */}
          <div className="flex flex-col items-center space-y-6 max-w-5xl mx-auto">
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
                Mental Health untuk Tumbuh dan <br className="hidden md:block" /> Sukses di <span className="text-accent-300 italic">Era Penuh Tekanan</span>
              </h1>
              <p className="text-sm md:text-base text-primary-50/80 max-w-xl mx-auto leading-relaxed font-medium text-pretty">
                Assessment berbasis riset psikologi untuk membantumu mendapatkan <span className="text-white font-bold italic">&quot;The New You&quot;</span>, dirimu yang baru menyambut masa depan yang indah.
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
