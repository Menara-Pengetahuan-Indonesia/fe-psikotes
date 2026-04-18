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
    <div className="grid grid-cols-3 gap-1.5">
      {pricing.map((p) => (
        <button
          key={p.tier}
          onClick={() => onSelect(p.tier)}
          className={cn(
            'flex flex-col gap-1 p-2 rounded-2xl border-2 transition-colors duration-200 text-left min-w-0',
            selectedTier === p.tier
              ? 'border-emerald-400 bg-emerald-50 shadow-sm scale-[1.02]'
              : 'border-gray-100 bg-white hover:border-gray-200 opacity-60 hover:opacity-100'
          )}
        >
          <span className={cn(
            'text-[9px] font-black uppercase tracking-wide truncate',
            selectedTier === p.tier ? 'text-emerald-600' : 'text-slate-400'
          )}>
            {p.label}
          </span>
          <span className={cn(
            'text-[13px] font-black tracking-tight whitespace-nowrap',
            selectedTier === p.tier ? 'text-slate-900' : 'text-slate-400'
          )}>
            {p.priceLabel}
          </span>
          <span className={cn(
            'text-[10px] font-medium leading-tight break-words',
            selectedTier === p.tier ? 'text-slate-500' : 'text-slate-300'
          )}>
            {p.coverage}
          </span>
        </button>
      ))}
    </div>
  )
}
