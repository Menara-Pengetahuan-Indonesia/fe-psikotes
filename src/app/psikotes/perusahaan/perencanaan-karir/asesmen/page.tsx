import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Perencanaan Karir — Asesmen — BERMOELA',
  description: 'Kerjakan asesmen perencanaan karir Anda sekarang.',
}

export default function PerencanaanKarirAsesmenPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
