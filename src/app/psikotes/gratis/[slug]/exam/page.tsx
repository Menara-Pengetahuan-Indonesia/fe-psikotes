import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP, SECTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Kerjakan Tes — BERMOELA',
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
      <ExamInterface
        slug={slug}
        questions={QUESTIONS_MAP[slug]}
        sections={SECTIONS_MAP[slug]}
      />
    </main>
  )
}
