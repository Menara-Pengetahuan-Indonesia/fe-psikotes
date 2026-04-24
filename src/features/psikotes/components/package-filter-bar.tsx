'use client'

import { useEffect, useState } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TierFilter, PriceRange } from '../hooks/use-package-filter'

const TIER_OPTIONS: { value: TierFilter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'dasar', label: 'Dasar' },
  { value: 'lengkap', label: 'Lengkap' },
  { value: 'komprehensif', label: 'Komprehensif' },
]

const PRICE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'Semua Harga' },
  { value: 'under100k', label: '< Rp100rb' },
  { value: '100k-500k', label: 'Rp100rb – 500rb' },
  { value: '500k-1m', label: 'Rp500rb – 1jt' },
  { value: 'over1m', label: '> Rp1jt' },
]

interface PackageFilterBarProps {
  search: string
  onSearchChange: (v: string) => void
  tier: TierFilter
  onTierChange: (v: TierFilter) => void
  priceRange: PriceRange
  onPriceRangeChange: (v: PriceRange) => void
  onReset: () => void
  hasActiveFilters: boolean
  resultCount: number
  totalCount: number
  activeChipClass?: string
}

const DEFAULT_CHIP = 'bg-primary-600 text-white shadow-sm'

export function PackageFilterBar({
  search,
  onSearchChange,
  tier,
  onTierChange,
  priceRange,
  onPriceRangeChange,
  onReset,
  hasActiveFilters,
  resultCount,
  totalCount,
  activeChipClass = DEFAULT_CHIP,
}: PackageFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(localSearch), 300)
    return () => clearTimeout(timer)
  }, [localSearch, onSearchChange])

  useEffect(() => {
    setLocalSearch(search)
  }, [search])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Cari paket tes..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all"
          />
          {localSearch && (
            <button
              onClick={() => { setLocalSearch(''); onSearchChange('') }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>

        <select
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
          className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all cursor-pointer"
        >
          {PRICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all flex items-center gap-2 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
        {TIER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onTierChange(opt.value)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all',
              tier === opt.value
                ? activeChipClass
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {opt.label}
          </button>
        ))}

        <span className="ml-auto text-xs font-medium text-slate-400">
          Menampilkan {resultCount} dari {totalCount} paket
        </span>
      </div>
    </div>
  )
}
