import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  MentalHealthOverview,
} from '@/features/psikotes/kesehatan-mental/components'
import {
  MENTAL_HEALTH_FAQ,
} from '@/features/psikotes/constants'

const MentalHealthBenefits = dynamic(
  () => import('@/features/psikotes/kesehatan-mental/components/mental-health-benefits')
    .then((mod) => mod.MentalHealthBenefits),
  { loading: () => <div className="min-h-[500px]" /> }
)
const MentalHealthJourney = dynamic(
  () => import('@/features/psikotes/kesehatan-mental/components/mental-health-journey')
    .then((mod) => mod.MentalHealthJourney),
  { loading: () => <div className="min-h-[400px]" /> }
)
const CategoryFaqSection = dynamic(
  () => import('@/features/psikotes/shared/components/category-faq-section')
    .then((mod) => mod.CategoryFaqSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

export const metadata: Metadata = {
  title: 'Kesehatan Mental — BERMOELA',
  description:
    'Kenali kondisi kesehatan mental Anda'
    + ' melalui tes yang dirancang oleh'
    + ' profesional psikologi.',
}

export default function KesehatanMentalPage() {
  return (
    <main>
      <MentalHealthOverview />
      <MentalHealthBenefits />
      <MentalHealthJourney />
      <CategoryFaqSection
        faqs={MENTAL_HEALTH_FAQ}
      />
    </main>
  )
}
