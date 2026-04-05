import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes CPNS — BERMOELA',
  description:
    'Lihat hasil simulasi SKD CPNS Anda.',
}

export default function CpnsResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="cpns"
        backHref="/mahasiswa/cpns"
        tesLainnyaHref="/mahasiswa"
        category="mahasiswa"
      />
    </main>
  )
}
