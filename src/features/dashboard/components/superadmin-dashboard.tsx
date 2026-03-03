'use client'

import Link from 'next/link'
import {
  CalendarDays,
  Users,
  Zap,
  FileText,
  Target,
  TrendingUp,
  Lock,
  AlertCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'

export function SuperAdminDashboard() {
  const { user } = useAuthStoreHydrated()

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">🔐 Super Admin</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Halo, {user?.name?.split(' ')[0] || 'SuperAdmin'}.</h1>
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
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-red-600 to-red-700 p-10 md:p-12 text-white shadow-2xl group transition-all hover:shadow-red-500/20">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="size-14 rounded-2xl bg-white/20 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Lock className="size-7" />
                </div>
                <h2 className="text-4xl font-black tracking-tight leading-[1.1]">
                  Kontrol Penuh <br />
                  Sistem Anda.
                </h2>
                <p className="max-w-sm text-red-100 font-medium text-lg leading-relaxed">
                  Kelola semua aspek sistem, pengguna, dan konfigurasi dengan akses penuh.
                </p>
              </div>
              <div className="mt-10">
                <Button size="lg" className="bg-white hover:bg-red-50 text-red-600 rounded-2xl h-14 px-10 font-black text-lg shadow-xl transition-all active:scale-95" asChild>
                  <Link href="/dashboard/tests">Kelola Sistem</Link>
                </Button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Target className="size-80" />
            </div>
          </div>

          {/* STATS GRID - 5 COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <FileText className="size-5" />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-blue-600 tracking-tighter">20</p>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-2">Total Tes</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="size-10 rounded-xl bg-green-600 text-white flex items-center justify-center">
                <Users className="size-5" />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-green-600 tracking-tighter">250</p>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-2">Total Pengguna</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="size-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <Zap className="size-5" />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-purple-600 tracking-tighter">5</p>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mt-2">Admin Aktif</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 p-6 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="size-10 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                <TrendingUp className="size-5" />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-orange-600 tracking-tighter">542</p>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-2">Hasil Tes</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-red-50 to-red-100 border border-red-200 p-6 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <AlertCircle className="size-5" />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-red-600 tracking-tighter">3</p>
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest mt-2">Alert</p>
              </div>
            </div>
          </div>

          {/* MANAGEMENT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2.5rem] bg-white border-2 border-red-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">🖥️ Sistem</h3>
                  <p className="text-sm text-slate-600 mt-2">Kontrol penuh atas sistem</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-black">
                  Pengaturan Sistem
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Backup & Restore
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Log Aktivitas
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border-2 border-red-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">👥 Pengguna</h3>
                  <p className="text-sm text-slate-600 mt-2">Kelola semua pengguna sistem</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-black">
                  Lihat Semua Pengguna
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Kelola Admin
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Kelola Peserta
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border-2 border-red-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">📋 Tes</h3>
                  <p className="text-sm text-slate-600 mt-2">Kelola semua tes di sistem</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-black" asChild>
                  <Link href="/dashboard/tests">Lihat Semua Tes</Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Template Tes
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Arsip Tes
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border-2 border-red-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">📊 Analitik</h3>
                  <p className="text-sm text-slate-600 mt-2">Analisis mendalam sistem</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-black">
                  Dashboard Analitik
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Export Laporan
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black">
                  Statistik Pengguna
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SYSTEM STATUS (4 Cols) */}
        <aside className="lg:col-span-4 h-full">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">System Status</h3>
              </div>

              <div className="space-y-4 flex-1">
                 <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Database</p>
                      <span className="size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm font-black text-green-600 mt-2">Online</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Redis Cache</p>
                      <span className="size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm font-black text-green-600 mt-2">Online</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-green-600 uppercase tracking-widest">API Server</p>
                      <span className="size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm font-black text-green-600 mt-2">Online</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Uptime</p>
                    <p className="text-2xl font-black text-blue-600 mt-2">99.8%</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Active Users</p>
                    <p className="text-2xl font-black text-purple-600 mt-2">42</p>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-black">
                    View Full Status
                 </Button>
              </div>
           </div>
        </aside>

      </div>
    </div>
  )
}
