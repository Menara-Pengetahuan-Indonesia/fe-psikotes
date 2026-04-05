import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  PerusahaanOverview,
} from '@/features/psikotes/perusahaan/components'
import {
  PERUSAHAAN_FAQ,
} from '@/features/psikotes/constants'

const PerusahaanStats = dynamic(
  () => import('@/features/psikotes/perusahaan/components/perusahaan-stats')
    .then((mod) => mod.PerusahaanStats),
  { loading: () => <div className="min-h-[400px]" /> }
)
const PerusahaanProcess = dynamic(
  () => import('@/features/psikotes/perusahaan/components/perusahaan-process')
    .then((mod) => mod.PerusahaanProcess),
  { loading: () => <div className="min-h-[400px]" /> }
)
const CategoryFaqSection = dynamic(
  () => import('@/features/psikotes/shared/components/category-faq-section')
    .then((mod) => mod.CategoryFaqSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

export const metadata: Metadata = {
  title: 'Psikotes Perusahaan — BERMOELA',
  description:
    'Solusi psikotes korporat untuk'
    + ' rekrutmen, kenaikan jabatan, dan'
    + ' perencanaan karir yang efektif.',
}

export default function PerusahaanPage() {
  return (
    <main>
      <PerusahaanOverview />
      <PerusahaanStats />
      <PerusahaanProcess />
      <CategoryFaqSection
        faqs={PERUSAHAAN_FAQ}
      />
    </main>
  )
}
