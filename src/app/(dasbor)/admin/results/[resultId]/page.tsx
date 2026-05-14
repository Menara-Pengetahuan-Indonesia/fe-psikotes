'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  FileBarChart,
  Loader2,
  AlertTriangle,
  ClipboardList,
  UserCheck,
  Save,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  CheckCircle2,
  Package,
  Sparkles,
  Plus,
  Trash2,
  Send,
  Bot,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'

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
  userAnswers: Answer[]
}

interface TestItem {
  id: string
  name: string
  order: number
  session: {
    id: string
    status: string
    startedAt: string | null
    completedAt: string | null
    subTestResults: SubTestResult[]
  } | null
}

interface PackageDetail {
  id: string
  user: { id: string; firstName: string; lastName: string; email: string }
  packageType: {
    id: string
    name: string
    description: string
    childPackage: {
      id: string
      name: string
      package: { id: string; name: string }
    }
  }
  purchasedAt: string
  reviewNotes: string | null
  reviewData: ReviewData | null
  isPublished: boolean
  reviewedAt: string | null
  reviewedBy: string | null
  tests: TestItem[]
}

function formatDate(d: string | null) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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
  const userPackageId = params.resultId as string

  const [pkg, setPkg] = useState<PackageDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [reviewData, setReviewData] = useState<ReviewData | null>(null)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState<'draft' | 'published' | null>(null)

  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set())
  const [expandedSubTests, setExpandedSubTests] = useState<Set<string>>(new Set())

  useEffect(() => {
    api
      .get(`/admin/sessions/${userPackageId}`)
      .then((res) => {
        const data: PackageDetail = res.data.data
        setPkg(data)
        if (data.reviewData) setReviewData(data.reviewData)
        if (data.tests.length > 0) {
          setExpandedTests(new Set([data.tests[0].id]))
          const firstSubResults = data.tests[0].session?.subTestResults ?? []
          if (firstSubResults.length > 0) {
            setExpandedSubTests(new Set([firstSubResults[0].id]))
          }
        }
      })
      .catch(() => setError('Gagal memuat data.'))
      .finally(() => setLoading(false))
  }, [userPackageId])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await api.post(`/admin/sessions/${userPackageId}/generate-review`)
      setReviewData(res.data.data)
    } catch {
      setError('Gagal generate review AI. Coba lagi.')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async (publish: boolean) => {
    if (!reviewData) return
    setSaving(true)
    setSaveSuccess(null)
    try {
      const res = await api.patch(`/admin/sessions/${userPackageId}/review`, {
        reviewData,
        reviewNotes: reviewData.psychologistNotes,
        isPublished: publish,
      })
      setPkg((prev) =>
        prev ? { ...prev, ...res.data.data, reviewData } : prev,
      )
      setSaveSuccess(publish ? 'published' : 'draft')
      setTimeout(() => setSaveSuccess(null), 4000)
    } catch {
      setError('Gagal menyimpan review.')
    } finally {
      setSaving(false)
    }
  }

  const updateAssessment = (idx: number, field: keyof TestAssessment, value: string) => {
    setReviewData((prev) =>
      prev
        ? {
            ...prev,
            assessments: prev.assessments.map((a, i) =>
              i === idx ? { ...a, [field]: value } : a,
            ),
          }
        : prev,
    )
  }

  const updateListItem = (field: 'strengths' | 'areasOfGrowth' | 'recommendations', idx: number, value: string) => {
    setReviewData((prev) =>
      prev ? { ...prev, [field]: prev[field].map((v, i) => (i === idx ? value : v)) } : prev,
    )
  }

  const addListItem = (field: 'strengths' | 'areasOfGrowth' | 'recommendations') => {
    setReviewData((prev) =>
      prev ? { ...prev, [field]: [...prev[field], ''] } : prev,
    )
  }

  const removeListItem = (field: 'strengths' | 'areasOfGrowth' | 'recommendations', idx: number) => {
    setReviewData((prev) =>
      prev ? { ...prev, [field]: prev[field].filter((_, i) => i !== idx) } : prev,
    )
  }

  const toggleTest = (id: string) => {
    setExpandedTests((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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
          <Loader2 className="size-8 text-primary-400 animate-spin" />
          <p className="text-sm font-bold text-slate-400">Memuat data...</p>
        </div>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-3xl border border-rose-100 p-16 text-center flex flex-col items-center">
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

  const isReviewed = !!pkg.reviewedAt
  const isPublished = pkg.isPublished
  const fullName = `${pkg.user.firstName} ${pkg.user.lastName}`
  const completedTests = pkg.tests.filter((t) => t.session?.status === 'COMPLETED').length

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 md:p-10 text-white shadow-lg shadow-primary-200/40">
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}
        />
        {/* blur orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-56 h-56 bg-primary-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

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
            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shrink-0 shadow-lg">
              <User className="size-7 text-white" />
            </div>
            <div>
            <p className="text-primary-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Laporan
            </p>

              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">{fullName}</h1>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium mb-3">
                <Mail className="size-3.5" />
                <span>{pkg.user.email}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 inline-flex items-center gap-1.5">
                  <Package className="size-3" />
                  {pkg.packageType.childPackage.package.name}
                  <span className="opacity-50">›</span>
                  {pkg.packageType.childPackage.name}
                  <span className="opacity-50">›</span>
                  {pkg.packageType.name}
                </span>
                <span className={cn(
                  'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                  isReviewed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300',
                )}>
                  {isReviewed ? 'Sudah Direview' : 'Perlu Review'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
              <div className="size-10 rounded-xl bg-primary-500/30 flex items-center justify-center">
                <FileBarChart className="size-5 text-primary-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{pkg.tests.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
              <div className="size-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{completedTests}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <ClipboardList className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">
                  {pkg.tests.reduce((s, t) => s + (t.session?.subTestResults.reduce((ss, r) => ss + r.userAnswers.length, 0) ?? 0), 0)}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Jawaban</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Calendar className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatDate(pkg.purchasedAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dibeli</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI REVIEW SECTION */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn('size-10 rounded-xl flex items-center justify-center', isPublished ? 'bg-emerald-100' : isReviewed ? 'bg-primary-100' : 'bg-amber-100')}>
              {isPublished ? <UserCheck className="size-5 text-emerald-600" /> : isReviewed ? <Bot className="size-5 text-primary-600" /> : <MessageSquare className="size-5 text-amber-600" />}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Laporan Psikologis</h2>
              <p className="text-xs text-slate-400 font-medium">
                {isPublished
                  ? `Dipublish oleh ${pkg.reviewedBy ?? 'Admin'} · ${formatDate(pkg.reviewedAt)}`
                  : isReviewed
                    ? `Draft tersimpan · ${formatDate(pkg.reviewedAt)}`
                    : 'Generate laporan AI, edit jika perlu, lalu publish ke peserta'}
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-primary-600 text-white text-sm font-bold hover:from-violet-700 hover:to-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shrink-0"
          >
            {generating ? (
              <><Loader2 className="size-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="size-4" /> {reviewData ? 'Regenerate AI' : 'Generate AI Review'}</>
            )}
          </button>
        </div>

        {!reviewData && !generating && (
          <div className="px-8 py-14 text-center">
            <div className="size-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4">
              <Bot className="size-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-400">Belum ada laporan.</p>
            <p className="text-xs text-slate-300 mt-1">Klik &quot;Generate AI Review&quot; untuk membuat draft laporan otomatis.</p>
          </div>
        )}

        {generating && (
          <div className="px-8 py-14 text-center">
            <Loader2 className="size-8 text-primary-400 animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-500">AI sedang menganalisis hasil tes...</p>
            <p className="text-xs text-slate-400 mt-1">Ini mungkin membutuhkan 15–30 detik</p>
          </div>
        )}

        {reviewData && !generating && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Model info */}
            {reviewData.modelUsed && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                <p className="text-[11px] text-slate-500 font-medium">
                  Dibuat oleh <span className="font-black text-slate-700">{reviewData.modelUsed}</span>
                  {reviewData.generatedAt ? ` · ${new Date(reviewData.generatedAt).toLocaleString('id-ID')}` : ''}
                </p>
              </div>
            )}

            {/* Ringkasan */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Ringkasan Eksekutif</label>
              <textarea
                value={reviewData.summary}
                onChange={(e) => setReviewData((prev) => prev ? { ...prev, summary: e.target.value } : prev)}
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 font-medium text-slate-700 bg-white"
              />
            </div>

            {/* Penilaian per Tes */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Penilaian per Tes</label>
              <div className="space-y-3">
                {reviewData.assessments.map((a, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900 flex-1">{a.testName}</span>
                      <input
                        value={a.level}
                        onChange={(e) => updateAssessment(idx, 'level', e.target.value)}
                        placeholder="Level"
                        className="w-36 h-8 px-3 rounded-lg border border-slate-200 text-xs font-black text-primary-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 text-center"
                      />
                    </div>
                    <textarea
                      value={a.interpretation}
                      onChange={(e) => updateAssessment(idx, 'interpretation', e.target.value)}
                      rows={3}
                      placeholder="Interpretasi..."
                      className="w-full p-3 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 font-medium text-slate-700 bg-slate-50"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kekuatan + Area Pertumbuhan + Rekomendasi */}
            <div className="grid md:grid-cols-3 gap-4">
              {(
                [
                  { field: 'strengths', label: 'Kekuatan', color: 'emerald' },
                  { field: 'areasOfGrowth', label: 'Area Perhatian', color: 'amber' },
                  { field: 'recommendations', label: 'Rekomendasi', color: 'indigo' },
                ] as const
              ).map(({ field, label, color }) => (
                <div key={field} className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{label}</label>
                  <div className="space-y-2">
                    {reviewData[field].map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={s}
                          onChange={(e) => updateListItem(field, idx, e.target.value)}
                          className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
                        />
                        <button onClick={() => removeListItem(field, idx)} className="size-7 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center transition-colors shrink-0">
                          <Trash2 className="size-3 text-rose-500" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addListItem(field)}
                      className={cn(
                        'inline-flex items-center gap-1.5 text-xs font-bold mt-1 transition-colors',
                        color === 'emerald' ? 'text-emerald-600 hover:text-emerald-700' :
                        color === 'amber' ? 'text-amber-600 hover:text-amber-700' :
                        'text-primary-600 hover:text-primary-700',
                      )}
                    >
                      <Plus className="size-3.5" /> Tambah
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Catatan Psikolog */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Catatan Psikolog <span className="normal-case font-medium text-slate-300">(opsional)</span></label>
              <textarea
                value={reviewData.psychologistNotes}
                onChange={(e) => setReviewData((prev) => prev ? { ...prev, psychologistNotes: e.target.value } : prev)}
                rows={3}
                placeholder="Catatan tambahan dari psikolog..."
                className="w-full p-4 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 font-medium text-slate-700 bg-white"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div>
                {saveSuccess === 'draft' && (
                  <div className="flex items-center gap-2 text-primary-600 text-sm font-bold">
                    <CheckCircle2 className="size-4" /> Draft tersimpan
                  </div>
                )}
                {saveSuccess === 'published' && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                    <CheckCircle2 className="size-4" /> Laporan dipublish ke peserta
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Simpan Draft
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  Publish ke Peserta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TESTS */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 px-1">Jawaban per Tes</h2>
        {pkg.tests.map((test) => {
          const isTestExpanded = expandedTests.has(test.id)
          const isCompleted = test.session?.status === 'COMPLETED'

          return (
            <div key={test.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => toggleTest(test.id)}
                className="w-full px-6 md:px-8 py-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors text-left"
              >
                <div className={cn(
                  'size-10 rounded-xl flex items-center justify-center shrink-0',
                  isCompleted ? 'bg-primary-50 border border-primary-100' : 'bg-slate-50 border border-slate-100',
                )}>
                  <FileBarChart className={cn('size-5', isCompleted ? 'text-primary-600' : 'text-slate-400')} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-slate-900 text-sm">{test.name}</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {isCompleted
                      ? `${test.session?.subTestResults.length ?? 0} subtes · ${test.session?.subTestResults.reduce((s, r) => s + r.userAnswers.length, 0) ?? 0} jawaban`
                      : 'Belum dikerjakan'}
                  </p>
                </div>
                <span className={cn(
                  'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                  isCompleted ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-400',
                )}>
                  {isCompleted ? 'Selesai' : 'Belum'}
                </span>
                {isTestExpanded ? (
                  <ChevronUp className="size-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="size-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isTestExpanded && test.session && (
                <div className="border-t border-slate-50 space-y-0">
                  {test.session.subTestResults.length === 0 ? (
                    <div className="px-8 py-6 text-center text-sm text-slate-400 font-medium">
                      Tidak ada jawaban.
                    </div>
                  ) : (
                    test.session.subTestResults.map((subResult) => {
                      const isSubExpanded = expandedSubTests.has(subResult.id)
                      return (
                        <div key={subResult.id} className="border-t border-slate-50">
                          <button
                            onClick={() => toggleSubTest(subResult.id)}
                            className="w-full px-8 py-4 flex items-center gap-3 hover:bg-slate-50/50 transition-colors text-left"
                          >
                            <div className="size-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-black text-slate-500">
                              {subResult.subTest.order}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-black text-slate-700">{subResult.subTest.name}</p>
                              <p className="text-[11px] text-slate-400 font-medium">
                                {subResult.userAnswers.length} jawaban
                                {subResult.score !== null && ` · Skor: ${subResult.score}`}
                              </p>
                            </div>
                            {isSubExpanded ? (
                              <ChevronUp className="size-3.5 text-slate-400 shrink-0" />
                            ) : (
                              <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
                            )}
                          </button>

                          {isSubExpanded && (
                            <div className="border-t border-slate-50 divide-y divide-slate-50">
                              {subResult.userAnswers.map((answer, idx) => (
                                <div key={answer.id} className="px-8 py-4 flex items-start gap-4">
                                  <div className="size-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-black text-slate-500 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 leading-snug mb-2">
                                      {answer.question.questionText}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                        {getAnswerLabel(answer)}
                                      </span>
                                      {answer.isCorrect !== null && (
                                        <span className={cn(
                                          'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full',
                                          answer.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600',
                                        )}>
                                          {answer.isCorrect ? 'Benar' : 'Salah'}
                                        </span>
                                      )}
                                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                        {answer.question.questionType}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              )}

              {isTestExpanded && !test.session && (
                <div className="border-t border-slate-50 px-8 py-6 text-center text-sm text-slate-400 font-medium">
                  Peserta belum mengerjakan tes ini.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
