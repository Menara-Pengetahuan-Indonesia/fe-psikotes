import type { Metadata } from 'next'

import {
  PsikotesHero,
  PhilosophySection,
  CurriculumPyramid,
  ServiceGrid,
} from '@/features/psikotes/components'

export const metadata: Metadata = {
  title: 'Psikotes — TITIK MULA',
  description: 'Temukan potensi terbaikmu melalui psikotes profesional berbasis riset psikologi.',
}

export default function PsikotesPage() {
  return (
    <main>
      <PsikotesHero />
      <PhilosophySection />
      <CurriculumPyramid />
      <ServiceGrid />
    </main>
  )
}
