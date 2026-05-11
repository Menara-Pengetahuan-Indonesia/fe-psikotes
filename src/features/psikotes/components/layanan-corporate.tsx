'use client'

import {
  Building2,
  LineChart,
  Users,
  UserCheck,
  Target,
  Heart,
  TrendingUp,
  Puzzle,
  FileSearch,
  MessageSquare,
  GraduationCap,
  Globe,
  Plus,
  Hexagon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Zap,
} from 'lucide-react'

export function CorporateHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-24">
      {/* Decorative orbs */}
      <div className="absolute top-[-8%] left-[-8%] w-[400px] h-[400px] bg-primary-100/40 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute top-[20%] right-[8%] w-[150px] h-[150px] bg-amber-200/30 rounded-full pointer-events-none blur-2xl" />

      {/* Floating Ornaments */}
      <div className="absolute top-32 left-[10%] opacity-20 animate-pulse">
        <Plus className="w-8 h-8 text-primary-400" />
      </div>
      <div className="absolute bottom-40 right-[15%] opacity-15 animate-bounce delay-700">
        <Hexagon className="w-12 h-12 text-accent-400" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:mb-20">

          {/* Left: Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <Building2 className="w-3.5 h-3.5 text-primary-600" />
              Solusi bagi Perusahaan
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)]">
                Kami membantu organisasi membangun
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)] text-gray-900">
                <span className="text-accent-500 font-[family-name:var(--font-courgette)] italic">tim yang sehat secara psikologis</span>
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)] text-gray-900">
                agar berkinerja berkelanjutan
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)] text-gray-900">
                di bawah tekanan.
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed font-medium">
              Dari diagnosis hingga implementasi — kami adalah mitra end-to-end Anda.
            </p>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <LineChart className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Wawasan Berbasis Data</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <Puzzle className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Solusi Terpersonalisasi</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Psikolog Ahli</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Dampak Terukur</p>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex-1 flex items-center justify-center">
             <div className="relative w-full max-w-md aspect-[4/3] bg-primary-50 rounded-3xl border border-primary-100 overflow-hidden flex items-center justify-center">
              {/* Mockup Illustration placeholder */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-2xl shadow-2xl border border-primary-100 p-6 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-primary-100 rounded-lg" />
                  <div className="flex-1 flex gap-4">
                    <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center gap-3">
                       <Users className="w-10 h-10 text-primary-600" />
                       <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-bounce" />
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-bounce delay-75" />
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-bounce delay-150" />
                       </div>
                    </div>
                    <div className="w-1/4 flex flex-col gap-3">
                      <div className="h-10 bg-accent-50 rounded-lg border border-accent-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-accent-500" />
                      </div>
                      <div className="flex-1 bg-sky-50 rounded-lg border border-sky-100" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-10 right-10 w-12 h-12 bg-accent-200 rounded-full blur-xl" />
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary-200 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white shadow-md border border-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-black text-sm font-[family-name:var(--font-courgette)]">b</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-primary-50/50 border border-primary-100 rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm">
           <h3 className="text-primary-800 font-bold text-center mb-10 font-[family-name:var(--font-quicksand)] text-lg">
             Karyawan Sehat. Budaya Kuat. Performa Berkelanjutan.
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-gray-900 font-bold text-[13px] leading-tight">Meningkatkan Kesejahteraan Karyawan</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-2">Karyawan lebih sehat secara mental & emosional.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-gray-900 font-bold text-[13px] leading-tight">Meningkatkan Produktivitas & Fokus</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-2">Tim lebih fokus, kolaboratif, dan berdaya tahan tinggi.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-gray-900 font-bold text-[13px] leading-tight">Mengurangi Risiko Burnout & Turnover</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-2">Cegah kelelahan kerja dan turunkan tingkat turnover.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-gray-900 font-bold text-[13px] leading-tight">Membangun Budaya Kerja yang Sehat</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-2">Budaya yang suportif, aman, dan inklusif.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm">
                  <LineChart className="w-6 h-6 text-primary-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-gray-900 font-bold text-[13px] leading-tight">Keputusan Lebih Tepat Berbasis Data</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-2">Gunakan data psikologis untuk strategi yang lebih akurat.</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export function CorporateApproach() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white relative overflow-hidden">
      {/* Ornaments */}
      <div className="absolute top-1/4 left-[-5%] opacity-[0.03] rotate-12">
        <Plus className="w-64 h-64 text-primary-900" />
      </div>
      <div className="absolute bottom-1/4 right-[-5%] opacity-[0.03] -rotate-12">
        <Hexagon className="w-80 h-80 text-primary-900" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-accent-500 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Pendekatan Kami</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-800 font-[family-name:var(--font-quicksand)]">
            Pendekatan Kami: Dari Wawasan Menjadi Dampak
          </h2>
          <div className="w-16 h-1 bg-accent-500 mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 relative">
          {/* Arrow between cards (desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border-2 border-primary-100 items-center justify-center shadow-lg">
             <ArrowRight className="w-6 h-6 text-primary-500" />
          </div>

          {/* Diagnosis Card */}
          <div className="flex-1 bg-white border-2 border-primary-50 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-100/30 group">
             <div className="flex items-start gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-800">Diagnosis Organisasi</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Kami memetakan kesehatan mental tim, budaya, dan kesenjangan kepemimpinan menggunakan alat penilaian yang tervalidasi.</p>
                </div>
             </div>

             <div className="flex-1 flex flex-col gap-6">
                <div className="bg-primary-50/50 rounded-2xl p-6 border border-primary-100 flex items-center justify-center">
                   <FileSearch className="w-20 h-20 text-primary-400 opacity-60" />
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    'Kesejahteraan & kesehatan mental karyawan',
                    'Budaya kerja & iklim organisasi',
                    'Gaya kepemimpinan & efektivitas manajer',
                    'Risiko psikologis: burnout, stres, disengagement',
                    'Kekuatan tim & area pengembangan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
             </div>

             <div className="bg-primary-50/50 rounded-2xl p-4 flex gap-3 mt-auto">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                   <Lightbulb className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-[11px] text-primary-800 font-medium leading-relaxed">
                   Anda mendapatkan gambaran jelas tentang apa yang berjalan baik dan apa yang secara diam-diam merugikan Anda.
                </p>
             </div>
          </div>

          {/* Intervention Card */}
          <div className="flex-1 bg-white border-2 border-primary-50 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-100/30 group">
             <div className="flex items-start gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-800">Intervensi Kustom</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Setiap perusahaan mendapatkan program yang dirancang khusus — bukan workshop umum. Kami merancang solusi pembinaan, konseling, dan pelatihan.</p>
                </div>
             </div>

             <div className="flex-1 flex flex-col gap-6">
                <div className="bg-accent-50/50 rounded-2xl p-6 border border-accent-100 flex items-center justify-center">
                   <Puzzle className="w-20 h-20 text-accent-400 opacity-60" />
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    'Program kustom sesuai kebutuhan & tujuan bisnis',
                    'Coaching untuk leader & tim',
                    'Konseling & dukungan untuk karyawan',
                    'Pelatihan & pengembangan soft skills',
                    'Pendampingan implementasi & evaluasi',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
             </div>

             <div className="bg-accent-50/50 rounded-2xl p-4 flex gap-3 mt-auto">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                   <Target className="w-5 h-5 text-accent-600" />
                </div>
                <p className="text-[11px] text-accent-800 font-medium leading-relaxed">
                   Solusi yang sesuai dengan struktur Anda, mendorong perubahan, dan memberikan hasil nyata.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CorporateInclusions() {
  const solutions = [
    { title: 'Asesmen Kesejahteraan', desc: 'Asesmen psikologis untuk memetakan kondisi mental karyawan.', icon: Heart },
    { title: 'Coaching Kepemimpinan', desc: 'Pengembangan pemimpin yang empatik dan berdampak.', icon: UserCheck },
    { title: 'Konseling Karyawan', desc: 'Dukungan psikologis profesional yang rahasia.', icon: MessageSquare },
    { title: 'Pelatihan & Workshop', desc: 'Program pelatihan interaktif untuk tim dan organisasi.', icon: GraduationCap },
    { title: 'Budaya & Perubahan', desc: 'Transformasi budaya kerja yang sehat dan berkelanjutan.', icon: Globe },
  ]

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden bg-primary-50/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-gradient-to-r from-primary-100/20 via-accent-50/20 to-primary-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white border border-primary-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-primary-900/5">
          <h3 className="text-primary-800 font-bold text-center mb-12 font-[family-name:var(--font-quicksand)] text-lg md:text-xl">
            Solusi yang Kami Berikan
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {solutions.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-4 group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary-50 flex items-center justify-center shadow-sm border border-primary-100 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-gray-900 font-bold text-xs md:text-[13px] leading-tight">{item.title}</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed px-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
