import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Intelegensi — BERMOELA',
  description: 'Ukur kemampuan intelektual Anda melalui tes intelegensi yang komprehensif dan tervalidasi.',
}

export default function IntelegensiPage() {
  return (
    <main>
      <TestDetail
        title="Tes Intelegensi"
        badge="Mahasiswa & Pelajar"
        description="Tes Intelegensi mengukur berbagai aspek kemampuan kognitif Anda mulai dari penalaran logis, kemampuan verbal, hingga pemecahan masalah. Hasil tes dapat membantu Anda memahami gaya belajar dan strategi akademik yang optimal."
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
      />
    </main>
  )
}
