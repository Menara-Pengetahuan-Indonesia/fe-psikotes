import type { Metadata } from 'next'

import { PembayaranLayout } from './pembayaran-layout'

export const metadata: Metadata = {
  title: 'Pembayaran — TITIK MULA',
  description: 'Selesaikan pembayaran untuk layanan pilihan Anda.',
}

export default function PembayaranPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <PembayaranLayout />
      </div>
    </main>
  )
}
