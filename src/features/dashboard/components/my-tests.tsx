'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Filter, Search, ChevronRight, Brain, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  CATEGORY_STYLE,
  DUMMY_TEST_HISTORY,
  FILTER_TABS,
  type FilterTab,
} from '@/features/dashboard/constants'

export function MyTests() {
  const [activeFilter, setActiveFilter] =
    React.useState<FilterTab>('semua')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filtered = DUMMY_TEST_HISTORY.filter((t) => {
    const matchesFilter = activeFilter === 'semua' || t.category === activeFilter
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Katalog Tes Saya
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Kelola dan pantau progress setiap tes yang Anda ambil.
          </p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <Input 
            placeholder="Cari judul tes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-primary-500/10 transition-all text-base font-medium"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                'px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300',
                activeFilter === tab.value
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test list */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 p-20 text-center">
            <div className="size-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Filter className="size-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ditemukan hasil</h3>
            <p className="text-slate-500 font-medium">Coba gunakan filter atau kata kunci pencarian yang berbeda.</p>
          </div>
        ) : (
          filtered.map((test) => (
            <div
              key={test.id}
              className="group bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex gap-6 items-center">
                  <div className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg",
                    test.status === 'selesai' ? "bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-primary-500/20" : "bg-accent-50 text-accent-500 group-hover:bg-accent-500 group-hover:text-white group-hover:shadow-accent-500/20"
                  )}>
                    <Brain className="size-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-black text-xl text-slate-900 leading-tight">
                        {test.name}
                      </h3>
                      <span className={cn(
                        'text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider border',
                        CATEGORY_STYLE[test.category].bg,
                        CATEGORY_STYLE[test.category].text,
                        CATEGORY_STYLE[test.category].border,
                      )}>
                        {test.categoryLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        Dibuat pada {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-10 bg-slate-50 lg:bg-transparent p-5 lg:p-0 rounded-2xl lg:min-w-[400px]">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      {test.status === 'selesai' ? (
                        <div className="flex items-center gap-1.5 text-primary-600 font-black">
                          <Zap className="size-4 fill-primary-600" />
                          <span>SELESAI</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-accent-600 font-black animate-pulse">
                          <Clock className="size-4" />
                          <span>PROSES</span>
                        </div>
                      )}
                    </div>
                    {test.status === 'selesai' && (
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Skor</p>
                        <p className="font-black text-2xl text-slate-900 text-center leading-none">
                          {test.score}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {test.status === 'selesai' ? (
                      <Button
                        className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                        asChild
                      >
                        <Link href="/dashboard/riwayat">
                          Hasil Detail
                          <ChevronRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="bg-accent-500 hover:bg-accent-600 text-white rounded-xl h-12 px-8 font-black shadow-lg shadow-accent-500/20 transition-all active:scale-95 group/btn"
                      >
                        LANJUTKAN
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
