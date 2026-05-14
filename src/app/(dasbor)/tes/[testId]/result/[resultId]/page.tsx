'use client'

import { useState, useEffect, useRef } from 'react'
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
  UserCheck,
  ClipboardList,
  TrendingUp,
  Lightbulb,
  Target,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'
import { useMyPackages } from '@/features/psikotes/hooks/use-catalog'

interface TestAssessment {
  testId: string
  testName: string
  level: string
  interpretation: string
}

interface ReviewData {
  summary: string
  assessments: TestAssessment[]
  strengths: string[]
  areasOfGrowth: string[]
  recommendations: string[]
  psychologistNotes: string
  generatedAt: string
  modelUsed: string
}

interface ResultData {
  id: string
  testId: string
  completedAt: string
  test: { id: string; name: string }
}

const LEVEL_COLORS: Record<string, string> = {
  'sangat tinggi': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'tinggi': 'bg-blue-100 text-blue-700 border-blue-200',
  'sedang': 'bg-amber-100 text-amber-700 border-amber-200',
  'rendah': 'bg-orange-100 text-orange-700 border-orange-200',
  'sangat rendah': 'bg-rose-100 text-rose-700 border-rose-200',
  'sehat': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'cukup sehat': 'bg-blue-100 text-blue-700 border-blue-200',
  'tidak sehat': 'bg-rose-100 text-rose-700 border-rose-200',
  'minimal': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'moderat': 'bg-amber-100 text-amber-700 border-amber-200',
  'signifikan': 'bg-rose-100 text-rose-700 border-rose-200',
  'belum dikerjakan': 'bg-slate-100 text-slate-500 border-slate-200',
}

function getLevelColor(level: string) {
  return LEVEL_COLORS[level.toLowerCase()] ?? 'bg-indigo-100 text-indigo-700 border-indigo-200'
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const resultId = params.resultId as string

  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedAssessments, setExpandedAssessments] = useState<Set<number>>(new Set([0]))
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const { data: packages } = useMyPackages()
  const parentPackage = packages?.find((pkg) => pkg.tests?.some((t) => t.id === testId)) ?? null

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
        <h2 className="text-xl font-black text-slate-900 mb-2">{error ?? 'Hasil tidak ditemukan'}</h2>
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
  const isPublished = !!parentPackage?.isPublished
  const reviewData = parentPackage?.reviewData ?? null
  const reviewedAt = parentPackage?.reviewedAt ?? null
  const reviewedBy = parentPackage?.reviewedBy ?? null

  const toggleAssessment = (idx: number) => {
    setExpandedAssessments((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const handleDownloadPdf = async () => {
    if (!reportRef.current || !reviewData) return
    setDownloadingPdf(true)
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const imgW = pageW
      const imgH = (canvas.height * imgW) / canvas.width
      let y = 0
      while (y < imgH) {
        if (y > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, -y, imgW, imgH)
        y += pageH
      }
      const name = result?.test.name?.replace(/\s+/g, '_') ?? 'laporan'
      pdf.save(`Laporan_Psikologis_${name}.pdf`)
    } finally {
      setDownloadingPdf(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 bg-amber-400/25 rounded-full blur-2xl" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-accent-400/30 rounded-full blur-2xl" />

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
              {completedAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
              {completedAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className={cn(
              'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg',
              isPublished ? 'text-emerald-950 bg-emerald-300' : 'text-amber-950 bg-amber-300',
            )}>
              {isPublished ? (
                <><UserCheck className="w-3 h-3" /> Laporan Tersedia</>
              ) : (
                <><ClipboardList className="w-3 h-3" /> Menunggu Review</>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Waiting state */}
      {!isPublished && (
        <div className="relative bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />
          <div className="relative p-6 md:p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm shadow-amber-200 mb-4">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-black text-slate-900 mb-2">Menunggu Review Psikolog</h2>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Jawaban kamu sudah kami terima. Psikolog kami sedang menganalisis hasilnya dan akan memberikan laporan secepatnya.
            </p>
            <div className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-700">Dalam proses review</span>
            </div>
          </div>
        </div>
      )}

      {/* Full report */}
      {isPublished && reviewData && (
        <>
          {/* Reviewer info + download */}
          <div className="flex items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <UserCheck className="size-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-700">Laporan Psikologis</p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Direview oleh {reviewedBy ?? 'Psikolog'} ·{' '}
                  {reviewedAt ? new Date(reviewedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors disabled:opacity-60 shrink-0"
            >
              {downloadingPdf ? (
                <><Loader2 className="size-3.5 animate-spin" /> Membuat PDF...</>
              ) : (
                <><Download className="size-3.5" /> Unduh PDF</>
              )}
            </button>
          </div>

          <div ref={reportRef} className="space-y-6 bg-slate-50 rounded-3xl p-4">
          {/* Ringkasan */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <Star className="size-5 text-white" />
              </div>
              <h2 className="text-base font-black text-slate-900">Ringkasan Profil</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{reviewData.summary}</p>
          </div>

          {/* Penilaian per Tes */}
          {reviewData.assessments.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              <div className="px-6 md:px-8 py-5 border-b border-slate-50 flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-sm">
                  <Target className="size-5 text-white" />
                </div>
                <h2 className="text-base font-black text-slate-900">Penilaian per Tes</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {reviewData.assessments.map((a, idx) => {
                  const isExpanded = expandedAssessments.has(idx)
                  return (
                    <div key={idx}>
                      <button
                        onClick={() => toggleAssessment(idx)}
                        className="w-full px-6 md:px-8 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900">{a.testName}</p>
                        </div>
                        <span className={cn('text-[11px] font-black px-3 py-1 rounded-full border shrink-0', getLevelColor(a.level))}>
                          {a.level}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="size-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 md:px-8 pb-5">
                          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-2xl p-4">
                            {a.interpretation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Kekuatan */}
          {reviewData.strengths.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
                  <TrendingUp className="size-5 text-white" />
                </div>
                <h2 className="text-base font-black text-slate-900">Kekuatan yang Teridentifikasi</h2>
              </div>
              <ul className="space-y-2">
                {reviewData.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="size-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Area Pertumbuhan */}
          {reviewData.areasOfGrowth.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-sm">
                  <Lightbulb className="size-5 text-white" />
                </div>
                <h2 className="text-base font-black text-slate-900">Area yang Perlu Perhatian</h2>
              </div>
              <ul className="space-y-2">
                {reviewData.areasOfGrowth.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="size-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-amber-600">{idx + 1}</span>
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rekomendasi */}
          {reviewData.recommendations.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                  <Sparkles className="size-5 text-white" />
                </div>
                <h2 className="text-base font-black text-slate-900">Rekomendasi</h2>
              </div>
              <ul className="space-y-3">
                {reviewData.recommendations.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/70 rounded-2xl p-4 border border-indigo-100/60">
                    <div className="size-6 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-indigo-600">{idx + 1}</span>
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Catatan Psikolog */}
          {reviewData.psychologistNotes && (
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
                  <UserCheck className="size-5 text-white" />
                </div>
                <h2 className="text-base font-black text-slate-900">Catatan Psikolog</h2>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{reviewData.psychologistNotes}</p>
              </div>
            </div>
          )}
          </div>{/* end reportRef */}
        </>
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
