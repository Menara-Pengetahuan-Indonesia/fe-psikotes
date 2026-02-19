'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
  type TestCategory,
} from '@/features/dashboard/constants'

type FilterTab = 'semua' | TestCategory

const FILTER_TABS: {
  value: FilterTab
  label: string
}[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'gratis', label: 'Gratis' },
  { value: 'premium', label: 'Premium' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
  { value: 'perusahaan', label: 'Perusahaan' },
  {
    value: 'kesehatan-mental',
    label: 'Kesehatan Mental',
  },
]

const CATEGORY_VARIANT: Record<
  TestCategory, string
> = {
  gratis: 'bg-primary-50 text-primary-700',
  premium: 'bg-violet-50 text-violet-700',
  mahasiswa: 'bg-sky-50 text-sky-700',
  perusahaan: 'bg-orange-50 text-orange-700',
  'kesehatan-mental': 'bg-rose-50 text-rose-700',
}

export function MyTests() {
  const [activeFilter, setActiveFilter] =
    React.useState<FilterTab>('semua')

  const filtered = activeFilter === 'semua'
    ? DUMMY_TEST_HISTORY
    : DUMMY_TEST_HISTORY.filter(
      (t) => t.category === activeFilter,
    )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Tes Saya
        </h1>
        <p className="text-slate-500 mt-1">
          Daftar semua tes yang pernah Anda kerjakan.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm',
              'font-medium transition-colors',
              'cursor-pointer',
              activeFilter === tab.value
                ? 'bg-blue-600 text-white'
                : cn(
                  'bg-white text-slate-600',
                  'border border-gray-200',
                  'hover:bg-gray-50',
                ),
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Test list */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-0">
          {/* Table header */}
          <div
            className={cn(
              'hidden md:grid',
              'grid-cols-[1fr_140px_120px_100px_80px]',
              'gap-4 px-5 py-3 bg-slate-50',
              'text-xs font-semibold text-slate-500',
              'uppercase tracking-wider border-b',
              'border-gray-200',
            )}
          >
            <span>Nama Tes</span>
            <span>Kategori</span>
            <span>Tanggal</span>
            <span>Skor</span>
            <span>Aksi</span>
          </div>

          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-slate-400">
              Belum ada tes di kategori ini.
            </div>
          )}
          {filtered.map((test) => (
            <div
              key={test.id}
              className={cn(
                'grid grid-cols-1',
                'md:grid-cols-[1fr_140px_120px_100px_80px]',
                'gap-2 md:gap-4 items-center',
                'px-5 py-4 border-b border-gray-100',
                'last:border-b-0',
                'hover:bg-slate-50/50 transition-colors',
              )}
            >
              <div>
                <p className="font-semibold text-sm text-slate-800">
                  {test.name}
                </p>
                <p className="text-xs text-slate-400 md:hidden">
                  {test.categoryLabel}
                </p>
              </div>
              <div className="hidden md:block">
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    'font-medium',
                    CATEGORY_VARIANT[test.category],
                  )}
                >
                  {test.categoryLabel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="size-3.5 hidden md:block" />
                {new Date(
                  test.date,
                ).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div>
                {test.status === 'selesai' ? (
                  <span className="font-semibold text-sm text-slate-700">
                    {test.score}
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-accent-50 text-accent-700">
                    Berlangsung
                  </span>
                )}
              </div>
              <div>
                {test.status === 'selesai' ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'text-blue-600 cursor-pointer',
                      'hover:text-blue-700 px-2',
                    )}
                    asChild
                  >
                    <Link href="/pengguna/riwayat">
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className={cn(
                      'cursor-pointer text-xs px-3',
                      'bg-blue-600 hover:bg-blue-700',
                      'text-white',
                    )}
                  >
                    Lanjut
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
