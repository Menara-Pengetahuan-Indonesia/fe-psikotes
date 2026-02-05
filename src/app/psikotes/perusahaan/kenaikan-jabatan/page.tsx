import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Kenaikan Jabatan — TITIK MULA',
  description: 'Tes komprehensif untuk mengevaluasi kesiapan karyawan dalam promosi jabatan.',
}

export default function KenaikanJabatanPage() {
  return (
    <main>
      <TestDetail
        title="Tes Kenaikan Jabatan"
        badge="Perusahaan"
        description="Tes Kenaikan Jabatan membantu perusahaan menilai kesiapan karyawan untuk mengambil tanggung jawab yang lebih besar. Mencakup penilaian kepemimpinan, kemampuan pengambilan keputusan, dan kompetensi manajerial."
        duration="30 menit"
        participants="5.400+"
        aspects={[
          {
            heading: 'Kepemimpinan',
            items: [
              { title: 'Gaya Kepemimpinan', desc: 'Pendekatan dan strategi dalam memimpin tim' },
              { title: 'Pengambilan Keputusan', desc: 'Kemampuan mengambil keputusan yang tepat dan efektif' },
            ],
          },
          {
            heading: 'Kompetensi Manajerial',
            items: [
              { title: 'Manajemen Konflik', desc: 'Kemampuan mengelola dan menyelesaikan konflik' },
              { title: 'Komunikasi Efektif', desc: 'Keterampilan komunikasi dan presentasi' },
              { title: 'Visi Strategis', desc: 'Kemampuan berpikir jangka panjang dan strategis' },
            ],
          },
        ]}
        price="Rp 55.000"
        originalPrice="Rp 110.000"
      />
    </main>
  )
}
