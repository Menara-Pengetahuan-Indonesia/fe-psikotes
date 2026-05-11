'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Loader2, ChevronRight, FlaskConical, ArrowRight, Inbox } from 'lucide-react'
import { useCatalogChildPackageById, useCatalogPackageTypes } from '../hooks/use-catalog'
import type { CatalogPackageType } from '../types/catalog.types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

interface PackageDetailClientProps {
  categorySlug: string
  categoryLabel: string
}

export function PackageDetailClient({ categorySlug, categoryLabel }: PackageDetailClientProps) {
  const params = useParams()
  const childId = params.slug as string
  const { data, isLoading } = useCatalogChildPackageById(childId)
  const { data: packageTypes, isLoading: isLoadingTypes } = useCatalogPackageTypes(childId)

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
          <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-primary-100/40 rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[350px] h-[350px] bg-accent-100/30 rounded-full pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Inbox className="w-10 h-10 text-slate-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Paket Tidak Ditemukan
            </h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
              Paket tes yang kamu cari tidak tersedia atau sudah dihapus. Coba cek kembali halaman kategori.
            </p>
            <Link
              href={`/${categorySlug}`}
              className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
            >
              Kembali ke {categoryLabel}
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
      {/* Hero — light gradient matching Bermoela pattern */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-28 pb-16">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-primary-100/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${categorySlug}`} className="hover:text-primary-600 transition-colors">{categoryLabel}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-medium">{child.name}</span>
          </nav>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-black text-primary-700 uppercase tracking-widest">{categoryLabel}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-[0.95]">
              {child.name}
            </h1>

            {child.description && (
              <p className="text-gray-500 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
                {child.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {tiers.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
                  <FlaskConical className="w-4 h-4 text-primary-500" />
                  <span className="text-xs font-bold text-slate-700">{tiers.length} Paket Tersedia</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section id="pilih-paket" className="relative overflow-hidden py-16">
        <div className="absolute top-[-8%] right-[-6%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="space-y-3 mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Pilih Paket
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              Pilih paket yang sesuai dengan kebutuhanmu.
            </p>
          </div>

          {tiers.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Belum ada paket tersedia untuk tes ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                  Butuh Bantuan <span className="text-accent-300 italic">Memilih?</span>
                </h3>
                <p className="text-primary-50 font-medium text-sm md:text-base">
                  AI Counsellor kami siap bantu rekomendasikan paket yang paling sesuai — gratis, tanpa daftar.
                </p>
              </div>
              <Link
                href="/"
                className="px-8 h-14 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
              >
                Konsultasi Gratis <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      {tiers.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-slate-100 p-4 z-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Mulai dari</p>
              <p className="text-lg font-black text-gray-900">
                {formatPrice(Math.min(...tiers.map(t => t.price)))}
              </p>
            </div>
            <button
              onClick={() => {
                document.getElementById('pilih-paket')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              Pilih Paket <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

function TierCard({ tier }: { tier: CatalogPackageType }) {
  return (
    <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900">{tier.name}</h4>
        <span className="text-lg font-black text-primary-600">{formatPrice(tier.price)}</span>
      </div>
      {tier.description && (
        <p className="text-sm text-slate-500 mb-4">{tier.description}</p>
      )}
      <a
        href={`/pembayaran?packageTypeId=${tier.id}`}
        className="block w-full h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors text-center leading-[2.75rem]"
      >
        Pilih Paket Ini
      </a>
    </div>
  )
}
