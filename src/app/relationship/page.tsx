'use client'

import Link from 'next/link'
import { Heart, Sparkles, ArrowRight, Shield, MessageCircle, Users } from 'lucide-react'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { usePackageFilter } from '@/features/psikotes/hooks/use-package-filter'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'
import { PackageFilterBar } from '@/features/psikotes/components/package-filter-bar'

const TOPICS = [
  { emoji: '💜', label: 'Kenali Pola', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { emoji: '💍', label: 'Pra-Nikah', color: 'bg-primary-50 text-primary-600 border-primary-100' },
  { emoji: '👨‍👩‍👧', label: 'Keluarga', color: 'bg-sky-50 text-sky-600 border-sky-100' },
  { emoji: '🤝', label: 'Komunikasi', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { emoji: '💚', label: 'Healing', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
]

const STATS = [
  { icon: Shield, value: 'Berbasis Riset', desc: 'Instrumen tervalidasi' },
  { icon: MessageCircle, value: 'Konsultasi', desc: 'AI Counsellor gratis' },
  { icon: Users, value: '10k+', desc: 'Pasangan terbantu' },
]

export default function RelationshipPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const pkg = packages?.find(p => p.name.toLowerCase().includes('relationship'))
  const children = pkg?.childPackages?.filter(c => c.isActive) ?? []
  const {
    filtered, total, search, setSearch, tier, setTier,
    priceRange, setPriceRange, resetFilters, hasActiveFilters,
  } = usePackageFilter(children)

  return (
    <main className="min-h-screen bg-white">

      {/* Hero — centered with topic pills */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50/50 via-white to-white pt-32 pb-16">
        <div className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] bg-violet-100/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-primary-100/30 rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100">
            <Heart className="w-4 h-4 text-violet-500 fill-violet-500" />
            <span className="text-xs font-black text-violet-700 uppercase tracking-widest">Relationship</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
            Hubungan yang <span className="text-violet-500 italic">Lebih Sehat</span>
          </h1>

          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Dari red flag pasangan baru hingga kesepian dalam pernikahan — asesmen berbasis psikologi untuk memahami pola relasi dan membangun hubungan yang bermakna.
          </p>

          {/* Topic pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {TOPICS.map((t) => (
              <span key={t.label} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-bold ${t.color}`}>
                {t.emoji} {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.desc} className="flex items-center gap-3 justify-center">
                <div className="size-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <s.icon className="size-5 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute top-[-8%] left-[-6%] w-[350px] h-[350px] bg-primary-100/40 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">Paket Tes Tersedia</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Setiap Hubungan Punya <span className="text-violet-500 italic">Ceritanya Sendiri</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
              Pilih asesmen yang paling sesuai dengan situasimu.
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
                activeChipClass="bg-violet-500 text-white shadow-sm"
              />

              <div className="mt-8">
                {filtered.length === 0 ? (
                  <PackageEmptyState message={hasActiveFilters ? 'Tidak ada paket yang sesuai filter. Coba ubah kriteria pencarian.' : 'Belum ada paket tes untuk kategori Relationship. Silakan cek kembali nanti.'} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((child) => (
                      <ChildPackageCard key={child.id} child={child} categorySlug="relationship" />
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
          <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-violet-500 to-primary-600 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Ceritakan Situasimu, <span className="text-accent-300 italic">Kami Bantu</span>
                </h3>
                <p className="text-white/80 font-medium text-sm md:text-base">
                  AI Counsellor kami siap dengar cerita kamu dan rekomendasikan asesmen yang paling pas — gratis, tanpa daftar.
                </p>
              </div>
              <Link
                href="/"
                className="px-8 h-16 rounded-2xl bg-white text-violet-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
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
