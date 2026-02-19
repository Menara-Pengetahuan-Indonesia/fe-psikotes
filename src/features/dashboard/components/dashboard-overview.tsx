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
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
} from '@/features/dashboard/constants'

const completedTests = DUMMY_TEST_HISTORY.filter(
  (t) => t.status === 'selesai'
)
const thisMonthTests = DUMMY_TEST_HISTORY.filter(
  (t) => {
    const d = new Date(t.date)
    const now = new Date()
    return (
      d.getMonth() === now.getMonth()
      && d.getFullYear() === now.getFullYear()
    )
  },
)
const avgScore = completedTests.length
  ? Math.round(
    completedTests.reduce(
      (sum, t) => sum + (t.score ?? 0), 0,
    ) / completedTests.length,
  )
  : 0

const STATS = [
  {
    label: 'Total Tes',
    value: DUMMY_TEST_HISTORY.length,
    icon: FileText,
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Tes Bulan Ini',
    value: thisMonthTests.length,
    icon: CalendarDays,
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    label: 'Rata-rata Skor',
    value: avgScore,
    icon: TrendingUp,
    iconBg: 'bg-accent-100 text-accent-600',
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
            <Card
              key={stat.label}
              className="bg-white border-gray-200"
            >
              <CardContent className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex size-12 items-center',
                    'justify-center rounded-xl',
                    stat.iconBg,
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
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
              'text-sm text-blue-600',
              'hover:text-blue-700',
              'flex items-center gap-1',
            )}
          >
            Lihat semua
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentTests.map((test) => (
            <Card
              key={test.id}
              className="bg-white border-gray-200"
            >
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm text-slate-800">
                    {test.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700">
                    {test.categoryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="size-3.5" />
                  {new Date(
                    test.date,
                  ).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                {test.resultCode && (
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <p className="text-xs text-slate-400">
                      Hasil
                    </p>
                    <p className="font-semibold text-sm text-slate-700">
                      {test.resultCode} &mdash;{' '}
                      {test.resultTitle}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          className={cn(
            'cursor-pointer bg-blue-600',
            'hover:bg-blue-700 text-white',
          )}
          asChild
        >
          <Link href="/psikotes">Mulai Tes Baru</Link>
        </Button>
        <Button
          variant="outline"
          className={cn(
            'cursor-pointer border-gray-300',
            'text-slate-700 hover:bg-slate-50',
          )}
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
