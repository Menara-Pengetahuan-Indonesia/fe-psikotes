import type { Metadata } from 'next'

import { GratisListing } from '@/features/psikotes/gratis/components'

export const metadata: Metadata = {
  title: 'Psikotes Gratis — BERMOELA',
  description: 'Akses berbagai tes psikologi berkualitas secara gratis dan mulai perjalanan pengembangan diri Anda.',
}

export default function GratisPage() {
  return (
    <main>
      <GratisListing />
    </main>
  )
}
