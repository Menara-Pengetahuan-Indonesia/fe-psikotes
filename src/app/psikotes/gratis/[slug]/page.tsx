import type { Metadata } from 'next'

import { TestDetailPage } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Detail Tes Gratis — BERMOELA',
  description: 'Lihat detail dan instruksi tes psikologi gratis sebelum memulai.',
}

export default function GratisTestDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <TestDetailPage slug={params.slug} />
    </main>
  )
}
