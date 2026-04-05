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
            heading: 'Melihat Kompetensi melalui IQ',
            items: [
              { title: 'IST Potensi (Bakat)', desc: 'Mengukur kemampuan berpikir mendalam dan potensi bakat kandidat.' },
              { title: 'CFIT (Fluid Intelligence)', desc: 'Mengukur kemampuan berpikir multi-tasking dan adaptasi terhadap perubahan.' },
              { title: 'WPT – Wonderlic Personnel Test', desc: 'Standar emas untuk efisiensi psikotes kerja. Mengukur kapasitas kognitif umum dan kemampuan berpikir cepat.' },
            ],
          },
          {
            heading: 'Person Organization Fit',
            items: [
              { title: 'PAPI Kostick', desc: 'Mengukur kecocokan kepribadian dan gaya kerja kandidat dengan budaya organisasi.' },
            ],
          },
          {
            heading: 'Placement Minat Bakat',
            items: [
              { title: 'Holland RIASEC (Minat)', desc: 'Mengidentifikasi minat karir dan kekuatan kandidat berdasarkan 6 tipe kepribadian Holland.' },
              { title: 'TKD (Potensi/Bakat)', desc: 'Mengukur potensi dan bakat dasar yang relevan dengan kebutuhan jabatan.' },
            ],
          },
          {
            heading: 'Preferensi Gaya Berpikir',
            items: [
              { title: 'HBDI', desc: 'Mengukur preferensi gaya berpikir kandidat untuk memahami cara mereka memproses informasi dan membuat keputusan.' },
            ],
          },
        ]}
        price="Rp 45.000"
        originalPrice="Rp 90.000"
        selectable
        formHref="/bisnis/rekrutmen/asesmen"
      />
      </AuthGuard>
    </main>
  )
}
