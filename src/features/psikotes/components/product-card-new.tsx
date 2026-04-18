'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiriPribadiProduct, RelationshipProduct, ProductTier } from '../types'
import { RelationshipSubIssueFilter } from './relationship-sub-issue-filter'

type PersonalProduct = DiriPribadiProduct | RelationshipProduct

interface ProductCardNewProps {
  product: PersonalProduct
  defaultTier?: ProductTier
}

const CATEGORY_PATH: Record<string, string> = {
  'diri-pribadi': '/diri-pribadi',
  'relationship': '/relationship',
}

const ICON_COLORS = [
  'bg-emerald-100 text-emerald-600',
  'bg-rose-100 text-rose-600',
  'bg-amber-100 text-amber-600',
  'bg-indigo-100 text-indigo-600',
  'bg-teal-100 text-teal-600',
  'bg-violet-100 text-violet-600',
]


function getColorIdx(product: PersonalProduct): number {
  let hash = 0
  for (let i = 0; i < product.id.length; i++) {
    hash = (hash * 31 + product.id.charCodeAt(i)) % ICON_COLORS.length
  }
  return hash
}

type TierKey = 'dasar' | 'lengkap' | 'comprehensive'

const TIER_CONFIG: Record<TierKey, { label: string; color: string; activeBg: string; activeText: string; activeBorder: string }> = {
  dasar:         { label: 'Dasar',         color: 'text-slate-400', activeBg: 'bg-slate-50',   activeText: 'text-slate-700',   activeBorder: 'border-slate-300' },
  lengkap:       { label: 'Lengkap',       color: 'text-emerald-500', activeBg: 'bg-emerald-50', activeText: 'text-emerald-700', activeBorder: 'border-emerald-400' },
  comprehensive: { label: 'Comprehensive', color: 'text-indigo-500',  activeBg: 'bg-indigo-50',  activeText: 'text-indigo-700',  activeBorder: 'border-indigo-400' },
}

export function ProductCardNew({ product, defaultTier = 'lengkap' }: ProductCardNewProps) {
  const [selectedTier, setSelectedTier] = useState<ProductTier>(defaultTier)
  const [activeSubIssue, setActiveSubIssue] = useState<string | null>(null)
  const colorIdx = getColorIdx(product)
  const isRelationship = product.category === 'relationship'
  const relProduct = isRelationship ? (product as RelationshipProduct) : null
  const detailHref = `${CATEGORY_PATH[product.category]}/${product.slug}`

  const activePricing = product.pricing.find(p => p.tier === selectedTier) ?? product.pricing[0]

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:scale-[1.02] transition-transform duration-200 flex flex-col overflow-hidden">
      <div className="flex flex-col gap-5 p-5 flex-1">

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', ICON_COLORS[colorIdx])}>
            <product.icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-[14px] text-gray-900 leading-snug">
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">{product.subtitle}</p>
            )}
          </div>
          {isRelationship && relProduct?.canDoWithPartner && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-50 text-[9px] font-black text-rose-600 uppercase tracking-widest border border-rose-100">
              + Pasangan
            </span>
          )}
        </div>

        {/* Pain point — 1 line max */}
        <p className="text-[12px] text-gray-500 italic leading-relaxed line-clamp-1 -mt-2">
          &ldquo;{product.painPoint}&rdquo;
        </p>

        {/* Sub-issue filter */}
        {isRelationship && relProduct && relProduct.subIssues.length > 0 && (
          <RelationshipSubIssueFilter
            subIssues={relProduct.subIssues}
            activeId={activeSubIssue}
            onSelect={setActiveSubIssue}
          />
        )}

        {/* Tier selector — pill style */}
        <div className="flex gap-1.5" role="group" aria-label="Pilih paket">
          {product.pricing.map((p) => {
            const cfg = TIER_CONFIG[p.tier as TierKey] ?? TIER_CONFIG.dasar
            const isActive = selectedTier === p.tier
            return (
              <button
                key={p.tier}
                onClick={() => setSelectedTier(p.tier)}
                aria-pressed={isActive}
                className={cn(
                  'flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-xl border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
                  isActive
                    ? cn(cfg.activeBg, cfg.activeBorder, 'shadow-sm scale-[1.03]')
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200 opacity-60 hover:opacity-90'
                )}
              >
                <span className={cn('text-[9px] font-black uppercase tracking-wider', isActive ? cfg.activeText : 'text-gray-400')}>
                  {cfg.label}
                </span>
                <span className={cn('text-[13px] font-black tracking-tight', isActive ? cfg.activeText : 'text-gray-400')}>
                  {p.priceLabel}
                </span>
              </button>
            )
          })}
        </div>

        {/* Coverage label for selected tier */}
        {activePricing?.coverage && (
          <p className="text-[11px] text-gray-400 -mt-3 text-center leading-snug">
            {activePricing.coverage}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-gray-400 mt-auto">
          {product.users && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" aria-hidden="true" />
              <span className="text-[11px] font-semibold">{product.users}</span>
            </div>
          )}
          {product.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span className="text-[11px] font-semibold">{product.duration}</span>
            </div>
          )}
          <div className="ml-auto flex gap-0.5" aria-label="Rating 5 bintang">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={detailHref}
          className="w-full h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Lihat Detail <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

      </div>
    </div>
  )
}
