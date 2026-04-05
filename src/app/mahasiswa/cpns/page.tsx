import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Persiapan CPNS — BERMOELA',
  description: 'Persiapkan diri Anda untuk ujian CPNS dengan tes komprehensif yang mencakup semua kompetensi wajib.',
}

export default function CpnsPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Persiapan CPNS"
        badge="Mahasiswa & Pelajar"
        description="Persiapkan dirimu menghadapi seleksi CPNS dengan simulasi tes yang dirancang seperti ujian SKD. Kamu bisa berlatih melalui soal TWK, TIU, dan TKP untuk melihat sejauh mana kesiapanmu."
        duration="45 menit"
        participants="15.600+"
        aspects={[
          {
            heading: 'Wawasan Kebangsaan',
            items: [
              { title: 'Pengetahuan Hukum', desc: 'Pemahaman tentang dasar hukum dan peraturan negara' },
              { title: 'Sejarah & Budaya', desc: 'Wawasan sejarah dan budaya Indonesia' },
            ],
          },
          {
            heading: 'Kemampuan Kognitif',
            items: [
              { title: 'Kemampuan Umum', desc: 'Pengetahuan umum dan kemampuan dasar' },
              { title: 'Kemampuan Berhitung', desc: 'Kemampuan mengolah angka dan data' },
              { title: 'Kemampuan Verbal', desc: 'Penguasaan bahasa dan komunikasi tertulis' },
            ],
          },
        ]}
        price="Rp 35.000"
        originalPrice="Rp 70.000"
        formHref="/mahasiswa/cpns/form"
      />
      </AuthGuard>
    </main>
  )
}
