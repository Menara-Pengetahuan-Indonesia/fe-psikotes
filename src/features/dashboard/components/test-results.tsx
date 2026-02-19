'use client'

import { Clock, Award } from 'lucide-react'

import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
  type TestCategory,
} from '@/features/dashboard/constants'

const CATEGORY_VARIANT: Record<
  TestCategory, string
> = {
  gratis: 'bg-primary-50 text-primary-700',
  premium: 'bg-violet-50 text-violet-700',
  mahasiswa: 'bg-sky-50 text-sky-700',
  perusahaan: 'bg-orange-50 text-orange-700',
  'kesehatan-mental': 'bg-rose-50 text-rose-700',
}

const completedTests = DUMMY_TEST_HISTORY.filter(
  (t) => t.status === 'selesai'
)

export function TestResults() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Riwayat Hasil
        </h1>
        <p className="text-slate-500 mt-1">
          Semua hasil tes yang telah Anda selesaikan.
        </p>
      </div>

      {/* Results grid */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2',
          'lg:grid-cols-3 gap-4',
        )}
      >
        {completedTests.map((test) => (
          <Card
            key={test.id}
            className={cn(
              'bg-white border-gray-200',
              'hover:shadow-md transition-shadow',
            )}
          >
            <CardContent className="space-y-4">
              {/* Top: name + category badge */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-slate-800 leading-snug">
                  {test.name}
                </h3>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    'font-medium shrink-0',
                    CATEGORY_VARIANT[test.category],
                  )}
                >
                  {test.categoryLabel}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="size-3.5" />
                {new Date(
                  test.date,
                ).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {/* Result card */}
              {test.resultCode && (
                <div className="rounded-lg bg-blue-50 px-4 py-3 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Award className="size-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-800">
                      {test.resultCode}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {test.resultTitle}
                  </p>
                </div>
              )}

              {/* Score */}
              {test.score !== null && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-slate-400">
                    Skor
                  </span>
                  <span className="text-lg font-bold text-slate-800">
                    {test.score}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {completedTests.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          Belum ada hasil tes.
        </div>
      )}
    </div>
  )
}
