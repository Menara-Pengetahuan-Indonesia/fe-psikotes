'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Package,
  Search,
  Clock,
  FileText,
  Plus,
  Hexagon,
  Diamond,
  ArrowRight,
  Layers,
  Brain,
  Heart,
  Users,
  GraduationCap,
  Shield,
  Lightbulb,
  Target,
  Compass,
  Smile,
  Activity,
  BookOpen,
  Briefcase,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'
import { publicPackageService } from '@/features/admin/services'
import type { Package as PackageType } from '@/features/admin/types'

type TabType = 'gratis' | 'premium'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const cardThemes = [
  { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconHover: 'group-hover:bg-indigo-600', border: 'hover:border-indigo-500', shadow: 'hover:shadow-indigo-900/10', titleHover: 'group-hover:text-indigo-700', glow: 'bg-indigo-400', aura: 'bg-indigo-50', borderColor: 'border-indigo-100' },
  { iconBg: 'bg-primary-50', iconColor: 'text-primary-600', iconHover: 'group-hover:bg-primary-600', border: 'hover:border-primary-500', shadow: 'hover:shadow-primary-900/10', titleHover: 'group-hover:text-primary-700', glow: 'bg-primary-400', aura: 'bg-primary-50', borderColor: 'border-primary-100' },
  { iconBg: 'bg-violet-50', iconColor: 'text-violet-600', iconHover: 'group-hover:bg-violet-600', border: 'hover:border-violet-500', shadow: 'hover:shadow-violet-900/10', titleHover: 'group-hover:text-violet-700', glow: 'bg-violet-400', aura: 'bg-violet-50', borderColor: 'border-violet-100' },
  { iconBg: 'bg-rose-50', iconColor: 'text-rose-600', iconHover: 'group-hover:bg-rose-600', border: 'hover:border-rose-500', shadow: 'hover:shadow-rose-900/10', titleHover: 'group-hover:text-rose-700', glow: 'bg-rose-400', aura: 'bg-rose-50', borderColor: 'border-rose-100' },
  { iconBg: 'bg-accent-50', iconColor: 'text-accent-600', iconHover: 'group-hover:bg-accent-600', border: 'hover:border-accent-500', shadow: 'hover:shadow-accent-900/10', titleHover: 'group-hover:text-accent-700', glow: 'bg-accent-400', aura: 'bg-accent-50', borderColor: 'border-accent-100' },
  { iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', iconHover: 'group-hover:bg-cyan-600', border: 'hover:border-cyan-500', shadow: 'hover:shadow-cyan-900/10', titleHover: 'group-hover:text-cyan-700', glow: 'bg-cyan-400', aura: 'bg-cyan-50', borderColor: 'border-cyan-100' },
]

const DUMMY_CATEGORIES = [
  { label: 'Kepribadian', icon: Smile, bg: 'bg-rose-50', color: 'text-rose-500' },
  { label: 'Kecerdasan', icon: Brain, bg: 'bg-indigo-50', color: 'text-indigo-500' },
  { label: 'Minat & Bakat', icon: Compass, bg: 'bg-amber-50', color: 'text-amber-500' },
  { label: 'Kesehatan Mental', icon: Heart, bg: 'bg-pink-50', color: 'text-pink-500' },
  { label: 'Rekrutmen', icon: Briefcase, bg: 'bg-teal-50', color: 'text-teal-500' },
  { label: 'Kepemimpinan', icon: Shield, bg: 'bg-violet-50', color: 'text-violet-500' },
  { label: 'Akademik', icon: GraduationCap, bg: 'bg-sky-50', color: 'text-sky-500' },
  { label: 'Kreativitas', icon: Lightbulb, bg: 'bg-yellow-50', color: 'text-yellow-500' },
  { label: 'Kerja Tim', icon: Users, bg: 'bg-emerald-50', color: 'text-emerald-500' },
  { label: 'Motivasi', icon: Target, bg: 'bg-orange-50', color: 'text-orange-500' },
  { label: 'Stres & Coping', icon: Activity, bg: 'bg-red-50', color: 'text-red-500' },
  { label: 'Karir', icon: BookOpen, bg: 'bg-cyan-50', color: 'text-cyan-500' },
]

export default function JenisTesPage() {
  const [tab, setTab] = useState<TabType>('gratis')
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState<string | null>(null)
  const [packages, setPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)
  const packagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    publicPackageService.getAll().then((data) => {
      setPackages(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = packages.filter((p) => {
    const matchesTab = tab === 'gratis' ? p.price === 0 : p.price > 0
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    const matchesKategori = !kategori || p.name.toLowerCase().includes(kategori.toLowerCase())
    return matchesTab && matchesSearch && matchesKategori
  })

  const gratisCount = packages.filter((p) => p.price === 0).length
  const premiumCount = packages.filter((p) => p.price > 0).length

  return (
    <div className="bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden text-white bg-linear-to-b from-primary-800 via-primary-700 to-primary-500 pt-28 pb-14 md:pt-36 md:pb-20">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: TOPO_WHITE, backgroundSize: TOPO_BG_SIZE }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-primary-900/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary-300/20 rounded-full blur-[80px] pointer-events-none" />

        <Plus className="absolute top-[15%] left-[10%] text-primary-300/30 w-8 h-8" />
        <Hexagon className="absolute top-[40%] right-[10%] text-white/5 w-24 h-24 -rotate-12" />
        <Diamond className="absolute bottom-[10%] left-[20%] text-accent-400/20 w-16 h-16 rotate-12" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-700/50 border border-primary-400/30 shadow-lg backdrop-blur-md mb-8 mx-auto">
            <Layers className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-primary-50 uppercase">
              Katalog
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 drop-shadow-2xl">
            Jenis Tes<br />
            <span className="text-accent-300">Psikotes</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-50/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            Pilih paket tes yang sesuai dengan kebutuhanmu. Tersedia paket gratis dan premium.
          </p>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1 gap-1">
              <button
                onClick={() => setTab('gratis')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all',
                  tab === 'gratis' ? 'bg-white text-slate-900 shadow-sm' : 'text-primary-100 hover:text-white'
                )}
              >
                Gratis <span className="ml-1 text-slate-400">{gratisCount}</span>
              </button>
              <button
                onClick={() => setTab('premium')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all',
                  tab === 'premium' ? 'bg-white text-slate-900 shadow-sm' : 'text-primary-100 hover:text-white'
                )}
              >
                Premium <span className="ml-1 text-slate-400">{premiumCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Packages */}
      <section className="py-14 px-6 relative z-10" ref={packagesRef}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search + active filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Cari paket tes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-500/10"
              />
            </div>
            {kategori && (
              <button
                onClick={() => setKategori(null)}
                className="inline-flex items-center gap-2 px-4 h-11 bg-primary-50 text-primary-700 rounded-xl text-sm font-bold border border-primary-100 hover:bg-primary-100 transition-colors shrink-0"
              >
                {kategori}
                <span className="text-primary-400">&times;</span>
              </button>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2rem]" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
              <div className="size-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                <Package className="size-8 text-primary-400" />
              </div>
              <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
              <p className="text-slate-400 font-medium text-sm">Coba ubah kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((pkg, index) => {
                const theme = cardThemes[index % cardThemes.length]
                const isFree = pkg.price === 0
                const testsCount = pkg.tests?.length ?? 0
                const badge = String(index + 1).padStart(2, '0')

                return (
                  <Link
                    key={pkg.id}
                    href={`/jenis-tes/${pkg.id}`}
                    className={cn(
                      'group relative flex flex-col p-1 transition-all duration-500 overflow-hidden',
                      'bg-white border border-slate-200 hover:shadow-2xl hover:-translate-y-1.5',
                      'rounded-[2.5rem] shadow-sm',
                      theme.border, theme.shadow
                    )}
                  >
                    <div className={cn('absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500', theme.aura)} />

                    <div className="relative z-10 flex-1 flex flex-col px-6 pt-7 pb-0">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-3xl font-black text-slate-900">{badge}</span>
                          <span className={cn(
                            'px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full border',
                            isFree ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          )}>
                            {formatPrice(pkg.price)}
                          </span>
                        </div>
                        <div className="relative">
                          <div className={cn('absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500', theme.glow)} />
                          <div className={cn(
                            'relative w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-inner',
                            theme.iconBg, theme.iconColor, theme.iconHover,
                            'group-hover:text-white group-hover:border-transparent',
                            theme.borderColor
                          )}>
                            <Package className="w-7 h-7 stroke-2" />
                          </div>
                        </div>
                      </div>

                      <h3 className={cn('text-xl font-black text-stone-800 mb-3 leading-tight transition-colors', theme.titleHover)}>
                        {pkg.name}
                      </h3>
                      <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3 mb-6">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex-col gap-4 px-6 pt-4 pb-7">
                      <div className="w-full grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
                          <FileText className="w-3.5 h-3.5 text-primary-500" /> <span>{testsCount} Tes</span>
                        </div>
                        {pkg.estimatedDuration && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
                            <Clock className="w-3.5 h-3.5 text-sky-500" /> <span>{pkg.estimatedDuration}m</span>
                          </div>
                        )}
                      </div>

                      <div className="w-full py-3.5 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-200 flex items-center justify-center gap-2 transition-all group-hover:bg-primary-700">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Tes Berdasarkan Kategori */}
      <section className="pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-[0.3em]">
                <Layers className="w-3 h-3" />
                Categories
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Tes Berdasarkan{' '}
                <span className="text-primary-600">Kategori</span>
              </h2>
            </div>
            <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {DUMMY_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setKategori(kategori === cat.label ? null : cat.label)
                  packagesRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all cursor-pointer',
                  kategori === cat.label
                    ? 'bg-primary-50 border-primary-200 shadow-md -translate-y-1'
                    : 'bg-white border-slate-100 hover:shadow-lg hover:-translate-y-1'
                )}
              >
                <div className={cn('size-16 rounded-2xl flex items-center justify-center transition-colors', cat.bg)}>
                  <cat.icon className={cn('size-8', cat.color)} />
                </div>
                <span className={cn(
                  'text-xs font-black text-center uppercase tracking-wide transition-colors',
                  kategori === cat.label ? 'text-primary-700' : 'text-slate-700 group-hover:text-primary-600'
                )}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
