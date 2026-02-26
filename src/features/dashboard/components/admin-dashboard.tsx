'use client'

import Link from 'next/link'
import {
  CalendarDays,
  BarChart3,
  Users,
  Zap,
  Settings,
  FileText,
  Target,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'

export function AdminDashboard() {
  const { user } = useAuthStoreHydrated()

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <p className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Admin Panel</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Halo, {user?.name?.split(' ')[0] || 'Admin'}.</h1>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <CalendarDays className="size-4" />
          <span className="text-xs font-bold">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* MAIN BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-700 p-10 md:p-12 text-white shadow-2xl group transition-all hover:shadow-blue-500/20">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="size-14 rounded-2xl bg-white/20 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <BarChart3 className="size-7" />
                </div>
                <h2 className="text-4xl font-black tracking-tight leading-[1.1]">
                  Kelola Tes <br />
                  Dengan Mudah.
                </h2>
                <p className="max-w-sm text-blue-100 font-medium text-lg leading-relaxed">
                  Buat, edit, dan publikasikan tes psikotes untuk pengguna Anda.
                </p>
              </div>
              <div className="mt-10">
                <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-600 rounded-2xl h-14 px-10 font-black text-lg shadow-xl transition-all active:scale-95" asChild>
                  <Link href="/dashboard/tests">Kelola Tes</Link>
                </Button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Target className="size-80" />
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-blue-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileText className="size-6" />
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full">20 Total</span>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">20</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Total Tes</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-green-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Users className="size-6" />
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">150</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Total Peserta</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-purple-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Zap className="size-6" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">5</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Tes Aktif</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between group hover:border-orange-100 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <TrendingUp className="size-6" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">342</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Hasil Tes</p>
              </div>
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">📋 Manajemen Tes</h3>
                  <p className="text-sm text-slate-600 mt-2">Kelola semua tes yang tersedia</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-black" asChild>
                  <Link href="/dashboard/tests">Lihat Semua Tes</Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black" asChild>
                  <Link href="/dashboard/tests/new">Buat Tes Baru</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">🎯 Indikator</h3>
                  <p className="text-sm text-slate-600 mt-2">Kelola indikator penilaian</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 font-black">
                  Lihat Indikator
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Tambah Indikator
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK STATS (4 Cols) */}
        <aside className="lg:col-span-4 h-full">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Quick Stats</h3>
              </div>

              <div className="space-y-4 flex-1">
                 <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Tes Minggu Ini</p>
                    <p className="text-3xl font-black text-blue-600 mt-2">12</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Peserta Baru</p>
                    <p className="text-3xl font-black text-green-600 mt-2">8</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Completion Rate</p>
                    <p className="text-3xl font-black text-purple-600 mt-2">87%</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Avg Score</p>
                    <p className="text-3xl font-black text-orange-600 mt-2">78</p>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-black" asChild>
                    <Link href="/dashboard/tests">Buka Dashboard</Link>
                 </Button>
              </div>
           </div>
        </aside>

      </div>
    </div>
  )
}
