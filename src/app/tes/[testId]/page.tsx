'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Brain,
  Hash,
  Clock,
  Camera,
  CameraOff,
  Eye,
  Loader2,
  AlertTriangle,
  Save,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'
import type { TestConfig, ExamQuestion } from '@/features/psikotes/types/exam.types'
import { ExamSubmitModal } from '@/features/psikotes/gratis/components/exam-submit-modal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

type AnswerValue = { selectedOptionIds?: string[]; essayAnswer?: string; scaleValue?: number }
type AnswersMap = Record<string, AnswerValue>
type SessionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

interface TestState {
  status: SessionStatus
  startedAt: string | null
  completedAt: string | null
  resultId: string | null
  savedAnswers: Record<
    string,
    {
      selectedOptionIds: string[]
      essayAnswer: string | null
      scaleValue: number | null
    }
  >
}

function getAllQuestions(config: TestConfig): ExamQuestion[] {
  const questions = [...config.questions]
  config.sections.forEach((section) => {
    questions.push(...section.questions)
  })
  return questions.sort((a, b) => a.order - b.order)
}

function formatTimer(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`
}

function isAnswered(q: ExamQuestion, ans: AnswerValue | undefined): boolean {
  if (!ans) return false
  if (q.type === 'ESSAY') return !!ans.essayAnswer?.trim()
  if (q.type === 'SCALE_RATING') return ans.scaleValue !== undefined && ans.scaleValue !== null
  return !!ans.selectedOptionIds && ans.selectedOptionIds.length > 0
}

export default function TesPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string

  const [config, setConfig] = useState<TestConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [showExitDialog, setShowExitDialog] = useState(false)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<AnswersMap>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [savingCount, setSavingCount] = useState(0)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(false)

  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const startedSubTestsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const [cfgRes, stateRes] = await Promise.all([
          api.get(`/tests/${testId}/config`),
          api.get(`/test-session/tests/${testId}/state`),
        ])

        if (cancelled) return

        const cfg: TestConfig = cfgRes.data.data
        const state: TestState = stateRes.data.data

        if (state.status === 'COMPLETED' && state.resultId) {
          router.replace(`/tes/${testId}/result/${state.resultId}`)
          return
        }

        const savedMap: AnswersMap = {}
        for (const [qId, a] of Object.entries(state.savedAnswers ?? {})) {
          savedMap[qId] = {
            selectedOptionIds: a.selectedOptionIds?.length ? a.selectedOptionIds : undefined,
            essayAnswer: a.essayAnswer ?? undefined,
            scaleValue: a.scaleValue ?? undefined,
          }
        }

        let sessionStartedAt: string | null = state.startedAt

        if (state.status === 'NOT_STARTED') {
          const startRes = await api.post(`/test-session/tests/${testId}/start`)
          sessionStartedAt = startRes.data.data?.startedAt ?? new Date().toISOString()
        }

        if (cancelled) return

        const startedMs = sessionStartedAt
          ? new Date(sessionStartedAt).getTime()
          : Date.now()

        setConfig(cfg)
        setAnswers(savedMap)
        setStartedAt(startedMs)

        if (cfg.test.duration > 0) {
          const elapsed = Math.floor((Date.now() - startedMs) / 1000)
          const remaining = Math.max(0, cfg.test.duration * 60 - elapsed)
          setTimeLeft(remaining)
        }

        const qs = getAllQuestions(cfg)
        const firstUnansweredIdx = qs.findIndex((q) => !isAnswered(q, savedMap[q.id]))
        setCurrentIdx(firstUnansweredIdx === -1 ? 0 : firstUnansweredIdx)
      } catch (err: unknown) {
        if (cancelled) return
        const e = err as { response?: { data?: { message?: string } } }
        setError(e?.response?.data?.message ?? 'Tes tidak ditemukan atau belum dipublikasi')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [testId, router])

  const questions = useMemo(() => (config ? getAllQuestions(config) : []), [config])
  const question = questions[currentIdx]
  const sections = config?.sections ?? []
  const hasSections = sections.length > 0
  const hasTimer = (config?.test.duration ?? 0) > 0
  const currentSection =
    hasSections && question
      ? sections.find((s) => s.questions.some((q) => q.id === question.id))
      : null
  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length
  const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0

  useEffect(() => {
    if (!config || !hasTimer || !startedAt) return
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000)
      const remaining = Math.max(0, config.test.duration * 60 - elapsed)
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(interval)
        setShowSubmitModal(true)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [config, hasTimer, startedAt])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraError(false)
      }
    } catch {
      setCameraError(true)
      setCameraActive(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }, [])

  useEffect(() => {
    if (config?.features?.hasCamera) void startCamera()
    return () => stopCamera()
  }, [config, startCamera, stopCamera])

  const flushAnswer = useCallback(async (q: ExamQuestion, value: AnswerValue) => {
    const subTestId = q.sectionId
    if (!subTestId) return

    if (q.type === 'CHECKBOX' && (!value.selectedOptionIds || value.selectedOptionIds.length === 0))
      return
    if (
      q.type === 'MULTIPLE_CHOICE' &&
      (!value.selectedOptionIds || value.selectedOptionIds.length !== 1)
    )
      return
    if (q.type === 'ESSAY' && !value.essayAnswer?.trim()) return
    if (
      q.type === 'SCALE_RATING' &&
      (value.scaleValue === undefined || value.scaleValue === null)
    )
      return

    const payload: Record<string, unknown> = { questionId: q.id }
    if (q.type === 'ESSAY') payload.essayAnswer = value.essayAnswer ?? ''
    else if (q.type === 'SCALE_RATING') payload.scaleValue = value.scaleValue
    else payload.selectedOptionIds = value.selectedOptionIds ?? []

    try {
      if (!startedSubTestsRef.current.has(subTestId)) {
        try {
          await api.post(`/test-session/subtests/${subTestId}/start`)
        } catch {
          /* already started */
        }
        startedSubTestsRef.current.add(subTestId)
      }
      setSavingCount((c) => c + 1)
      await api.post(`/test-session/subtests/${subTestId}/answer`, payload)
      setLastSavedAt(Date.now())
    } catch {
      /* silent retry on next change / final submit */
    } finally {
      setSavingCount((c) => Math.max(0, c - 1))
    }
  }, [])

  const scheduleSave = useCallback(
    (q: ExamQuestion, value: AnswerValue) => {
      const key = q.id
      if (saveTimers.current[key]) clearTimeout(saveTimers.current[key])
      saveTimers.current[key] = setTimeout(() => {
        delete saveTimers.current[key]
        void flushAnswer(q, value)
      }, 600)
    },
    [flushAnswer],
  )

  const updateAnswer = useCallback(
    (q: ExamQuestion, value: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [q.id]: value }))
      scheduleSave(q, value)
    },
    [scheduleSave],
  )

  const handleSelectSingle = useCallback(
    (optionId: string) => {
      if (!question) return
      updateAnswer(question, { selectedOptionIds: [optionId] })
    },
    [question, updateAnswer],
  )

  const handleToggleCheckbox = useCallback(
    (optionId: string) => {
      if (!question) return
      const current = answers[question.id]?.selectedOptionIds ?? []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      updateAnswer(question, { selectedOptionIds: next })
    },
    [question, answers, updateAnswer],
  )

  const handleSelectScale = useCallback(
    (value: number) => {
      if (!question) return
      updateAnswer(question, { scaleValue: value })
    },
    [question, updateAnswer],
  )

  const handleEssayChange = useCallback(
    (text: string) => {
      if (!question) return
      updateAnswer(question, { essayAnswer: text })
    },
    [question, updateAnswer],
  )

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) setCurrentIdx((i) => i + 1)
    else setShowSubmitModal(true)
  }, [currentIdx, questions.length])

  const handleBack = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1)
  }, [currentIdx])

  const handleJumpTo = useCallback((idx: number) => {
    setCurrentIdx(idx)
  }, [])

  const handleConfirmSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      for (const [qId, ans] of Object.entries(answers)) {
        if (saveTimers.current[qId]) {
          clearTimeout(saveTimers.current[qId])
          delete saveTimers.current[qId]
          const q = questions.find((qq) => qq.id === qId)
          if (q) await flushAnswer(q, ans)
        }
      }

      const payloadAnswers: Record<string, string | string[]> = {}
      for (const [qId, ans] of Object.entries(answers)) {
        const q = questions.find((qq) => qq.id === qId)
        if (!q) continue
        if (q.type === 'ESSAY') {
          if (ans.essayAnswer?.trim()) payloadAnswers[qId] = ans.essayAnswer
        } else if (q.type === 'SCALE_RATING') {
          if (ans.scaleValue !== undefined && ans.scaleValue !== null)
            payloadAnswers[qId] = String(ans.scaleValue)
        } else if (q.type === 'CHECKBOX') {
          if (ans.selectedOptionIds?.length) payloadAnswers[qId] = ans.selectedOptionIds
        } else {
          if (ans.selectedOptionIds?.[0]) payloadAnswers[qId] = ans.selectedOptionIds[0]
        }
      }

      const res = await api.post(`/tests/${testId}/submit`, { answers: payloadAnswers })
      stopCamera()
      setShowSubmitModal(false)
      router.push(`/tes/${testId}/result/${res.data.data.testResult.id}`)
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e?.response?.data?.message ?? 'Gagal mengirim jawaban. Coba lagi.')
      setSubmitting(false)
      setShowSubmitModal(false)
    }
  }, [testId, answers, questions, flushAnswer, stopCamera, router])

  const questionsBySection = hasSections
    ? sections.map((s) => ({
        section: s,
        questions: questions
          .map((q, idx) => ({ ...q, globalIdx: idx }))
          .filter((q) => q.sectionId === s.id),
      }))
    : [
        {
          section: null as { id: string; name: string } | null,
          questions: questions.map((q, idx) => ({ ...q, globalIdx: idx })),
        },
      ]

  const isTimeLow = hasTimer && timeLeft < 300

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 text-primary-600 animate-spin" />
          <p className="text-sm font-bold text-slate-500">Memuat tes...</p>
        </div>
      </div>
    )
  }

  if (error || !config || !question) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center flex flex-col items-center max-w-md">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <AlertTriangle className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">{error ?? 'Tes tidak ditemukan'}</p>
          <p className="text-slate-400 font-medium text-sm mb-6">
            Pastikan tes sudah dipublikasi dan paket sudah kamu miliki.
          </p>
          <button
            onClick={() => router.back()}
            className="h-12 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-sm transition-colors"
          >
            <ArrowLeft className="size-4 mr-2 inline" /> Kembali
          </button>
        </div>
      </div>
    )
  }

  const currentAns = answers[question.id]
  const currentAnswered = isAnswered(question, currentAns)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-700 via-primary-700 to-primary-800 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between mb-3 gap-3">
            <button
              onClick={() => setShowExitDialog(true)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
            >
              <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="size-4" />
              </div>
              <span className="text-sm font-bold hidden md:inline">Keluar</span>
            </button>

            {hasTimer ? (
              <div
                className={cn(
                  'flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-sm font-mono',
                  isTimeLow
                    ? 'bg-rose-500/25 border border-rose-300/40'
                    : 'bg-white/10 border border-white/10',
                )}
              >
                <Clock
                  className={cn(
                    'size-4',
                    isTimeLow ? 'text-rose-300 animate-pulse' : 'text-amber-300',
                  )}
                />
                <span
                  className={cn(
                    'text-base md:text-lg font-black tracking-wider',
                    isTimeLow ? 'text-rose-200' : 'text-white',
                  )}
                >
                  {formatTimer(timeLeft)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Clock className="size-4 text-amber-300" />
                <span className="text-xs font-black tracking-wider text-white/90">
                  Tanpa Batas
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {currentSection && (
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-300/30">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 truncate max-w-[120px]">
                    {currentSection.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Brain className="size-4 text-amber-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {currentIdx + 1}/{questions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-amber-400 transition-[width] duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {(savingCount > 0 || lastSavedAt) && (
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-white/70">
              {savingCount > 0 ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="size-3 text-amber-300" />
                  <span>Tersimpan otomatis</span>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              <div className="px-6 md:px-8 py-5 border-b border-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                    <Hash className="size-5 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Pertanyaan {currentIdx + 1}
                    </p>
                    <p className="text-xs text-slate-400 font-medium truncate">
                      {answeredCount} dari {questions.length} dijawab
                    </p>
                  </div>
                </div>
                {question.type === 'CHECKBOX' && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                    Pilih lebih dari satu
                  </span>
                )}
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-lg md:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  {question.text}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {question.type === 'SCALE_RATING' ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Pilih skala yang sesuai
                  </p>
                  {question.options.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {question.options.map((opt) => {
                        const isSelected = String(currentAns?.scaleValue ?? '') === opt.id
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectScale(Number(opt.id))}
                            className={cn(
                              'w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all font-medium text-sm',
                              isSelected
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-slate-100 bg-white text-slate-600 hover:border-primary-200 hover:bg-slate-50',
                            )}
                          >
                            {opt.text}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        {[1, 2, 3, 4, 5].map((val) => {
                          const isSelected = currentAns?.scaleValue === val
                          return (
                            <button
                              key={val}
                              onClick={() => handleSelectScale(val)}
                              className={cn(
                                'size-12 md:size-14 rounded-xl font-black text-base md:text-lg transition-all',
                                isSelected
                                  ? 'bg-primary-600 text-white shadow-lg scale-110'
                                  : 'bg-slate-50 text-slate-500 hover:bg-primary-50 hover:text-primary-600 border border-slate-200',
                              )}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                        <span>Sangat Tidak Setuju</span>
                        <span>Sangat Setuju</span>
                      </div>
                    </>
                  )}
                </div>
              ) : question.type === 'ESSAY' ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
                  <textarea
                    value={currentAns?.essayAnswer ?? ''}
                    onChange={(e) => handleEssayChange(e.target.value)}
                    placeholder="Tulis jawaban kamu di sini..."
                    className="w-full h-40 p-4 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
                  />
                </div>
              ) : (
                question.options.map((opt, idx) => {
                  const selectedIds = currentAns?.selectedOptionIds ?? []
                  const isSelected = selectedIds.includes(opt.id)
                  const isCheckbox = question.type === 'CHECKBOX'
                  const label = String.fromCharCode(65 + idx)
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        isCheckbox ? handleToggleCheckbox(opt.id) : handleSelectSingle(opt.id)
                      }
                      className={cn(
                        'w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-colors duration-200 group flex items-center gap-4',
                        isSelected
                          ? 'border-primary-500 bg-primary-50/60 shadow-sm'
                          : 'border-slate-100 bg-white hover:border-primary-200 hover:bg-slate-50',
                      )}
                    >
                      <span
                        className={cn(
                          'size-9 md:size-10 flex items-center justify-center text-sm font-black transition-colors shrink-0',
                          isCheckbox ? 'rounded-lg' : 'rounded-xl',
                          isSelected
                            ? 'bg-primary-600 text-white'
                            : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600',
                        )}
                      >
                        {isCheckbox ? (
                          isSelected ? <CheckCircle2 className="size-4" /> : ''
                        ) : (
                          label
                        )}
                      </span>
                      <span
                        className={cn(
                          'font-medium flex-1 text-sm md:text-base',
                          isSelected ? 'text-slate-900' : 'text-slate-600',
                        )}
                      >
                        {opt.text}
                      </span>
                      {isSelected && !isCheckbox && (
                        <CheckCircle2 className="size-5 text-primary-600 shrink-0" />
                      )}
                    </button>
                  )
                })
              )}
            </div>

            <div className="flex justify-between pt-2 gap-3">
              <button
                onClick={handleBack}
                disabled={currentIdx === 0}
                className={cn(
                  'h-12 px-5 md:px-6 rounded-xl font-black text-sm flex items-center gap-2 transition-colors',
                  currentIdx === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-300 bg-white border border-slate-100'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <ArrowLeft className="size-4" />{' '}
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              <button
                onClick={handleNext}
                className={cn(
                  'h-12 px-6 md:px-8 rounded-xl font-black text-sm flex items-center gap-2 transition-all',
                  currentAnswered || currentIdx === questions.length - 1
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm active:scale-95'
                    : 'bg-slate-200 text-slate-500',
                )}
              >
                {currentIdx === questions.length - 1 ? (
                  <>
                    <CheckCircle2 className="size-4" /> Selesai & Kirim
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <span className="sm:hidden">Lanjut</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {config.features?.hasCamera && (
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'size-10 rounded-xl flex items-center justify-center',
                        cameraActive
                          ? 'bg-emerald-50 border border-emerald-100'
                          : 'bg-rose-50 border border-rose-100',
                      )}
                    >
                      {cameraActive ? (
                        <Camera className="size-5 text-emerald-600" />
                      ) : (
                        <CameraOff className="size-5 text-rose-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Kamera</h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {cameraActive
                          ? 'Aktif — Proctoring'
                          : cameraError
                            ? 'Tidak tersedia'
                            : 'Memuat...'}
                      </p>
                    </div>
                  </div>
                  {cameraActive && (
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                        Live
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3]">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={cn('w-full h-full object-cover', !cameraActive && 'hidden')}
                    />
                    {!cameraActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                        <CameraOff className="size-8 mb-2" />
                        <p className="text-xs font-bold">
                          {cameraError ? 'Kamera tidak diizinkan' : 'Memuat kamera...'}
                        </p>
                        {cameraError && (
                          <button
                            onClick={startCamera}
                            className="mt-3 text-[10px] font-black text-amber-300 hover:text-amber-200 uppercase tracking-widest"
                          >
                            Coba Lagi
                          </button>
                        )}
                      </div>
                    )}
                    {cameraActive && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <Eye className="size-3 text-emerald-300" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">
                          Proctoring
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden lg:sticky lg:top-28">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <Brain className="size-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Navigasi Soal</h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {answeredCount}/{questions.length} dijawab
                  </p>
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {questionsBySection.map((group, gi) => (
                  <div key={gi}>
                    {group.section && (
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        {group.section.name}
                      </p>
                    )}
                    <div className="grid grid-cols-5 gap-2">
                      {group.questions.map((q) => {
                        const answered = isAnswered(q, answers[q.id])
                        const isCurrent = q.globalIdx === currentIdx
                        return (
                          <button
                            key={q.id}
                            onClick={() => handleJumpTo(q.globalIdx)}
                            className={cn(
                              'size-10 rounded-xl text-xs font-black transition-all',
                              isCurrent
                                ? 'bg-primary-600 text-white shadow-md scale-105'
                                : answered
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                                  : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100',
                            )}
                          >
                            {q.globalIdx + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded bg-primary-600" />
                    <span className="text-[10px] font-bold text-slate-500">Sekarang</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded bg-emerald-50 border border-emerald-200" />
                    <span className="text-[10px] font-bold text-slate-500">Dijawab</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded bg-slate-50 border border-slate-200" />
                    <span className="text-[10px] font-bold text-slate-500">Belum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showSubmitModal && (
        <ExamSubmitModal
          answeredCount={answeredCount}
          totalQuestions={questions.length}
          onCancel={() => !submitting && setShowSubmitModal(false)}
          onConfirm={handleConfirmSubmit}
        />
      )}

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden">
          <div className="p-6 pt-7">
            <div className="flex items-start gap-3 mb-1">
              <div className="size-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="size-6 text-amber-600" />
              </div>
              <DialogHeader className="text-left">
                <DialogTitle className="text-lg font-black text-slate-900">
                  Yakin ingin keluar?
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 mt-1">
                  Jawaban kamu tersimpan otomatis. Kamu bisa melanjutkan tes ini nanti dari posisi
                  terakhir.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex-col-reverse sm:flex-row gap-2">
            <button
              onClick={() => setShowExitDialog(false)}
              className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              Lanjut Kerjakan
            </button>
            <button
              onClick={() => {
                stopCamera()
                setShowExitDialog(false)
                router.push('/pengguna/paket-saya')
              }}
              className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <X className="size-4" />
              Keluar Tes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
