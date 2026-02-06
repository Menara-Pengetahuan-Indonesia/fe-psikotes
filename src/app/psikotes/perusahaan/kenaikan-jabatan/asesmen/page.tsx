import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Tes Kenaikan Jabatan — Asesmen — BERMOELA',
  description: 'Kerjakan asesmen kenaikan jabatan Anda sekarang.',
}

export default function KenaikanJabatanAsesmenPage() {
  return (
    <main>
      <ExamInterface />
    </main>
  )
}
