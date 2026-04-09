'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Users, Clock, Shield, CheckCircle2, Sparkles,
  Heart, ArrowRight, CreditCard, FileText, Brain, Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiriPribadiProduct, RelationshipProduct, ProductTier } from '../types'

type PersonalProduct = DiriPribadiProduct | RelationshipProduct

interface PersonalProductDetailProps {
  product: PersonalProduct
  defaultTier?: ProductTier
  categoryLabel: string
  categoryHref: string
  relatedProducts?: PersonalProduct[]
}

const STEPS = [
  {
    title: 'Pilih Level',
    desc: 'Pilih tingkat kedalaman asesmen yang paling sesuai kebutuhanmu.',
    icon: FileText,
  },
  {
    title: 'Bayar Aman',
    desc: 'Transfer, e-wallet, atau QRIS — langsung terkonfirmasi otomatis.',
    icon: CreditCard,
  },
  {
    title: 'Kerjakan Tes',
    desc: 'Akses dari dashboard. Bisa di-pause dan dilanjutkan kapan saja.',
    icon: Brain,
  },
  {
    title: 'Dapatkan Hasil',
    desc: 'Laporan lengkap dikirim ke email dan bisa diakses seumur hidup.',
    icon: Award,
  },
]

export function PersonalProductDetail({
  product,
  defaultTier = 'lengkap',
  categoryLabel,
  categoryHref,
  relatedProducts = [],
}: PersonalProductDetailProps) {
  const [selectedTier, setSelectedTier] = useState<ProductTier>(defaultTier)
  const activePricing = product.pricing.find((p) => p.tier === selectedTier) || product.pricing[1]

  const isRelationship = product.category === 'relationship'
  const relProduct = isRelationship ? (product as RelationshipProduct) : null

  return (
    <main className="min-h-screen bg-background pb-32">

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 pt-28 pb-4 flex items-center gap-2 text-xs font-bold text-slate-400">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={categoryHref} className="hover:text-primary-600 transition-colors">{categoryLabel}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <product.icon className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{categoryLabel}</span>
            </div>
            {relProduct?.canDoWithPartner && (
              <span className="px-3 py-1.5 rounded-full bg-accent-50 text-[10px] font-black text-accent-700 uppercase tracking-widest border border-accent-100">
                Bisa Bersama Pasangan
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
            {product.title}
            {product.subtitle && (
              <span className="block text-2xl md:text-3xl lg:text-4xl text-primary-600 italic mt-2 font-black">
                {product.subtitle}
              </span>
            )}
          </h1>

          <blockquote className="border-l-4 border-primary-400 pl-5 py-3 bg-primary-50/50 rounded-r-2xl">
            <p className="text-base md:text-lg text-slate-700 font-medium italic leading-relaxed">
              &ldquo;{product.painPoint}&rdquo;
            </p>
          </blockquote>

          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            {product.description}
          </p>

          {/* Meta stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            {product.users && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peserta</p>
                  <p className="text-sm font-black text-slate-900">{product.users}</p>
                </div>
              </div>
            )}
            {product.duration && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Durasi</p>
                  <p className="text-sm font-black text-slate-900">{product.duration}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Privasi</p>
                <p className="text-sm font-black text-slate-900">Terjaga</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">
                3 Level Kedalaman
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Pilih Level yang <span className="text-primary-600 italic">Sesuai Kebutuhanmu</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">
              Semakin tinggi level, semakin dalam analisisnya. Kamu bisa ganti pilihan kapan saja sebelum bayar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {product.pricing.map((p) => {
              const isActive = selectedTier === p.tier
              const isFeatured = p.tier === 'lengkap'
              return (
                <button
                  key={p.tier}
                  type="button"
                  onClick={() => setSelectedTier(p.tier)}
                  className={cn(
                    'relative rounded-[2rem] border-2 p-6 text-left transition-all duration-300',
                    isActive
                      ? 'border-primary-500 bg-white shadow-2xl shadow-primary-500/20 md:-translate-y-1'
                      : 'border-slate-100 bg-white/60 hover:border-primary-200 opacity-80 hover:opacity-100'
                  )}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Paling Populer
                    </span>
                  )}
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <span className={cn(
                        'text-[10px] font-black uppercase tracking-widest block',
                        isActive ? 'text-primary-600' : 'text-slate-400'
                      )}>
                        {p.label}
                      </span>
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 block">
                        {p.priceLabel}
                      </span>
                    </div>
                    <p className={cn(
                      'text-xs md:text-sm font-medium leading-relaxed min-h-[3em]',
                      isActive ? 'text-slate-600' : 'text-slate-400'
                    )}>
                      {p.coverage}
                    </p>
                    <div className="pt-4 border-t border-slate-100">
                      {isActive ? (
                        <span className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
                          <CheckCircle2 className="w-4 h-4" /> Dipilih
                        </span>
                      ) : (
                        <span className="text-slate-400 font-black text-xs uppercase tracking-widest">
                          Pilih Level Ini →
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sub-issues (relationship only) */}
      {relProduct && relProduct.subIssues.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mb-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                <Heart className="w-3 h-3 text-primary-600 fill-primary-600" />
                <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">
                  Situasi yang Dicakup
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Asesmen Ini Mencakup <span className="text-primary-600 italic">Berbagai Situasi</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-medium">
                Pilih situasi yang paling mendekati keadaanmu sekarang. Semua dibahas dalam tes yang sama.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relProduct.subIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-900 text-sm mb-1 leading-tight">{issue.label}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{issue.shortDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process / How it works */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">4 Langkah Mudah</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Cara <span className="text-primary-600 italic">Kerjanya</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-slate-100 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Asesmen Lain yang <span className="text-primary-600 italic">Mungkin Relevan</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.slice(0, 3).map((rel) => (
                <Link
                  key={rel.id}
                  href={`${categoryHref}/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-xl hover:border-primary-200 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                    <rel.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-1 leading-tight group-hover:text-primary-600 transition-colors">
                    {rel.title}
                  </h3>
                  {rel.subtitle && (
                    <p className="text-xs text-primary-500 italic font-bold mb-2">{rel.subtitle}</p>
                  )}
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                    {rel.painPoint}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-black text-primary-600 uppercase tracking-widest">
                    Lihat Detail <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 shadow-2xl bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0 flex-1">
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level Dipilih</p>
              <p className="text-sm font-black text-slate-900">{activePricing.label}</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
              <p className="text-xl md:text-2xl font-black text-primary-600 tracking-tight">{activePricing.priceLabel}</p>
            </div>
          </div>
          <Link
            href={`/pembayaran?id=${product.id}&tier=${selectedTier}`}
            className="h-12 md:h-14 px-5 md:px-8 rounded-xl md:rounded-2xl bg-primary-600 text-white text-xs md:text-sm font-black uppercase tracking-widest hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/20 flex items-center gap-2 shrink-0"
          >
            <span className="hidden sm:inline">Mulai Asesmen</span>
            <span className="sm:hidden">Mulai</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
