'use client'

import { useState } from 'react'
import { ArrowRight, Target, Zap, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCatalogPackages, useCatalogChildPackages, useAllPackageTypes } from '../hooks/use-catalog'
import type { CatalogChildPackage } from '../types/catalog.types'

function CatalogPackageCard({
  child,
  lowestPrice,
}: {
  child: CatalogChildPackage
  lowestPrice?: number
}) {
  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 gap-5">
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">{child.name}</h3>
        {child.description && (
          <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{child.description}</p>
        )}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        {lowestPrice !== undefined ? (
          <span className="text-sm font-black text-primary-600">
            Mulai {lowestPrice === 0 ? 'Gratis' : `Rp ${lowestPrice.toLocaleString('id-ID')}`}
          </span>
        ) : (
          <span className="text-sm text-slate-300 font-medium">—</span>
        )}
        <a
          href={`/produk/${child.id}`}
          className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-widest"
        >
          Lihat Detail <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export function PsikotesProducts() {
  const { data: packages, isLoading: packagesLoading } = useCatalogPackages()
  const [activePackageId, setActivePackageId] = useState<string | null>(null)

  const effectiveActiveId = activePackageId ?? packages?.[0]?.id ?? null

  const { data: childPackages, isLoading: childLoading } = useCatalogChildPackages(effectiveActiveId ?? '')
  const childIds = (childPackages ?? []).map((c) => c.id)
  const { priceMap, isLoading: pricesLoading } = useAllPackageTypes(childIds)

  const isLoading = packagesLoading || childLoading || pricesLoading

  return (
    <section id="masa-depan" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="space-y-12 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200 shadow-sm">
              <Zap className="w-3 h-3 text-accent-600 fill-accent-600" />
              <span className="text-xs font-black text-accent-700 uppercase tracking-widest">Assessment & Solusi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Ambil Senjata <span className="text-primary-600 italic">Transformasimu</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Setiap alat tes dirancang untuk membongkar kebenaran yang kamu butuhkan — tersedia dalam berbagai level kedalaman sesuai kebutuhan.
            </p>
          </div>

          {packagesLoading ? (
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-36 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {(packages ?? []).map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setActivePackageId(pkg.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border transition-all duration-300',
                    effectiveActiveId === pkg.id
                      ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-900/20 -translate-y-0.5'
                      : 'bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 shadow-sm'
                  )}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
          </div>
        ) : (childPackages ?? []).length === 0 ? (
          <div className="text-center py-24 text-slate-400 font-medium">
            Belum ada produk tersedia untuk kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(childPackages ?? []).map((child) => (
              <CatalogPackageCard
                key={child.id}
                child={child}
                lowestPrice={priceMap.get(child.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                Masih Bingung Menentukan <span className="text-accent-300 italic">Titik Mula?</span>
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
