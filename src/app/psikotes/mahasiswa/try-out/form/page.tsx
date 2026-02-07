import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Try Out — Mulai Tes — BERMOELA',
  description: 'Kerjakan try out Anda sekarang.',
}

export default function TryOutFormPage() {
  return (
    <main>
      <ExamInterface
        slug="try-out"
        questions={QUESTIONS_MAP['try-out']}
        backHref="/psikotes/mahasiswa/try-out"
        resultHref="/psikotes/mahasiswa/try-out/result"
      />
    </main>
  )
}
