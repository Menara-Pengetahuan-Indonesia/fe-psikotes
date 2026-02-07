import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes CPNS — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes persiapan CPNS Anda sekarang.',
}

export default function CpnsFormPage() {
  return (
    <main>
      <ExamInterface
        slug="cpns"
        questions={QUESTIONS_MAP['cpns']}
        backHref="/psikotes/mahasiswa/cpns"
        resultHref="/psikotes/mahasiswa/cpns/result"
      />
    </main>
  )
}
