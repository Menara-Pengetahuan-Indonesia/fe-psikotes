import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Kerjakan Tes — TITIK MULA',
  description: 'Kerjakan tes psikologi gratis Anda sekarang.',
}

export default async function GratisExamPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <ExamInterface slug={slug} />
    </main>
  )
}
