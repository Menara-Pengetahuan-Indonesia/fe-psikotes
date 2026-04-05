'use client'

import * as React from 'react'
import {
  ChevronRight,
  ChevronLeft,
  Activity,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStoreHydrated } from '@/store/auth.store'

import { ExamStartScreen } from '@/features/psikotes/mahasiswa/components/exam-start-screen'
import { ExamResultScreen } from '@/features/psikotes/mahasiswa/components/exam-result-screen'
import {
  ExamHeader,
  ExamProctor,
  ExamNavSidebar,
} from '@/features/psikotes/mahasiswa/components/exam-ui-parts'

const QUESTIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `Pertanyaan psikotes simulasi nomor ${i + 1}. Bagaimana Anda biasanya merespons tantangan mendadak yang mengganggu rencana kerja Anda yang sudah tersusun rapi?`,
  options: [
    "Segera menyesuaikan rencana dengan fleksibel",
    "Mengevaluasi dampak sebelum mengambil tindakan",
    "Merasa sedikit terganggu namun tetap profesional",
    "Meminta bantuan rekan untuk solusi cepat",
  ],
}))

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function ExamPageContent() {
  useAuthStoreHydrated()
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [answers, setAnswers] = React.useState<
    Record<number, { choice: string; timestamp: string }>
  >({})
  const [timeLeft, setTimeLeft] = React.useState(1800)
  const [examStarted, setExamStarted] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [logs, setLogs] = React.useState<string[]>([])
  const [cameraError, setCameraError] = React.useState(false)
  const [finalScore, setFinalScore] = React.useState(0)

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString('id-ID', {
      hour12: false,
    }) + '.' + new Date().getMilliseconds()
    setLogs(prev => [`[${ts}] ${msg}`, ...prev].slice(0, 30))
  }

  React.useEffect(() => {
    if (!examStarted || isFinished) return
    if (!navigator.mediaDevices) return
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
          setCameraError(false)
        }
      })
      .catch(() => setCameraError(true))
  }, [examStarted, isFinished])

  React.useEffect(() => {
    if (!examStarted || isFinished) return
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [examStarted, isFinished])

  const handleAnswer = (choice: string) => {
    const ts = new Date().toLocaleTimeString('id-ID', {
      hour12: false,
    }) + '.' + new Date().getMilliseconds()
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: { choice, timestamp: ts },
    }))
    addLog(`User: Menjawab Soal ${currentIdx + 1}`)
  }

  const handleSubmit = () => {
    const count = Object.keys(answers).length
    const score = Math.round(
      (count / 20) * 85 + Math.random() * 15,
    )
    setFinalScore(score)
    setIsFinished(true)
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks().forEach(t => t.stop())
    }
  }

  if (!examStarted) {
    return (
      <ExamStartScreen
        onStart={() => setExamStarted(true)}
      />
    )
  }

  if (isFinished) {
    return (
      <ExamResultScreen
        finalScore={finalScore}
        answeredCount={Object.keys(answers).length}
        timeSpent={formatTime(1800 - timeLeft)}
      />
    )
  }

  const q = QUESTIONS[currentIdx]

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans select-none relative z-[9999] overflow-hidden">
      <ExamHeader
        timeLeft={timeLeft}
        formatTime={formatTime}
        onSubmit={handleSubmit}
      />
      <div className="flex-1 flex w-full max-w-7xl mx-auto items-start p-4 md:p-6 lg:p-8 gap-6 overflow-y-auto no-scrollbar">
        <ExamProctor
          cameraError={cameraError}
          videoRef={videoRef}
        />
        <main className="flex-1 space-y-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest">
                Soal {currentIdx + 1} / 20
              </span>
              <Activity className="size-4 text-primary-500 opacity-20" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-8">
              {q.text}
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {q.options.map((opt, i) => {
                const label = String.fromCharCode(65 + i)
                const selected = answers[currentIdx]?.choice === opt
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                      selected
                        ? "border-primary-500 bg-primary-50 shadow-md"
                        : "border-slate-50 bg-slate-50/30 hover:border-slate-200",
                    )}
                  >
                    <div className={cn(
                      "size-8 shrink-0 rounded-lg flex items-center justify-center font-black text-[10px] shadow-sm",
                      selected
                        ? "bg-primary-500 text-white"
                        : "bg-white border border-slate-100 text-slate-400",
                    )}>
                      {label}
                    </div>
                    <span className={cn(
                      "font-bold text-sm md:text-base",
                      selected ? "text-primary-700" : "text-slate-600",
                    )}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <Button
                variant="ghost"
                className="rounded-xl h-10 px-6 font-bold text-slate-400 hover:text-slate-900 disabled:opacity-0"
                onClick={() => setCurrentIdx(p => p - 1)}
                disabled={currentIdx === 0}
              >
                <ChevronLeft className="mr-2 size-4" /> Sebelumnya
              </Button>
              <Button
                className="bg-slate-900 hover:bg-primary-600 text-white rounded-xl h-10 px-8 font-bold shadow-lg transition-all"
                onClick={() => {
                  if (currentIdx < 19) setCurrentIdx(p => p + 1)
                  else handleSubmit()
                }}
              >
                {currentIdx === 19 ? 'Submit & Selesai' : 'Selanjutnya'}
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary-500 animate-pulse" />
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900">
                  Aktivitas Deteksi
                </h4>
              </div>
              <span className="text-[8px] font-bold text-slate-400 uppercase">
                Live Tracking
              </span>
            </div>
            <div className="h-24 overflow-y-auto no-scrollbar font-mono text-[8px] space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={cn(
                  "p-1.5 rounded-md border-l-2",
                  i === 0
                    ? "bg-primary-50 border-primary-500 text-primary-700 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-400",
                )}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </main>
        <ExamNavSidebar
          total={20}
          currentIdx={currentIdx}
          answers={answers}
          onNavigate={setCurrentIdx}
        />
      </div>
    </div>
  )
}

export default function ExamPage() {
  return <ExamPageContent />
}
