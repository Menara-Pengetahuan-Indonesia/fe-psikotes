import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  MahasiswaOverview,
} from '@/features/psikotes/mahasiswa/components'
import {
  MAHASISWA_FAQ,
} from '@/features/psikotes/constants'

const MahasiswaBenefitsCarousel = dynamic(
  () => import('@/features/psikotes/mahasiswa/components/mahasiswa-benefits-carousel')
    .then((mod) => mod.MahasiswaBenefitsCarousel),
  { loading: () => <div className="min-h-[500px]" /> }
)
const MahasiswaProcess = dynamic(
  () => import('@/features/psikotes/mahasiswa/components/mahasiswa-process')
    .then((mod) => mod.MahasiswaProcess),
  { loading: () => <div className="min-h-[400px]" /> }
)
const CategoryFaqSection = dynamic(
  () => import('@/features/psikotes/shared/components/category-faq-section')
    .then((mod) => mod.CategoryFaqSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

export const metadata: Metadata = {
  title: 'Psikotes Mahasiswa — BERMOELA',
  description:
    'Tes psikologi ini membantu kamu'
    + ' memahami potensi, cara berpikir,'
    + ' dan kekuatan diri untuk menentukan'
    + ' langkah berikutnya.',
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
