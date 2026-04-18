'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  FileText,
  Clock,
  Play,
  Shield,
  Award,
  Plus,
  Hexagon,
  Diamond,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'
import { publicPackageService } from '@/features/admin/services'
import type { PublicPackage } from '@/features/admin/types'

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

const popularityLabel: Record<string, string> = {
  COMMON: 'Umum',
  LESS_COMMON: 'Kurang Umum',
  UNCOMMON: 'Tidak Umum',
}

type TestItem = {
  id: string
  name: string
  description?: string
  duration?: number
  originalYear?: number
  adaptationYear?: number
  precisionLevel?: number
  popularity?: string
  questions?: unknown[]
}

export default function PackageDetailPublicPage() {
  const params = useParams()
  const router = useRouter()
  const [pkg, setPkg] = useState<PublicPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const id = params.packageId as string
    publicPackageService.getById(id).then((data) => {
      setPkg(data)
      setLoading(false)
    }).catch(() => { setNotFound(true); setLoading(false) })
  }, [params.packageId])

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="h-72 bg-primary-700 animate-pulse" />
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2.5rem]" />)}
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !pkg) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Paket tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID paket tidak valid.</p>
          <Button onClick={() => router.push('/jenis-tes')} className="rounded-2xl h-12 px-8 font-black bg-primary-600 hover:bg-primary-700">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isFree = pkg.price === 0
  const tests = (pkg.tests ?? []).sort((a, b) => a.order - b.order)
  const firstTest = tests[0]

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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            href="/jenis-tes"
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors mb-10 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Jenis Tes</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-700/50 border border-primary-400/30 shadow-lg backdrop-blur-md mb-6">
            <Layers className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-primary-50 uppercase">
              Paket Tes
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4 drop-shadow-2xl">
            {pkg.name}
          </h1>
          <p className="text-lg text-primary-50/70 max-w-2xl font-medium leading-relaxed mb-8">
            {pkg.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
              <FileText className="size-4 text-accent-300" />
              <span className="text-sm font-bold">{tests.length} Tes</span>
            </div>
            {pkg.estimatedDuration && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Clock className="size-4 text-accent-300" />
                <span className="text-sm font-bold">{pkg.estimatedDuration} Menit</span>
              </div>
            )}
            <span className={cn(
              'px-4 py-3 rounded-2xl text-sm font-black uppercase tracking-wider',
              isFree ? 'bg-teal-500/20 text-teal-200' : 'bg-amber-500/20 text-amber-200'
            )}>
              {formatPrice(pkg.price)}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-[0.3em]">
                <FileText className="w-3 h-3" />
                Tes dalam Paket
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {tests.length} Tes{' '}
                <span className="text-primary-600 relative">
                  Tersedia
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-300/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="text-slate-500 font-medium text-sm max-w-md">
                Klik salah satu tes untuk memulai, atau mulai dari awal secara berurutan.
              </p>
            </div>
            <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
            <Button
              size="lg"
              className="h-14 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-primary-200 transition-colors active:scale-95 shrink-0"
              onClick={() => {
                if (firstTest?.test) router.push(`/tes/${(firstTest.test as { id: string }).id}`)
              }}
              disabled={tests.length === 0}
            >
              <Play className="size-4 mr-2 fill-current" />
              Mulai dari Awal
            </Button>
          </div>

          {/* Test cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((pt, index) => {
              const test = pt.test as TestItem | undefined
              if (!test) return null
              const theme = cardThemes[index % cardThemes.length]
              const badge = String(pt.order).padStart(2, '0')

              return (
                <div
                  key={pt.id}
                  className={cn(
                    'group relative flex flex-col p-1 transition-colors duration-300 overflow-hidden',
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
                        <span className="px-3 py-1 bg-stone-50 text-[9px] font-black uppercase tracking-wider text-stone-400 rounded-full border border-stone-100">
                          Tes
                        </span>
                      </div>
                      <div className="relative">
                        <div className={cn('absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500', theme.glow)} />
                        <div className={cn(
                          'relative w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors duration-300 shadow-inner',
                          theme.iconBg, theme.iconColor, theme.iconHover,
                          'group-hover:text-white group-hover:border-transparent',
                          theme.borderColor
                        )}>
                          <FileText className="w-7 h-7 stroke-2" />
                        </div>
                      </div>
                    </div>

                    <h3 className={cn('text-xl font-black text-stone-800 mb-3 leading-tight transition-colors', theme.titleHover)}>
                      {test.name}
                    </h3>
                    <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3 mb-4">
                      {test.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {test.duration && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                          <Clock className="size-3" /><span>{test.duration}m</span>
                        </div>
                      )}
                      {test.precisionLevel && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                          <Shield className="size-3" /><span>Presisi {test.precisionLevel}%</span>
                        </div>
                      )}
                      {test.popularity && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                          <Award className="size-3" /><span>{popularityLabel[test.popularity] ?? test.popularity}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 px-6 pt-4 pb-7">
                    <button
                      onClick={() => router.push(`/tes/${test.id}`)}
                      className="w-full py-3.5 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-200 flex items-center justify-center gap-2 transition-colors group-hover:bg-primary-700"
                    >
                      Mulai Tes
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
