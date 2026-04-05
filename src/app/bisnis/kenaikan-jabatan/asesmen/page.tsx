import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Tes Kenaikan Jabatan — Asesmen — BERMOELA',
  description:
    'Kerjakan asesmen kenaikan jabatan Anda sekarang.',
}

export default function KenaikanJabatanAsesmenPage() {
  return (
    <main>
      <ExamInterface
        slug="kenaikan-jabatan"
        questions={QUESTIONS_MAP['kenaikan-jabatan']}
        backHref="/bisnis/kenaikan-jabatan"
        resultHref={
          '/bisnis/kenaikan-jabatan/result'
        }
      />
    </main>
  )
}
