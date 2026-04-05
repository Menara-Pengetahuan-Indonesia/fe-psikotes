import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Kepribadian — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes kepribadian Anda sekarang.',
}

export default function KepribadianFormPage() {
  return (
    <main>
      <ExamInterface
        slug="kepribadian"
        questions={QUESTIONS_MAP['kepribadian']}
        backHref="/kesehatan-mental/kepribadian"
        resultHref={
          '/kesehatan-mental/kepribadian/result'
        }
      />
    </main>
  )
}
