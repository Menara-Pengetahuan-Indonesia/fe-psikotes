'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  FileBarChart,
  Clock,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ClipboardList,
  UserCheck,
  Save,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'

interface Answer {
  id: string
  selectedOptionIds: string[]
  essayAnswer: string | null
  scaleValue: number | null
  isCorrect: boolean | null
  pointsEarned: number
  answeredAt: string
  question: {
    id: string
    questionText: string
    questionType: string
    order: number
    options: { id: string; optionText: string; order: number }[]
  }
}

interface SubTestResult {
  id: string
  status: string
  score: number | null
  maxScore: number | null
  subTest: { id: string; name: string; order: number }
  answers: Answer[]
}

interface SessionDetail {
  id: string
  user: { id: string; firstName: string; lastName: string; email: string }
  test: { id: string; name: string; description: string }
  status: string
  startedAt: string | null
  completedAt: string | null
  reviewNotes: string | null
  reviewedAt: string | null
  reviewedBy: string | null
  subTestResults: SubTestResult[]
}

function formatDate(d: string | null) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function getAnswerLabel(answer: Answer): string {
  if (answer.question.questionType === 'ESSAY') return answer.essayAnswer ?? '-'
  if (answer.question.questionType === 'SCALE_RATING')
    return answer.scaleValue !== null ? String(answer.scaleValue) : '-'
  if (!answer.selectedOptionIds.length) return '-'
  const opts = answer.question.options.filter((o) => answer.selectedOptionIds.includes(o.id))
  return opts.map((o) => o.optionText).join(', ') || answer.selectedOptionIds.join(', ')
}

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const resultId = params.resultId as string

  const [session, setSession] = useState<SessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [reviewNotes, setReviewNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [expandedSubTests, setExpandedSubTests] = useState<Set<string>>(new Set())

  useEffect(() => {
    api
      .get(`/admin/sessions/${resultId}`)
      .then((res) => {
        const data: SessionDetail = res.data.data
        setSession(data)
        setReviewNotes(data.reviewNotes ?? '')
        // expand first subtest by default
        if (data.subTestResults.length > 0) {
          setExpandedSubTests(new Set([data.subTestResults[0].id]))
        }
      })
      .catch(() => setError('Gagal memuat data sesi.'))
      .finally(() => setLoading(false))
  }, [resultId])

  const handleSaveReview = async () => {
    if (!session) return
    setSaving(true)
    setSaveSuccess(false)
    try {
      const res = await api.patch(`/admin/sessions/${resultId}/review`, { reviewNotes })
      setSession((prev) =>
        prev
          ? {
              ...prev,
              reviewNotes: res.data.data.reviewNotes,
              reviewedAt: res.data.data.reviewedAt,
              reviewedBy: res.data.data.reviewedBy,
            }
          : prev,
      )
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      setError('Gagal menyimpan review.')
    } finally {
      setSaving(false)
    }
  }

  const toggleSubTest = (id: string) => {
    setExpandedSubTests((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 text-indigo-400 animate-spin" />
          <p className="text-sm font-bold text-slate-400">Memuat data sesi...</p>
        </div>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-rose-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <AlertTriangle className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">{error ?? 'Data tidak ditemukan.'}</p>
          <button
            onClick={() => router.push('/admin/results')}
            className="mt-6 h-12 px-8 rounded-2xl bg-slate-900 text-white text-sm font-black hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </button>
        </div>
      </div>
    )
  }

  const isReviewed = !!session.reviewedAt
  const fullName = `${session.user.firstName} ${session.user.lastName}`
  const totalAnswers = session.subTestResults.reduce((s, r) => s + r.answers.length, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/results')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Hasil Peserta</span>
          </button>

          <div className="flex items-start gap-5 mb-6">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
              <User className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">{fullName}</h1>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium mb-3">
                <Mail className="size-3.5" />
                <span>{session.user.email}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                  {session.test.name}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    isReviewed
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300',
                  )}
                >
                  {isReviewed ? 'Sudah Direview' : 'Perlu Review'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <ClipboardList className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{totalAnswers}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Jawaban
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <FileBarChart className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{session.subTestResults.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Subtes
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Calendar className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatDate(session.completedAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {formatTime(session.completedAt)}
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <Clock className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatDate(session.startedAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Mulai
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <FileBarChart className="size-72" />
        </div>
      </div>

      {/* REVIEW FORM */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div
            className={cn(
              'size-10 rounded-xl flex items-center justify-center',
              isReviewed ? 'bg-emerald-100' : 'bg-amber-100',
            )}
          >
            {isReviewed ? (
              <UserCheck className="size-5 text-emerald-600" />
            ) : (
              <MessageSquare className="size-5 text-amber-600" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Catatan Review Psikolog</h2>
            <p className="text-xs text-slate-400 font-medium">
              {isReviewed
                ? `Direview oleh ${session.reviewedBy ?? 'Admin'} · ${formatDate(session.reviewedAt)}`
                : 'Belum ada catatan review'}
            </p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            placeholder="Tulis catatan review untuk peserta ini... (interpretasi hasil, rekomendasi, dll)"
            rows={6}
            className="w-full p-4 rounded-2xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 font-medium text-slate-700 placeholder:text-slate-300"
          />
          <div className="flex items-center justify-between gap-4">
            {saveSuccess && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                <CheckCircle2 className="size-4" />
                Review berhasil disimpan
              </div>
            )}
            {!saveSuccess && <div />}
            <button
              onClick={handleSaveReview}
              disabled={saving || !reviewNotes.trim()}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <><Loader2 className="size-4 animate-spin" /> Menyimpan...</>
              ) : (
                <><Save className="size-4" /> Simpan Review</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ANSWERS PER SUBTEST */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 px-1">Jawaban Peserta</h2>
        {session.subTestResults.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center">
            <p className="text-slate-400 font-medium text-sm">Tidak ada jawaban tercatat.</p>
          </div>
        ) : (
          session.subTestResults.map((subResult) => {
            const isExpanded = expandedSubTests.has(subResult.id)
            return (
              <div
                key={subResult.id}
                className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleSubTest(subResult.id)}
                  className="w-full px-6 md:px-8 py-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors text-left"
                >
                  <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <FileBarChart className="size-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 text-sm">{subResult.subTest.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {subResult.answers.length} jawaban
                      {subResult.score !== null && ` · Skor: ${subResult.score}`}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="size-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="size-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-50 divide-y divide-slate-50">
                    {subResult.answers.length === 0 ? (
                      <div className="px-8 py-6 text-center text-sm text-slate-400 font-medium">
                        Tidak ada jawaban.
                      </div>
                    ) : (
                      subResult.answers.map((answer, idx) => (
                        <div key={answer.id} className="px-6 md:px-8 py-4 flex items-start gap-4">
                          <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-black text-slate-500 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 leading-snug mb-2">
                              {answer.question.questionText}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                {getAnswerLabel(answer)}
                              </span>
                              {answer.isCorrect !== null && (
                                <span
                                  className={cn(
                                    'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full',
                                    answer.isCorrect
                                      ? 'bg-emerald-50 text-emerald-600'
                                      : 'bg-rose-50 text-rose-600',
                                  )}
                                >
                                  {answer.isCorrect ? 'Benar' : 'Salah'}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                {answer.question.questionType}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
