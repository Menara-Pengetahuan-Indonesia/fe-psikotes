import type { Metadata } from 'next'

import {
  PremiumListing,
  GuaranteeSection,
  Testimonials,
  FaqAccordion,
} from '@/features/psikotes/premium/components'

export const metadata: Metadata = {
  title: 'Psikotes Premium — TITIK MULA',
  description: 'Akses tes psikologi premium dengan laporan mendalam dan rekomendasi karir yang dipersonalisasi.',
}

export default function PremiumPage() {
  return (
    <main>
      <PremiumListing />
      <GuaranteeSection />
      <Testimonials />
      <FaqAccordion />
    </main>
  )
}
