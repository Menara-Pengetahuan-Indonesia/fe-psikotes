'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { CORPORATE_PRODUCTS } from '@/features/psikotes/constants'
import { CorporateProductDetail } from '@/features/psikotes/components'

export function BisnisDetailClient() {
  const params = useParams()
  const slug = params.slug as string
  const product = CORPORATE_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const related = CORPORATE_PRODUCTS.filter((p) => p.id !== product.id)

  return (
    <CorporateProductDetail
      product={product}
      relatedProducts={related}
    />
  )
}
