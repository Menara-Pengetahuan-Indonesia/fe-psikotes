import type { Metadata } from 'next'

import {
  PsikotesHero,
  PsikotesTransformationMap,
  PsikotesStage,
  PsikotesCategoryNav,
  PsikotesProducts,
} from '@/features/psikotes/components'

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
