import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Kesehatan Mental — BERMOELA',
  description: 'Evaluasi kondisi kesehatan mental Anda secara komprehensif dengan tes yang aman dan rahasia.',
}

export default function MentalHealthDetailPage() {
  return (
    <main>
      <TestDetail
        title="Tes Kesehatan Mental"
        badge="Kesehatan Mental"
        description="Tes Kesehatan Mental memberikan gambaran kondisi mental Anda saat ini. Tes ini mencakup penilaian terhadap tingkat stres, kecemasan, dan kesejahteraan psikologis secara keseluruhan. Hasil akan disertai rekomendasi praktis untuk menjaga kesehatan mental."
        duration="10 menit"
        participants="22.500+"
        aspects={[
          {
            heading: 'Kesejahteraan Psikologis',
            items: [
              { title: 'Tingkat Stres', desc: 'Penilaian terhadap beban dan tekanan mental saat ini' },
              { title: 'Tingkat Kecemasan', desc: 'Identifikasi pola kecemasan dan pemicunya' },
            ],
          },
          {
            heading: 'Ketahanan Mental',
            items: [
              { title: 'Mekanisme Koping', desc: 'Cara Anda mengatasi tekanan dan tantangan emosional' },
              { title: 'Dukungan Sosial', desc: 'Kualitas dan peran jaringan dukungan di sekitar Anda' },
              { title: 'Efikasi Diri', desc: 'Keyakinan terhadap kemampuan menghadapi tantangan' },
            ],
          },
        ]}
        price="Rp 20.000"
        originalPrice="Rp 40.000"
      />
    </main>
  )
}
