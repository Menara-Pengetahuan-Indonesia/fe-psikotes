'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  ChevronRight,
  Users,
  CheckCircle2,
  Eye,
  Calendar,
  User,
  FileBarChart,
  ClipboardList,
  UserCheck,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Package,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'

interface UserPackageItem {
  id: string
  user: { id: string; firstName: string; lastName: string; email: string }
  packageType: {
    id: string
    name: string
    childPackage: {
      id: string
      name: string
      package: { id: string; name: string }
    }
  }
  purchasedAt: string
  reviewNotes: string | null
  reviewedAt: string | null
  reviewedBy: string | null
  isPublished: boolean
  allCompleted: boolean
  anyCompleted: boolean
  lastCompletedAt: string | null
  tests: {
    id: string
    name: string
    session: { id: string; status: string; completedAt: string | null } | null
  }[]
}

type FilterType = 'all' | 'pending' | 'reviewed'

function formatDate(d: string | null) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const accentColors = [
  'bg-gradient-to-br from-primary-400 to-primary-500',
  'bg-gradient-to-br from-violet-400 to-violet-500',
  'bg-gradient-to-br from-rose-400 to-rose-500',
  'bg-gradient-to-br from-teal-400 to-teal-500',
]

export default function AdminResultsPage() {
  const router = useRouter()
  const [items, setItems] = useState<UserPackageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const fetchItems = useCallback(async (q?: string, reviewed?: string) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (q) params.set('search', q)
      if (reviewed) params.set('reviewed', reviewed)
      const res = await api.get(`/admin/sessions?${params.toString()}`)
      setItems(res.data.data ?? [])
    } catch {
      setError('Gagal memuat data. Coba refresh.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const reviewed =
      filter === 'reviewed' ? 'true' : filter === 'pending' ? 'false' : undefined
    fetchItems(search || undefined, reviewed)
  }, [filter, search, fetchItems])

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const reviewedCount = items.filter((i) => i.reviewedAt).length
  const pendingCount = items.filter((i) => !i.reviewedAt).length

  const filtered =
    filter === 'all'
      ? items
      : filter === 'reviewed'
        ? items.filter((i) => i.reviewedAt)
        : items.filter((i) => !i.reviewedAt)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 md:p-10 text-white shadow-lg shadow-primary-200/40">
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}
        />
        {/* blur orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-56 h-56 bg-primary-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-primary-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Laporan
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Hasil Peserta.
            </h1>
            <p className="text-primary-100/90 font-medium text-sm">
              Review hasil per paket — satu catatan psikolog untuk semua tes dalam paket.
            </p>
          </div>
          <button
            onClick={() => fetchItems(search || undefined, filter === 'reviewed' ? 'true' : filter === 'pending' ? 'false' : undefined)}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="size-10 rounded-xl bg-primary-500/30 flex items-center justify-center">
              <Users className="size-5 text-primary-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{items.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Paket</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="size-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
              <ClipboardList className="size-5 text-amber-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{pendingCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Perlu Review</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="size-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{reviewedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sudah Direview</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {(
            [
              { key: 'all', label: 'Semua', count: items.length },
              { key: 'pending', label: 'Perlu Review', count: pendingCount },
              { key: 'reviewed', label: 'Sudah Direview', count: reviewedCount },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50',
              )}
            >
              {f.label}{' '}
              <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari nama, email, atau nama paket..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-16 flex flex-col items-center gap-4">
          <Loader2 className="size-8 text-primary-400 animate-spin" />
          <p className="text-sm font-bold text-slate-400">Memuat data...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-3xl border border-rose-100 p-16 flex flex-col items-center gap-4">
          <div className="size-14 rounded-2xl bg-rose-50 flex items-center justify-center">
            <AlertTriangle className="size-7 text-rose-400" />
          </div>
          <p className="text-sm font-bold text-slate-500">{error}</p>
          <button
            onClick={() => fetchItems()}
            className="h-10 px-5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
            <Users className="size-8 text-primary-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-primary-100/90 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((item, index) => {
            const isReviewed = !!item.reviewedAt
            const isPublished = item.isPublished
            const accent = accentColors[index % accentColors.length]
            const fullName = `${item.user.firstName} ${item.user.lastName}`
            const completedTests = item.tests.filter((t) => t.session?.status === 'COMPLETED').length

            return (
              <div
                key={item.id}
                onClick={() => router.push(`/admin/results/${item.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md text-white', accent)}>
                  <User className="size-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                      {fullName}
                    </h3>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      isPublished ? 'bg-emerald-50 text-emerald-600' : isReviewed ? 'bg-primary-50 text-primary-600' : 'bg-amber-50 text-amber-600',
                    )}>
                      {isPublished ? 'Published' : isReviewed ? 'Draft' : 'Perlu Review'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{item.user.email}</p>
                </div>

                <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full shrink-0">
                  <Package className="size-3.5" />
                  <span className="truncate max-w-[200px]">
                    {item.packageType.childPackage.package.name} › {item.packageType.childPackage.name} › {item.packageType.name}
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <FileBarChart className="size-3.5" />
                    <span>{completedTests}/{item.tests.length} tes selesai</span>
                  </div>
                  {isReviewed ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <UserCheck className="size-3.5" />
                      <span>{item.reviewedBy ?? 'Admin'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Calendar className="size-3.5" />
                      <span>{formatDate(item.lastCompletedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="size-9 rounded-xl bg-white text-primary-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-50 hover:border-primary-200 hover:text-primary-500">
                    <Eye className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
