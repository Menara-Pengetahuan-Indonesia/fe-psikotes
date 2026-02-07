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
          '/psikotes/kesehatan-mental/kepribadian'
        }
        tesLainnyaHref={
          '/psikotes/kesehatan-mental'
        }
        category="kesehatan-mental"
      />
    </main>
  )
}
