'use client'

import { useMemo, useState } from 'react'
import type { ChildPackage } from '@/features/admin/types'

export type TierFilter = 'all' | 'dasar' | 'lengkap' | 'komprehensif'
export type PriceRange = 'all' | 'under100k' | '100k-500k' | '500k-1m' | 'over1m'

const PRICE_RANGES: Record<PriceRange, [number, number]> = {
  all: [0, Infinity],
  under100k: [0, 100_000],
  '100k-500k': [100_000, 500_000],
  '500k-1m': [500_000, 1_000_000],
  over1m: [1_000_000, Infinity],
}

function getLowestPrice(child: ChildPackage): number | null {
  const activeTiers = child.packageTypes?.filter(pt => pt.isActive) ?? []
  if (activeTiers.length === 0) return null
  return Math.min(...activeTiers.map(t => t.price))
}

function matchesSearch(child: ChildPackage, query: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    child.name.toLowerCase().includes(q) ||
    (child.description?.toLowerCase().includes(q) ?? false)
  )
}

function matchesTier(child: ChildPackage, tier: TierFilter): boolean {
  if (tier === 'all') return true
  const activeTiers = child.packageTypes?.filter(pt => pt.isActive) ?? []
  return activeTiers.some(pt => pt.name.toLowerCase().includes(tier))
}

function matchesPrice(child: ChildPackage, range: PriceRange): boolean {
  if (range === 'all') return true
  const lowest = getLowestPrice(child)
  if (lowest === null) return false
  const [min, max] = PRICE_RANGES[range]
  return lowest >= min && lowest < max
}

export function usePackageFilter(children: ChildPackage[]) {
  const [search, setSearch] = useState('')
  const [tier, setTier] = useState<TierFilter>('all')
  const [priceRange, setPriceRange] = useState<PriceRange>('all')

  const filtered = useMemo(() => {
    return children.filter(child =>
      matchesSearch(child, search) &&
      matchesTier(child, tier) &&
      matchesPrice(child, priceRange)
    )
  }, [children, search, tier, priceRange])

  const resetFilters = () => {
    setSearch('')
    setTier('all')
    setPriceRange('all')
  }

  const hasActiveFilters = search !== '' || tier !== 'all' || priceRange !== 'all'

  return {
    filtered,
    total: children.length,
    search,
    setSearch,
    tier,
    setTier,
    priceRange,
    setPriceRange,
    resetFilters,
    hasActiveFilters,
  }
}
