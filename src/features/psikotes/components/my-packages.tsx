'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  Inbox,
  PlayCircle,
  Clock,
  FileText,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  RotateCw,
  ChevronDown,
  UserCheck,
  ClipboardList,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useMyPackages } from '../hooks/use-catalog'

type MyPackage = NonNullable<ReturnType<typeof useMyPackages>['data']>[number]
type MyTest = NonNullable<MyPackage['tests']>[number]

const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  CHECKBOX: 'Checkbox',
  SCALE_RATING: 'Skala Rating',
  ESSAY: 'Essay',
  TRUE_FALSE: 'Benar/Salah',
}

const ACCENT_RING = [
  'from-primary-500 to-primary-600 shadow-primary-200',
  'from-amber-400 to-amber-500 shadow-amber-200',
  'from-rose-400 to-rose-500 shadow-rose-200',
  'from-violet-400 to-violet-500 shadow-violet-200',
]

type TestStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
type PackageFilter = 'semua' | 'belum_mulai' | 'berjalan' | 'selesai'

const FILTER_OPTIONS: { value: PackageFilter; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'belum_mulai', label: 'Belum Mulai' },
  { value: 'berjalan', label: 'Berjalan' },
  { value: 'selesai', label: 'Selesai' },
]

function getTestStatus(test: MyTest): TestStatus {
  return test.session?.status ?? 'NOT_STARTED'
}

function getPackageStatus(pkg: MyPackage): 'belum_mulai' | 'berjalan' | 'selesai' {
  const tests = pkg.tests ?? []
  if (tests.length === 0) return 'belum_mulai'
  const allCompleted = tests.every((t) => getTestStatus(t) === 'COMPLETED')
  if (allCompleted) return 'selesai'
  const anyStarted = tests.some((t) => getTestStatus(t) !== 'NOT_STARTED')
  if (anyStarted) return 'berjalan'
  return 'belum_mulai'
}

function StatusBadge({ status }: { status: TestStatus }) {
  if (status === 'COMPLETED') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
        <CheckCircle2 className="w-3 h-3" /> Selesai
      </span>
    )
  }
  if (status === 'IN_PROGRESS') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
        <RotateCw className="w-3 h-3" /> Berjalan
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
      Belum Mulai
    </span>
  )
}

export function MyPackages() {
  const router = useRouter()
  const { data: packages, isLoading } = useMyPackages()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<PackageFilter>('semua')

  const filtered = useMemo(() => {
    if (!packages) return []
    return packages.filter((pkg) => {
      const matchesSearch =
        !searchQuery ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.packageName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.tests ?? []).some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFilter = activeFilter === 'semua' || getPackageStatus(pkg) === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [packages, searchQuery, activeFilter])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-100 animate-pulse h-32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-100 animate-pulse rounded-lg w-2/3" />
                <div className="h-3 bg-slate-50 animate-pulse rounded-lg w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="relative bg-white rounded-3xl border border-primary-100/60 shadow-sm overflow-hidden p-10 md:p-14 text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
            <Inbox className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Belum Ada Paket</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Kamu belum memiliki paket tes. Jelajahi katalog kami untuk menemukan paket yang sesuai.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Jelajahi Katalog
          </Link>
        </div>
      </div>
    )
  }

  const handleTestAction = (test: MyTest) => {
    const status = getTestStatus(test)
    if (status === 'COMPLETED' && test.session) {
      router.push(`/tes/${test.id}/result/${test.session.id}`)
      return
    }
    router.push(`/tes/${test.id}`)
  }

  const totalTests = packages.reduce((acc, pkg) => acc + (pkg.tests?.length ?? 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 bg-amber-400/25 rounded-full blur-2xl" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-accent-400/30 rounded-full blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Koleksi Kamu
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Paket Saya
            </h1>
            <p className="text-sm text-primary-100/90 mt-1">
              {packages.length} paket dimiliki · {totalTests} tes siap dikerjakan
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-bold border border-white/20 hover:bg-white/25 transition-colors self-start md:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            Jelajahi Paket Lain
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-2xl border border-slate-100 p-1 gap-1 overflow-x-auto shadow-sm">
          {FILTER_OPTIONS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                'px-4 h-9 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap',
                activeFilter === tab.value
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm'
                  : 'text-slate-500 hover:text-primary-700 hover:bg-primary-50',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Cari paket atau tes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-2xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary-500/20"
          />
        </div>
      </div>

      {/* Empty filtered state */}
      {filtered.length === 0 && (
        <div className="relative bg-white rounded-3xl border border-primary-100/60 p-12 text-center overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan</p>
          <p className="text-slate-500 font-medium text-sm">
            Coba ubah filter atau kata kunci pencarian.
          </p>
        </div>
      )}

      {/* Package list */}
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        {filtered.map((pkg, idx) => {
          const allTypes = new Set<string>()
          let totalDuration = 0
          let totalQuestions = 0
          let completedCount = 0
          let inProgressCount = 0
          for (const t of pkg.tests ?? []) {
            t.questionTypes.forEach((qt) => allTypes.add(qt))
            totalDuration += t.totalDuration
            totalQuestions += t.totalQuestions
            const st = getTestStatus(t)
            if (st === 'COMPLETED') completedCount++
            else if (st === 'IN_PROGRESS') inProgressCount++
          }

          const hasTests = pkg.tests && pkg.tests.length > 0
          const accent = ACCENT_RING[idx % ACCENT_RING.length]
          const isExpanded = expandedId === pkg.id
          const progressPct = hasTests
            ? Math.round((completedCount / (pkg.tests?.length ?? 1)) * 100)
            : 0
          const allCompleted = hasTests && completedCount === (pkg.tests?.length ?? 0)
          const isReviewed = !!pkg.reviewedAt
          const isPublished = !!pkg.isPublished

          return (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />

              <div className="relative p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-sm shrink-0`}
                  >
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 leading-tight truncate">{pkg.name}</h3>
                    {pkg.packageName && (
                      <p className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
                        {pkg.packageName}
                        {pkg.childPackageName ? ` · ${pkg.childPackageName}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                {pkg.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {pkg.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {totalQuestions > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <FileText className="w-3 h-3 text-primary-600" />
                      {totalQuestions} soal
                    </span>
                  )}
                  {totalDuration > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-primary-600" />
                      {totalDuration} menit
                    </span>
                  )}
                  {Array.from(allTypes)
                    .slice(0, 2)
                    .map((qt) => (
                      <span
                        key={qt}
                        className="text-[11px] font-bold text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-lg"
                      >
                        {TYPE_LABELS[qt] ?? qt}
                      </span>
                    ))}
                  {allTypes.size > 2 && (
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      +{allTypes.size - 2}
                    </span>
                  )}
                </div>

                {hasTests && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-500">Progress tes</span>
                      <span className="text-[11px] font-black text-slate-700">
                        {completedCount}/{pkg.tests?.length ?? 0}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    {inProgressCount > 0 && (
                      <p className="text-[11px] text-amber-700 font-semibold mt-1.5 inline-flex items-center gap-1">
                        <RotateCw className="w-3 h-3" /> {inProgressCount} tes sedang dikerjakan
                      </p>
                    )}
                  </div>
                )}

                {allCompleted && (
                  <div className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl mb-4 text-xs font-bold',
                    isPublished
                      ? 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                      : isReviewed
                        ? 'bg-primary-50 border border-primary-100 text-primary-700'
                        : 'bg-amber-50 border border-amber-100 text-amber-700',
                  )}>
                    {isPublished ? (
                      <><UserCheck className="w-3.5 h-3.5 shrink-0" /> Laporan psikologis tersedia</>
                    ) : isReviewed ? (
                      <><ClipboardList className="w-3.5 h-3.5 shrink-0" /> Sedang diproses psikolog</>
                    ) : (
                      <><ClipboardList className="w-3.5 h-3.5 shrink-0" /> Menunggu review psikolog</>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-dashed border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Dibeli{' '}
                    {new Date(pkg.purchasedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    {isPublished && (() => {
                      const firstCompleted = pkg.tests?.find((t) => t.session?.status === 'COMPLETED')
                      if (!firstCompleted?.session) return null
                      return (
                        <button
                          onClick={() => router.push(`/tes/${firstCompleted.id}/result/${firstCompleted.session!.id}`)}
                          className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
                        >
                          <UserCheck className="w-4 h-4" />
                          Lihat Laporan
                        </button>
                      )
                    })()}
                    {hasTests ? (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                        className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
                      >
                        {isExpanded ? 'Sembunyikan' : 'Lihat Tes'}
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            isExpanded && 'rotate-180',
                          )}
                        />
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
                        Segera hadir
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && hasTests && (
                <div className="relative border-t border-slate-100 bg-slate-50/50 p-4 md:p-5 space-y-2.5">
                  {pkg.tests?.map((test) => {
                    const status = getTestStatus(test)
                    const isCompleted = status === 'COMPLETED'
                    const isInProgress = status === 'IN_PROGRESS'

                    return (
                      <div
                        key={test.id}
                        className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-primary-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1.5">
                            <h4 className="font-bold text-sm text-slate-900 leading-snug flex-1">
                              {test.name}
                            </h4>
                            <StatusBadge status={status} />
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                              <FileText className="w-3 h-3 text-primary-500" />
                              {test.totalQuestions} soal
                            </span>
                            {test.totalDuration > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                <Clock className="w-3 h-3 text-primary-500" />
                                {test.totalDuration} mnt
                              </span>
                            )}
                            {isCompleted && test.session?.completedAt && (
                              <span className="inline-flex items-center text-[10px] font-medium text-slate-500 px-1">
                                Selesai{' '}
                                {new Date(test.session.completedAt).toLocaleDateString(
                                  'id-ID',
                                  { day: 'numeric', month: 'short' },
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {!isCompleted && (
                          <button
                            onClick={() => handleTestAction(test)}
                            className={cn(
                              'inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl text-white text-sm font-bold transition-all shadow-sm whitespace-nowrap',
                              isInProgress
                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'
                                : 'bg-primary-600 hover:bg-primary-700 shadow-primary-100',
                            )}
                          >
                            {isInProgress ? (
                              <RotateCw className="w-4 h-4" />
                            ) : (
                              <PlayCircle className="w-4 h-4" />
                            )}
                            {isInProgress ? 'Lanjut' : 'Mulai'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
