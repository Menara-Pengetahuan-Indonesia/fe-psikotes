'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  ArrowRight,
  Copy,
  Package,
  Home,
  RefreshCcw,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { paymentService } from '@/features/payment/services/payment.service'

type Status = 'paid' | 'pending' | 'failed' | string

const STATUS_CONFIG: Record<
  string,
  {
    label: string
    description: string
    icon: React.ElementType
    gradient: string
    accent: string
    badgeClass: string
    iconWrap: string
  }
> = {
  paid: {
    label: 'Pembayaran Berhasil',
    description: 'Paket kamu sudah aktif. Selamat mengerjakan tes!',
    icon: CheckCircle2,
    gradient: 'from-primary-600 via-primary-700 to-primary-800',
    accent: 'text-primary-700',
    badgeClass: 'bg-primary-50 text-primary-700 border border-primary-100',
    iconWrap: 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-200',
  },
  pending: {
    label: 'Menunggu Pembayaran',
    description: 'Selesaikan pembayaran sesuai instruksi yang diberikan.',
    icon: Clock,
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
    accent: 'text-amber-700',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-100',
    iconWrap: 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-200',
  },
  failed: {
    label: 'Pembayaran Gagal',
    description: 'Pembayaran tidak berhasil. Silakan coba lagi.',
    icon: XCircle,
    gradient: 'from-rose-600 via-rose-700 to-rose-800',
    accent: 'text-rose-700',
    badgeClass: 'bg-rose-50 text-rose-700 border border-rose-100',
    iconWrap: 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-200',
  },
}

export function PaymentStatusLayout() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [copied, setCopied] = useState(false)

  const { data: payment, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['payment-status', orderId],
    queryFn: () => paymentService.getPaymentStatus(orderId!),
    enabled: !!orderId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      return status === 'pending' ? 5000 : false
    },
  })

  const handleCopy = () => {
    if (!orderId) return
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-100 p-10 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-rose-200">
            <XCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-black text-slate-900 mb-1">Order ID tidak ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Link pembayaran tidak valid.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading || !payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Mengecek status pembayaran...</p>
        </div>
      </div>
    )
  }

  const status: Status = payment.status
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.failed
  const Icon = config.icon

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-14 px-4">
      <div className="max-w-xl mx-auto">
        <div className="relative bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div
            className={`relative bg-gradient-to-br ${config.gradient} px-8 pt-10 pb-8 text-white overflow-hidden`}
          >
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute top-[-70px] right-[-50px] w-56 h-56 bg-white/15 rounded-full blur-3xl" />
            <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-amber-400/25 rounded-full blur-2xl" />

            <svg
              className="absolute top-6 right-8 w-24 h-24 text-white/10 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="50" cy="50" r="38" />
              <circle cx="50" cy="50" r="25" />
              <circle cx="50" cy="50" r="12" />
            </svg>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3" />
                Status Pembayaran
              </div>

              <div
                className={`w-20 h-20 ${config.iconWrap} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
                {config.label}
              </h1>
              <p className="text-sm text-white/85 max-w-sm mx-auto">{config.description}</p>
            </div>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-5">
            <div className="rounded-2xl border border-dashed border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Order ID
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs font-bold text-slate-800 truncate">
                    {orderId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-100 flex items-center justify-center transition-colors shrink-0"
                    title={copied ? 'Tersalin' : 'Salin'}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Total
                </span>
                <span className="text-base font-black text-slate-900">
                  Rp {payment.amount?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Status
                </span>
                <span
                  className={`text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${config.badgeClass}`}
                >
                  {status === 'paid' ? 'Lunas' : status === 'pending' ? 'Menunggu' : 'Gagal'}
                </span>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-primary-700 font-bold text-center">
                Order ID tersalin ke clipboard
              </p>
            )}

            <div className="flex flex-col gap-2.5">
              {status === 'paid' && (
                <>
                  <Link
                    href="/pengguna/paket-saya"
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Lihat Paket Saya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="w-full h-11 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Kembali ke Dashboard
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}

              {status === 'pending' && (
                <>
                  <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 text-sm font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm shadow-amber-200 hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <RefreshCcw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                    {isFetching ? 'Memeriksa...' : 'Cek Status Lagi'}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                    Halaman ini akan otomatis memperbarui saat pembayaran diterima. Cek setiap 5
                    detik.
                  </p>
                </>
              )}

              {status === 'failed' && (
                <>
                  <Link
                    href="/"
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Kembali ke Beranda
                  </Link>
                  <Link
                    href="/pembayaran"
                    className="w-full h-11 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Coba Lagi
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-6 font-medium">
          Butuh bantuan?{' '}
          <Link href="/faq" className="text-primary-700 font-bold hover:underline">
            Lihat FAQ
          </Link>{' '}
          atau hubungi{' '}
          <a
            href="mailto:support@bermoela.com"
            className="text-primary-700 font-bold hover:underline"
          >
            support
          </a>
          .
        </p>
      </div>
    </div>
  )
}
