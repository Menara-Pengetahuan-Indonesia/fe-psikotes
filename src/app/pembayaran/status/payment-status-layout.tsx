'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Loader2, CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

import { paymentService } from '@/features/payment/services/payment.service'

function StatusIcon({ status }: { status: string }) {
  if (status === 'paid') return <CheckCircle2 className="w-16 h-16 text-green-500" />
  if (status === 'pending') return <Clock className="w-16 h-16 text-yellow-500" />
  return <XCircle className="w-16 h-16 text-red-500" />
}

function statusLabel(status: string) {
  if (status === 'paid') return 'Pembayaran Berhasil'
  if (status === 'pending') return 'Menunggu Pembayaran'
  return 'Pembayaran Gagal'
}

function statusDescription(status: string) {
  if (status === 'paid') return 'Paket kamu sudah aktif. Selamat mengerjakan tes!'
  if (status === 'pending') return 'Selesaikan pembayaran sesuai instruksi yang diberikan.'
  return 'Pembayaran tidak berhasil. Silakan coba lagi.'
}

export function PaymentStatusLayout() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const { data: payment, isLoading } = useQuery({
    queryKey: ['payment-status', orderId],
    queryFn: () => paymentService.getPaymentStatus(orderId!),
    enabled: !!orderId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      return status === 'pending' ? 5000 : false
    },
  })

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Order ID tidak ditemukan.</p>
      </div>
    )
  }

  if (isLoading || !payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        <span className="ml-3 text-sm text-slate-400">Mengecek status pembayaran...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <StatusIcon status={payment.status} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">{statusLabel(payment.status)}</h1>
          <p className="text-sm text-slate-500">{statusDescription(payment.status)}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Order ID</span>
            <span className="font-mono font-bold text-slate-700">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total</span>
            <span className="font-bold text-slate-700">
              Rp {payment.amount?.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status</span>
            <span className={`font-bold ${payment.status === 'paid' ? 'text-green-600' : payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
              {payment.status === 'paid' ? 'Lunas' : payment.status === 'pending' ? 'Menunggu' : 'Gagal'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {payment.status === 'paid' && (
            <Link
              href="/pengguna/paket-saya"
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors inline-block"
            >
              Lihat Paket Saya
            </Link>
          )}
          {payment.status === 'failed' && (
            <Link
              href="/"
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors inline-block"
            >
              Kembali ke Beranda
            </Link>
          )}
          {payment.status === 'pending' && (
            <p className="text-xs text-slate-400">Halaman ini akan otomatis update saat pembayaran diterima.</p>
          )}
        </div>
      </div>
    </div>
  )
}
