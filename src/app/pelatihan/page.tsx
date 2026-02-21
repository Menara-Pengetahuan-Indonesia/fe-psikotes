import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  PelatihanHero,
} from '@/features/pelatihan/components'

const PelatihanPrograms = dynamic(
  () => import('@/features/pelatihan/components/pelatihan-programs')
    .then((mod) => mod.PelatihanPrograms),
  { loading: () => <div className="min-h-[600px]" /> }
)
const PelatihanProcess = dynamic(
  () => import('@/features/pelatihan/components/pelatihan-process')
    .then((mod) => mod.PelatihanProcess),
  { loading: () => <div className="min-h-[500px]" /> }
)
const PelatihanFaq = dynamic(
  () => import('@/features/pelatihan/components/pelatihan-faq')
    .then((mod) => mod.PelatihanFaq),
  { loading: () => <div className="min-h-[400px]" /> }
)

export const metadata: Metadata = {
  title: 'Pelatihan — BERMOELA',
  description:
    'Tingkatkan keterampilan dan pengetahuan'
    + ' Anda melalui program pelatihan, webinar,'
    + ' dan mentoring berkualitas.',
}

export default function PelatihanPage() {
  return (
    <main>
      <PelatihanHero />
      <PelatihanPrograms />
      <PelatihanProcess />
      <PelatihanFaq />
    </main>
  )
}
