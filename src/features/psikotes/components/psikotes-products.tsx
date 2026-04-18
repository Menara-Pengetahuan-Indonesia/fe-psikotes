'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, User, Heart, Briefcase, Zap, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DIRI_PRIBADI_PRODUCTS, RELATIONSHIP_PRODUCTS, CORPORATE_PRODUCTS } from '../constants'
import type { CorporateProduct } from '../types'
import { ProductCardNew } from './product-card-new'

type ActiveTab = 'diri-pribadi' | 'relationship' | 'bisnis'

const TABS: { id: ActiveTab; label: string; icon: typeof User }[] = [
  { id: 'diri-pribadi',  label: 'Diri Pribadi',       icon: User      },
  { id: 'relationship',  label: 'Relationship',        icon: Heart     },
  { id: 'bisnis',        label: 'Bisnis & Perusahaan', icon: Briefcase },
]

const TAB_HREF: Record<ActiveTab, string> = {
  'diri-pribadi': '/diri-pribadi',
  'relationship': '/relationship',
  'bisnis':       '/bisnis',
}

function CorporateCard({ product }: { product: CorporateProduct }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:scale-[1.02] transition-transform duration-200 flex flex-col overflow-hidden">
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <product.icon className="w-5 h-5 text-amber-600" aria-hidden="true" />
          </div>
          <h3 className="font-black text-[14px] text-gray-900 leading-snug flex-1">
            {product.title}
          </h3>
        </div>
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {product.description}
        </p>
        {product.callForDetail ? (
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            Hubungi Kami
          </a>
        ) : (
          <Link
            href={`/bisnis/${product.slug}`}
            className="w-full h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors"
          >
            Lihat Detail
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  )
}

export function PsikotesProducts() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diri-pribadi')

  return (
    <section id="masa-depan" className="pt-12 md:pt-16 pb-28 md:pb-32 bg-white relative overflow-hidden">
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
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border transition-colors duration-300',
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 shadow-sm'
                )}
              >
                <tab.icon className="w-4 h-4" aria-hidden="true" />
                {tab.label}
              </button>
            ))}

            {/* Lihat Semua */}
            <Link
              href={TAB_HREF[activeTab]}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 shadow-sm transition-colors duration-300"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'diri-pribadi' && DIRI_PRIBADI_PRODUCTS.slice(0, 3).map((p) => (
            <ProductCardNew key={p.id} product={p} />
          ))}
          {activeTab === 'relationship' && RELATIONSHIP_PRODUCTS.slice(0, 3).map((p) => (
            <ProductCardNew key={p.id} product={p} />
          ))}
          {activeTab === 'bisnis' && CORPORATE_PRODUCTS.slice(0, 3).map((p) => (
            <CorporateCard key={p.id} product={p} />
          ))}
        </div>

        {/* See all button */}
        <div className="mt-10">
          <Link
            href={TAB_HREF[activeTab]}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-gray-200 text-sm font-black uppercase tracking-widest text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors duration-200"
          >
            Lihat Semua {TABS.find(t => t.id === activeTab)?.label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  )
}
