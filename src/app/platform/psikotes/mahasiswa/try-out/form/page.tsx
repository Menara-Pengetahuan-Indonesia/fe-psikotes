import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Try Out — Mulai Tes — TITIK MULA',
  description: 'Kerjakan try out Anda sekarang.',
}

export default function TryOutFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
