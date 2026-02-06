import type { Metadata } from 'next'

import { KonselingHero, KonselingServices } from '@/features/konseling/components'

export const metadata: Metadata = {
  title: 'Konseling — BERMOELA',
  description: 'Dapatkan dukungan profesional dari psikolog berpengalaman melalui sesi konseling individu dan pasangan.',
}

export default function KonselingPage() {
  return (
    <main>
      <KonselingHero />
      <KonselingServices />
    </main>
  )
}
