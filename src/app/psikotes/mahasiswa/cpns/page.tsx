import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'

export const metadata: Metadata = {
  title: 'Tes Persiapan CPNS — BERMOELA',
  description: 'Persiapkan diri Anda untuk ujian CPNS dengan tes komprehensif yang mencakup semua kompetensi wajib.',
}

export default function CpnsPage() {
  return (
    <main>
      <TestDetail
        title="Tes Persiapan CPNS"
        badge="Mahasiswa & Pelajar"
        description="Tes Persiapan CPNS dirancang khusus untuk membantu calon PNS mempersiapkan diri menghadapi ujian kompetensi dasar (SKD). Materi mencakup tes wawasan kebangsaan, tes kemampuan umum, dan tes kemampuan berhitung."
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
        formHref="/psikotes/mahasiswa/cpns/form"
      />
    </main>
  )
}
