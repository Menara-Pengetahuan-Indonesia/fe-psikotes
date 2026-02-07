import type { Metadata } from 'next'

import {
  PerusahaanOverview,
  PerusahaanStats,
  PerusahaanProcess,
} from '@/features/psikotes/perusahaan/components'
import {
  CategoryFaqSection,
} from '@/features/psikotes/shared/components'
import {
  PERUSAHAAN_FAQ,
} from '@/features/psikotes/constants'

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
