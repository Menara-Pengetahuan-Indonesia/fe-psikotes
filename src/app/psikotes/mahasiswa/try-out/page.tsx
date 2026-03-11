import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Try Out Akademik — BERMOELA',
  description: 'Persiapkan dirimu menghadapi berbagai ujian akademik melalui simulasi try out.',
}

export default function TryOutPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Try Out Akademik"
        badge="Mahasiswa & Pelajar"
        description="Persiapkan dirimu menghadapi berbagai ujian akademik melalui simulasi try out dan lihat sejauh mana kesiapanmu menghadapi ujian akademik."
        duration="30 menit"
        participants="7.200+"
        aspects={[
          {
            heading: 'Kompetensi Dasar',
            items: [
              { title: 'Tes Kemampuan Umum', desc: 'Pengetahuan umum dan kemampuan dasar' },
              { title: 'Tes Kemampuan Verbal', desc: 'Penguasaan bahasa dan komunikasi' },
              { title: 'Tes Kemampuan Numerik', desc: 'Kemampuan berhitung dan analisis data' },
            ],
          },
          {
            heading: 'Kompetensi Spesifik',
            items: [
              { title: 'Penalaran Analitis', desc: 'Kemampuan menganalisis informasi secara mendalam' },
              { title: 'Kemampuan Berpikir Kritis', desc: 'Evaluasi dan solusi terhadap masalah kompleks' },
            ],
          },
        ]}
        price="Rp 30.000"
        originalPrice="Rp 60.000"
        formHref="/psikotes/mahasiswa/try-out/form"
      />
      </AuthGuard>
    </main>
  )
}
