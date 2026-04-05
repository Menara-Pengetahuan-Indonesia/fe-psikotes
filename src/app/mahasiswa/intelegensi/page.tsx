import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Intelegensi — BERMOELA',
  description: 'Ukur kemampuan intelektual Anda melalui tes intelegensi yang komprehensif dan tervalidasi.',
}

export default function IntelegensiPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Intelegensi"
        badge="Mahasiswa & Pelajar"
        description="Kenali kemampuan berpikirmu, mulai dari logika, pemahaman verbal, hingga cara memecahkan masalah. Hasilnya memberikan insight tentang gaya belajar yang paling cocok untukmu."
        duration="20 menit"
        participants="9.800+"
        aspects={[
          {
            heading: 'Kemampuan Kognitif',
            items: [
              { title: 'Penalaran Logis', desc: 'Kemampuan berpikir secara sistematis dan analitis' },
              { title: 'Kemampuan Verbal', desc: 'Penguasaan bahasa dan pemahaman makna' },
              { title: 'Kemampuan Numerik', desc: 'Kemampuan berhitung dan mengolah angka' },
            ],
          },
          {
            heading: 'Kemampuan Lainnya',
            items: [
              { title: 'Memori Kerja', desc: 'Kemampuan menyimpan dan memanipulasi informasi secara bersamaan' },
              { title: 'Pemecahan Masalah', desc: 'Strategi dan pendekatan dalam menghadapi tantangan' },
            ],
          },
        ]}
        price="Rp 25.000"
        originalPrice="Rp 50.000"
        formHref="/mahasiswa/intelegensi/form"
      />
      </AuthGuard>
    </main>
  )
}
