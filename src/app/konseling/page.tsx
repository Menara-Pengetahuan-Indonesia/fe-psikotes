import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  KonselingHero,
} from '@/features/konseling/components'

const KonselingServices = dynamic(
  () => import('@/features/konseling/components/konseling-services')
    .then((mod) => mod.KonselingServices),
  { loading: () => <div className="min-h-[600px]" /> }
)
const KonselingProcess = dynamic(
  () => import('@/features/konseling/components/konseling-process')
    .then((mod) => mod.KonselingProcess),
  { loading: () => <div className="min-h-[500px]" /> }
)
const KonselingFaq = dynamic(
  () => import('@/features/konseling/components/konseling-faq')
    .then((mod) => mod.KonselingFaq),
  { loading: () => <div className="min-h-[400px]" /> }
)

export const metadata: Metadata = {
  title: 'Konseling — BERMOELA',
  description:
    'Dapatkan dukungan profesional dari psikolog'
    + ' berpengalaman melalui sesi konseling'
    + ' individu dan pasangan.',
}

export default function KonselingPage() {
  return (
    <main>
      <KonselingHero />
      <KonselingServices />
      <KonselingProcess />
      <KonselingFaq />
    </main>
  )
}
