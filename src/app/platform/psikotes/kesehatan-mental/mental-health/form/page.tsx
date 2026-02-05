import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Kesehatan Mental — Mulai Tes — TITIK MULA',
  description: 'Kerjakan tes kesehatan mental Anda sekarang.',
}

export default function MentalHealthFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
