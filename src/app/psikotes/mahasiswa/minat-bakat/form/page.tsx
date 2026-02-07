import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Minat & Bakat — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes minat dan bakat Anda sekarang.',
}

export default function MinatBakatFormPage() {
  return (
    <main>
      <ExamInterface
        slug="minat-bakat"
        questions={QUESTIONS_MAP['minat-bakat']}
        backHref="/psikotes/mahasiswa/minat-bakat"
        resultHref="/psikotes/mahasiswa/minat-bakat/result"
      />
    </main>
  )
}
