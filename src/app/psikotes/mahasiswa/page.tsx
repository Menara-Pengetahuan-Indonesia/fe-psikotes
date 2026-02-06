import type { Metadata } from 'next'

import { MahasiswaOverview } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Psikotes Mahasiswa — BERMOELA',
  description: 'Temukan minat, bakat, dan potensi akademik Anda melalui psikotes khusus mahasiswa dan pelajar.',
}

export default function MahasiswaPage() {
  return (
    <main>
      <MahasiswaOverview />
    </main>
  )
}
