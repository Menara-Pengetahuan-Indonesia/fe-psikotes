'use client'

import { User, Sparkles, ArrowRight, Brain, Target, Compass } from 'lucide-react'
import Link from 'next/link'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { usePackageFilter } from '@/features/psikotes/hooks/use-package-filter'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'
import { PackageFilterBar } from '@/features/psikotes/components/package-filter-bar'

const HIGHLIGHTS = [
  { icon: Brain, label: 'Kepribadian', desc: 'Pahami pola pikir & perilakumu' },
  { icon: Target, label: 'Potensi', desc: 'Temukan kekuatan tersembunyi' },
  { icon: Compass, label: 'Arah Hidup', desc: 'Tentukan langkah selanjutnya' },
]

export default function DiriPribadiPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const pkg = packages?.find(p => p.name.toLowerCase().includes('diri'))
  const children = pkg?.childPackages?.filter(c => c.isActive) ?? []
  const {
    filtered, total, search, setSearch, tier, setTier,
    priceRange, setPriceRange, resetFilters, hasActiveFilters,
  } = usePackageFilter(children)

  return (
    <main className="min-h-screen bg-white">

      {/* Hero — left-aligned with highlight cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-white pt-32 pb-20">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-primary-100/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
              <User className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Diri Pribadi</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
              Kenali Dirimu <br /><span className="text-primary-600 italic">Lebih Dalam</span>
            </h1>

            <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed">
              Dari luka batin hingga perencanaan karir — asesmen berbasis riset untuk memahami siapa kamu dan ke mana kamu mau pergi.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
                <div className="size-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <h.icon className="size-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">{h.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute top-[-8%] right-[-6%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200">
              <Sparkles className="w-3 h-3 text-accent-600 fill-accent-600" />
              <span className="text-[10px] font-black text-accent-700 uppercase tracking-widest">Paket Tes Tersedia</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Temukan Jawabannya <span className="text-primary-600 italic">di Dalam Dirimu</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
              Pilih asesmen yang paling sesuai dengan situasimu saat ini.
            </p>
          </div>

          {isLoading ? (
            <PackageGridSkeleton />
          ) : (
            <>
              <PackageFilterBar
                search={search}
                onSearchChange={setSearch}
                tier={tier}
                onTierChange={setTier}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
                resultCount={filtered.length}
                totalCount={total}
              />

              <div className="mt-8">
                {filtered.length === 0 ? (
                  <PackageEmptyState message={hasActiveFilters ? 'Tidak ada paket yang sesuai filter. Coba ubah kriteria pencarian.' : 'Belum ada paket tes untuk kategori Diri Pribadi. Silakan cek kembali nanti.'} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((child) => (
                      <ChildPackageCard key={child.id} child={child} categorySlug="diri-pribadi" />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Bingung Mulai dari Mana? <span className="text-accent-300 italic">Ceritakan Saja</span>
                </h3>
                <p className="text-primary-50 font-medium text-sm md:text-base">
                  AI Counsellor kami siap dengar cerita kamu dan rekomendasikan asesmen yang paling pas — gratis, tanpa daftar.
                </p>
              </div>
              <Link
                href="/"
                className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
              >
                Konsultasi Gratis <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
