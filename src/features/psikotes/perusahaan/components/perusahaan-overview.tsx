import { Building2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { TestCategoryCard } from '../../components'
import { PERUSAHAAN_TESTS } from '../../constants'

export function PerusahaanOverview() {
  return (
    <section className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider"
        >
          <Building2 className="w-3.5 h-3.5" />
          Corporate Solutions
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
          Psikotes &amp; Asesmen untuk<br />
          <span className="text-slate-500">Perusahaan</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base text-slate-500 leading-relaxed">
          Solusi asesmen psikologi end-to-end untuk mendukung proses rekrutmen,
          pengembangan talenta, dan perencanaan karir karyawan di perusahaan Anda.
        </p>
      </div>

      {/* ── Card Grid with Feature Tags ────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERUSAHAAN_TESTS.map((test, index) => (
            <div key={test.id} className="flex flex-col">
              {/* Standard card */}
              <TestCategoryCard
                test={test}
                number={index + 1}
                href={`/psikotes/perusahaan/${test.slug}`}
              />

              {/* Feature tags row rendered below the card */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {test.features.map((feature) => (
                  <span
                    key={feature.label}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500"
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
