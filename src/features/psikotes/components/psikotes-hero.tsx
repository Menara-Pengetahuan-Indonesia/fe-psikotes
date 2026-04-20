'use client'

import {
  ArrowDown,
} from 'lucide-react'
import { PsikotesDiagnostic } from './psikotes-diagnostic'
import { BermoelaText } from './bermoela-text'

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-900 via-primary-800 to-primary-600 pt-26 pb-8 md:pt-36 md:pb-12">

      {/* Simple gradient orbs instead of heavy blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-500/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-500/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">

          {/* Header Content */}
          <div className="flex flex-col items-center space-y-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-sm">
                Mental Health untuk Tumbuh dan Sukses <br /> <span className="text-accent-300 italic text-4xl md:text-5xl">di Era Penuh Tekanan</span>
              </h1>
              <p className="text-sm md:text-base text-primary-50/80 max-w-xl mx-auto leading-relaxed font-medium text-pretty">
                Assessment psikologis berbasis riset sebagai titik mula menuju <span className="text-white font-bold italic">&quot;The New You&quot;</span>..... dan masa depan yang lebih terarah
              </p>
            </div>
          </div>

          {/* Diagnostic Area */}
          <div className="w-full max-w-4xl mx-auto">
             <PsikotesDiagnostic />
          </div>

          {/* Footer of Hero */}
          <div className="pt-0 flex flex-col items-center gap-4">
             <p className="text-primary-200/40 text-xs font-bold uppercase tracking-[0.3em]">
                Semua bisa <BermoelaText className="text-primary-200/60" /> dari sini
             </p>
             <div className="opacity-20">
                <ArrowDown className="w-4 h-4 text-white" />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
