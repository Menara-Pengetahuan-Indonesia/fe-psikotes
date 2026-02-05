import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Kepribadian — Mulai Tes — TITIK MULA',
  description: 'Kerjakan tes kepribadian Anda sekarang.',
}

export default function KepribadianFormPage() {
  return (
    <main>
      <ExamInterface slug="kepribadian" />
    </main>
  )
}
