import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Kepribadian — TITIK MULA',
  description: 'Temukan tipe kepribadian Anda dan pemahaman mendalam tentang diri melalui tes kepribadian komprehensif.',
}

export default function KepribadianPage() {
  return (
    <main>
      <TestDetail
        title="Tes Kepribadian"
        badge="Kesehatan Mental"
        description="Tes Kepribadian membantu Anda memahami siapa diri Anda sebenarnya. Dengan menggunakan model kepribadian yang tervalidasi secara ilmiah, Anda akan mendapatkan gambaran lengkap tentang kekuatan, kelemahan, dan pola perilaku Anda."
        duration="12 menit"
        participants="18.200+"
        aspects={[
          {
            heading: 'Dimensi Kepribadian',
            items: [
              { title: 'Ekstroversi vs Introversi', desc: 'Bagaimana Anda berinteraksi dengan lingkungan sekitar' },
              { title: 'Agreeableness', desc: 'Kecenderungan dalam menjaga hubungan dan kerjasama' },
              { title: 'Conscientiousness', desc: 'Tingkat kedisiplinan dan tanggung jawab' },
            ],
          },
          {
            heading: 'Pola Emosional',
            items: [
              { title: 'Stabilitas Emosional', desc: 'Kemampuan mengelola emosi dalam berbagai situasi' },
              { title: 'Keterbukaan', desc: 'Daya tarik terhadap pengalaman baru dan ide segar' },
            ],
          },
        ]}
        price="Rp 25.000"
        originalPrice="Rp 50.000"
      />
    </main>
  )
}
