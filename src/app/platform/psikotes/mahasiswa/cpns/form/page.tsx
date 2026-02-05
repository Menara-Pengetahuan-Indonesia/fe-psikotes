import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes CPNS — Mulai Tes — TITIK MULA',
  description: 'Kerjakan tes persiapan CPNS Anda sekarang.',
}

export default function CpnsFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
