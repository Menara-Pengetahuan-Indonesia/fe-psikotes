import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Minat & Bakat — Mulai Tes — TITIK MULA',
  description: 'Kerjakan tes minat dan bakat Anda sekarang.',
}

export default function MinatBakatFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
