import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'
import { PREMIUM_TESTS } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Detail Tes Premium — BERMOELA',
  description:
    'Lihat detail lengkap tes psikologi premium'
    + ' sebelum memulai.',
}

export default function PremiumTestDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const test = PREMIUM_TESTS.find(
    (t) => t.slug === params.slug,
  )

  return (
    <main>
      <AuthGuard>
        <TestDetail
          title={test?.title ?? 'Tes Tidak Ditemukan'}
          badge="Premium"
          description={
            test?.description
            ?? 'Tes yang diminta tidak ditemukan.'
          }
          duration={test?.duration ?? '—'}
          participants={test?.users ?? '—'}
          price={test?.price ?? '—'}
          formHref={
            `/psikotes/premium/${params.slug}/exam`
          }
        />
      </AuthGuard>
    </main>
  )
}
