import type { Metadata } from 'next'

import { PelatihanHero, PelatihanPrograms } from '@/features/pelatihan/components'

export const metadata: Metadata = {
  title: 'Pelatihan — TITIK MULA',
  description: 'Tingkatkan keterampilan dan pengetahuan Anda melalui program pelatihan, webinar, dan mentoring berkualitas.',
}

export default function PelatihanPage() {
  return (
    <main>
      <PelatihanHero />
      <PelatihanPrograms />
    </main>
  )
}
