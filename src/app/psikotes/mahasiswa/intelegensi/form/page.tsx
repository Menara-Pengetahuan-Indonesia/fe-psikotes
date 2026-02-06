import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Intelegensi — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes intelegensi Anda sekarang.',
}

export default function IntelegensiFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
