import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes — TITIK MULA',
  description: 'Lihat hasil tes psikologi Anda dan rekomendasi yang dipersonalisasi.',
}

export default function GratisResultPage() {
  return (
    <main>
      <ResultDisplay />
    </main>
  )
}
