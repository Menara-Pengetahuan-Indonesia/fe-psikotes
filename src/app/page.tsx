import type { Metadata } from 'next'

import { HomepageHero } from '@/features/homepage/components'

export const metadata: Metadata = {
  title: 'BERMOELA — Platform Pengembangan Diri',
  description: 'Platform terintegrasi untuk psikotes, konseling, dan pelatihan dalam mendukung kesehatan mental, kehidupan, dan karirmu.',
}

export default function HomePage() {
  return <HomepageHero />
}
