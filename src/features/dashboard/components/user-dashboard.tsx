'use client'

import Link from 'next/link'
import {
  FileText,
  TrendingUp,
  Brain,
  BookOpen,
  Sparkles,
  ChevronRight,
  History,
  Award,
  CheckCircle2,
  ArrowRight,
  BookMarked,
  Package,
} from 'lucide-react'

import { useAuthStoreHydrated } from '@/store/auth.store'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

const quickAccess = [
  {
    href: '/pengguna/paket-saya',
    label: 'Paket Saya',
    desc: 'Mulai tes dari paket yang kamu miliki',
    icon: Package,
    accent: 'from-primary-500 to-primary-600 shadow-primary-200',
    hoverRing: 'hover:border-primary-200',
  },
  {
    href: '/pengguna/tes',
    label: 'Tes Saya',
    desc: 'Lihat katalog tes yang kamu ambil',
    icon: BookMarked,
    accent: 'from-amber-400 to-amber-500 shadow-amber-200',
    hoverRing: 'hover:border-amber-200',
  },
  {
    href: '/pengguna/riwayat',
    label: 'Riwayat Tes',
    desc: 'Lihat hasil dan progres kamu',
    icon: History,
    accent: 'from-violet-500 to-violet-600 shadow-violet-200',
    hoverRing: 'hover:border-violet-200',
  },
]

const recentAccents = [
  { icon: 'bg-primary-100 text-primary-700', score: 'text-primary-700 bg-primary-50 border-primary-100' },
  { icon: 'bg-amber-100 text-amber-700', score: 'text-amber-700 bg-amber-50 border-amber-100' },
  { icon: 'bg-violet-100 text-violet-700', score: 'text-violet-700 bg-violet-50 border-violet-100' },
  { icon: 'bg-rose-100 text-rose-700', score: 'text-rose-700 bg-rose-50 border-rose-100' },
  { icon: 'bg-teal-100 text-teal-700', score: 'text-teal-700 bg-teal-50 border-teal-100' },
]

export function UserDashboard() {
  const { user } = useAuthStoreHydrated()
  const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')
  const recentTests = completedTests.slice(0, 5)
  const avgScore = completedTests.length
    ? Math.round(
        completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length,
      )
    : 0

  const stats = [
    {
      label: 'Total Tes',
      value: DUMMY_TEST_HISTORY.length,
      icon: FileText,
      iconBg: 'bg-amber-400/30',
      iconColor: 'text-amber-200',
    },
    {
      label: 'Selesai',
      value: completedTests.length,
      icon: CheckCircle2,
      iconBg: 'bg-accent-400/30',
      iconColor: 'text-accent-200',
    },
    {
      label: 'Rata-rata',
      value: avgScore,
      icon: Award,
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    {
      label: 'Progress',
      value: '+12%',
      icon: TrendingUp,
      iconBg: 'bg-amber-400/30',
      iconColor: 'text-amber-200',
    },
  ]

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
        <div className="absolute top-[-80px] right-[-60px] w-64 h-64 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 bg-accent-400/30 rounded-full blur-2xl" />

        <svg
          className="absolute top-8 right-12 w-28 h-28 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="12" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Halo, {user?.name?.split(' ')[0] || 'Pengguna'}
              <span className="inline-block ml-2 w-2 h-2 rounded-full bg-amber-400 align-middle translate-y-[-6px]" />
            </h1>
            <p className="text-sm text-primary-100/90 mt-1.5 max-w-xl">
              Ukur potensimu dan dapatkan hasil psikotes yang akurat. Mulai perjalanan kamu hari ini.
            </p>
          </div>
          <Link
            href="/pengguna/paket-saya"
            className="inline-flex items-center gap-2 px-5 h-12 rounded-2xl bg-white text-primary-700 text-sm font-bold hover:bg-amber-50 transition-colors shadow-lg shadow-primary-900/20 shrink-0"
          >
            <Brain className="w-4 h-4" />
            Mulai Tes Baru
          </Link>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', s.iconBg)}>
                <s.icon className={cn('w-5 h-5', s.iconColor)} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-white leading-none">{s.value}</p>
                <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccess.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative bg-white rounded-2xl border border-slate-100 p-5 transition-all hover:shadow-md overflow-hidden',
                    item.hoverRing,
                  )}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3 shadow-sm transition-transform group-hover:scale-105',
                        item.accent,
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mb-0.5 group-hover:text-primary-700 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary-600">
                      <span>Buka</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/gratis"
              className="relative rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-5 text-white group hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                }}
              />
              <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-amber-400/25 rounded-full blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <BookOpen className="w-7 h-7 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-base">Tes Gratis</h4>
                  <p className="text-[11px] font-medium text-primary-100/90 mt-1">
                    Coba psikotes tanpa biaya
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              href="/"
              className="relative rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-5 text-amber-950 group hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-amber-300/40 rounded-full blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <Sparkles className="w-7 h-7 mb-3 group-hover:rotate-12 transition-transform" />
                  <h4 className="font-black text-base">Jelajahi Paket</h4>
                  <p className="text-[11px] font-medium text-amber-950/80 mt-1">
                    Temukan paket sesuai kebutuhanmu
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative bg-white rounded-3xl border border-primary-100/60 overflow-hidden h-full flex flex-col shadow-sm">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-primary-100/60 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-200">
                  <History className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900">Riwayat Terbaru</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {completedTests.length} tes selesai
                  </p>
                </div>
              </div>
              <Link
                href="/pengguna/riwayat"
                className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition-colors group"
              >
                <ChevronRight className="w-4 h-4 text-primary-700" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {recentTests.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-bold text-sm">Belum ada riwayat tes.</p>
                </div>
              ) : (
                recentTests.map((test, index) => {
                  const accent = recentAccents[index % recentAccents.length]
                  return (
                    <div
                      key={test.id}
                      className="px-6 py-4 flex items-center gap-3 hover:bg-primary-50/40 transition-colors"
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                          accent.icon,
                        )}
                      >
                        <Brain className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{test.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {test.categoryLabel}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {new Date(test.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          'text-sm font-black px-2.5 py-1 rounded-full shrink-0 border',
                          accent.score,
                        )}
                      >
                        {test.score}
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            <div className="relative px-6 py-4 border-t border-slate-100 bg-primary-50/30">
              <Link
                href="/pengguna/riwayat"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white border border-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest hover:bg-primary-50 transition-colors"
              >
                Lihat Semua Hasil
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
