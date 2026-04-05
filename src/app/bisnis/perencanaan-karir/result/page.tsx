import type { Metadata } from 'next'

import { ResultDisplay } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title:
    'Hasil Asesmen Perencanaan Karir — BERMOELA',
  description:
    'Lihat hasil asesmen perencanaan karir Anda.',
}

export default function PerencanaanKarirResultPage() {
  return (
    <main>
      <ResultDisplay
        slug="perencanaan-karir"
        backHref={
          '/bisnis/perencanaan-karir'
        }
        tesLainnyaHref="/bisnis"
        category="perusahaan"
      />
    </main>
  )
}
