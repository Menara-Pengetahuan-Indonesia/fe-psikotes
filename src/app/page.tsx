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
    <main className="relative">
      {/* Global flowing ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[5%] left-[-8%] w-[500px] h-[500px] bg-primary-100/50 rounded-full" />
        <div className="absolute top-[15%] right-[-6%] w-[400px] h-[400px] bg-accent-100/40 rounded-full" />
        <div className="absolute top-[35%] left-[-5%] w-[450px] h-[450px] bg-accent-100/30 rounded-full" />
        <div className="absolute top-[55%] right-[-8%] w-[500px] h-[500px] bg-primary-100/40 rounded-full" />
        <div className="absolute top-[75%] left-[-6%] w-[400px] h-[400px] bg-primary-100/30 rounded-full" />
        <div className="absolute top-[90%] right-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full" />
      </div>

      <div className="relative z-10">
        <PsikotesHero />
        <PsikotesTransformationMap />
        <PsikotesStage />
        <PsikotesCategoryNav />
        <PsikotesProducts />
      </div>
    </main>
  )
}
