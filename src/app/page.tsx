import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { PsikotesHero } from '@/features/psikotes/components'

const PsikotesTransformationMap = dynamic(() => import('@/features/psikotes/components/psikotes-transformation-map').then(m => m.PsikotesTransformationMap))
const PsikotesStage = dynamic(() => import('@/features/psikotes/components/psikotes-stage').then(m => m.PsikotesStage))
const PsikotesCategoryNav = dynamic(() => import('@/features/psikotes/components/psikotes-category-nav').then(m => m.PsikotesCategoryNav))
const PsikotesProducts = dynamic(() => import('@/features/psikotes/components/psikotes-products').then(m => m.PsikotesProducts))

export const metadata: Metadata = {
  title: 'BERMOELA — Platform Pengembangan Diri',
  description:
    'Temukan potensi terbaikmu melalui'
    + ' psikotes profesional berbasis'
    + ' riset psikologi.',
}

export default function HomePage() {
  return (
    <main>
      <PsikotesHero />
      <PsikotesTransformationMap />
      <PsikotesStage />
      <PsikotesCategoryNav />
      <PsikotesProducts />
    </main>
  )
}
