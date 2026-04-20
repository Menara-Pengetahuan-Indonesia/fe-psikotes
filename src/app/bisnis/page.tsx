'use client'

import { Building2, Phone } from 'lucide-react'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { PackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'

export default function BisnisPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const activePackages = packages?.filter(p => p.isActive) ?? []

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-linear-to-b from-slate-900 to-slate-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Bisnis & Perusahaan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Investasi Terbaik <span className="text-amber-300 italic">adalah Manusianya</span>
          </h1>
          <p className="text-slate-300/70 font-medium max-w-2xl mx-auto text-base md:text-lg">
            Assessment psikologi organisasi berbasis data — dari rekrutmen staf hingga audit kesiapan AI, semua dalam satu platform.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <PackageGridSkeleton />
          ) : activePackages.length === 0 ? (
            <PackageEmptyState message="Belum ada paket tes untuk kategori Bisnis & Perusahaan. Silakan cek kembali nanti." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-slate-900 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Butuh <span className="text-amber-300 italic">Assessment Khusus?</span>
                </h3>
                <p className="text-slate-300 font-medium text-sm md:text-base max-w-xl">
                  Kami menyediakan Customized Competency Based Assessment yang dirancang khusus sesuai kebutuhan industri dan kompetensi unik perusahaanmu.
                </p>
              </div>
              <a
                href="/contact"
                className="px-8 h-16 rounded-2xl bg-amber-500 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-colors flex items-center gap-3 shrink-0"
              >
                <Phone className="w-5 h-5" /> Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
