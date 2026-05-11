'use client'

import { Brain, BookOpen, FileText, Map, Users } from 'lucide-react'

export function TesPemetaanHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="absolute top-[-8%] right-[-8%] w-[400px] h-[400px] bg-primary-100/50 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-[5%] w-[120px] h-[120px] bg-amber-200/30 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <Brain className="w-3.5 h-3.5" />
              Tes Pemetaan, Asesmen, dan Blueprint
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)]">
                Understand yourself
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-courgette)] text-accent-500 italic">
                through science-backed assessments
              </h1>
            </div>

            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
              designed for all life stages. Get a complete blueprint of your mind, strengths, and growth areas — with a clear action plan for what comes next.
            </p>

            <div className="flex flex-wrap items-center gap-0">
              <div className="flex items-center gap-2 pr-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">20+</p>
                  <p className="text-xs text-gray-500 leading-tight">Jenis Tes</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 px-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Laporan</p>
                  <p className="text-xs text-gray-500 leading-tight">Lengkap & Detail</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 pl-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Map className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Blueprint</p>
                  <p className="text-xs text-gray-500 leading-tight">Rencana 90 Hari</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-primary-50 rounded-3xl border border-primary-100 overflow-hidden flex items-center justify-center">
              <div className="w-[85%] h-[80%] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 h-2 bg-primary-100 rounded-full" />
                  <div className="w-12 h-2 bg-accent-200 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {[85, 72, 91, 68, 79, 88].map((val, i) => (
                    <div key={i} className="bg-primary-50 rounded-lg p-2 flex flex-col justify-between">
                      <div className="w-full bg-primary-100 rounded-full h-1.5">
                        <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${val}%` }} />
                      </div>
                      <p className="text-[9px] text-primary-700 font-bold mt-1">{val}%</p>
                    </div>
                  ))}
                </div>
                <div className="h-1.5 bg-primary-100 rounded-full">
                  <div className="bg-accent-400 h-1.5 rounded-full w-3/4" />
                </div>
              </div>
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

export function TesPemetaanFeatures() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-50 rounded-3xl p-8 md:p-10 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="md:w-[38%] shrink-0 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 border border-primary-200 flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h2 className="text-primary-800 text-xl md:text-2xl font-bold leading-snug font-[family-name:var(--font-quicksand)]">
                  Know Yourself. Map Your Path. Build Your Future.
                </h2>
                <div className="w-10 h-0.5 bg-accent-500 mt-2 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tes pemetaan kami dirancang untuk memberikan gambaran menyeluruh tentang potensi, kepribadian, dan arah hidup Anda — bukan sekadar angka, tapi peta nyata menuju versi terbaik diri Anda.
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Untuk Semua Usia</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Dari pelajar hingga profesional, setiap tes disesuaikan dengan konteks dan tahap kehidupan Anda.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Laporan Mendalam</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Hasil tes disajikan dalam laporan visual yang mudah dipahami dan bisa langsung digunakan.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <Map className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Blueprint Aksi</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Setiap hasil dilengkapi rencana aksi 90 hari yang konkret dan bisa langsung dijalankan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
