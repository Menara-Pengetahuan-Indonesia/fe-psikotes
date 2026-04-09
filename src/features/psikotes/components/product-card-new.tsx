'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiriPribadiProduct, RelationshipProduct, ProductTier } from '../types'
import { PricingTierSelector } from './pricing-tier-selector'
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

export function ProductCardNew({ product, defaultTier = 'lengkap' }: ProductCardNewProps) {
  const [selectedTier, setSelectedTier] = useState<ProductTier>(defaultTier)
  const [activeSubIssue, setActiveSubIssue] = useState<string | null>(null)

  const isRelationship = product.category === 'relationship'
  const relProduct = isRelationship ? (product as RelationshipProduct) : null

  const activePricing = product.pricing.find(p => p.tier === selectedTier) || product.pricing[1]
  const detailHref = `${CATEGORY_PATH[product.category]}/${product.slug}`

  return (
    <div className={cn('group bg-white rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 gap-5')}>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 text-primary-600">
          <product.icon className="w-6 h-6" />
        </div>
        {isRelationship && relProduct?.canDoWithPartner && (
          <span className="px-2 py-1 rounded-full bg-accent-50 text-[10px] font-black text-accent-700 uppercase tracking-widest border border-accent-100">
            Bisa Bersama Pasangan
          </span>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1 flex-1">
        <h3 className="font-black text-base text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
          {product.title}
          {product.subtitle && (
            <span className="block text-sm font-bold text-primary-500 italic mt-0.5">
              {product.subtitle}
            </span>
          )}
        </h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
          &quot;{product.painPoint}&quot;
        </p>
        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Sub-issue filter (Relationship only) */}
      {isRelationship && relProduct && relProduct.subIssues.length > 0 && (
        <RelationshipSubIssueFilter
          subIssues={relProduct.subIssues}
          activeId={activeSubIssue}
          onSelect={setActiveSubIssue}
        />
      )}

      {/* Pricing Tier Selector */}
      <PricingTierSelector
        pricing={product.pricing}
        selectedTier={selectedTier}
        onSelect={setSelectedTier}
      />

      {/* Footer */}
      <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
        {product.users && (
          <div className="flex items-center gap-1.5 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs font-bold text-slate-500">{product.users} Peserta</span>
            {product.duration && (
              <>
                <span className="text-slate-200">•</span>
                <span className="text-xs font-medium text-slate-400">{product.duration}</span>
              </>
            )}
          </div>
        )}
        <Link
          href={detailHref}
          className="w-full h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-colors shadow-lg shadow-primary-100"
        >
          Lihat Detail <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
