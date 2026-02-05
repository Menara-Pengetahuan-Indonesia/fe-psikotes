import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Hubungan — Mulai Tes — TITIK MULA',
  description: 'Kerjakan tes hubungan Anda sekarang.',
}

export default function RelationshipFormPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
