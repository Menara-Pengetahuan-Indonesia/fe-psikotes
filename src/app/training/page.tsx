import type { Metadata } from 'next'

import { TrainingHero, TrainingPrograms } from '@/features/training/components'

export const metadata: Metadata = {
  title: 'Training — TITIK MULA',
  description: 'Tingkatkan keterampilan dan pengetahuan Anda melalui program training, webinar, dan mentoring berkualitas.',
}

export default function TrainingPage() {
  return (
    <main>
      <TrainingHero />
      <TrainingPrograms />
    </main>
  )
}
