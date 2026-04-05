import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/gratis/components'
import { QUESTIONS_MAP } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Kerjakan Tes Premium — BERMOELA',
  description:
    'Kerjakan tes psikologi premium Anda sekarang.',
}

export default async function PremiumExamPage({
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
        backHref={`/premium/${slug}`}
        resultHref={`/premium/${slug}/result`}
      />
    </main>
  )
}
