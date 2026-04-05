import type { Metadata } from 'next'

import { TestDetailPage } from '@/features/psikotes/gratis/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Detail Tes Gratis — BERMOELA',
  description:
    'Lihat detail dan instruksi tes psikologi gratis'
    + ' sebelum memulai.',
}

export default async function GratisTestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <AuthGuard>
        <TestDetailPage slug={slug} />
      </AuthGuard>
    </main>
  )
}
