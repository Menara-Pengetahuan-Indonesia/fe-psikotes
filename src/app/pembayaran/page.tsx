import { Suspense } from 'react'
import type { Metadata } from 'next'

import { PembayaranLayout } from './pembayaran-layout'

export const metadata: Metadata = {
  title: 'Pembayaran — Bermoela',
  description: 'Selesaikan pembayaran untuk layanan pilihan Anda.',
}

export default function PembayaranPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-primary-50 via-primary-50/40 to-amber-50/30 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(20 83 45 / 0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-[-160px] right-[-120px] w-[520px] h-[520px] bg-primary-200/40 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-140px] left-[-80px] w-[420px] h-[420px] bg-amber-200/40 rounded-full pointer-events-none blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <Suspense>
          <PembayaranLayout />
        </Suspense>
      </div>
    </main>
  )
}
