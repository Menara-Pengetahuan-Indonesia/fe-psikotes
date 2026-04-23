'use client'

import {
  ArrowDown,
} from 'lucide-react'
import { PsikotesDiagnostic } from './psikotes-diagnostic'
import { PsikotesServices } from './psikotes-layanan'
import { BermoelaText } from './bermoela-text'

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-8 md:pt-20 md:pb-12">

      {/* Decorative orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-100/60 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-100/60 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">

          {/* Header Content */}
          <div className="flex flex-col items-center space-y-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1.1]">
                Mental Health untuk Tumbuh dan Sukses <br /> <span className="text-accent-500 italic text-4xl md:text-5xl">di Era Penuh Tekanan</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-medium text-pretty">
                Jadikan assessment psikologis sebagai cara <span className="text-primary-600 font-bold italic">Bermoela</span> menuju dirimu yang baru dan masa depan yang lebih terarah
              </p>
            </div>
          </div>

          {/* Services */}
          <PsikotesServices />

          {/* Diagnostic Area */}
          <div className="w-full max-w-4xl mx-auto">
             <PsikotesDiagnostic />
          </div>

          {/* Footer of Hero */}
          <div className="pt-0 flex flex-col items-center gap-4">
             <p className="text-gray-300 text-xs font-bold uppercase tracking-[0.3em]">
                Semua bisa <BermoelaText className="text-primary-400" /> dari sini
             </p>
             <div className="opacity-30">
                <ArrowDown className="w-4 h-4 text-primary-400" />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
