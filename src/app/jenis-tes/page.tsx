'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Package,
  Search,
  Clock,
  FileText,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { publicPackageService } from '@/features/admin/services'
import type { Package as PackageType } from '@/features/admin/types'

type TabType = 'gratis' | 'premium'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const cardColors = [
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
  'from-violet-400 to-violet-500',
  'from-rose-400 to-rose-500',
  'from-amber-400 to-amber-500',
  'from-cyan-400 to-cyan-500',
]

export default function JenisTesPage() {
  const [tab, setTab] = useState<TabType>('gratis')
  const [search, setSearch] = useState('')
  const [packages, setPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicPackageService.getAll().then((data) => {
      setPackages(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = packages.filter((p) => {
    const matchesTab = tab === 'gratis' ? p.price === 0 : p.price > 0
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const gratisCount = packages.filter((p) => p.price === 0).length
  const premiumCount = packages.filter((p) => p.price > 0).length

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-8 pb-10 md:pt-10 md:pb-12 text-white">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-3">Katalog</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Jenis Tes Psikotes</h1>
            <p className="text-slate-400 font-medium text-sm max-w-lg mx-auto">
              Pilih paket tes yang sesuai dengan kebutuhanmu. Tersedia paket gratis dan premium.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1 gap-1">
              <button
                onClick={() => setTab('gratis')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all',
                  tab === 'gratis' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
                )}
              >
                Gratis <span className="ml-1 text-slate-400">{gratisCount}</span>
              </button>
              <button
                onClick={() => setTab('premium')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all',
                  tab === 'premium' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
                )}
              >
                Premium <span className="ml-1 text-slate-400">{premiumCount}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Brain className="size-[400px]" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari paket tes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2rem]" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
              <Package className="size-8 text-indigo-400" />
            </div>
            <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
            <p className="text-slate-400 font-medium text-sm">Coba ubah kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pkg, index) => {
              const color = cardColors[index % cardColors.length]
              const isFree = pkg.price === 0
              const testsCount = pkg.tests?.length ?? 0

              return (
                <Link
                  key={pkg.id}
                  href={`/jenis-tes/${pkg.id}`}
                  className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {/* Top color bar */}
                  <div className={cn('h-2 bg-gradient-to-r', color)} />

                  <div className="p-6">
                    {/* Icon + Price badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white', color)}>
                        <Package className="size-5" />
                      </div>
                      <span className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                        isFree ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                      )}>
                        {formatPrice(pkg.price)}
                      </span>
                    </div>

                    {/* Title + Desc */}
                    <h3 className="text-base font-black text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-4">
                      {pkg.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                        <FileText className="size-3" />
                        <span>{testsCount} tes</span>
                      </div>
                      {pkg.estimatedDuration && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                          <Clock className="size-3" />
                          <span>{pkg.estimatedDuration}m</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <span>Lihat Detail</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
