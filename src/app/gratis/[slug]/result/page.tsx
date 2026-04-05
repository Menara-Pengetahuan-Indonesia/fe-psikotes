import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Hasil Tes — BERMOELA',
  description:
    'Lihat hasil tes psikologi Anda'
    + ' dan rekomendasi yang dipersonalisasi.',
}

export default async function GratisResultPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <ResultDisplay
        slug={slug}
        backHref={`/gratis/${slug}`}
        tesLainnyaHref="/gratis"
        category="gratis"
      />
    </main>
  )
}
