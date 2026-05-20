'use client'

import dynamic from 'next/dynamic'

const PsikotesTransformationMap = dynamic(
  () => import('@/features/psikotes/components/psikotes-transformation-map').then(m => m.PsikotesTransformationMap),
  { ssr: false }
)
const PsikotesStage = dynamic(
  () => import('@/features/psikotes/components/psikotes-stage').then(m => m.PsikotesStage),
  { ssr: false }
)
const PsikotesCategoryNav = dynamic(
  () => import('@/features/psikotes/components/psikotes-category-nav').then(m => m.PsikotesCategoryNav),
  { ssr: false }
)
const PsikotesProducts = dynamic(
  () => import('@/features/psikotes/components/psikotes-products').then(m => m.PsikotesProducts),
  { ssr: false }
)

export function HomeClientSections() {
  return (
    <>
      <PsikotesTransformationMap />
      <PsikotesStage />
      <PsikotesCategoryNav />
      <PsikotesProducts />
    </>
  )
}
