'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'
import { DIRI_PRIBADI_PRODUCTS } from '../constants/diri-pribadi.constants'
import { RELATIONSHIP_PRODUCTS } from '../constants/relationship.constants'
import { CORPORATE_PRODUCTS } from '../constants/corporate.constants'
import { ProductCardNew } from './product-card-new'
import type { CorporateProduct } from '../types'

function CorporateProductCard({ product }: { product: CorporateProduct }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col p-6 gap-5">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
          <product.icon className="w-6 h-6 text-amber-600" />
        </div>
        {product.callForDetail && (
          <span className="px-2 py-1 rounded-full bg-amber-50 text-[10px] font-black text-amber-600 uppercase tracking-widest border border-amber-100">
            Custom
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="font-black text-base text-slate-900 leading-tight">{product.title}</h3>
        <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-4">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {product.pricing.map((p) => (
          <div key={p.tier} className="flex flex-col gap-1 p-3 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{p.label}</span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight">{p.description}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-50">
        {product.callForDetail ? (
          <Link
            href="/contact"
            className="w-full h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Hubungi Kami
          </Link>
        ) : (
          <Link
            href={`/bisnis/${product.slug}`}
            className="w-full h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
          >
            Lihat Detail
          </Link>
        )}
      </div>
    </div>
  )
}

export function DiriPribadiProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {DIRI_PRIBADI_PRODUCTS.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  )
}

export function RelationshipProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {RELATIONSHIP_PRODUCTS.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  )
}

export function CorporateProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {CORPORATE_PRODUCTS.map((product) => (
        <CorporateProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
