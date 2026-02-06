import type { Metadata } from 'next'

import { PaymentStatus } from '@/features/payment/components'

export const metadata: Metadata = {
  title: 'Status Pembayaran — BERMOELA',
  description: 'Pantau status pembayaran Anda secara real-time.',
}

// Placeholder values — in production these would be read from
// search params or a global payment-flow store populated by
// the previous pembayaran page.
const PLACEHOLDER_METHOD = 'gopay'
const PLACEHOLDER_ORDER_ID = 'ORD-2026-000001'
const PLACEHOLDER_PRODUCT = 'Psikotes Premium'
const PLACEHOLDER_PRICE = 25000
const PLACEHOLDER_NEXT_URL = '/psikotes/premium'

export default function PaymentStatusPage() {
  return (
    <main>
      <PaymentStatus
        method={PLACEHOLDER_METHOD}
        orderId={PLACEHOLDER_ORDER_ID}
        productName={PLACEHOLDER_PRODUCT}
        price={PLACEHOLDER_PRICE}
        nextUrl={PLACEHOLDER_NEXT_URL}
      />
    </main>
  )
}
