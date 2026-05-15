'use client'

import { GraduationCap, BookOpen, Award, Users } from 'lucide-react'

export function PelatihanHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="absolute top-[-8%] right-[-8%] w-[400px] h-[400px] bg-primary-100/50 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[100px] h-[100px] bg-amber-200/30 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <GraduationCap className="w-3.5 h-3.5" />
              Pelatihan
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)]">
                Build real psychological skills
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-courgette)] text-accent-500 italic">
                for yourself or others
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
              Our training programs are structured, practical, and grounded in clinical psychology — whether you&apos;re healing yourself or building a career helping others.
            </p>
            <div className="flex flex-wrap items-center gap-0">
              <div className="flex items-center gap-2 pr-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Structured</p>
                  <p className="text-xs text-gray-500 leading-tight">Curriculum</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 px-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Sertifikat</p>
                  <p className="text-xs text-gray-500 leading-tight">Profesional</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 pl-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">2 Track</p>
                  <p className="text-xs text-gray-500 leading-tight">Tersedia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-primary-50 rounded-3xl border border-primary-100 overflow-hidden flex items-center justify-center">
              <div className="w-[85%] h-[80%] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-3 p-5">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-primary-100 rounded-full w-2/3" />
                  </div>
                  <div className="px-2 py-0.5 bg-accent-100 rounded-full">
                    <span className="text-[9px] text-accent-700 font-bold">Live</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {[
                    { label: 'Modul 1', w: '100%', done: true },
                    { label: 'Modul 2', w: '100%', done: true },
                    { label: 'Modul 3', w: '65%', done: false },
                    { label: 'Modul 4', w: '0%', done: false },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${m.done ? 'bg-primary-500' : 'bg-gray-100'}`}>
                        {m.done && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className="bg-primary-400 h-1.5 rounded-full" style={{ width: m.w }} />
                      </div>
                      <span className="text-[9px] text-gray-400 w-12 text-right">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400">Progress</span>
                  <span className="text-[10px] text-primary-600 font-bold">65%</span>
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

export function PelatihanFeatures() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-50 rounded-3xl p-8 md:p-10 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="md:w-[38%] shrink-0 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 border border-primary-200 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h2 className="text-primary-800 text-xl md:text-2xl font-bold leading-snug font-[family-name:var(--font-quicksand)]">
                  Learn. Practice. Lead with Confidence.
                </h2>
                <div className="w-10 h-0.5 bg-accent-500 mt-2 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  Program pelatihan kami dirancang untuk dua jalur: individu yang ingin menyembuhkan diri, dan mereka yang ingin menjadi counselor atau life coach profesional yang kompeten.
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Mental Healing Track</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Pelajari teknik grounding, regulasi emosi, dan self-healing yang bisa langsung diterapkan dalam kehidupan sehari-hari.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Counselor & Coach Track</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Kembangkan kemampuan untuk mendampingi klien, melakukan asesmen, dan menjalankan sesi coaching secara etis dan profesional.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-primary-800 font-bold text-sm">Sertifikasi</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Selesaikan program dan dapatkan sertifikat yang diakui sebagai bukti kompetensi Anda di bidang psikologi terapan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { PelatihanFeatures as PelatihanTracks }
export const PelatihanInclusions = () => null

