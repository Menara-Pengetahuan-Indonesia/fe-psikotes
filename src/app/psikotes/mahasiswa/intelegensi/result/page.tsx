import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Intelegensi — BERMOELA',
  description:
    'Lihat hasil tes intelegensi Anda.',
}

export default function IntelegensiResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="intelegensi"
        backHref="/psikotes/mahasiswa/intelegensi"
        tesLainnyaHref="/psikotes/mahasiswa"
        category="mahasiswa"
      />
    </main>
  )
}
