import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Rekrutmen — Asesmen — BERMOELA',
  description: 'Kerjakan asesmen rekrutmen Anda sekarang.',
}

export default function RekrutmenAsesmenPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
