'use client'

import Link from 'next/link'
import {
  FileText,
  CalendarDays,
  TrendingUp,
  Brain,
  MessageCircle,
  BookOpen,
  Star,
  Target,
  ChevronRight,
  History
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useAuthStoreHydrated } from '@/store/auth.store'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { useState, useEffect } from 'react'

export function DashboardOverview() {
  const { user } = useAuthStoreHydrated()
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])
  const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')
  const recentTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai').slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <p className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Workspace</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Halo, {user?.name?.split(' ')[0] || 'Pengguna'}.</h1>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <CalendarDays className="size-4" />
          <span className="text-xs font-bold">{dateStr}</span>
        </div>
      </div>

      {/* MAIN BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-12 text-white shadow-2xl group transition-all hover:shadow-primary-500/10">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="size-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-lg">
                  <Brain className="size-7" />
                </div>
                <h2 className="text-4xl font-black tracking-tight leading-[1.1]">
                  Ukur Potensimu <br />
                  Sekarang Juga.
                </h2>
                <p className="max-w-sm text-slate-400 font-medium text-lg leading-relaxed">
                  Dapatkan hasil psikotes akurat untuk jenjang pendidikan dan karir masa depanmu.
                </p>
              </div>
              <div className="mt-10">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white rounded-2xl h-14 px-10 font-black text-lg shadow-xl shadow-primary-500/20 transition-all active:scale-95" asChild>
                  <Link href="/psikotes">Mulai Tes Baru</Link>
                </Button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Target className="size-80" />
            </div>
          </div>

          {/* STATS MINI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-primary-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <TrendingUp className="size-6" />
                </div>
                <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                  {completedTests.length ? Math.round(completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length) : 0}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Rata-rata Skor</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-indigo-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <FileText className="size-6" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{DUMMY_TEST_HISTORY.length}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Total Aktivitas</p>
              </div>
            </div>
          </div>

          {/* PILLARS & UPSELL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Link href="/konseling" className="rounded-[2rem] bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-600/10 group relative overflow-hidden transition-all hover:-translate-y-1">
                <MessageCircle className="size-8 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-lg">Konseling</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Cari Solusi</p>
             </Link>
             <Link href="/pelatihan" className="rounded-[2rem] bg-orange-500 p-6 text-white shadow-lg shadow-orange-500/10 group relative overflow-hidden transition-all hover:-translate-y-1">
                <BookOpen className="size-8 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-lg">Pelatihan</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Asah Skill</p>
             </Link>
             <div className="rounded-[2rem] bg-[#14B8A6] p-6 text-white shadow-lg shadow-primary-500/10 group relative overflow-hidden transition-all hover:-translate-y-1">
                <Star className="size-8 mb-4 group-hover:rotate-12 transition-transform" />
                <h4 className="font-black text-lg">Premium</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Unlock All</p>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT HISTORY (4 Cols) */}
        <aside className="lg:col-span-4 h-full">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <History className="size-5 text-primary-600" />
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Riwayat</h3>
                 </div>
                 <Link href="/dashboard/riwayat" className="size-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-primary-50 transition-colors group">
                    <ChevronRight className="size-4 text-slate-400 group-hover:text-primary-600" />
                 </Link>
              </div>

              <div className="space-y-3 flex-1">
                 {recentTests.map((test) => (
                   <div key={test.id} className="p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm transition-all group/item">
                      <div className="flex flex-col gap-3">
                         <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-black text-slate-900 leading-tight line-clamp-2">{test.name}</p>
                            <span className="text-lg font-black text-primary-600">{test.score}</span>
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100">{test.categoryLabel}</span>
                            <span className="text-[9px] font-bold text-slate-400" suppressHydrationWarning>{new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                 <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-50" asChild>
                    <Link href="/dashboard/riwayat">Lihat Semua Hasil</Link>
                 </Button>
              </div>
           </div>
        </aside>

      </div>
    </div>
  )
}
