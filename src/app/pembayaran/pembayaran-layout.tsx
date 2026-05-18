'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ChevronRight,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileCheck2,
  HeartHandshake,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { toast } from 'sonner'

import { OrderSummary } from '@/features/payment/components'
import { catalogService } from '@/features/psikotes/services/catalog.service'
import { paymentService } from '@/features/payment/services/payment.service'

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: Record<string, unknown>) => void
          onPending?: (result: Record<string, unknown>) => void
          onError?: (result: Record<string, unknown>) => void
          onClose?: () => void
        },
      ) => void
    }
  }
}

interface PackageDetail {
  id: string
  name: string
  description?: string
  price: number
  testTool?: string
  childId: string
  childName: string
  childDescription?: string
  parentName: string
}

export function PembayaranLayout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const packageTypeId = searchParams.get('packageTypeId')

  const { data: packageDetail, isLoading } = useQuery<PackageDetail | null>({
    queryKey: ['payment-detail', packageTypeId],
    queryFn: async () => {
      const packages = await catalogService.getPackages()
      for (const pkg of packages) {
        const children = await catalogService.getChildPackages(pkg.id)
        for (const child of children) {
          const types = await catalogService.getPackageTypes(child.id)
          const found = types.find((t) => t.id === packageTypeId)
          if (found) {
            return {
              id: found.id,
              name: found.name,
              description: found.description,
              price: found.price,
              testTool: found.testTool,
              childId: child.id,
              childName: child.name,
              childDescription: child.description,
              parentName: pkg.name,
            }
          }
        }
      }
      return null
    },
    enabled: !!packageTypeId,
  })

  const qc = useQueryClient()

  const paymentMutation = useMutation({
    mutationFn: (pkgTypeId: string) => paymentService.createPayment(pkgTypeId),
    onSuccess: (data) => {
      if (data.status === 'free') {
        toast.success('Paket berhasil diaktifkan!')
        qc.invalidateQueries({ queryKey: ['my-packages'] })
        router.push('/pengguna/paket-saya')
        return
      }

      if (data.snapToken && window.snap) {
        window.snap.pay(data.snapToken, {
          onSuccess: () => {
            toast.success('Pembayaran berhasil!')
            qc.invalidateQueries({ queryKey: ['my-packages'] })
            router.push('/pembayaran/status?order_id=' + data.orderId)
          },
          onPending: () => {
            toast.info('Menunggu pembayaran...')
            router.push('/pembayaran/status?order_id=' + data.orderId)
          },
          onError: () => {
            toast.error('Pembayaran gagal. Silakan coba lagi.')
          },
          onClose: () => {
            toast.info('Pembayaran dibatalkan.')
          },
        })
      }
    },
    onError: (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status
      if (status === 409) {
        toast.info('Kamu sudah memiliki paket ini')
        router.push('/pengguna/paket-saya')
      } else if (status === 401) {
        const currentPath = window.location.pathname + window.location.search
        router.push(`/masuk?redirect=${encodeURIComponent(currentPath)}`)
      } else {
        toast.error('Gagal memproses pembayaran. Coba lagi.')
      }
    },
  })

  const handlePurchase = () => {
    if (!packageTypeId) return
    paymentMutation.mutate(packageTypeId)
  }

  if (!packageTypeId) {
    return (
      <div className="bg-white/90 backdrop-blur rounded-3xl border border-slate-100 shadow-sm p-12 text-center max-w-md mx-auto">
        <p className="text-slate-500 mb-4">Tidak ada paket yang dipilih.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    )
  }

  if (isLoading || !packageDetail) {
    return (
      <div className="space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Hero card skeleton */}
        <div className="bg-slate-100 animate-pulse rounded-3xl p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
            <Skeleton className="h-4 w-40 rounded bg-slate-200" />
          </div>
          <Skeleton className="h-9 w-2/3 rounded-xl bg-slate-200" />
          <Skeleton className="h-4 w-full rounded-lg bg-slate-200" />
          <Skeleton className="h-4 w-4/5 rounded-lg bg-slate-200" />
        </div>

        {/* Body skeleton */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-7 space-y-5">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-9 h-9 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-44 rounded-lg" />
                  <Skeleton className="h-3 w-36 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-28 rounded-lg" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info bar skeleton */}
            <div className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-slate-100 px-5 py-4">
              <Skeleton className="h-4 w-48 rounded-lg" />
              <Skeleton className="h-4 w-44 rounded-lg" />
            </div>
          </div>

          {/* Order summary skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <div className="space-y-3 py-3 border-y border-slate-100">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12 rounded" />
                <Skeleton className="h-6 w-28 rounded-lg" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const testTools = packageDetail.testTool
    ?.split(',')
    .map((t) => t.trim())
    .filter(Boolean) ?? []

  const benefits = [
    { icon: CheckCircle2, title: 'Akses Penuh', desc: 'Semua tes dalam paket terbuka untukmu' },
    { icon: FileCheck2, title: 'Hasil Terstruktur', desc: 'Laporan detail dengan interpretasi' },
    { icon: HeartHandshake, title: 'Didampingi Psikolog', desc: 'Konten dirancang oleh ahli bersertifikat' },
    { icon: ShieldCheck, title: 'Privasi Terjaga', desc: 'Data kamu aman dan hanya untuk kamu' },
  ]

  const parentRouteMap: Record<string, string> = {
    'Paket Relationship': '/relationship',
  }
  const parentHref = parentRouteMap[packageDetail.parentName]

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
        <Link href="/" className="hover:text-primary-700 transition-colors font-medium">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        {parentHref ? (
          <Link
            href={parentHref}
            className="hover:text-primary-700 transition-colors font-medium"
          >
            {packageDetail.parentName}
          </Link>
        ) : (
          <span className="text-slate-600 font-medium">{packageDetail.parentName}</span>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/produk/${packageDetail.childId}`}
          className="hover:text-primary-700 transition-colors font-medium truncate max-w-[160px] md:max-w-none"
        >
          {packageDetail.childName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">Pembayaran</span>
      </nav>

      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/50">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-amber-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-accent-400/30 rounded-full blur-2xl" />

        <svg
          className="absolute top-6 right-8 w-20 h-20 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
        </svg>

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Checkout
            </span>
            <span className="text-xs text-primary-100 font-medium">
              {packageDetail.parentName} · {packageDetail.childName}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
            {packageDetail.name}
          </h1>

          {packageDetail.description && (
            <p className="text-sm text-primary-100/90 leading-relaxed max-w-2xl">
              {packageDetail.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative bg-white rounded-3xl border border-primary-100/60 p-6 md:p-7 shadow-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-primary-100/60 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-200">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  Yang Akan Kamu Dapatkan
                </h2>
                <p className="text-xs text-slate-500">Fasilitas lengkap dalam paket ini</p>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-primary-50/50 border border-primary-100/60"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-primary-100">
                    <b.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{b.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {testTools.length > 0 && (
            <div className="relative bg-white rounded-3xl border border-amber-100/80 p-6 md:p-7 shadow-sm overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/60 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm shadow-amber-200">
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                    Alat Tes Termasuk
                  </h2>
                  <p className="text-xs text-slate-500">
                    {testTools.length} alat tes psikologi terstandar
                  </p>
                </div>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {testTools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-900"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 flex-wrap bg-white/80 backdrop-blur rounded-2xl border border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Clock className="w-4 h-4 text-primary-600" />
              <span className="font-medium">Akses langsung setelah pembayaran</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <ShieldCheck className="w-4 h-4 text-primary-600" />
              <span className="font-medium">Transaksi aman via Midtrans</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <OrderSummary
              productName={`${packageDetail.name} — ${packageDetail.childName}`}
              productPrice={packageDetail.price}
              onContinue={handlePurchase}
              isProcessing={paymentMutation.isPending}
              hasPaymentSelected={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
