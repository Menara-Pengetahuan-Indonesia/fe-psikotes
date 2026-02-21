import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  PsikotesHero,
} from '@/features/psikotes/components'

const CategoryShowcase = dynamic(
  () => import('@/features/psikotes/components/category-showcase')
    .then((mod) => mod.CategoryShowcase),
  { loading: () => <div className="min-h-[600px]" /> }
)
const CurriculumPyramid = dynamic(
  () => import('@/features/psikotes/components/curriculum-pyramid')
    .then((mod) => mod.CurriculumPyramid),
  { loading: () => <div className="min-h-[500px]" /> }
)
const PsikotesFaq = dynamic(
  () => import('@/features/psikotes/components/psikotes-faq')
    .then((mod) => mod.PsikotesFaq),
  { loading: () => <div className="min-h-[400px]" /> }
)

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
      <CategoryShowcase />
      <CurriculumPyramid />
      <PsikotesFaq />
    </main>
  )
}
