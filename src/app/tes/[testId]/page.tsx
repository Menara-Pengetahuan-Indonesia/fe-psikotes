'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
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
  Sparkles,
  PlayCircle,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/axios'
import { Skeleton } from '@/components/ui/skeleton'
import { TestInstructionBody } from '@/features/psikotes/components/test-instruction-body'
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
  // Build the global question order by concatenating each section's questions
  // in order. We CANNOT sort by `question.order` globally because that field
  // is reset per subtest (each subtest starts at 1), and a global sort would
  // interleave questions across subtests.
  const flat: ExamQuestion[] = []
  // Stand-alone questions not attached to a section come first (rare, but
  // possible). Sorted by their own order.
  flat.push(...[...config.questions].sort((a, b) => a.order - b.order))
  const sectionsSorted = [...config.sections].sort((a, b) => a.order - b.order)
  for (const s of sectionsSorted) {
    flat.push(...[...s.questions].sort((a, b) => a.order - b.order))
  }
  return flat
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
  const queryClient = useQueryClient()
  const testId = params.testId as string

  const [config, setConfig] = useState<TestConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [sessionStatus, setSessionStatus] = useState<'NOT_STARTED' | 'IN_PROGRESS'>('NOT_STARTED')
  const [startingSession, setStartingSession] = useState(false)

  // Subtest-by-subtest gating. `activeSectionIdx` points into the sorted
  // sections array. Sections before it are sealed (read-only); the active
  // section is editable; sections after it are locked. When the user finishes
  // the last question of the active section, `pendingNextSectionIdx` is set,
  // showing the intermission screen.
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)
  const [pendingNextSectionIdx, setPendingNextSectionIdx] = useState<number | null>(null)

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

  // Hydrate exam state (answers, timer, current question, active section)
  // once we know when the session was started. Used both on resume
  // (IN_PROGRESS) and right after the user clicks "Mulai Mengerjakan".
  const hydrateExamState = useCallback(
    (cfg: TestConfig, savedMap: AnswersMap, startedMs: number) => {
      setAnswers(savedMap)
      setStartedAt(startedMs)

      if (cfg.test.duration > 0) {
        const elapsed = Math.floor((Date.now() - startedMs) / 1000)
        const remaining = Math.max(0, cfg.test.duration * 60 - elapsed)
        setTimeLeft(remaining)
      }

      const qs = getAllQuestions(cfg)
      const sortedSections = [...cfg.sections].sort((a, b) => a.order - b.order)

      // Determine the active section on resume: the first section that still
      // has at least one unanswered question. Sections before that are
      // considered sealed (already finished). If every section is fully
      // answered, point to the last one so the user can submit.
      let activeIdx = 0
      if (sortedSections.length > 0) {
        const firstIncomplete = sortedSections.findIndex((s) =>
          s.questions.some((q) => !isAnswered(q, savedMap[q.id])),
        )
        activeIdx =
          firstIncomplete === -1 ? sortedSections.length - 1 : firstIncomplete
      }
      setActiveSectionIdx(activeIdx)

      // Place cursor at the first unanswered question within the active
      // section, falling back to its first question.
      const activeSection = sortedSections[activeIdx]
      let cursor = 0
      if (activeSection) {
        const firstUnanswered = activeSection.questions.find(
          (q) => !isAnswered(q, savedMap[q.id]),
        )
        const target = firstUnanswered ?? activeSection.questions[0]
        cursor = target ? qs.findIndex((q) => q.id === target.id) : 0
      } else {
        const firstUnansweredIdx = qs.findIndex(
          (q) => !isAnswered(q, savedMap[q.id]),
        )
        cursor = firstUnansweredIdx === -1 ? 0 : firstUnansweredIdx
      }
      setCurrentIdx(cursor < 0 ? 0 : cursor)
    },
    [],
  )

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

        setConfig(cfg)

        // If user already started the test (IN_PROGRESS), skip the intro and
        // hydrate exam state. Otherwise, leave sessionStatus as NOT_STARTED so
        // the intro screen shows and the timer/session won't begin until the
        // user clicks "Mulai Mengerjakan".
        if (state.status === 'IN_PROGRESS') {
          const startedMs = state.startedAt
            ? new Date(state.startedAt).getTime()
            : Date.now()
          setSessionStatus('IN_PROGRESS')
          hydrateExamState(cfg, savedMap, startedMs)
        } else {
          // Stash any saved answers (in case BE has them) but don't start timer.
          setAnswers(savedMap)
          setSessionStatus('NOT_STARTED')
        }
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
  }, [testId, router, hydrateExamState])

  const handleStartSession = useCallback(async () => {
    if (!config || startingSession) return
    setStartingSession(true)
    try {
      const startRes = await api.post(`/test-session/tests/${testId}/start`)
      const startedAtIso: string = startRes.data.data?.startedAt ?? new Date().toISOString()
      const startedMs = new Date(startedAtIso).getTime()
      hydrateExamState(config, answers, startedMs)
      setSessionStatus('IN_PROGRESS')
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e?.response?.data?.message ?? 'Gagal memulai tes. Coba lagi.')
    } finally {
      setStartingSession(false)
    }
  }, [config, answers, testId, startingSession, hydrateExamState])

  const questions = useMemo(() => (config ? getAllQuestions(config) : []), [config])
  const question = questions[currentIdx]
  const sortedSections = useMemo(
    () => (config ? [...config.sections].sort((a, b) => a.order - b.order) : []),
    [config],
  )
  const hasSections = sortedSections.length > 0
  const hasTimer = (config?.test.duration ?? 0) > 0
  const activeSection = hasSections ? sortedSections[activeSectionIdx] ?? null : null
  // Counts within the active section (used in the header and sidebar).
  const activeSectionQuestionIds = useMemo(
    () => new Set(activeSection?.questions.map((q) => q.id) ?? []),
    [activeSection],
  )
  const activeSectionTotal = activeSection?.questions.length ?? 0
  // Cursor position within active section (1-based, for the header label).
  const cursorInActiveSection = activeSection
    ? activeSection.questions.findIndex((q) => q.id === question?.id) + 1
    : 0
  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length
  const progress =
    activeSectionTotal > 0 ? (cursorInActiveSection / activeSectionTotal) * 100 : 0

  // Convenience helpers for section gating in the sidebar.
  const isSectionSealed = useCallback(
    (sectionIdx: number) => sectionIdx < activeSectionIdx,
    [activeSectionIdx],
  )
  const isSectionLocked = useCallback(
    (sectionIdx: number) => sectionIdx > activeSectionIdx,
    [activeSectionIdx],
  )

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
    // Only start the camera once the user has actually begun the test, so the
    // proctoring permission isn't requested on the intro/instruction screen.
    if (sessionStatus !== 'IN_PROGRESS') return
    if (config?.features?.hasCamera) void startCamera()
    return () => stopCamera()
  }, [config, sessionStatus, startCamera, stopCamera])

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

  // Index of the active section's last question in the global flat array.
  const activeSectionLastGlobalIdx = useMemo(() => {
    if (!activeSection) return questions.length - 1
    const lastQ = activeSection.questions[activeSection.questions.length - 1]
    if (!lastQ) return questions.length - 1
    return questions.findIndex((q) => q.id === lastQ.id)
  }, [activeSection, questions])
  const activeSectionFirstGlobalIdx = useMemo(() => {
    if (!activeSection) return 0
    const firstQ = activeSection.questions[0]
    if (!firstQ) return 0
    return questions.findIndex((q) => q.id === firstQ.id)
  }, [activeSection, questions])

  const isLastSection = hasSections
    ? activeSectionIdx >= sortedSections.length - 1
    : true

  const handleNext = useCallback(() => {
    // If we have sections and the user is on the last question of the active
    // section, either show the intermission for the next section, or open the
    // submit modal if this was the final section.
    if (hasSections && currentIdx >= activeSectionLastGlobalIdx) {
      if (isLastSection) {
        setShowSubmitModal(true)
      } else {
        setPendingNextSectionIdx(activeSectionIdx + 1)
      }
      return
    }
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
    } else {
      setShowSubmitModal(true)
    }
  }, [
    hasSections,
    currentIdx,
    activeSectionLastGlobalIdx,
    isLastSection,
    activeSectionIdx,
    questions.length,
  ])

  const handleBack = useCallback(() => {
    // Don't allow stepping back past the start of the active section — sealed
    // sections are read-only.
    const minIdx = hasSections ? activeSectionFirstGlobalIdx : 0
    if (currentIdx > minIdx) setCurrentIdx((i) => i - 1)
  }, [currentIdx, hasSections, activeSectionFirstGlobalIdx])

  const handleJumpTo = useCallback(
    (idx: number) => {
      // Ignore jumps outside the active section. Sealed/locked sections are
      // not navigable.
      const target = questions[idx]
      if (!target) return
      if (hasSections && !activeSectionQuestionIds.has(target.id)) return
      setCurrentIdx(idx)
    },
    [questions, hasSections, activeSectionQuestionIds],
  )

  const handleAdvanceToNextSection = useCallback(() => {
    if (pendingNextSectionIdx === null) return
    const nextIdx = pendingNextSectionIdx
    const nextSection = sortedSections[nextIdx]
    if (!nextSection) {
      setPendingNextSectionIdx(null)
      return
    }
    setActiveSectionIdx(nextIdx)
    // Place cursor at first unanswered question of the new section, or its
    // first question if all already answered.
    const firstUnanswered =
      nextSection.questions.find((q) => !isAnswered(q, answers[q.id])) ??
      nextSection.questions[0]
    if (firstUnanswered) {
      const globalIdx = questions.findIndex((q) => q.id === firstUnanswered.id)
      if (globalIdx >= 0) setCurrentIdx(globalIdx)
    }
    setPendingNextSectionIdx(null)
  }, [pendingNextSectionIdx, sortedSections, answers, questions])

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
      await queryClient.invalidateQueries({ queryKey: ['catalog', 'my-packages'] })
      router.push(`/tes/${testId}/result/${res.data.data.testResult.id}`)
    } catch (err: unknown) {
      // The BE submit can be slow (heavy DB work), and the Next.js dev proxy
      // may reset the connection before the BE actually finishes. Often the
      // submit DID succeed server-side. Poll the state endpoint a few times
      // to recover from this case before showing an error.
      let recovered = false
      for (let attempt = 0; attempt < 6; attempt++) {
        await new Promise((r) => setTimeout(r, 2000))
        try {
          const stateRes = await api.get(
            `/test-session/tests/${testId}/state`,
          )
          const state = stateRes.data?.data
          if (state?.status === 'COMPLETED' && state?.resultId) {
            stopCamera()
            setShowSubmitModal(false)
            await queryClient.invalidateQueries({
              queryKey: ['catalog', 'my-packages'],
            })
            router.push(`/tes/${testId}/result/${state.resultId}`)
            recovered = true
            break
          }
        } catch {
          /* keep polling */
        }
      }
      if (!recovered) {
        const e = err as { response?: { data?: { message?: string } } }
        setError(
          e?.response?.data?.message ??
            'Gagal mengirim jawaban. Jawabanmu mungkin sudah tersimpan — coba muat ulang halaman.',
        )
        setSubmitting(false)
        setShowSubmitModal(false)
      }
    }
  }, [testId, answers, questions, flushAnswer, stopCamera, router, queryClient])

  const questionsBySection = hasSections
    ? sortedSections.map((s) => ({
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
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header skeleton — mirroring sticky exam header */}
        <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-700 via-primary-700 to-primary-800 text-white shadow-lg">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-xl bg-white/15" />
                <Skeleton className="hidden md:block h-4 w-12 rounded-md bg-white/15" />
              </div>
              <Skeleton className="h-9 md:h-10 w-28 md:w-32 rounded-full bg-white/15" />
              <div className="flex items-center gap-2">
                <Skeleton className="hidden md:block h-8 w-24 rounded-full bg-white/15" />
                <Skeleton className="h-8 w-16 rounded-full bg-white/15" />
              </div>
            </div>
            <Skeleton className="w-full h-1.5 rounded-full bg-white/15" />
          </div>
        </header>

        {/* Main skeleton — mirroring 12-col grid */}
        <main className="flex-grow max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Question card */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                <div className="px-6 md:px-8 py-5 border-b border-slate-50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Skeleton className="size-10 rounded-xl shrink-0" />
                    <div className="min-w-0 space-y-1.5">
                      <Skeleton className="h-3 w-24 rounded-md" />
                      <Skeleton className="h-3 w-32 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-16 rounded-full" />
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  <div className="space-y-2.5">
                    <Skeleton className="h-5 w-5/6 rounded-lg" />
                    <Skeleton className="h-5 w-3/4 rounded-lg" />
                    <Skeleton className="h-5 w-2/3 rounded-lg" />
                  </div>

                  <div className="space-y-3 pt-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100"
                      >
                        <Skeleton className="size-5 rounded-full shrink-0" />
                        <Skeleton className="h-4 flex-1 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 md:px-8 py-4 border-t border-slate-50 flex items-center justify-between gap-3">
                  <Skeleton className="h-11 w-28 rounded-2xl" />
                  <Skeleton className="h-11 w-32 rounded-2xl" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3.5 w-20 rounded-md" />
                    <Skeleton className="h-2.5 w-28 rounded-md" />
                  </div>
                </div>
                <Skeleton className="aspect-video w-full rounded-2xl" />
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-xl" />
                  <Skeleton className="h-4 w-32 rounded-md" />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !config || !question) {
    // Only treat missing `question` as an error AFTER the user has started the
    // session. While we're still on the intro screen, `question` will be
    // undefined by design (we haven't dropped the user into the exam yet).
    if (!error && config && sessionStatus === 'NOT_STARTED') {
      // fall through to intro screen below
    } else {
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
  }

  // Intro / instruction screen — shown before the user actually starts the
  // test. Uses the same instruction body as the "Siap memulai tes?" modal in
  // Paket Saya, so the experience is consistent regardless of entry point.
  if (config && sessionStatus === 'NOT_STARTED') {
    const totalQuestions = getAllQuestions(config).length
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <div className="size-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <ArrowLeft className="size-4" />
              </div>
              <span className="text-sm font-bold hidden md:inline">Kembali</span>
            </button>
          </div>
        </header>

        <main className="flex-grow max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10 w-full">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {/* Hero header */}
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 md:px-8 pt-7 md:pt-9 pb-6 md:pb-8 text-white overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute top-[-40px] right-[-30px] w-44 h-44 bg-amber-400/25 rounded-full blur-2xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3" />
                  Siap dimulai
                </div>
                <h1 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {config.test.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
                    <Hash className="w-3 h-3" />
                    {totalQuestions} pertanyaan
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3" />
                    {config.test.duration > 0
                      ? `${config.test.duration} menit`
                      : 'Tanpa batas waktu'}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 py-6 md:py-7">
              <TestInstructionBody description={config.test.description} />
            </div>

            {/* Footer / actions */}
            <div className="px-6 md:px-8 py-4 bg-slate-50/60 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleStartSession}
                disabled={startingSession}
                className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {startingSession ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memulai...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    Mulai Mengerjakan
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Intermission screen — shown after the user finishes a section's last
  // question and before the next section starts. Tells them what's coming up.
  if (
    config &&
    sessionStatus === 'IN_PROGRESS' &&
    pendingNextSectionIdx !== null &&
    sortedSections[pendingNextSectionIdx]
  ) {
    const nextSection = sortedSections[pendingNextSectionIdx]
    const totalSections = sortedSections.length
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span className="text-sm font-bold">
                Subtes {activeSectionIdx + 1} selesai
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10 w-full">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 md:px-8 pt-7 md:pt-9 pb-6 md:pb-8 text-white overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute top-[-40px] right-[-30px] w-44 h-44 bg-amber-400/25 rounded-full blur-2xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3" />
                  Subtes {pendingNextSectionIdx + 1} dari {totalSections}
                </div>
                <h1 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {nextSection.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
                    <Hash className="w-3 h-3" />
                    {nextSection.questions.length} pertanyaan
                  </span>
                  {nextSection.duration && nextSection.duration > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      {nextSection.duration} menit
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-6 md:py-7 space-y-4">
              {nextSection.description?.trim() ? (
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
                    Tentang Subtes Ini
                  </p>
                  <div className="rounded-2xl bg-primary-50/60 border border-primary-100 px-4 py-3.5">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {nextSection.description}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 leading-relaxed">
                  Bagian sebelumnya sudah tersimpan dan tidak bisa diubah lagi.
                  Lanjutkan ke subtes berikutnya kapan kamu siap.
                </p>
              )}
            </div>

            <div className="px-6 md:px-8 py-4 bg-slate-50/60 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-2">
              <div className="hidden sm:block sm:flex-1" />
              <button
                type="button"
                onClick={handleAdvanceToNextSection}
                className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md inline-flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                Mulai Subtes {pendingNextSectionIdx + 1}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
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
              {hasSections && activeSection && (
                <div className="hidden md:flex flex-col items-end px-3 py-1.5 rounded-xl bg-amber-400/20 backdrop-blur-sm border border-amber-300/30 leading-tight">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-200/80">
                    Subtes {activeSectionIdx + 1}/{sortedSections.length}
                  </span>
                  <span className="text-[11px] font-black text-amber-100 truncate max-w-[160px]">
                    {activeSection.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Brain className="size-4 text-amber-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {hasSections
                    ? `${cursorInActiveSection}/${activeSectionTotal}`
                    : `${currentIdx + 1}/${questions.length}`}
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
                  {question.options.length > 0 && question.options.some((o) => o.text?.trim()) ? (
                    <div className="flex flex-col gap-2">
                      {question.options.map((opt) => {
                        const isSelected = currentAns?.scaleValue === opt.order
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectScale(opt.order)}
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
                disabled={
                  hasSections
                    ? currentIdx <= activeSectionFirstGlobalIdx
                    : currentIdx === 0
                }
                className={cn(
                  'h-12 px-5 md:px-6 rounded-xl font-black text-sm flex items-center gap-2 transition-colors',
                  (hasSections
                    ? currentIdx <= activeSectionFirstGlobalIdx
                    : currentIdx === 0)
                    ? 'opacity-40 cursor-not-allowed text-slate-300 bg-white border border-slate-100'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <ArrowLeft className="size-4" />{' '}
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              {(() => {
                const isLastQOfActive = hasSections
                  ? currentIdx >= activeSectionLastGlobalIdx
                  : currentIdx === questions.length - 1
                const isFinalQuestion = hasSections
                  ? isLastSection && isLastQOfActive
                  : currentIdx === questions.length - 1
                const ctaActive = currentAnswered || isFinalQuestion

                return (
                  <button
                    onClick={handleNext}
                    className={cn(
                      'h-12 px-6 md:px-8 rounded-xl font-black text-sm flex items-center gap-2 transition-all',
                      ctaActive
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm active:scale-95'
                        : 'bg-slate-200 text-slate-500',
                    )}
                  >
                    {isFinalQuestion ? (
                      <>
                        <CheckCircle2 className="size-4" /> Selesai & Kirim
                      </>
                    ) : isLastQOfActive ? (
                      <>
                        <CheckCircle2 className="size-4" />
                        <span className="hidden sm:inline">
                          Selesai Subtes {activeSectionIdx + 1}
                        </span>
                        <span className="sm:hidden">Selesai Subtes</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Selanjutnya</span>
                        <span className="sm:hidden">Lanjut</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                )
              })()}
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
                {questionsBySection.map((group, gi) => {
                  const sealed = hasSections && isSectionSealed(gi)
                  const locked = hasSections && isSectionLocked(gi)
                  const isActive = hasSections && gi === activeSectionIdx
                  const sectionAnswered = group.questions.filter((q) =>
                    isAnswered(q, answers[q.id]),
                  ).length
                  return (
                    <div key={gi}>
                      {group.section && (
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {sealed && (
                              <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                            )}
                            {locked && (
                              <Lock className="size-3 text-slate-300 shrink-0" />
                            )}
                            <p
                              className={cn(
                                'text-[10px] font-black uppercase tracking-widest truncate',
                                isActive
                                  ? 'text-primary-600'
                                  : sealed
                                    ? 'text-emerald-600'
                                    : 'text-slate-400',
                              )}
                            >
                              {group.section.name}
                            </p>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 shrink-0">
                            {sectionAnswered}/{group.questions.length}
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-5 gap-2">
                        {group.questions.map((q, qi) => {
                          const answered = isAnswered(q, answers[q.id])
                          const isCurrent = q.globalIdx === currentIdx
                          const disabled = sealed || locked
                          return (
                            <button
                              key={q.id}
                              onClick={() => handleJumpTo(q.globalIdx)}
                              disabled={disabled}
                              className={cn(
                                'size-10 rounded-xl text-xs font-black transition-all',
                                isCurrent
                                  ? 'bg-primary-600 text-white shadow-md scale-105'
                                  : sealed
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed opacity-80'
                                    : locked
                                      ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                                      : answered
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                                        : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100',
                              )}
                            >
                              {/* Show 1-based index within the section, not the global index. */}
                              {qi + 1}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

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
                  {hasSections && (
                    <div className="flex items-center gap-1.5">
                      <Lock className="size-3 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-500">Terkunci</span>
                    </div>
                  )}
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
