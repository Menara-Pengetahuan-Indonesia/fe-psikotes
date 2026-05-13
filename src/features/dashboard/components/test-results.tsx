'use client'

import { useState, useEffect } from 'react'
import {
  Award,
  ChevronRight,
  Calendar,
  Brain,
  CheckCircle2,
  FileText,
  TrendingUp,
  Loader2,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

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

const ACCENT_RING = [
  'from-primary-500 to-primary-600 shadow-primary-200',
  'from-amber-400 to-amber-500 shadow-amber-200',
  'from-violet-500 to-violet-600 shadow-violet-200',
  'from-rose-400 to-rose-500 shadow-rose-200',
  'from-teal-400 to-teal-500 shadow-teal-200',
]

const SCORE_BADGE = [
  'text-primary-700 bg-primary-50 border-primary-100',
  'text-amber-700 bg-amber-50 border-amber-100',
  'text-violet-700 bg-violet-50 border-violet-100',
  'text-rose-700 bg-rose-50 border-rose-100',
  'text-teal-700 bg-teal-50 border-teal-100',
]

export function TestResults() {
  const [history, setHistory] = useState<TestHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/tests/history')
      .then((res) => setHistory(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const avgScore = history.length
    ? Math.round(history.reduce((sum, t) => sum + t.percentage, 0) / history.length)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

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
        <div className="absolute top-[-70px] right-[-50px] w-56 h-56 bg-amber-400/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-accent-400/30 rounded-full blur-2xl" />

        <svg
          className="absolute top-6 right-10 w-24 h-24 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="23" />
          <circle cx="50" cy="50" r="10" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Riwayat
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Hasil Tes
            </h1>
            <p className="text-sm text-primary-100/90 mt-1.5">
              Analisis mendalam dari setiap perjalanan pengembangan dirimu.
            </p>
          </div>
          <Link
            href="/pengguna/paket-saya"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-white text-primary-700 text-sm font-bold hover:bg-amber-50 transition-colors shadow-lg shadow-primary-900/20 shrink-0 self-start md:self-auto"
          >
            <Brain className="w-4 h-4" />
            Mulai Tes Baru
          </Link>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-accent-400/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {history.length}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Selesai
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">{avgScore}%</p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Rata-rata
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {history.length}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Total Tes
              </p>
            </div>
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="relative bg-white rounded-3xl border border-primary-100/60 p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <p className="text-slate-900 font-black text-lg mb-1">Belum ada hasil</p>
            <p className="text-slate-500 font-medium text-sm mb-6 max-w-md mx-auto">
              Selesaikan tes pertamamu untuk melihat hasilnya di sini.
            </p>
            <Link
              href="/pengguna/paket-saya"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Mulai Tes Sekarang
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100 shadow-sm">
          {history.map((item, index) => {
            const accent = ACCENT_RING[index % ACCENT_RING.length]
            const scoreBadge = SCORE_BADGE[index % SCORE_BADGE.length]

            return (
              <Link
                key={item.id}
                href={`/tes/${item.testId}/result/${item.id}`}
                className="group flex items-center gap-4 md:gap-5 px-5 md:px-7 py-4 md:py-5 hover:bg-primary-50/40 transition-colors"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105',
                    accent,
                  )}
                >
                  <Brain className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-black text-slate-900 truncate group-hover:text-primary-700 transition-colors">
                    {item.testName}
                  </h3>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium flex-wrap mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.completedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs">
                      {item.totalScore}/{item.totalMax}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    'text-sm font-black px-3 py-1.5 rounded-full border shrink-0',
                    scoreBadge,
                  )}
                >
                  {item.percentage}%
                </div>

                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
