import type { Metadata } from 'next'
import { CORPORATE_PRODUCTS } from '@/features/psikotes/constants'
import { BisnisDetailClient } from '@/features/psikotes/components/bisnis-detail-client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = CORPORATE_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: 'Tidak Ditemukan — Bermoela' }
  return {
    title: `${product.title} — Bermoela`,
    description: product.description,
  }
}

export function generateStaticParams() {
  return CORPORATE_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default function BisnisDetailPage() {
  return <BisnisDetailClient />
}
