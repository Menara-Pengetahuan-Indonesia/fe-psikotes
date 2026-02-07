import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Relationship — BERMOELA',
  description:
    'Lihat hasil tes hubungan Anda.',
}

export default function RelationshipResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="relationship"
        backHref={
          '/psikotes/kesehatan-mental/relationship'
        }
        tesLainnyaHref={
          '/psikotes/kesehatan-mental'
        }
        category="kesehatan-mental"
      />
    </main>
  )
}
