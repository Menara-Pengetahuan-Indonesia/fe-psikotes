import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Perencanaan Karir — BERMOELA',
  description: 'Bantu karyawan merencanakan jalur karir yang optimal dengan tes komprehensif.',
}

export default function PerencanaanKarirPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Perencanaan Karir"
        badge="Perusahaan"
        description="Bantu karyawan memahami kekuatan, minat, dan potensi mereka untuk merencanakan perkembangan karier di dalam perusahaan. Melalui asesmen ini, perusahaan juga mendapatkan insight dan rekomendasi pengembangan yang lebih personal bagi setiap karyawan."
        duration="20 menit"
        participants="6.100+"
        aspects={[
          {
            heading: 'Profil Karir',
            items: [
              { title: 'Minat Profesional', desc: 'Bidang dan peran yang paling sesuai dengan preferensi' },
              { title: 'Kekuatan Utama', desc: 'Kompetensi dan kemampuan terbaik yang dimiliki' },
            ],
          },
          {
            heading: 'Pengembangan Diri',
            items: [
              { title: 'Area Pengembangan', desc: 'Aspek yang perlu ditingkatkan untuk pertumbuhan karir' },
              { title: 'Gaya Pembelajaran', desc: 'Pendekatan belajar yang paling efektif' },
              { title: 'Motivasi Kerja', desc: 'Faktor-faktor yang mendorong produktivitas dan kepuasan' },
            ],
          },
        ]}
        price="Rp 40.000"
        originalPrice="Rp 80.000"
        formHref="/bisnis/perencanaan-karir/asesmen"
      />
      </AuthGuard>
    </main>
  )
}
