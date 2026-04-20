'use client'

import Link from 'next/link'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { PackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'

export default function RelationshipPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const activePackages = packages?.filter(p => p.isActive) ?? []

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-linear-to-b from-primary-950 via-primary-900 to-primary-800 pt-32 pb-24 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-accent-300 fill-accent-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Relationship</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
            Hubungan yang <br className="hidden md:block" />
            <span className="text-accent-300 italic">Lebih Sehat</span>
          </h1>

          <p className="text-primary-100/80 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Dari red flag pasangan baru hingga kesepian dalam pernikahan — asesmen berbasis psikologi untuk memahami pola relasi dan membangun hubungan yang benar-benar bermakna.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">
                Paket Tes Tersedia
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Setiap Hubungan Punya <span className="text-primary-600 italic">Ceritanya Sendiri</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              Pilih asesmen yang paling sesuai dengan situasimu.
            </p>
          </div>

          {isLoading ? (
            <PackageGridSkeleton />
          ) : activePackages.length === 0 ? (
            <PackageEmptyState message="Belum ada paket tes untuk kategori Relationship. Silakan cek kembali nanti." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-accent-300 fill-accent-300" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Bingung Mulai?</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Ceritakan Situasimu, <span className="text-accent-300 italic">Kami Bantu</span>
                </h3>
                <p className="text-primary-50 font-medium text-sm md:text-base">
                  AI Counsellor kami siap dengar cerita kamu dan rekomendasikan asesmen yang paling pas — gratis, tanpa daftar.
                </p>
              </div>
              <Link
                href="/"
                className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
              >
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
