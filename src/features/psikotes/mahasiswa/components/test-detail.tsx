import Link from 'next/link'
import { ArrowRight, Clock, Users, ChevronDown, Sparkles, Plus, Hexagon, ShieldCheck, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ── Props ─────────────────────────────────────────────────────────────────────

export interface TestDetailProps {
  title: string
  badge: string
  description: string
  duration: string
  participants: string
  aspects: { heading: string; items: { title: string; desc: string }[] }[]
  price: string
  originalPrice: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TestDetail({
  title,
  badge,
  description,
  duration,
  participants,
  aspects,
  price,
  originalPrice,
}: TestDetailProps) {
  return (
    <div className="min-h-screen bg-[#fefce8]">
      {/* ── Vibrant Hero ───────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-emerald-600 text-white pt-24 pb-20 md:pt-36 md:pb-28">
        {/* --- RICH BACKGROUND ORNAMENTS --- */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
               backgroundSize: '400px 400px'
             }}
        />
        <Plus className="absolute top-[15%] left-[10%] text-emerald-400/40 w-8 h-8 animate-pulse" />
        <Hexagon className="absolute bottom-[10%] right-[10%] text-white/10 w-24 h-24 -rotate-12 animate-float-slow" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/50 border border-emerald-400 shadow-lg backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-emerald-50 uppercase">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8 max-w-4xl tracking-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Metrics Row */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
              <Clock className="w-5 h-5 text-amber-300" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Durasi</span>
                <span className="text-sm font-bold">{duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
              <Users className="w-5 h-5 text-sky-300" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Peserta</span>
                <span className="text-sm font-bold">{participants}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-700/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-bold italic uppercase tracking-tighter">Verified Result</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body: 2-col Grid ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ── Left Column ─── About + Aspects + FAQ ──────── */}
          <div className="lg:col-span-2 space-y-16">
            {/* About */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                <h2 className="text-3xl font-black text-stone-800 tracking-tight">
                  Tentang Tes Ini
                </h2>
              </div>
              <p className="text-lg text-stone-600 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            {/* Aspects */}
            {aspects.length > 0 && (
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-8 bg-amber-500 rounded-full" />
                  <h2 className="text-3xl font-black text-stone-800 tracking-tight">
                    Aspek yang Diukur
                  </h2>
                </div>

                <div className="space-y-10">
                  {aspects.map((section) => (
                    <div key={section.heading} className="space-y-4">
                      <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] ml-1">
                        {section.heading}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.items.map((item) => (
                          <div
                            key={item.title}
                            className="p-6 bg-white rounded-[2rem] border-2 border-stone-100 border-b-[6px] border-b-emerald-100 hover:border-emerald-500 hover:border-b-emerald-600 transition-all duration-300 shadow-xl shadow-stone-200/50"
                          >
                            <p className="text-lg font-black text-stone-800 mb-2">
                              {item.title}
                            </p>
                            <p className="text-sm text-stone-500 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-8 bg-sky-500 rounded-full" />
                <h2 className="text-3xl font-black text-stone-800 tracking-tight">
                  Pertanyaan Umum
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  'Berapa lama waktu yang diperlukan untuk menyelesaikan tes ini?',
                  'Apakah hasil tes bisa digunakan untuk keperluan akademik?',
                  'Dapatkah saya mengulang tes setelah selesai?',
                ].map((question) => (
                  <button
                    key={question}
                    className="w-full text-left flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-stone-100 border-b-[4px] border-b-stone-200 hover:border-emerald-500 hover:border-b-emerald-600 transition-all group"
                  >
                    <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900">
                      {question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ─── Sticky Pricing Card ──────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-[2.5rem] border-2 border-slate-900 bg-white shadow-[10px_10px_0_0_#0f172a] overflow-hidden">
              {/* Card Header */}
              <div className="bg-secondary-900 text-white px-8 py-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                  Investasi Masa Depan
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black tracking-tight">{price}</span>
                  <span className="text-slate-500 line-through text-sm font-bold">
                    {originalPrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-8">
                {/* Includes */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Yang Anda Dapatkan
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Akses penuh ke seluruh modul tes',
                      'Laporan hasil analisis mendalam',
                      'Rekomendasi karir yang dipersonalisasi',
                      'Akses seumur hidup ke hasil Anda',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-600 font-bold"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 shadow-inner">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4 pt-4">
                  <Button
                    asChild
                    className="w-full rounded-2xl h-16 text-base font-black uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-white shadow-[0_6px_0_#b45309] hover:shadow-[0_3px_0_#b45309] hover:translate-y-[3px] transition-all border-none"
                  >
                    <Link href="#" className="flex items-center gap-2">
                      Mulai Tes Sekarang
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>

                  <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tight">
                    *Hasil tes tersedia dalam format PDF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}