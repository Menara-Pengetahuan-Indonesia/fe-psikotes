'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Trophy,
  Loader2,
  AlertTriangle,
  Sparkles,
  Package,
  CheckCircle2,
  PlayCircle,
  RotateCw,
  Eye,
  ArrowRight,
  FileText,
  Clock,
  LayoutList,
  ClipboardList,
  UserCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'
import { useMyPackages } from '@/features/psikotes/hooks/use-catalog'

interface ResultData {
  id: string
  testId: string
  completedAt: string
  test: {
    id: string
    name: string
  }
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const resultId = params.resultId as string

  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: packages } = useMyPackages()

  const parentPackage = useMemo(() => {
    if (!packages) return null
    return packages.find((pkg) => pkg.tests?.some((t) => t.id === testId)) ?? null
  }, [packages, testId])

  const siblingTests = useMemo(() => {
    if (!parentPackage?.tests) return []
    return parentPackage.tests.filter((t) => t.id !== testId)
  }, [parentPackage, testId])

  useEffect(() => {
    api
      .get(`/test-session/tests/${testId}/state`)
      .then((res) => {
        const state = res.data.data
        setResult({
          id: resultId,
          testId,
          completedAt: state.completedAt ?? new Date().toISOString(),
          test: { id: testId, name: state.testName ?? '' },
        })
      })
      .catch(() => {
        setResult({
          id: resultId,
          testId,
          completedAt: new Date().toISOString(),
          test: { id: testId, name: '' },
        })
      })
      .finally(() => setLoading(false))
  }, [testId, resultId])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          <p className="text-sm font-bold text-slate-500">Memuat hasil...</p>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="relative bg-white rounded-3xl border border-rose-100/60 shadow-sm overflow-hidden p-10 md:p-14 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <AlertTriangle className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">
          {error ?? 'Hasil tidak ditemukan'}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Tautan ini mungkin sudah tidak valid atau hasil telah dihapus.
        </p>
        <Link
          href="/pengguna/paket-saya"
          className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Paket Saya
        </Link>
      </div>
    )
  }

  const completedAt = new Date(result.completedAt)
  const isReviewed = !!parentPackage?.reviewedAt
  const reviewNotes = parentPackage?.reviewNotes ?? null
  const reviewedAt = parentPackage?.reviewedAt ?? null
  const reviewedBy = parentPackage?.reviewedBy ?? null

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 bg-amber-400/25 rounded-full blur-2xl" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-accent-400/30 rounded-full blur-2xl" />
        <svg
          className="absolute top-6 right-8 w-24 h-24 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="9" />
        </svg>

        <div className="relative">
          <button
            onClick={() => router.push('/pengguna/paket-saya')}
            className="inline-flex items-center gap-2 text-primary-100/90 hover:text-white transition-colors mb-5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Paket Saya</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-sm shadow-amber-200/50 shrink-0">
              <Trophy className="w-7 h-7 text-amber-950" />
            </div>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                Tes Selesai
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                {result.test.name || 'Tes Psikologi'}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3 h-3" />
              Selesai{' '}
              {completedAt.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
              {completedAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg',
                isReviewed
                  ? 'text-emerald-950 bg-emerald-300'
                  : 'text-amber-950 bg-amber-300',
              )}
            >
              {isReviewed ? (
                <><UserCheck className="w-3 h-3" /> Sudah Direview</>
              ) : (
                <><ClipboardList className="w-3 h-3" /> Menunggu Review</>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Review status card */}
      {isReviewed ? (
        <div className="relative bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />
          <div className="relative p-5 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-200 shrink-0">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-black text-slate-900 leading-tight">Catatan Psikolog</h2>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Direview oleh {reviewedBy ?? 'Psikolog'} ·{' '}
                  {new Date(reviewedAt!).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {reviewNotes}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />
          <div className="relative p-6 md:p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm shadow-amber-200 mb-4">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-black text-slate-900 mb-2">
              Menunggu Review Psikolog
            </h2>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Jawaban kamu sudah kami terima. Psikolog kami sedang menganalisis hasilnya dan
              akan memberikan catatan secepatnya.
            </p>
            <div className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-700">Dalam proses review</span>
            </div>
          </div>
        </div>
      )}

      {/* Sibling tests in same package */}
      {parentPackage && siblingTests.length > 0 && (
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />

          <div className="relative p-5 md:p-6">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm shadow-amber-200 shrink-0">
                <LayoutList className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-black text-slate-900 leading-tight">Tes Lain di Paket Ini</h2>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5 truncate">
                  {parentPackage.name}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {siblingTests.map((test) => {
                const status = test.session?.status ?? 'NOT_STARTED'
                const isCompleted = status === 'COMPLETED'
                const isInProgress = status === 'IN_PROGRESS'
                const label = isCompleted ? 'Lihat Hasil' : isInProgress ? 'Lanjut' : 'Mulai'
                const ButtonIcon = isCompleted ? Eye : isInProgress ? RotateCw : PlayCircle
                const buttonClass = isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                  : isInProgress
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-primary-100'
                const badgeClass = isCompleted
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                  : isInProgress
                    ? 'text-amber-700 bg-amber-50 border-amber-100'
                    : 'text-slate-600 bg-slate-50 border-slate-100'
                const badgeText = isCompleted
                  ? 'Selesai'
                  : isInProgress
                    ? 'Berjalan'
                    : 'Belum Mulai'

                const handleClick = () => {
                  if (isCompleted && test.session) {
                    router.push(`/tes/${test.id}/result/${test.session.id}`)
                  } else {
                    router.push(`/tes/${test.id}`)
                  }
                }

                return (
                  <div
                    key={test.id}
                    className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-primary-100 hover:bg-white transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1.5">
                        <h4 className="font-bold text-sm text-slate-900 leading-snug flex-1">
                          {test.name}
                        </h4>
                        <span
                          className={cn(
                            'inline-flex items-center text-[10px] font-black border px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0',
                            badgeClass,
                          )}
                        >
                          {badgeText}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                          <FileText className="w-3 h-3 text-primary-500" />
                          {test.totalQuestions} soal
                        </span>
                        {test.totalDuration > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3 text-primary-500" />
                            {test.totalDuration} mnt
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleClick}
                      className={cn(
                        'inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl text-white text-sm font-bold transition-all shadow-sm whitespace-nowrap',
                        buttonClass,
                      )}
                    >
                      <ButtonIcon className="w-4 h-4" />
                      {label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => router.push('/pengguna/paket-saya')}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Package className="w-4 h-4" />
          Paket Saya
        </button>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          Jelajahi Paket Lain
        </Link>
      </div>
    </div>
  )
}
