import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Rekrutmen — Asesmen — BERMOELA',
  description: 'Kerjakan asesmen rekrutmen Anda sekarang.',
}

export default function RekrutmenAsesmenPage() {
  return (
    <main>
      <ExamInterface
        slug="rekrutmen"
        questions={QUESTIONS_MAP['rekrutmen']}
        backHref="/psikotes/perusahaan/rekrutmen"
        resultHref="/psikotes/perusahaan/rekrutmen/result"
      />
    </main>
  )
}
