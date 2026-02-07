import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Intelegensi — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes intelegensi Anda sekarang.',
}

export default function IntelegensiFormPage() {
  return (
    <main>
      <ExamInterface
        slug="intelegensi"
        questions={QUESTIONS_MAP['intelegensi']}
        backHref="/psikotes/mahasiswa/intelegensi"
        resultHref="/psikotes/mahasiswa/intelegensi/result"
      />
    </main>
  )
}
