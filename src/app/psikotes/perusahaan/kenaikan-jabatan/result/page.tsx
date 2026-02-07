import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title:
    'Hasil Asesmen Kenaikan Jabatan — BERMOELA',
  description:
    'Lihat hasil asesmen kenaikan jabatan Anda.',
}

export default function KenaikanJabatanResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="kenaikan-jabatan"
        backHref={
          '/psikotes/perusahaan/kenaikan-jabatan'
        }
        tesLainnyaHref="/psikotes/perusahaan"
        category="perusahaan"
      />
    </main>
  )
}
