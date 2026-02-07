import type { Metadata } from 'next'

import {
  MahasiswaOverview,
  MahasiswaBenefitsCarousel,
  MahasiswaProcess,
} from '@/features/psikotes/mahasiswa/components'
import {
  CategoryFaqSection,
} from '@/features/psikotes/shared/components'
import {
  MAHASISWA_FAQ,
} from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Psikotes Mahasiswa — BERMOELA',
  description:
    'Temukan minat, bakat, dan potensi'
    + ' akademik Anda melalui psikotes'
    + ' khusus mahasiswa dan pelajar.',
}

export default function MahasiswaPage() {
  return (
    <main>
      <MahasiswaOverview />
      <MahasiswaBenefitsCarousel />
      <MahasiswaProcess />
      <CategoryFaqSection
        faqs={MAHASISWA_FAQ}
      />
    </main>
  )
}
