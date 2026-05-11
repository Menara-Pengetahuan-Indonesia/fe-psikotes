'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Loader2, ChevronRight, FlaskConical, ArrowRight, Inbox } from 'lucide-react'
import { useCatalogChildPackageById, useCatalogPackageTypes } from '@/features/psikotes/hooks/use-catalog'
import type { CatalogPackageType } from '@/features/psikotes/types/catalog.types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function TierCard({ tier, onSelect }: { tier: CatalogPackageType; onSelect: (id: string) => void }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col gap-4">
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-black text-slate-900">{tier.name}</h3>
        {tier.description && <p className="text-sm text-slate-500 leading-relaxed">{tier.description}</p>}
        {tier.testTool && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{tier.testTool}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="text-lg font-black text-primary-600">
          {tier.price === 0 ? 'Gratis' : formatPrice(tier.price)}
        </span>
        <button
          onClick={() => onSelect(tier.id)}
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-700 transition-colors"
        >
          Ambil Paket
        </button>
      </div>
    </div>
  )
}

export default function ProdukDetailPage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.id as string
  const { data, isLoading } = useCatalogChildPackageById(childId)
  const { data: packageTypes } = useCatalogPackageTypes(childId)

  const handleSelect = (packageTypeId: string) => {
    router.push(`/pembayaran?packageTypeId=${packageTypeId}`)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          <p className="text-sm font-medium text-slate-400">Memuat paket...</p>
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-32 pb-20">
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Inbox className="w-10 h-10 text-slate-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Paket Tidak Ditemukan
            </h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
              Paket tes yang kamu cari tidak tersedia atau sudah dihapus.
            </p>
            <Link
              href="/#masa-depan"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
            >
              Kembali ke Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const { child } = data
  const tiers = packageTypes ?? []

  return (
    <main className="min-h-screen bg-white pb-24 md:pb-0">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-28 pb-16">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-primary-100/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-medium">{child.name}</span>
          </nav>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Detail Produk</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-[0.95]">
              {child.name}
            </h1>

            {child.description && (
              <p className="text-gray-500 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
                {child.description}
              </p>
            )}

            {tiers.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm w-fit">
                <FlaskConical className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-bold text-slate-700">{tiers.length} Paket Tersedia</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-8">
            Pilih Paket
          </h2>

          {tiers.length === 0 ? (
            <p className="text-slate-400 font-medium">Belum ada paket tersedia.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.map((tier) => (
                <TierCard
                  key={tier.id}
                  tier={tier}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
