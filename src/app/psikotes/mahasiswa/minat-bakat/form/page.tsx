import type { Metadata } from 'next'

import { ExamInterface } from '@/features/psikotes/components/ExamInterface'

export const metadata: Metadata = {
  title: 'Tes Minat & Bakat — Mulai Tes — BERMOELA',
  description: 'Kerjakan tes minat dan bakat Anda sekarang.',
}

export default function MinatBakatFormPage() {
  // Get test ID from URL params or use default RIASEC test ID
  const testId = 'riasec-test' // TODO: Get from URL params

  return (
    <main>
      <ExamInterface testId={testId} />
    </main>
  )
}
