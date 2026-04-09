'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { RELATIONSHIP_PRODUCTS } from '@/features/psikotes/constants'
import { PersonalProductDetail } from '@/features/psikotes/components'

export function RelationshipDetailClient() {
  const params = useParams()
  const slug = params.slug as string
  const product = RELATIONSHIP_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const related = RELATIONSHIP_PRODUCTS.filter((p) => p.id !== product.id)

  return (
    <PersonalProductDetail
      product={product}
      categoryLabel="Relationship"
      categoryHref="/relationship"
      relatedProducts={related}
    />
  )
}
