'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Clock,
  ArrowRight,
  Search,
  ChevronRight,
  Brain,
  Zap,
  BookMarked,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  CATEGORY_STYLE,
  DUMMY_TEST_HISTORY,
  FILTER_TABS,
  type FilterTab,
} from '@/features/dashboard/constants'

const ACCENT_RING = [
  'from-primary-500 to-primary-600 shadow-primary-200',
  'from-amber-400 to-amber-500 shadow-amber-200',
  'from-violet-500 to-violet-600 shadow-violet-200',
  'from-rose-400 to-rose-500 shadow-rose-200',
  'from-teal-400 to-teal-500 shadow-teal-200',
]

export function MyTests() {
  const [activeFilter, setActiveFilter] = React.useState<FilterTab>('semua')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filtered = DUMMY_TEST_HISTORY.filter((t) => {
    const matchesFilter = activeFilter === 'semua' || t.category === activeFilter
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const completedCount = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai').length
  const inProgressCount = DUMMY_TEST_HISTORY.filter((t) => t.status === 'berlangsung').length

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-[-70px] right-[-50px] w-56 h-56 bg-amber-400/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-accent-400/30 rounded-full blur-2xl" />

        <svg
          className="absolute top-6 right-10 w-24 h-24 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="23" />
          <circle cx="50" cy="50" r="10" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Katalog
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Tes Saya
            </h1>
            <p className="text-sm text-primary-100/90 mt-1.5">
              Kelola dan pantau progress setiap tes yang kamu ambil.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-white text-primary-700 text-sm font-bold hover:bg-amber-50 transition-colors shadow-lg shadow-primary-900/20 shrink-0 self-start md:self-auto"
          >
            <Brain className="w-4 h-4" />
            Ambil Tes Baru
          </Link>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/30 flex items-center justify-center shrink-0">
              <BookMarked className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {DUMMY_TEST_HISTORY.length}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Total
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-accent-400/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {completedCount}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Selesai
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {inProgressCount}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Berlangsung
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-2xl border border-slate-100 p-1 gap-1 overflow-x-auto shadow-sm">
          {FILTER_TABS.map((tab) => (
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
            placeholder="Cari judul tes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-2xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary-500/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="relative bg-white rounded-3xl border border-primary-100/60 p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
              <BookMarked className="w-7 h-7 text-white" />
            </div>
            <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan</p>
            <p className="text-slate-500 font-medium text-sm">
              Coba ubah filter atau kata kunci pencarian.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100 shadow-sm">
          {filtered.map((test, index) => {
            const accent = ACCENT_RING[index % ACCENT_RING.length]
            const isCompleted = test.status === 'selesai'

            return (
              <Link
                key={test.id}
                href={isCompleted ? `/pengguna/riwayat` : `/psikotes`}
                className="group flex items-center gap-4 md:gap-5 px-5 md:px-7 py-4 md:py-5 hover:bg-primary-50/40 transition-colors"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105',
                    accent,
                  )}
                >
                  <Brain className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm md:text-base font-black text-slate-900 truncate group-hover:text-primary-700 transition-colors">
                      {test.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0',
                        isCompleted
                          ? 'bg-primary-50 text-primary-700 border-primary-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100',
                      )}
                    >
                      {isCompleted ? 'Selesai' : 'Proses'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium flex-wrap">
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border',
                        CATEGORY_STYLE[test.category].bg,
                        CATEGORY_STYLE[test.category].text,
                        CATEGORY_STYLE[test.category].border,
                      )}
                    >
                      {test.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(test.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {isCompleted && (
                  <div className="hidden md:flex items-center gap-1.5 text-sm font-black text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full shrink-0">
                    <Zap className="w-3.5 h-3.5 fill-primary-600 text-primary-600" />
                    <span>{test.score}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 shrink-0">
                  {isCompleted ? (
                    <span className="hidden md:inline-flex rounded-xl h-9 px-4 font-bold text-xs bg-primary-700 text-white opacity-0 group-hover:opacity-100 transition-opacity items-center">
                      Hasil <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  ) : (
                    <span className="hidden md:inline-flex rounded-xl h-9 px-4 font-bold text-xs bg-amber-500 text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity items-center">
                      Lanjutkan <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  )}
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
