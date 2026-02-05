import { Heart } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { TestCategoryCard } from '../../components'
import { KESEHATAN_MENTAL_TESTS } from '../../constants'

export function MentalHealthOverview() {
  return (
    <section className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider"
        >
          <Heart className="w-3.5 h-3.5" />
          Mental Wellness
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
          Psikotes &amp; Asesmen untuk<br />
          <span className="text-slate-500">Kesehatan Mental</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base text-slate-500 leading-relaxed">
          Kenali kondisi mental Anda lebih dalam melalui asesmen yang dirancang
          dengan pendekatan psikologi klinis untuk mendukung kesejahteraan dan
          kesehatan mental Anda sehari-hari.
        </p>
      </div>

      {/* ── Card Grid ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KESEHATAN_MENTAL_TESTS.map((test, index) => (
            <TestCategoryCard
              key={test.id}
              test={test}
              number={index + 1}
              href={`/psikotes/kesehatan-mental/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
