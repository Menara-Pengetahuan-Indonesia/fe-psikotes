import Image from 'next/image'
import { Star, BookOpen, Lightbulb, Target, HeartPulse } from 'lucide-react'
import { PsikotesDiagnostic } from './psikotes-diagnostic'

const FEATURES = [
  { icon: HeartPulse, label: 'Mental Health' },
  { icon: BookOpen, label: 'Berbasis Riset' },
  { icon: Lightbulb, label: 'AI-Powered' },
  { icon: Target, label: 'Growth Plan' },
]

const HERO_IMG = '/hero/usman.png'

export function PsikotesHero() {
  return (
    <section className="bg-white px-4 py-4 md:px-6 md:py-5">

      {/* ── HERO CARD ── */}
      <div
        className="relative overflow-hidden rounded-[2rem] min-h-[calc(100vh-96px)]"
        style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 18%, #bfdbfe 55%, #dbeafe 80%, #e0f2fe 100%)' }}
      >

        {/* Hero image — absolutely positioned right side */}
        <div className="absolute top-0 right-0 z-0 pointer-events-none overflow-hidden" style={{ width: '45%', height: '100%' }}>
          <Image
            src={HERO_IMG}
            alt="Psikolog profesional"
            fill
            className="object-cover object-top"
            priority
            sizes="45vw"
          />
          {/* fade top */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#d1fae5] to-transparent" />
          {/* fade bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#bfdbfe] to-transparent" />
          {/* fade left */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#c7e8f5] to-transparent" />
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid min-h-[calc(100vh-96px)] items-center gap-6"
          style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}
        >

          {/* ── LEFT ── */}
          <div className="flex flex-col justify-between space-y-5 h-full py-4">

            <div className="flex flex-col space-y-5">
            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['A','B','C','D'].map((l) => (
                  <div key={l} className="w-7 h-7 rounded-full bg-white/70 border-2 border-white flex items-center justify-center text-[9px] font-black text-emerald-700">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[11px] text-emerald-800/70 font-semibold">Dipercaya 10k+ pengguna</p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2.5">
              <h1 className="text-3xl md:text-4xl xl:text-[2.6rem] font-black text-gray-900 tracking-tight leading-[1.1]">
                Mental Health untuk{' '}
                <span className="text-emerald-600 italic">Tumbuh dan Sukses</span>{' '}
                di Era Penuh Tekanan
              </h1>
              <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
                Assessment psikologis berbasis riset sebagai titik mula menuju{' '}
                <span className="text-gray-800 font-bold italic">&quot;The New You&quot;</span>.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-white/60 text-[11px] font-semibold text-gray-700">
                  <Icon className="w-3 h-3 text-emerald-600" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 w-fit">
              <a href="/asesmen" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-bold shadow-sm shadow-amber-200 transition-colors whitespace-nowrap">
                Mulai Asesmen
              </a>
              <a href="/tes-gratis" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-white/60 text-gray-700 text-sm font-semibold transition-colors whitespace-nowrap">
                Tes Gratis
              </a>
            </div>
            </div>

            {/* Chatbot — bottom left */}
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <PsikotesDiagnostic />
            </div>

          </div>

          {/* ── RIGHT: empty (photo fills this area) ── */}
          <div />

        </div>
      </div>
    </section>
  )
}

