'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { DIRI_PRIBADI_PRODUCTS } from '@/features/psikotes/constants'
import { PersonalProductDetail } from '@/features/psikotes/components'

export function DiriPribadiDetailClient() {
  const params = useParams()
  const slug = params.slug as string
  const product = DIRI_PRIBADI_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const related = DIRI_PRIBADI_PRODUCTS.filter((p) => p.id !== product.id)

  return (
    <PersonalProductDetail
      product={product}
      categoryLabel="Diri Pribadi"
      categoryHref="/diri-pribadi"
      relatedProducts={related}
    />
  )
}
