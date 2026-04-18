'use client'

import Link from 'next/link'
import {
  ChevronRight, CheckCircle2, Sparkles, Phone, ArrowRight,
  Building2, Users2, Target, Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CorporateProduct } from '../types'

interface CorporateProductDetailProps {
  product: CorporateProduct
  relatedProducts?: CorporateProduct[]
}

const CORPORATE_STEPS = [
  {
    title: 'Konsultasi Awal',
    desc: 'Diskusi kebutuhan organisasi, jumlah peserta, dan timeline.',
    icon: Users2,
  },
  {
    title: 'Kustomisasi',
    desc: 'Alat ukur disesuaikan dengan kompetensi spesifik perusahaanmu.',
    icon: Target,
  },
  {
    title: 'Pelaksanaan',
    desc: 'Pelaksanaan asesmen online/onsite dengan supervisi psikolog.',
    icon: Building2,
  },
  {
    title: 'Laporan & Rekomendasi',
    desc: 'Laporan mendalam beserta rekomendasi strategis untuk decision maker.',
    icon: Award,
  },
]

export function CorporateProductDetail({ product, relatedProducts = [] }: CorporateProductDetailProps) {
  const categoryLabel = 'Bisnis & Perusahaan'
  const categoryHref = '/bisnis'

  return (
    <main className="min-h-screen bg-background">

      {/* Hero - dark theme */}
      <section className="relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-800 pt-28 pb-20 overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={categoryHref} className="hover:text-amber-300 transition-colors">{categoryLabel}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate max-w-[200px]">{product.title}</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0">
                <product.icon className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <Building2 className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{categoryLabel}</span>
              </div>
              {product.callForDetail && (
                <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-[10px] font-black text-amber-300 uppercase tracking-widest border border-amber-400/30">
                  Hubungi Kami
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              {product.title}
            </h1>

            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {product.callForDetail ? (
                <Link
                  href="/contact"
                  className="h-14 px-7 rounded-2xl bg-amber-500 text-slate-900 text-sm font-black uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-xl shadow-amber-500/20 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Hubungi Kami
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="h-14 px-7 rounded-2xl bg-amber-500 text-slate-900 text-sm font-black uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-xl shadow-amber-500/20 flex items-center gap-2"
                >
                  Request Proposal <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                href="/contact"
                className="h-14 px-7 rounded-2xl bg-white/10 text-white text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - 2 tier */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">2 Paket Tersedia</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Pilih Paket yang <span className="text-amber-600 italic">Sesuai Skala Organisasi</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">
              Kedua paket mencakup asesmen inti — perbedaan terletak pada kedalaman laporan dan rekomendasi strategis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {product.pricing.map((tier, idx) => {
              const isComprehensive = tier.tier === 'comprehensive'
              return (
                <div
                  key={tier.tier}
                  className={cn(
                    'relative rounded-[2rem] p-8 border-2 transition-colors',
                    isComprehensive
                      ? 'bg-slate-900 border-amber-500 shadow-2xl shadow-amber-500/10'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
                  )}
                >
                  {isComprehensive && (
                    <span className="absolute -top-3 left-8 px-4 py-1.5 rounded-full bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Rekomendasi
                    </span>
                  )}
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <span className={cn(
                        'text-[10px] font-black uppercase tracking-widest',
                        isComprehensive ? 'text-amber-300' : 'text-slate-400'
                      )}>
                        Paket {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className={cn(
                        'text-3xl md:text-4xl font-black tracking-tight',
                        isComprehensive ? 'text-white' : 'text-slate-900'
                      )}>
                        {tier.label}
                      </h3>
                    </div>
                    <p className={cn(
                      'text-sm font-medium leading-relaxed',
                      isComprehensive ? 'text-slate-300' : 'text-slate-500'
                    )}>
                      {tier.description}
                    </p>
                    <div className={cn(
                      'pt-5 border-t',
                      isComprehensive ? 'border-white/10' : 'border-slate-100'
                    )}>
                      <Link
                        href="/contact"
                        className={cn(
                          'w-full h-12 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-colors',
                          isComprehensive
                            ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        )}
                      >
                        <Phone className="w-4 h-4" /> Request Quote
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Why choose note */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-amber-900 text-sm mb-1">Butuh paket custom?</h3>
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                Setiap organisasi punya kebutuhan unik. Tim kami bisa merancang asesmen khusus sesuai kompetensi & budaya perusahaanmu — tinggal hubungi kami untuk diskusi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">4 Fase Proses</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Cara <span className="text-amber-600 italic">Kerjanya</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORPORATE_STEPS.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-slate-100 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Assessment Lain untuk <span className="text-amber-600 italic">Kebutuhan Organisasimu</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.slice(0, 3).map((rel) => (
                <Link
                  key={rel.id}
                  href={`${categoryHref}/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-xl hover:border-amber-200 transition-[box-shadow,border-color]"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                    <rel.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-2 leading-tight group-hover:text-amber-700 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {rel.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-black text-amber-700 uppercase tracking-widest">
                    Lihat Detail <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-slate-900 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-3 h-3 text-amber-300" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Enterprise Ready</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Siap Membahas <span className="text-amber-300 italic">Kebutuhanmu?</span>
                </h3>
                <p className="text-slate-300 font-medium text-sm md:text-base">
                  Tim konsultan kami siap diskusi gratis untuk memahami kebutuhan organisasimu dan merancang solusi yang paling tepat.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-8 h-16 rounded-2xl bg-amber-500 text-slate-900 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-amber-400 transition-colors flex items-center gap-3 shrink-0"
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
