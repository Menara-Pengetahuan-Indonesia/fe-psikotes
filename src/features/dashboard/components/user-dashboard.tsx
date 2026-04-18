'use client'

import Link from 'next/link'
import {
  FileText,
  TrendingUp,
  Brain,
  MessageCircle,
  BookOpen,
  Star,
  Target,
  ChevronRight,
  History,
  Award,
  CheckCircle2,
  ArrowRight,
  BookMarked,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

const quickAccess = [
  { href: '/', label: 'Mulai Tes', desc: 'Pilih dan kerjakan tes psikotes', icon: Brain, color: 'bg-gradient-to-br from-indigo-400 to-indigo-500' },
  { href: '/pengguna/tes', label: 'Tes Saya', desc: 'Lihat katalog tes yang diambil', icon: BookMarked, color: 'bg-gradient-to-br from-teal-400 to-teal-500' },
  { href: '/pengguna/riwayat', label: 'Riwayat', desc: 'Lihat hasil dan riwayat tes', icon: History, color: 'bg-gradient-to-br from-violet-400 to-violet-500' },
]

const recentColors = [
  { icon: 'bg-indigo-100 text-indigo-600', score: 'text-indigo-600 bg-indigo-50' },
  { icon: 'bg-teal-100 text-teal-600', score: 'text-teal-600 bg-teal-50' },
  { icon: 'bg-violet-100 text-violet-600', score: 'text-violet-600 bg-violet-50' },
  { icon: 'bg-rose-100 text-rose-600', score: 'text-rose-600 bg-rose-50' },
  { icon: 'bg-amber-100 text-amber-600', score: 'text-amber-600 bg-amber-50' },
]

export function UserDashboard() {
  const { user } = useAuthStoreHydrated()
  const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')
  const recentTests = completedTests.slice(0, 5)
  const avgScore = completedTests.length
    ? Math.round(completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length)
    : 0

  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Halo, {user?.name?.split(' ')[0] || 'Pengguna'}.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Ukur potensimu dan dapatkan hasil psikotes yang akurat.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-colors active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/">
              <Brain className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Mulai Tes Baru
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <FileText className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{DUMMY_TEST_HISTORY.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{completedTests.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Award className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{avgScore}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">+12%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Progress</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Target className="size-72" />
        </div>
      </div>

      {/* QUICK ACCESS + RECENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Quick Access + Pillars */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccess.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-md transition-[box-shadow]"
                >
                  <div className={cn('size-12 rounded-2xl flex items-center justify-center text-white mb-4 transition-[transform,box-shadow] group-hover:scale-105 group-hover:shadow-md', item.color)}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-0.5 group-hover:text-indigo-600 transition-colors">{item.label}</h3>
                  <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <span>Buka</span>
                    <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/premium" className="rounded-[2rem] bg-gradient-to-br from-teal-400 to-teal-500 p-6 text-white group hover:shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5">
              <Star className="size-7 mb-3 group-hover:rotate-12 transition-transform" />
              <h4 className="font-black text-base">Premium</h4>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Unlock All</p>
            </Link>
            <Link href="/gratis" className="rounded-[2rem] bg-gradient-to-br from-primary-400 to-primary-500 p-6 text-white group hover:shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5">
              <BookOpen className="size-7 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-base">Tes Gratis</h4>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Coba Sekarang</p>
            </Link>
          </div>
        </div>

        {/* RIGHT: Recent History */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-full flex flex-col">
            <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <History className="size-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">Riwayat Terbaru</h2>
                  <p className="text-xs text-slate-400 font-medium">{completedTests.length} tes selesai</p>
                </div>
              </div>
              <Link href="/pengguna/riwayat" className="size-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-indigo-50 transition-colors group">
                <ChevronRight className="size-4 text-slate-400 group-hover:text-indigo-600" />
              </Link>
            </div>

            <div className="divide-y divide-slate-50 flex-1">
              {recentTests.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                    <FileText className="size-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-bold text-sm">Belum ada riwayat tes.</p>
                </div>
              ) : (
                recentTests.map((test, index) => {
                  const color = recentColors[index % recentColors.length]
                  return (
                    <div key={test.id} className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-colors">
                      <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', color.icon)}>
                        <Brain className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate">{test.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{test.categoryLabel}</span>
                          <span className="text-[9px] text-slate-300">•</span>
                          <span className="text-[9px] text-slate-400 font-medium">
                            {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                      <span className={cn('text-sm font-black px-2.5 py-1 rounded-full shrink-0', color.score)}>
                        {test.score}
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            <div className="px-7 py-4 border-t border-slate-50">
              <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-50" asChild>
                <Link href="/pengguna/riwayat">Lihat Semua Hasil</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
