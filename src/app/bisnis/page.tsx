'use client'

import Link from 'next/link'
import { Building2, Sparkles, Phone, TrendingUp, Users, BarChart3, CheckCircle2 } from 'lucide-react'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'

const USE_CASES = [
  { icon: Users, title: 'Rekrutmen', desc: 'Seleksi kandidat terbaik berbasis data psikometri' },
  { icon: TrendingUp, title: 'Promosi Jabatan', desc: 'Evaluasi kesiapan leadership & kompetensi manajerial' },
  { icon: BarChart3, title: 'Audit Organisasi', desc: 'Pemetaan potensi SDM dan gap kompetensi tim' },
]

export default function BisnisPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const pkg = packages?.find(p => p.name.toLowerCase().includes('bisnis'))
  const children = pkg?.childPackages?.filter(c => c.isActive) ?? []

  return (
    <main className="min-h-screen bg-white">

      {/* Hero — light with amber accent, 2-column layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-white pt-32 pb-20">
        <div className="absolute top-[-10%] left-[-8%] w-[500px] h-[500px] bg-amber-100/50 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] bg-primary-100/30 rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Bisnis & Perusahaan</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
                Investasi Terbaik <br /><span className="text-amber-500 italic">adalah Manusianya</span>
              </h1>

              <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed max-w-lg">
                Assessment psikologi organisasi berbasis data — dari rekrutmen staf hingga audit kesiapan AI, semua dalam satu platform.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['ISO Certified', 'Data-Driven', 'Custom Report'].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-bold text-amber-700">
                    <CheckCircle2 className="size-3 text-amber-500" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Use case cards */}
            <div className="space-y-4">
              {USE_CASES.map((uc) => (
                <div key={uc.title} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                  <div className="size-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <uc.icon className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{uc.title}</p>
                    <p className="text-xs text-gray-400 font-medium">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute bottom-[-8%] left-[-6%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none" />
        <div className="absolute top-[-5%] right-[-8%] w-[300px] h-[300px] bg-primary-100/30 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">Paket Assessment</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Solusi untuk <span className="text-amber-500 italic">Setiap Kebutuhan</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
              Pilih paket assessment yang sesuai dengan kebutuhan organisasimu.
            </p>
          </div>

          {isLoading ? (
            <PackageGridSkeleton />
          ) : children.length === 0 ? (
            <PackageEmptyState message="Belum ada paket tes untuk kategori Bisnis & Perusahaan. Silakan cek kembali nanti." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <ChildPackageCard key={child.id} child={child} categorySlug="bisnis" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-amber-500 to-primary-600 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Butuh <span className="text-amber-100 italic">Assessment Khusus?</span>
                </h3>
                <p className="text-white/80 font-medium text-sm md:text-base">
                  Kami menyediakan Customized Competency Based Assessment yang dirancang khusus sesuai kebutuhan industri dan kompetensi unik perusahaanmu.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-8 h-16 rounded-2xl bg-white text-amber-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
              >
                <Phone className="w-5 h-5" /> Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
