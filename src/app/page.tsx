import type { Metadata } from 'next'

import { HomepageHero } from '@/features/homepage/components'

export const metadata: Metadata = {
  title: 'TITIK MULA — Platform Pengembangan Diri',
  description: 'Kenali dirimu dan temukan potensi terbaikmu dengan psikotes, konseling, dan training berkualitas.',
}

export default function HomePage() {
  return (
    <main>
      <HomepageHero />
    </main>
  )
}
