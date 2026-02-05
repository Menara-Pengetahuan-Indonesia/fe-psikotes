import type { Metadata } from 'next'

import { TestDetailPage } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Detail Tes Premium — TITIK MULA',
  description: 'Lihat detail lengkap tes psikologi premium sebelum memulai.',
}

export default function PremiumTestDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <TestDetailPage slug={params.slug} />
    </main>
  )
}
