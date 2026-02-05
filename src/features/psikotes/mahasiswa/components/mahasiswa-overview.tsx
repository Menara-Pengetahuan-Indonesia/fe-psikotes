import { GraduationCap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { TestCategoryCard } from '../../components'
import { MAHASISWA_TESTS } from '../../constants'

export function MahasiswaOverview() {
  return (
    <section className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Student Solutions
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
          Psikotes &amp; Asesmen untuk<br />
          <span className="text-slate-500">Mahasiswa &amp; Pelajar</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base text-slate-500 leading-relaxed">
          Temukan potensi terbaik Anda dengan rangkaian tes psikologi dan asesmen
          yang dirancang khusus untuk mendukung perjalanan akademik dan karir
          mahasiswa serta pelajar Indonesia.
        </p>
      </div>

      {/* ── Card Grid ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAHASISWA_TESTS.map((test, index) => (
            <TestCategoryCard
              key={test.id}
              test={test}
              number={index + 1}
              href={`/psikotes/mahasiswa/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
