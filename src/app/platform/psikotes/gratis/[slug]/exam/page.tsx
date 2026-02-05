import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Kerjakan Tes — TITIK MULA',
  description: 'Kerjakan tes psikologi gratis Anda sekarang.',
}

export default function GratisExamPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
