import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Try Out — BERMOELA',
  description:
    'Lihat hasil try out UTBK Anda.',
}

export default function TryOutResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="try-out"
        backHref="/mahasiswa/try-out"
        tesLainnyaHref="/mahasiswa"
        category="mahasiswa"
      />
    </main>
  )
}
