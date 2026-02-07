import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Hubungan — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes hubungan Anda sekarang.',
}

export default function RelationshipFormPage() {
  return (
    <main>
      <ExamInterface
        slug="relationship"
        questions={QUESTIONS_MAP['relationship']}
        backHref="/psikotes/kesehatan-mental/relationship"
        resultHref={
          '/psikotes/kesehatan-mental/relationship/result'
        }
      />
    </main>
  )
}
