import type { Metadata } from 'next'

import { MentalHealthOverview } from '@/features/psikotes/kesehatan-mental/components'

export const metadata: Metadata = {
  title: 'Kesehatan Mental — BERMOELA',
  description: 'Kenali kondisi kesehatan mental Anda melalui tes yang dirancang oleh profesional psikologi.',
}

export default function KesehatanMentalPage() {
  return (
    <main>
      <MentalHealthOverview />
    </main>
  )
}
