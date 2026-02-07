import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Minat Bakat — BERMOELA',
  description:
    'Lihat hasil tes minat dan bakat Anda.',
}

export default function MinatBakatResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="minat-bakat"
        backHref="/psikotes/mahasiswa/minat-bakat"
        tesLainnyaHref="/psikotes/mahasiswa"
        category="mahasiswa"
      />
    </main>
  )
}
