'use client'

import { useState, useEffect } from 'react'
import { Award, ChevronRight, Calendar, Brain, History, CheckCircle2, FileText, TrendingUp, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'

interface TestHistoryItem {
  id: string
  testId: string
  testName: string
  testDescription: string | null
  completedAt: string
  totalScore: number
  totalMax: number
  percentage: number
}

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
  const [history, setHistory] = useState<TestHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/tests/history')
      .then(res => setHistory(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const avgScore = history.length
    ? Math.round(history.reduce((sum, t) => sum + t.percentage, 0) / history.length)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

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
            <Link href="/pengguna/paket-saya">
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
              <p className="text-2xl font-black leading-none">{history.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Award className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{avgScore}%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{history.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <History className="size-72" />
        </div>
      </div>

      {/* LIST */}
      {history.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <FileText className="size-8 text-teal-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada hasil.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">Selesaikan tes pertamamu untuk melihat hasilnya di sini.</p>
          <Button size="lg" className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800" asChild>
            <Link href="/pengguna/paket-saya">Mulai Tes Sekarang</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {history.map((item, index) => {
            const accent = accentColors[index % accentColors.length]
            const scoreColor = scoreColors[index % scoreColors.length]

            return (
              <Link
                key={item.id}
                href={`/tes/${item.testId}/result/${item.id}`}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-[transform,box-shadow] group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <Brain className="size-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                    {item.testName}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(item.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-xs">{item.totalScore}/{item.totalMax}</span>
                  </div>
                </div>

                <div className={cn('text-sm font-black px-3 py-1.5 rounded-full shrink-0', scoreColor)}>
                  {item.percentage}%
                </div>

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
