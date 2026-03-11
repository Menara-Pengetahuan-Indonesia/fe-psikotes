import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Rekrutmen — BERMOELA',
  description: 'Tes psikotes khusus rekrutmen untuk membantu perusahaan menemukan kandidat terbaik.',
}

export default function RekrutmenPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Rekrutmen"
        badge="Perusahaan"
        description="Asesmen untuk membantu perusahaan menilai potensi kandidat secara lebih objektif, mulai dari kemampuan berpikir, karakter kerja, hingga kesesuaian dengan budaya perusahaan."
        duration="25 menit"
        participants="8.900+"
        aspects={[
          {
            heading: 'Kepribadian & Perilaku',
            items: [
              { title: 'Tipe Kepribadian', desc: 'Profil kepribadian yang komprehensif dan akurat' },
              { title: 'Gaya Bekerja', desc: 'Preferensi dan pendekatan dalam menyelesaikan pekerjaan' },
              { title: 'Kemampuan Bekerja Tim', desc: 'Efektivitas dalam konteks kerja kelompok' },
            ],
          },
          {
            heading: 'Kompetensi Kognitif',
            items: [
              { title: 'Penalaran Analitis', desc: 'Kemampuan menganalisis data dan informasi' },
              { title: 'Kemampuan Problem Solving', desc: 'Strategi dalam menghadapi tantangan bisnis' },
            ],
          },
        ]}
        price="Rp 45.000"
        originalPrice="Rp 90.000"
        formHref="/psikotes/perusahaan/rekrutmen/asesmen"
      />
      </AuthGuard>
    </main>
  )
}
