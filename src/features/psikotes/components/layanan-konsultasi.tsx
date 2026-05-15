'use client'

import {
  MessageSquare,
  ShieldCheck,
  Target,
  HeartHandshake,
  Lock,
  User,
  TrendingUp,
} from 'lucide-react'

export function KonsulasiHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-20">
      {/* Decorative orbs */}
      <div className="absolute top-[-8%] left-[-8%] w-[400px] h-[400px] bg-primary-100/50 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[8%] w-[150px] h-[150px] bg-amber-200/30 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left: Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <HeartHandshake className="w-3.5 h-3.5" />
              Konsultasi, Konseling, Live Coaching
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)]">
                Get real-time guidance
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-courgette)] text-accent-500 italic">
                from licensed psychologists
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
              through live one-on-one sessions. Whether you need clarity, emotional support, or a growth plan — we meet you where you are.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center gap-0">
              <div className="flex items-center gap-2 pr-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">1-on-1</p>
                  <p className="text-xs text-gray-500 leading-tight">Live Session</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 px-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Licensed</p>
                  <p className="text-xs text-gray-500 leading-tight">Psychologists</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 pl-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Personalized</p>
                  <p className="text-xs text-gray-500 leading-tight">Growth Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-primary-50 rounded-3xl border border-primary-100 overflow-hidden flex items-center justify-center">
              {/* Video call mockup */}
              <div className="w-[85%] h-[80%] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                {/* Video area */}
                <div className="flex-1 bg-gradient-to-br from-primary-700 to-primary-900 relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-400/30 flex items-center justify-center">
                    <User className="w-8 h-8 text-white/70" />
                  </div>
                  {/* Small self-view */}
                  <div className="absolute bottom-3 right-3 w-14 h-10 rounded-lg bg-primary-600 border-2 border-white/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-white/60" />
                  </div>
                  {/* Controls */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-white rounded" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bermoela logo badge */}
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white shadow-md border border-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-black text-sm font-[family-name:var(--font-courgette)]">b</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export function KonsulasiFeatures() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-50 rounded-3xl p-8 md:p-10 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">

            {/* Left */}
            <div className="md:w-[38%] shrink-0 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 border border-primary-200 flex items-center justify-center">
                <HeartHandshake className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h2 className="text-primary-800 text-xl md:text-2xl font-bold leading-snug font-[family-name:var(--font-quicksand)]">
                  Find Clarity. Build Resilience. Grow Forward.
                </h2>
                <div className="w-10 h-0.5 bg-accent-500 mt-2 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  Konsultasi, konseling, dan live coaching dirancang untuk membantu Anda memahami diri, mengatasi tantangan, dan mencapai perubahan nyata yang berkelanjutan.
                </p>
              </div>
            </div>

            {/* Right: 3 columns */}
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Keamanan & Privasi</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Sesi rahasia dan aman dengan standar etika psikologi profesional.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Pendekatan Personal</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Setiap sesi disesuaikan dengan kebutuhan, konteks, dan tujuan Anda.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Dampak Nyata</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Bukan hanya memahami masalah, tapi juga memiliki rencana aksi yang jelas.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
