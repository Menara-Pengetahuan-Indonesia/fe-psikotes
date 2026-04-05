import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Kepribadian — BERMOELA',
  description:
    'Lihat hasil tes kepribadian Anda.',
}

export default function KepribadianResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="kepribadian"
        backHref={
          '/kesehatan-mental/kepribadian'
        }
        tesLainnyaHref={
          '/kesehatan-mental'
        }
        category="kesehatan-mental"
      />
    </main>
  )
}
