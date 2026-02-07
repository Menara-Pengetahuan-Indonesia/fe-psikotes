import type { Metadata } from 'next'

import {
  MentalHealthOverview,
  MentalHealthBenefits,
  MentalHealthJourney,
} from '@/features/psikotes/kesehatan-mental/components'
import {
  CategoryFaqSection,
  CtaBannerSection,
} from '@/features/psikotes/shared/components'
import {
  MENTAL_HEALTH_FAQ,
  MENTAL_HEALTH_CTA,
} from '@/features/psikotes/constants'

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
      <CtaBannerSection
        data={MENTAL_HEALTH_CTA}
      />
    </main>
  )
}
