'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Package, ChevronLeft, FlaskConical, BookOpen, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { OrderSummary } from '@/features/payment/components'
import { catalogService } from '@/features/psikotes/services/catalog.service'
import { paymentService } from '@/features/payment/services/payment.service'

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: any) => void
        onPending?: (result: any) => void
        onError?: (result: any) => void
        onClose?: () => void
      }) => void
    }
  }
}

interface PackageDetail {
  id: string
  name: string
  description?: string
  price: number
  testTool?: string
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
      <div className="text-center py-20">
        <p className="text-slate-500">Tidak ada paket yang dipilih.</p>
        <Link href="/" className="text-primary-600 font-bold text-sm mt-4 inline-block">
          Kembali ke Beranda
        </Link>
      </div>
    )
  }

  if (isLoading || !packageDetail) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        <span className="ml-3 text-sm text-slate-400">Memuat detail paket...</span>
      </div>
    )
  }

  const testTools = packageDetail.testTool?.split(',').map((t) => t.trim()).filter(Boolean) ?? []

  return (
    <div className="space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Kembali
      </button>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {/* Detail Paket */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <Package className="w-7 h-7 text-primary-600" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {packageDetail.parentName}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">•</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {packageDetail.childName}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900">{packageDetail.name}</h2>
                {packageDetail.description && (
                  <p className="text-sm text-slate-500 leading-relaxed">{packageDetail.description}</p>
                )}
                {packageDetail.childDescription && (
                  <p className="text-xs text-slate-400 leading-relaxed">{packageDetail.childDescription}</p>
                )}
              </div>
            </div>

            {/* Alat Tes */}
            {testTools.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Alat Tes yang Termasuk</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {testTools.map((tool) => (
                    <div key={tool} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yang Didapat */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Yang Kamu Dapatkan</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Akses penuh ke semua tes dalam paket
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Hasil dan interpretasi otomatis
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Sertifikat digital setelah selesai
                </li>
                {testTools.length > 0 && (
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {testTools.length} alat tes psikologi terstandar
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
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
  )
}
