'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft, Trophy, Brain, BarChart3, Loader2, AlertTriangle, RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'

interface ResultData {
  id: string
  testId: string
  answers: Record<string, string>
  indicatorScores: Record<string, number>
  resultTypes: Record<string, string>
  createdAt: string
  test: {
    id: string
    name: string
    description: string
    indicators: { id: string; name: string; description?: string; order: number }[]
  }
}

const barColors = [
  'bg-indigo-500',
  'bg-teal-500',
  'bg-violet-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-pink-500',
]

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const resultId = params.resultId as string

  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get(`/tests/${testId}/results/${resultId}`)
      .then(res => setResult(res.data))
      .catch(() => setError('Hasil tidak ditemukan'))
      .finally(() => setLoading(false))
  }, [testId, resultId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 text-indigo-600 animate-spin" />
          <p className="text-sm font-bold text-slate-500">Memuat hasil...</p>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <AlertTriangle className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">{error ?? 'Hasil tidak ditemukan'}</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID hasil tidak valid.</p>
          <button onClick={() => router.push('/jenis-tes')} className="h-12 px-8 bg-slate-900 text-white rounded-2xl font-black text-sm">
            <ArrowLeft className="size-4 mr-2 inline" /> Kembali
          </button>
        </div>
      </div>
    )
  }

  const indicators = result.test.indicators.sort((a, b) => a.order - b.order)
  const maxScore = Math.max(...Object.values(result.indicatorScores), 1)

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-8 pb-10 text-white">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <button
            onClick={() => router.push('/jenis-tes')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali</span>
          </button>

          <div className="flex items-center gap-5 mb-6">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg">
              <Trophy className="size-7 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-teal-300 uppercase tracking-widest mb-1">Hasil Tes</p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{result.test.name}</h1>
            </div>
          </div>

          <p className="text-slate-400 text-sm font-medium">
            Selesai pada {new Date(result.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Brain className="size-[400px]" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Result Types */}
        {Object.keys(result.resultTypes).length > 0 && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Brain className="size-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Tipe Hasil</h2>
                <p className="text-xs text-slate-400 font-medium">Berdasarkan jawaban Anda</p>
              </div>
            </div>
            <div className="p-8 space-y-4">
              {Object.entries(result.resultTypes).map(([key, value]) => {
                const indicator = indicators.find(i => i.id === key)
                return (
                  <div key={key} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50">
                    <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                      <Brain className="size-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{indicator?.name ?? key}</p>
                      <p className="text-sm text-slate-500 font-medium">{value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Indicator Scores */}
        {indicators.length > 0 && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <BarChart3 className="size-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Skor per Indikator</h2>
                <p className="text-xs text-slate-400 font-medium">{indicators.length} indikator diukur</p>
              </div>
            </div>
            <div className="p-8 space-y-5">
              {indicators.map((ind, idx) => {
                const score = result.indicatorScores[ind.id] ?? 0
                const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
                return (
                  <div key={ind.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-slate-900">{ind.name}</span>
                      <span className="text-sm font-black text-slate-600">{score}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-[width] duration-700', barColors[idx % barColors.length])}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {ind.description && (
                      <p className="text-xs text-slate-400 font-medium mt-1">{ind.description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => router.push('/jenis-tes')}
            className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl transition-colors active:scale-95 flex items-center gap-2"
          >
            <RotateCcw className="size-4" /> Tes Lainnya
          </button>
        </div>
      </div>
    </div>
  )
}
