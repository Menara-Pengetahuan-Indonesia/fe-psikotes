import type { Metadata } from 'next'

import {
  PsikotesHero,
  PsikotesTransformationMap,
  PsikotesStage,
  PsikotesCategoryNav,
  PsikotesProducts,
} from '@/features/psikotes/components'

export const metadata: Metadata = {
  title: 'Psikotes — BERMOELA',
  description:
    'Temukan potensi terbaikmu melalui'
    + ' psikotes profesional berbasis'
    + ' riset psikologi.',
}

export default function PsikotesPage() {
  return (
    <main>
      {/* 1. Chatbot & Intro Message */}
      <PsikotesHero />

      {/* 2. Masalah: Identifikasi Kondisi Saat Ini */}
      <PsikotesCategoryNav />

      {/* NEW: Stage Transformation */}
      <PsikotesStage />

      {/* 3. Solusi: Peta Perjalanan Transformasi */}
      <PsikotesTransformationMap />

      {/* 4. Produk: Pilihan Alat Bantu Transformasi */}
      <PsikotesProducts />

      {/* 5. Benefit: Detail Transformasi & Hasil Akhir */}
      {/* <PsikotesPillars /> */}
    </main>
  )
}
