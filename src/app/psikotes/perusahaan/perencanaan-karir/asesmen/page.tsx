import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Perencanaan Karir — Asesmen — BERMOELA',
  description:
    'Kerjakan asesmen perencanaan karir Anda sekarang.',
}

export default function PerencanaanKarirAsesmenPage() {
  return (
    <main>
      <ExamInterface
        slug="perencanaan-karir"
        questions={QUESTIONS_MAP['perencanaan-karir']}
        backHref="/psikotes/perusahaan/perencanaan-karir"
        resultHref={
          '/psikotes/perusahaan/perencanaan-karir/result'
        }
      />
    </main>
  )
}
