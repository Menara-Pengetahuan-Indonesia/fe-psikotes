'use client'

import { Target, Zap } from 'lucide-react'
import { usePublicPackages } from '../hooks/use-public-packages'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from './package-card'

const CATEGORY_SLUG_MAP: Record<string, string> = {
  diri: 'diri-pribadi',
  relationship: 'relationship',
  bisnis: 'bisnis',
}

function getCategorySlug(packageName: string): string {
  const lower = packageName.toLowerCase()
  for (const [key, slug] of Object.entries(CATEGORY_SLUG_MAP)) {
    if (lower.includes(key)) return slug
  }
  return 'diri-pribadi'
}

export function PsikotesProducts() {
  const { data: packages, isLoading } = usePublicPackages()
  const activePackages = packages?.filter(p => p.isActive) ?? []
  const allChildren = activePackages.flatMap(pkg =>
    (pkg.childPackages?.filter(c => c.isActive) ?? []).map(child => ({
      ...child,
      categorySlug: getCategorySlug(pkg.name),
    }))
  )

  return (
    <section id="masa-depan" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="space-y-4 max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200 shadow-sm">
            <Zap className="w-3 h-3 text-accent-600 fill-accent-600" />
            <span className="text-xs font-black text-accent-700 uppercase tracking-widest">Assessment & Solusi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Pilih Bekal <span className="text-primary-600 italic">Transformasimu</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Setiap alat tes dirancang khusus untuk membantumu menemukan kejelasan yang selama ini kamu cari.
          </p>
        </div>

        {isLoading ? (
          <PackageGridSkeleton />
        ) : allChildren.length === 0 ? (
          <PackageEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allChildren.map((child) => (
              <ChildPackageCard key={child.id} child={child} categorySlug={child.categorySlug} />
            ))}
          </div>
        )}

        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                Masih Bingung Menentukan <span className="text-accent-300 italic">Bermoela?</span>
              </h3>
              <p className="text-primary-50 font-medium text-sm md:text-base max-w-xl">
                Ceritakan situasimu ke AI Counsellor kami — gratis, tanpa daftar, dan langsung dapat rekomendasi produk yang paling sesuai.
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
            >
              Mulai Analisis Sekarang <Target className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
