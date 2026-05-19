'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Award,
  Calendar,
  Brain,
  CheckCircle2,
  FileText,
  TrendingUp,
  Sparkles,
  Search,
  SortDesc,
  SortAsc,
  ChevronDown,
  ChevronUp,
  Clock,
  UserCheck,
  ClipboardList,
  Package,
  Filter,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useMyPackages } from '@/features/psikotes/hooks/use-catalog'

interface TestHistoryItem {
  id: string
  testId: string
  testName: string
  testDescription: string | null
  completedAt: string
  totalScore: number
  totalMax: number
  percentage: number
}

type SortOrder = 'newest' | 'oldest' | 'highest' | 'lowest'

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'highest', label: 'Skor Tertinggi' },
  { value: 'lowest', label: 'Skor Terendah' },
]

const ACCENT_RING = [
  'from-primary-500 to-primary-600',
  'from-amber-400 to-amber-500',
  'from-violet-500 to-violet-600',
  'from-rose-400 to-rose-500',
  'from-teal-400 to-teal-500',
]

function StatusBadge({ status }: { status: 'published' | 'reviewing' | 'in-progress' }) {
  if (status === 'published')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        <UserCheck className="w-3 h-3" /> Laporan Tersedia
      </span>
    )
  if (status === 'reviewing')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
        <ClipboardList className="w-3 h-3" /> Menunggu Review
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <Clock className="w-3 h-3" /> Belum Selesai
    </span>
  )
}

function MiniChart({ data }: { data: number[] }) {
  if (data.length < 2) return null
  const h = 64
  const w = 100
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / 100) * h,
  }))
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--color-primary-500))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(var(--color-primary-500))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chartGrad)" />
      <path d={line} fill="none" stroke="rgb(var(--color-primary-500))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" stroke="rgb(var(--color-primary-500))" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export function TestResults() {
  const [history, setHistory] = useState<TestHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [filterPackage, setFilterPackage] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Lightweight history fetch
  useEffect(() => {
    api
      .get('/tests/history')
      .then((res) => setHistory(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Package data for status & review info (loaded in background)
  const { data: packages } = useMyPackages()

  // Map testId -> package info
  const testPackageMap = useMemo(() => {
    const map = new Map<string, { packageId: string; packageName: string; status: 'published' | 'reviewing' | 'in-progress'; interpretation?: string; level?: string }>()
    if (!packages) return map
    for (const pkg of packages) {
      const allDone = pkg.tests?.every((t) => t.session?.status === 'COMPLETED')
      const status = pkg.isPublished ? 'published' as const : allDone ? 'reviewing' as const : 'in-progress' as const
      for (const test of pkg.tests ?? []) {
        const assessment = pkg.reviewData?.assessments?.find((a) => a.testId === test.id)
        map.set(test.id, {
          packageId: pkg.id,
          packageName: pkg.name,
          status,
          interpretation: assessment?.interpretation,
          level: assessment?.level,
        })
      }
    }
    return map
  }, [packages])

  // Unique packages for filter
  const packageOptions = useMemo(() => {
    const seen = new Map<string, string>()
    for (const item of history) {
      const info = testPackageMap.get(item.testId)
      if (info && !seen.has(info.packageId)) {
        seen.set(info.packageId, info.packageName)
      }
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }))
  }, [history, testPackageMap])

  // Chart data from history percentages (chronological)
  const chartData = useMemo(() => {
    if (history.length < 2) return []
    return [...history].reverse().map((h) => h.percentage)
  }, [history])

  // Filter & sort
  const filtered = useMemo(() => {
    let result = history
    if (filterPackage !== 'all') {
      result = result.filter((t) => testPackageMap.get(t.testId)?.packageId === filterPackage)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((t) => {
        const pkgName = testPackageMap.get(t.testId)?.packageName ?? ''
        return t.testName.toLowerCase().includes(q) || pkgName.toLowerCase().includes(q)
      })
    }
    return [...result].sort((a, b) => {
      switch (sortOrder) {
        case 'newest': return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        case 'oldest': return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        case 'highest': return b.percentage - a.percentage
        case 'lowest': return a.percentage - b.percentage
      }
    })
  }, [history, filterPackage, searchQuery, sortOrder, testPackageMap])

  const avgScore = history.length
    ? Math.round(history.reduce((sum, t) => sum + t.percentage, 0) / history.length)
    : 0

  const totalPublished = useMemo(() => {
    if (!packages) return 0
    return packages.filter((p) => p.isPublished).length
  }, [packages])

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-100 animate-pulse h-48" />
        <div className="flex gap-3">
          <div className="h-11 w-64 bg-slate-100 animate-pulse rounded-2xl" />
          <div className="h-11 flex-1 bg-slate-100 animate-pulse rounded-2xl" />
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-5 px-7 py-5">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 animate-pulse rounded-lg w-2/3" />
                <div className="h-3 bg-slate-50 animate-pulse rounded-lg w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="absolute top-[-70px] right-[-50px] w-56 h-56 bg-amber-400/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-accent-400/30 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Riwayat
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Perjalanan Psikotesmu
            </h1>
            <p className="text-sm text-primary-100/90 mt-1.5">
              Timeline lengkap dari setiap tes yang telah kamu selesaikan.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-accent-400/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">{history.length}</p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">Selesai</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">{avgScore}%</p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">Rata-rata</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">{totalPublished}</p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">Laporan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      {chartData.length >= 2 && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Tren Skor</h2>
              <p className="text-[11px] text-slate-400">Perkembangan dari waktu ke waktu</p>
            </div>
          </div>
          <MiniChart data={chartData} />
        </div>
      )}

      {/* Search, Sort & Filter */}
      {history.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="flex items-center bg-white rounded-2xl border border-slate-100 p-1 gap-1 overflow-x-auto shadow-sm">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortOrder(opt.value)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1',
                    sortOrder === opt.value
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm'
                      : 'text-slate-500 hover:text-primary-700 hover:bg-primary-50',
                  )}
                >
                  {(opt.value === 'newest' || opt.value === 'highest') && <SortDesc className="w-3 h-3" />}
                  {(opt.value === 'oldest' || opt.value === 'lowest') && <SortAsc className="w-3 h-3" />}
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari nama tes atau paket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-white border-slate-100 rounded-2xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary-500/20"
              />
            </div>
          </div>

          {packageOptions.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <button
                onClick={() => setFilterPackage('all')}
                className={cn(
                  'px-3 h-8 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                  filterPackage === 'all'
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100',
                )}
              >
                Semua
              </button>
              {packageOptions.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setFilterPackage(pkg.id)}
                  className={cn(
                    'px-3 h-8 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                    filterPackage === pkg.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100',
                  )}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {history.length === 0 ? (
        <div className="relative bg-white rounded-3xl border border-primary-100/60 p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <p className="text-slate-900 font-black text-lg mb-1">Belum ada riwayat</p>
            <p className="text-slate-500 font-medium text-sm mb-6 max-w-md mx-auto">
              Selesaikan tes pertamamu untuk melihat perjalanan psikotesmu di sini.
            </p>
            <Link
              href="/pengguna/paket-saya"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Mulai Tes Sekarang
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="relative bg-white rounded-3xl border border-primary-100/60 p-12 text-center overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
            <Search className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan</p>
          <p className="text-slate-500 font-medium text-sm">Coba ubah kata kunci atau filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, index) => {
            const pkgInfo = testPackageMap.get(item.testId)
            const status = pkgInfo?.status ?? 'in-progress'
            const accent = ACCENT_RING[index % ACCENT_RING.length]
            const isExpanded = expandedItems.has(item.id)

            return (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center gap-4 md:gap-5 px-5 md:px-7 py-4 md:py-5 hover:bg-primary-50/40 transition-colors text-left"
                >
                  <div className={cn('w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm', accent)}>
                    <Brain className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-black text-slate-900 truncate">{item.testName}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {pkgInfo && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {pkgInfo.packageName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <StatusBadge status={status} />
                  </div>

                  <div className="text-sm font-black px-3 py-1.5 rounded-full border bg-primary-50 text-primary-700 border-primary-100 shrink-0">
                    {item.percentage}%
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 md:px-7 pb-5 border-t border-slate-50 pt-4 space-y-3">
                    {/* Score breakdown */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500">Skor: <strong className="text-slate-900">{item.totalScore}/{item.totalMax}</strong></span>
                      <span className="text-slate-500">Persentase: <strong className="text-slate-900">{item.percentage}%</strong></span>
                    </div>

                    {/* Status on mobile */}
                    <div className="sm:hidden">
                      <StatusBadge status={status} />
                    </div>

                    {pkgInfo?.interpretation ? (
                      <div className="space-y-3">
                        {pkgInfo.level && (
                          <span className={cn(
                            'inline-flex text-xs font-black px-3 py-1 rounded-full border',
                            pkgInfo.level.toLowerCase().includes('tinggi') || pkgInfo.level.toLowerCase() === 'sehat'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : pkgInfo.level.toLowerCase() === 'sedang' || pkgInfo.level.toLowerCase().includes('cukup') || pkgInfo.level.toLowerCase() === 'moderat'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200',
                          )}>
                            Level: {pkgInfo.level}
                          </span>
                        )}
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-2xl p-4">
                          {pkgInfo.interpretation}
                        </p>
                        <Link
                          href={`/tes/${item.testId}/result/${item.id}?from=riwayat`}
                          className="inline-flex items-center gap-2 px-4 h-9 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Lihat Laporan Lengkap
                        </Link>
                      </div>
                    ) : status === 'reviewing' ? (
                      <div className="flex items-center gap-3 bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <p className="text-sm text-amber-700 font-medium">
                          Psikolog sedang menganalisis hasil tesmu. Laporan akan tersedia setelah review selesai.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <p className="text-sm text-slate-500 font-medium">
                          Selesaikan semua tes dalam paket untuk mendapatkan laporan psikologis.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
