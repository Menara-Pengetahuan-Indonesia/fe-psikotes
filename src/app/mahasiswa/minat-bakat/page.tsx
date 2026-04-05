import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Minat & Bakat — BERMOELA',
  description: 'Kenali minat dan bakat alami Anda melalui tes psikologi yang tervalidasi secara ilmiah.',
}

export default function MinatBakatPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Minat & Bakat"
        badge="Mahasiswa & Pelajar"
        description="Tes ini membantu kamu mengenali minat, bakat, dan potensi alami yang kamu miliki. Dari hasilnya, kamu bisa melihat gambaran arah karier dan aktivitas yang paling cocok dengan dirimu."
        duration="15 menit"
        participants="12.400+"
        aspects={[
          {
            heading: 'Minat Vokasional',
            items: [
              { title: 'Realistik', desc: 'Preferensi terhadap pekerjaan praktis dan teknis' },
              { title: 'Investigatif', desc: 'Kecenderungan menganalisis dan memecahkan masalah' },
              { title: 'Artistik', desc: 'Daya tarik terhadap kreativitas dan ekspresi diri' },
            ],
          },
          {
            heading: 'Kekuatan Pribadi',
            items: [
              { title: 'Kemampuan Kognitif', desc: 'Potensi berpikir dan memproses informasi' },
              { title: 'Kecerdasan Emosional', desc: 'Kemampuan mengelola emosi dan hubungan sosial' },
            ],
          },
        ]}
        price="Rp 25.000"
        originalPrice="Rp 50.000"
        formHref="/mahasiswa/minat-bakat/form"
      />
      </AuthGuard>
    </main>
  )
}
