'use client'

import { Award, ChevronRight, Calendar, Brain, History, CheckCircle2, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CATEGORY_STYLE,
  DUMMY_TEST_HISTORY,
} from '@/features/dashboard/constants'

const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')

const accentColors = [
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-teal-400 to-teal-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-violet-400 to-violet-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-rose-400 to-rose-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-amber-400 to-amber-500', text: 'text-white' },
]

const scoreColors = [
  'text-indigo-600 bg-indigo-50',
  'text-teal-600 bg-teal-50',
  'text-violet-600 bg-violet-50',
  'text-rose-600 bg-rose-50',
  'text-amber-600 bg-amber-50',
]

export function TestResults() {
  const avgScore = completedTests.length
    ? Math.round(completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length)
    : 0

  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-teal-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Riwayat
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Hasil Tes.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Analisis mendalam dari setiap perjalanan pengembangan dirimu.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-teal-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-colors active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/">
              <Brain className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Mulai Tes Baru
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
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
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Award className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{avgScore}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">+12%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Progress</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <History className="size-72" />
        </div>
      </div>

      {/* LIST */}
      {completedTests.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <FileText className="size-8 text-teal-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada hasil.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">Selesaikan tes pertamamu untuk melihat hasilnya di sini.</p>
          <Button size="lg" className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800" asChild>
            <Link href="/">Mulai Tes Sekarang</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {completedTests.map((test, index) => {
            const accent = accentColors[index % accentColors.length]
            const scoreColor = scoreColors[index % scoreColors.length]

            return (
              <Link
                key={test.id}
                href={`/pengguna/riwayat/${test.id}`}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-colors"
              >
                {/* Icon */}
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-[transform,box-shadow] group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <Brain className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                      {test.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border',
                      CATEGORY_STYLE[test.category].bg,
                      CATEGORY_STYLE[test.category].text,
                      CATEGORY_STYLE[test.category].border,
                    )}>
                      {test.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Result type */}
                {test.resultTitle && (
                  <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full shrink-0">
                    <Award className="size-3.5" />
                    <span className="truncate max-w-[120px]">{test.resultTitle}</span>
                  </div>
                )}

                {/* Score */}
                <div className={cn('text-sm font-black px-3 py-1.5 rounded-full shrink-0', scoreColor)}>
                  {test.score}
                </div>

                {/* Arrow */}
                <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                  <ChevronRight className="size-4" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
