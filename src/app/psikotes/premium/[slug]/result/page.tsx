import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes Premium — BERMOELA',
  description:
    'Lihat hasil tes psikologi premium Anda'
    + ' dan rekomendasi yang dipersonalisasi.',
}

export default async function PremiumResultPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <ResultDisplay
        slug={slug}
        backHref={`/psikotes/premium/${slug}`}
        tesLainnyaHref="/psikotes/premium"
        category="premium"
      />
    </main>
  )
}
