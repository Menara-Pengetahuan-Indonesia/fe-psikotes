import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'
import { GRATIS_TESTS } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Detail Tes Gratis — BERMOELA',
  description:
    'Lihat detail dan instruksi tes psikologi gratis'
    + ' sebelum memulai.',
}

export default function GratisTestDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const test = GRATIS_TESTS.find(
    (t) => t.slug === params.slug,
  )

  return (
    <main>
      <AuthGuard>
        <TestDetail
          title={test?.title ?? 'Tes Tidak Ditemukan'}
          badge="Tes Gratis"
          description={
            test?.description
            ?? 'Tes yang diminta tidak ditemukan.'
          }
          duration={test?.duration ?? '—'}
          participants={test?.users ?? '—'}
          price="Gratis"
          formHref={
            `/psikotes/gratis/${params.slug}/exam`
          }
        />
      </AuthGuard>
    </main>
  )
}
