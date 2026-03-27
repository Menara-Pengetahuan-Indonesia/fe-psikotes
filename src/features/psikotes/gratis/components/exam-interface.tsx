'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Brain, Hash, Clock, Camera, CameraOff, Eye, Lock, History } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { MockQuestion, MockSection } from '@/features/psikotes/constants'
import { ExamSubmitModal } from './exam-submit-modal'
import { MOCK_QUESTIONS } from '../constants'

interface ExamInterfaceProps {
  slug?: string
  totalQuestions?: number
  questions?: MockQuestion[]
  sections?: MockSection[]
  backHref?: string
  resultHref?: string
  duration?: number // in minutes
}

function formatTimer(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}d`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}d` : `${m}m`
}

export function ExamInterface({
  slug = '',
  totalQuestions = 5,
  questions: questionsProp,
  sections: sectionsProp,
  backHref,
  resultHref,
  duration = 30,
}: ExamInterfaceProps) {
  const questions = questionsProp ?? MOCK_QUESTIONS.slice(0, totalQuestions)
  const sections = sectionsProp ?? []
  const hasSections = sections.length > 0

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // Timer
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [questionStartTime, setQuestionStartTime] = useState(0)
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({})

  // Activity log
  const [activityLog, setActivityLog] = useState<{ questionNum: number; label: string; time: string; duration: number }[]>([])

  // Camera
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(false)

  const question = questions[currentIdx]
  const progress = ((currentIdx + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  // Section tracking
  const currentSection = hasSections ? sections.find((s) => s.id === question.sectionId) : null
  const prevQuestion = currentIdx > 0 ? questions[currentIdx - 1] : null
  const isNewSection = hasSections && (!prevQuestion || prevQuestion.sectionId !== question.sectionId)
  const [showSectionIntro, setShowSectionIntro] = useState(false)
  const [introSection, setIntroSection] = useState<MockSection | null>(null)

  // Group questions by section for navigator
  const questionsBySection = hasSections
    ? sections.map((s) => ({
        section: s,
        questions: questions.map((q, idx) => ({ ...q, globalIdx: idx })).filter((q) => q.sectionId === s.id),
      }))
    : [{ section: null, questions: questions.map((q, idx) => ({ ...q, globalIdx: idx })) }]

  // Initialize questionStartTime on client
  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setShowSubmitModal(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Camera setup
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: 'user' } })
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
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  // Track time per question
  const recordQuestionTime = () => {
    const elapsed = Math.round((Date.now() - questionStartTime) / 1000)
    setQuestionTimes((prev) => ({
      ...prev,
      [question.id]: (prev[question.id] ?? 0) + elapsed,
    }))
  }

  const handleSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx)
    setAnswers((prev) => ({ ...prev, [question.id]: optionIdx }))
  }

  const handleNext = () => {
    if (selectedOption === null) return
    recordQuestionTime()

    // Log activity
    const elapsed = Math.round((Date.now() - questionStartTime) / 1000)
    const selectedLabel = question.options[selectedOption]?.label ?? '?'
    const selectedText = question.options[selectedOption]?.text ?? ''
    const now = new Date()
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    setActivityLog((prev) => [
      {
        questionNum: currentIdx + 1,
        label: `${selectedLabel}. ${selectedText}`,
        time: timeStr,
        duration: elapsed,
      },
      ...prev,
    ])

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1
      const nextQuestion = questions[nextIdx]

      // Check if entering a new section
      if (hasSections && nextQuestion.sectionId !== question.sectionId) {
        const nextSec = sections.find((s) => s.id === nextQuestion.sectionId)
        if (nextSec) {
          setIntroSection(nextSec)
          setShowSectionIntro(true)
        }
      }

      setCurrentIdx(nextIdx)
      setSelectedOption(answers[nextQuestion.id] ?? null)
      setQuestionStartTime(Date.now())
    } else {
      setShowSubmitModal(true)
    }
  }

  const handleBack = () => {
    if (currentIdx > 0) {
      recordQuestionTime()
      setCurrentIdx((prev) => prev - 1)
      const prevId = questions[currentIdx - 1].id
      setSelectedOption(answers[prevId] ?? null)
      setQuestionStartTime(Date.now())
    }
  }

  const handleJumpTo = (idx: number) => {
    recordQuestionTime()
    setCurrentIdx(idx)
    const qId = questions[idx].id
    setSelectedOption(answers[qId] ?? null)
    setQuestionStartTime(Date.now())
  }

  const handleConfirmSubmit = () => {
    stopCamera()
    setShowSubmitModal(false)
    window.location.href = resultHref ?? `/psikotes/gratis/${slug}/result`
  }

  const resolvedBackHref = backHref ?? `/psikotes/gratis/${slug}`
  const isTimeLow = timeLeft < 300

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { if (confirm('Yakin ingin keluar? Progress akan hilang.')) window.location.href = resolvedBackHref }}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="size-4" />
              </div>
              <span className="text-sm font-bold hidden md:inline">Keluar</span>
            </button>

            {/* Timer */}
            <div className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-sm font-mono',
              isTimeLow ? 'bg-rose-500/20 border border-rose-400/30' : 'bg-white/10 border border-white/10'
            )}>
              <Clock className={cn('size-4', isTimeLow ? 'text-rose-400 animate-pulse' : 'text-teal-300')} />
              <span className={cn('text-lg font-black tracking-wider', isTimeLow ? 'text-rose-300' : 'text-white')}>
                {formatTimer(timeLeft)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentSection && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 backdrop-blur-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-violet-300">
                    {currentSection.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Brain className="size-4 text-indigo-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  {currentIdx + 1}/{questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-teal-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Question + Options */}
          <div className="lg:col-span-8 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Hash className="size-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pertanyaan {currentIdx + 1}</p>
                    <p className="text-xs text-slate-400 font-medium">{answeredCount} dari {questions.length} dijawab</p>
                  </div>
                </div>
                {/* Time spent on this question */}
                {questionTimes[question.id] !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full">
                    <Clock className="size-3.5" />
                    <span>{formatDuration(questionTimes[question.id])}</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                  {question.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      'w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group flex items-center gap-4',
                      isSelected
                        ? 'border-indigo-500 bg-white shadow-md'
                        : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm'
                    )}
                  >
                    <span
                      className={cn(
                        'size-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors shrink-0',
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className={cn('font-medium flex-1', isSelected ? 'text-slate-900' : 'text-slate-500')}>
                      {opt.text}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="size-5 text-indigo-600 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <button
                onClick={handleBack}
                disabled={currentIdx === 0}
                className={cn(
                  'h-12 px-6 rounded-xl font-black text-sm flex items-center gap-2 transition-all',
                  currentIdx === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-300 bg-white border border-slate-100'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                )}
              >
                <ArrowLeft className="size-4" />
                Sebelumnya
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={cn(
                  'h-12 px-8 rounded-xl font-black text-sm flex items-center gap-2 transition-all',
                  selectedOption !== null
                    ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                )}
              >
                {currentIdx === questions.length - 1 ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Selesai & Kirim
                  </>
                ) : (
                  <>
                    Selanjutnya
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>

            {/* ACTIVITY LOG - Jawaban Terkunci */}
            {activityLog.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
                    <History className="size-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Jawaban Terkunci</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{activityLog.length} jawaban tercatat</p>
                  </div>
                </div>
                <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                  {activityLog.map((log, i) => (
                    <div key={i} className="px-8 py-3 flex items-center gap-4">
                      <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                        <Lock className="size-3.5 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            Soal {log.questionNum}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">{log.label}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="size-3" />
                          {formatDuration(log.duration)}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Camera + Navigator */}
          <div className="lg:col-span-4 space-y-6">
            {/* Camera */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('size-10 rounded-xl flex items-center justify-center', cameraActive ? 'bg-teal-100' : 'bg-rose-100')}>
                    {cameraActive ? <Camera className="size-5 text-teal-600" /> : <CameraOff className="size-5 text-rose-600" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Kamera</h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {cameraActive ? 'Aktif — Proctoring' : cameraError ? 'Tidak tersedia' : 'Memuat...'}
                    </p>
                  </div>
                </div>
                {cameraActive && (
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Live</span>
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
                      <p className="text-xs font-bold">{cameraError ? 'Kamera tidak diizinkan' : 'Memuat kamera...'}</p>
                      {cameraError && (
                        <button
                          onClick={startCamera}
                          className="mt-3 text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest"
                        >
                          Coba Lagi
                        </button>
                      )}
                    </div>
                  )}
                  {/* Overlay frame */}
                  {cameraActive && (
                    <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none">
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <Eye className="size-3 text-teal-400" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Proctoring</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden sticky top-28">
              <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Brain className="size-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Navigasi Soal</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{answeredCount}/{questions.length} dijawab</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {questionsBySection.map((group, gi) => (
                  <div key={gi}>
                    {group.section && (
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        {group.section.name}
                      </p>
                    )}
                    <div className="grid grid-cols-5 gap-2">
                      {group.questions.map((q) => {
                        const isAnswered = answers[q.id] !== undefined
                        const isCurrent = q.globalIdx === currentIdx
                        const timeSpent = questionTimes[q.id]
                        return (
                          <button
                            key={q.id}
                            onClick={() => handleJumpTo(q.globalIdx)}
                            title={timeSpent ? `Waktu: ${formatDuration(timeSpent)}` : undefined}
                            className={cn(
                              'size-10 rounded-xl text-xs font-black transition-all relative',
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-md scale-110'
                                : isAnswered
                                  ? 'bg-teal-50 text-teal-600 border border-teal-100 hover:bg-teal-100'
                                  : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
                            )}
                          >
                            {q.globalIdx + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-400">Saat ini</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-teal-100 border border-teal-200" />
                    <span className="text-[10px] font-bold text-slate-400">Dijawab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-slate-50 border border-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400">Belum</span>
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
          onCancel={() => setShowSubmitModal(false)}
          onConfirm={handleConfirmSubmit}
        />
      )}

      {/* Section Intro Modal */}
      {showSectionIntro && introSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center mx-auto mb-5">
              <Brain className="size-7 text-white" />
            </div>
            <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-2">Section Baru</p>
            <h3 className="text-xl font-black text-slate-900 mb-2">{introSection.name}</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">{introSection.description}</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
                <Hash className="size-3.5" />
                <span>{questions.filter((q) => q.sectionId === introSection.id).length} soal</span>
              </div>
            </div>
            <button
              onClick={() => setShowSectionIntro(false)}
              className="h-12 px-10 bg-slate-900 text-white rounded-xl font-black text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              Mulai Section
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
