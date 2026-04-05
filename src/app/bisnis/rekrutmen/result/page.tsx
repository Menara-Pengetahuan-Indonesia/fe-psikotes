import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Asesmen Rekrutmen — BERMOELA',
  description:
    'Lihat hasil asesmen rekrutmen Anda.',
}

export default function RekrutmenResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="rekrutmen"
        backHref="/bisnis/rekrutmen"
        tesLainnyaHref="/bisnis"
        category="perusahaan"
      />
    </main>
  )
}
