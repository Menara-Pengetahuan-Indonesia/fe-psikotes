import type { Metadata } from 'next'

import {
  PsikotesHero,
  PsikotesTransformationMap,
  PsikotesCategoryNav,
  PsikotesPillars,
  PsikotesProducts,
} from '@/features/psikotes/components'

export const metadata: Metadata = {
  title: 'Psikotes — BERMOELA',
  description:
    'Temukan potensi terbaikmu melalui'
    + ' psikotes profesional berbasis'
    + ' riset psikologi.',
}

export default function PsikotesPage() {
  return (
    <main>
      <PsikotesHero />
      <PsikotesTransformationMap />
      <PsikotesCategoryNav />
      <PsikotesPillars />
      <PsikotesProducts />
    </main>
  )
}
