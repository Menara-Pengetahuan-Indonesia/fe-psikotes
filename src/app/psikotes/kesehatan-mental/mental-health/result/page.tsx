import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Mental Health — BERMOELA',
  description:
    'Lihat hasil screening kesehatan mental Anda.',
}

export default function MentalHealthResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="mental-health"
        backHref={
          '/psikotes/kesehatan-mental/mental-health'
        }
        tesLainnyaHref={
          '/psikotes/kesehatan-mental'
        }
        category="kesehatan-mental"
      />
    </main>
  )
}
