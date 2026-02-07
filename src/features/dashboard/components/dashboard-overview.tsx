'use client'

import Link from 'next/link'
import {
  FileText,
  CalendarDays,
  TrendingUp,
  ArrowRight,
  Clock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
} from '@/features/dashboard/constants'

const completedTests = DUMMY_TEST_HISTORY.filter(
  (t) => t.status === 'selesai'
)
const thisMonthTests = DUMMY_TEST_HISTORY.filter((t) => {
  const d = new Date(t.date)
  const now = new Date()
  return (
    d.getMonth() === now.getMonth()
    && d.getFullYear() === now.getFullYear()
  )
})
const avgScore = completedTests.length
  ? Math.round(
    completedTests.reduce(
      (sum, t) => sum + (t.score ?? 0), 0
    ) / completedTests.length
  )
  : 0

const STATS = [
  {
    label: 'Total Tes',
    value: DUMMY_TEST_HISTORY.length,
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Tes Bulan Ini',
    value: thisMonthTests.length,
    icon: CalendarDays,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Rata-rata Skor',
    value: avgScore,
    icon: TrendingUp,
    color: 'bg-amber-50 text-amber-600',
  },
]

const recentTests = DUMMY_TEST_HISTORY
  .filter((t) => t.status === 'selesai')
  .slice(0, 3)

export function DashboardOverview() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Selamat datang, {user?.name || 'Pengguna'}!
        </h1>
        <p className="text-slate-500 mt-1">
          Berikut ringkasan aktivitas tes Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={cn(
                'flex items-center gap-4 rounded-xl',
                'bg-white p-5 border border-slate-100',
                'shadow-sm'
              )}
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center',
                  'justify-center rounded-xl',
                  stat.color
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent tests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Tes Terbaru
          </h2>
          <Link
            href="/pengguna/riwayat"
            className={cn(
              'text-sm text-emerald-600',
              'hover:text-emerald-700',
              'flex items-center gap-1'
            )}
          >
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentTests.map((test) => (
            <div
              key={test.id}
              className={cn(
                'rounded-xl bg-white p-5',
                'border border-slate-100 shadow-sm',
                'space-y-3'
              )}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-800 text-sm">
                  {test.name}
                </h3>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    'font-medium',
                    'bg-emerald-50 text-emerald-700'
                  )}
                >
                  {test.categoryLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {new Date(test.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              {test.resultCode && (
                <div
                  className={cn(
                    'rounded-lg bg-slate-50 px-3 py-2'
                  )}
                >
                  <p className="text-xs text-slate-400">Hasil</p>
                  <p className="font-semibold text-slate-700 text-sm">
                    {test.resultCode} &mdash; {test.resultTitle}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          className={cn(
            'rounded-lg bg-emerald-600',
            'hover:bg-emerald-700 cursor-pointer'
          )}
          asChild
        >
          <Link href="/psikotes">Mulai Tes Baru</Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-lg cursor-pointer"
          asChild
        >
          <Link href="/pengguna/riwayat">
            Lihat Semua Hasil
          </Link>
        </Button>
      </div>
    </div>
  )
}
