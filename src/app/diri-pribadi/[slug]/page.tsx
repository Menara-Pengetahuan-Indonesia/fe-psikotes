import type { Metadata } from 'next'
import { DIRI_PRIBADI_PRODUCTS } from '@/features/psikotes/constants'
import { DiriPribadiDetailClient } from '@/features/psikotes/components/diri-pribadi-detail-client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = DIRI_PRIBADI_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: 'Tidak Ditemukan — Bermoela' }
  return {
    title: `${product.title} — Bermoela`,
    description: product.painPoint,
  }
}

export function generateStaticParams() {
  return DIRI_PRIBADI_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default function DiriPribadiDetailPage() {
  return <DiriPribadiDetailClient />
}
