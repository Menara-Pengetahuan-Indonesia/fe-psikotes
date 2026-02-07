'use client'

import { Clock, Award } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
  type TestCategory,
} from '@/features/dashboard/constants'

const CATEGORY_COLORS: Record<TestCategory, string> = {
  gratis: 'bg-green-50 text-green-700',
  premium: 'bg-purple-50 text-purple-700',
  mahasiswa: 'bg-blue-50 text-blue-700',
  perusahaan: 'bg-orange-50 text-orange-700',
  'kesehatan-mental': 'bg-pink-50 text-pink-700',
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
          'lg:grid-cols-3 gap-4'
        )}
      >
        {completedTests.map((test) => (
          <div
            key={test.id}
            className={cn(
              'rounded-xl bg-white p-5',
              'border border-slate-100 shadow-sm',
              'space-y-4 hover:shadow-md',
              'transition-shadow'
            )}
          >
            {/* Top: name + category badge */}
            <div className="flex items-start justify-between gap-2">
              <h3
                className={cn(
                  'font-semibold text-slate-800',
                  'text-sm leading-snug'
                )}
              >
                {test.name}
              </h3>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  'font-medium shrink-0',
                  CATEGORY_COLORS[test.category]
                )}
              >
                {test.categoryLabel}
              </span>
            </div>

            {/* Date */}
            <div
              className={cn(
                'flex items-center gap-1.5',
                'text-xs text-slate-400'
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              {new Date(test.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>

            {/* Result card */}
            {test.resultCode && (
              <div
                className={cn(
                  'rounded-lg bg-emerald-50 px-4 py-3',
                  'space-y-1'
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span
                    className={cn(
                      'text-sm font-bold',
                      'text-emerald-700'
                    )}
                  >
                    {test.resultCode}
                  </span>
                </div>
                <p className="text-sm text-emerald-600">
                  {test.resultTitle}
                </p>
              </div>
            )}

            {/* Score */}
            {test.score !== null && (
              <div
                className={cn(
                  'flex items-center justify-between',
                  'pt-2 border-t border-slate-100'
                )}
              >
                <span className="text-xs text-slate-400">
                  Skor
                </span>
                <span
                  className={cn(
                    'text-lg font-bold text-slate-800'
                  )}
                >
                  {test.score}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {completedTests.length === 0 && (
        <div
          className={cn(
            'text-center py-16 text-slate-400'
          )}
        >
          Belum ada hasil tes.
        </div>
      )}
    </div>
  )
}
