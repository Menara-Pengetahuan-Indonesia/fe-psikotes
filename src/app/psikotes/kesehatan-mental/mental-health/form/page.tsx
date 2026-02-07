import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Kesehatan Mental — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes kesehatan mental Anda sekarang.',
}

export default function MentalHealthFormPage() {
  return (
    <main>
      <ExamInterface
        slug="mental-health"
        questions={QUESTIONS_MAP['mental-health']}
        backHref="/psikotes/kesehatan-mental/mental-health"
        resultHref={
          '/psikotes/kesehatan-mental/mental-health/result'
        }
      />
    </main>
  )
}
