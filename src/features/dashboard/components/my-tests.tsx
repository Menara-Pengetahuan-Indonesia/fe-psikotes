'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Search, ChevronRight, Brain, Zap, BookMarked, CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  CATEGORY_STYLE,
  DUMMY_TEST_HISTORY,
  FILTER_TABS,
  type FilterTab,
} from '@/features/dashboard/constants'

const accentColors = [
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-teal-400 to-teal-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-violet-400 to-violet-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-rose-400 to-rose-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-amber-400 to-amber-500', text: 'text-white' },
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-violet-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Katalog
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Tes Saya.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Kelola dan pantau progress setiap tes yang Anda ambil.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/psikotes">
              <Brain className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Ambil Tes Baru
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <BookMarked className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{DUMMY_TEST_HISTORY.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{completedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Clock className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{inProgressCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Berlangsung</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <BookMarked className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1 overflow-x-auto no-scrollbar">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
                activeFilter === tab.value
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari judul tes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
            <BookMarked className="size-8 text-violet-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((test, index) => {
            const accent = accentColors[index % accentColors.length]
            const isCompleted = test.status === 'selesai'

            return (
              <Link
                key={test.id}
                href={isCompleted ? `/pengguna/riwayat/${test.id}` : `/psikotes`}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Icon */}
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <Brain className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">
                      {test.name}
                    </h3>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      isCompleted ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                    )}>
                      {isCompleted ? 'Selesai' : 'Proses'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border',
                      CATEGORY_STYLE[test.category].bg,
                      CATEGORY_STYLE[test.category].text,
                      CATEGORY_STYLE[test.category].border,
                    )}>
                      {test.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Score */}
                {isCompleted && (
                  <div className="hidden md:flex items-center gap-1.5 text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full shrink-0">
                    <Zap className="size-3.5 fill-indigo-600" />
                    <span>{test.score}</span>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center gap-2 shrink-0">
                  {isCompleted ? (
                    <span className="rounded-xl h-9 px-4 font-bold text-xs bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-all inline-flex items-center">
                      Hasil <ChevronRight className="size-3.5 ml-1" />
                    </span>
                  ) : (
                    <span className="rounded-xl h-9 px-4 font-bold text-xs bg-amber-500 text-white opacity-0 group-hover:opacity-100 transition-all inline-flex items-center">
                      Lanjutkan <ArrowRight className="size-3.5 ml-1" />
                    </span>
                  )}
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
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
