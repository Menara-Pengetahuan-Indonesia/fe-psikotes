import { Suspense } from 'react'
import type { Metadata } from 'next'

import { PaymentStatusLayout } from './payment-status-layout'

export const metadata: Metadata = {
  title: 'Status Pembayaran — BERMOELA',
  description: 'Pantau status pembayaran Anda secara real-time.',
}

export default function PaymentStatusPage() {
  return (
    <main>
      <Suspense>
        <PaymentStatusLayout />
      </Suspense>
    </main>
  )
}
