import type { Metadata } from 'next'

import { PerusahaanOverview } from '@/features/psikotes/perusahaan/components'

export const metadata: Metadata = {
  title: 'Psikotes Perusahaan — BERMOELA',
  description: 'Solusi psikotes korporat untuk rekrutmen, kenaikan jabatan, dan perencanaan karir yang efektif.',
}

export default function PerusahaanPage() {
  return (
    <main>
      <PerusahaanOverview />
    </main>
  )
}
