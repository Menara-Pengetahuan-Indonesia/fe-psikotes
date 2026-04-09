import type { Metadata } from 'next'
import { RELATIONSHIP_PRODUCTS } from '@/features/psikotes/constants'
import { RelationshipDetailClient } from '@/features/psikotes/components/relationship-detail-client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = RELATIONSHIP_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: 'Tidak Ditemukan — Bermoela' }
  return {
    title: `${product.title} — Bermoela`,
    description: product.painPoint,
  }
}

export function generateStaticParams() {
  return RELATIONSHIP_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default function RelationshipDetailPage() {
  return <RelationshipDetailClient />
}
