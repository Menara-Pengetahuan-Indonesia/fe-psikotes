import type { Metadata } from 'next'

import {
  PlatformHero,
  PhilosophySection,
  CurriculumPyramid,
  ServiceGrid,
} from '@/features/platform/components'

export const metadata: Metadata = {
  title: 'Platform — TITIK MULA',
  description: 'Temukan potensi terbaikmu melalui psikotes, konseling, dan training berbasis riset psikologi profesional.',
}

export default function PlatformPage() {
  return (
    <main>
      <PlatformHero />
      <PhilosophySection />
      <CurriculumPyramid />
      <ServiceGrid />
    </main>
  )
}
