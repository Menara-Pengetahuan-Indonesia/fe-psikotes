import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Hubungan — BERMOELA',
  description: 'Pahami pola dan dinamika hubungan Anda melalui tes yang komprehensif dan mendalam.',
}

export default function RelationshipPage() {
  return (
    <main>
      <TestDetail
        title="Tes Hubungan"
        badge="Kesehatan Mental"
        description="Tes Hubungan dirancang untuk membantu Anda memahami pola hubungan dan dinamika interpersonal dalam kehidupan Anda. Dari hubungan romantis hingga profesional, tes ini memberikan wawasan berharga tentang gaya interaksi Anda."
        duration="15 menit"
        participants="10.800+"
        aspects={[
          {
            heading: 'Gaya Hubungan',
            items: [
              { title: 'Gaya Kelekatan', desc: 'Pola emosional dalam membentuk hubungan dekat' },
              { title: 'Komunikasi', desc: 'Cara Anda mengekspresikan kebutuhan dan perasaan' },
            ],
          },
          {
            heading: 'Dinamika Sosial',
            items: [
              { title: 'Batas Pribadi', desc: 'Kemampuan menetapkan dan menghormati batasan' },
              { title: 'Empati', desc: 'Tingkat pemahaman dan kepedulian terhadap orang lain' },
              { title: 'Resolusi Konflik', desc: 'Pendekatan dalam menangani perbedaan dan ketegangan' },
            ],
          },
        ]}
        price="Rp 25.000"
        originalPrice="Rp 50.000"
        formHref="/psikotes/kesehatan-mental/relationship/form"
      />
    </main>
  )
}
