import { Building2, Plus, Hexagon, Diamond } from 'lucide-react'

import { TestCategoryCard } from '../../components'
import { PERUSAHAAN_TESTS } from '../../constants'

export function PerusahaanOverview() {
  return (
    <section className="min-h-screen bg-[#fefce8] relative overflow-hidden">
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%2315803d' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />

      <Plus className="absolute top-[10%] left-[15%] text-emerald-600/20 w-8 h-8 animate-pulse" />
      <Hexagon className="absolute top-[20%] right-[10%] text-emerald-600/10 w-24 h-24 -rotate-12 animate-float-slow" />
      <Diamond className="absolute bottom-[20%] left-[5%] text-amber-600/10 w-16 h-16 rotate-12 animate-float-medium" />

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase">
            Corporate Solutions
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-800 leading-tight mb-6 tracking-tight">
          Psikotes & Asesmen untuk<br />
          <span className="text-emerald-600 relative inline-block">Perusahaan & Bisnis
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-stone-500 font-medium leading-relaxed">
          Solusi asesmen psikologi end-to-end untuk mendukung proses rekrutmen,
          pengembangan talenta, dan perencanaan karir strategis.
        </p>
      </div>

      {/* ── Card Grid with Feature Tags ────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERUSAHAAN_TESTS.map((test, index) => (
            <div key={test.id} className="flex flex-col gap-4">
              {/* Standard card */}
              <TestCategoryCard
                test={test}
                number={index + 1}
                href={`/psikotes/perusahaan/${test.slug}`}
              />

              {/* Feature tags row styled to match */}
              <div className="flex flex-wrap gap-2 px-2">
                {test.features.map((feature) => (
                  <span
                    key={feature.label}
                    className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[9px] font-black uppercase tracking-wider text-stone-400 shadow-sm"
                  >
                    {feature.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

