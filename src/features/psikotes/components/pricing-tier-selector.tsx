'use client'

import { cn } from '@/lib/utils'
import type { TierPricing, ProductTier } from '../types'

interface PricingTierSelectorProps {
  pricing: TierPricing[]
  selectedTier: ProductTier
  onSelect: (tier: ProductTier) => void
}

export function PricingTierSelector({
  pricing,
  selectedTier,
  onSelect,
}: PricingTierSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {pricing.map((p) => (
        <button
          key={p.tier}
          onClick={() => onSelect(p.tier)}
          className={cn(
            'flex flex-col gap-1 p-3 rounded-2xl border-2 transition-all duration-200 text-left',
            selectedTier === p.tier
              ? 'border-primary-500 bg-primary-50 shadow-md scale-[1.02]'
              : 'border-slate-100 bg-white hover:border-slate-200 opacity-70 hover:opacity-100'
          )}
        >
          <span className={cn(
            'text-[10px] font-black uppercase tracking-widest',
            selectedTier === p.tier ? 'text-primary-600' : 'text-slate-400'
          )}>
            {p.label}
          </span>
          <span className={cn(
            'text-base font-black tracking-tight',
            selectedTier === p.tier ? 'text-slate-900' : 'text-slate-400'
          )}>
            {p.priceLabel}
          </span>
          <span className={cn(
            'text-[10px] font-medium leading-tight',
            selectedTier === p.tier ? 'text-slate-500' : 'text-slate-300'
          )}>
            {p.coverage}
          </span>
        </button>
      ))}
    </div>
  )
}
