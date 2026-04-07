'use client'

import { useState } from 'react'
import { ArrowRight, Target, User, Heart, Briefcase, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DIRI_PRIBADI_PRODUCTS, RELATIONSHIP_PRODUCTS } from '../constants'
import { ProductCardNew } from './product-card-new'

type ActiveTab = 'diri-pribadi' | 'relationship'

export function PsikotesProducts() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diri-pribadi')

  const tabs: { id: ActiveTab; label: string; icon: typeof User; count: number }[] = [
    { id: 'diri-pribadi', label: 'Diri Pribadi', icon: User, count: DIRI_PRIBADI_PRODUCTS.length },
    { id: 'relationship', label: 'Relationship', icon: Heart, count: RELATIONSHIP_PRODUCTS.length },
  ]

  const products = activeTab === 'diri-pribadi' ? DIRI_PRIBADI_PRODUCTS : RELATIONSHIP_PRODUCTS

  return (
    <section id="masa-depan" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
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
              Setiap alat tes dirancang untuk membongkar kebenaran yang kamu butuhkan — tersedia dalam 3 level kedalaman sesuai kebutuhan.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border transition-all duration-300',
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-900/20 -translate-y-0.5'
                    : 'bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 shadow-sm'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="text-[10px] opacity-60">({tab.count})</span>
              </button>
            ))}

            {/* Corporate CTA */}
            <a
              href="/bisnis"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border bg-white text-slate-400 border-slate-100 hover:border-amber-200 hover:text-amber-600 shadow-sm transition-all duration-300 ml-auto"
            >
              <Briefcase className="w-4 h-4" />
              Bisnis & Perusahaan
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCardNew key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
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
