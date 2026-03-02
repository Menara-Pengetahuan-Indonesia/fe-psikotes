'use client'

import { useState } from 'react'
import { useExamState } from '../hooks/useExamState'
import { QuestionRenderer } from './QuestionRenderer'
import { ResultDisplay } from './ResultDisplay'
import { ActivityLog } from './ActivityLog'
import { CameraProctoring } from './CameraProctoring'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamInterfaceProps {
  testId: string
  onComplete?: (result: any) => void
}

export function ExamInterface({ testId, onComplete }: ExamInterfaceProps) {
  const {
    config,
    state,
    result,
    loading,
    error,
    activityLog,
    handleAnswer,
    handleNext,
    handlePrev,
    handleJumpToQuestion,
    handleSubmit,
  } = useExamState(testId)

  const [showActivityLog, setShowActivityLog] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Memuat tes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg border border-red-200 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Terjadi Kesalahan</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600">Tes tidak ditemukan</p>
        </div>
      </div>
    )
  }

  if (state.isFinished && result) {
    return <ResultDisplay result={result} config={config} />
  }

  const allQuestions = getAllQuestions(config)
  const currentQuestion = allQuestions[state.currentQuestionIndex]
  const progress = Math.round(
    (Object.keys(state.answers).length / allQuestions.length) * 100,
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{config.test.name}</h1>
            {config.test.description && (
              <p className="text-sm text-slate-600 mt-1">{config.test.description}</p>
            )}
          </div>
          {config.features.hasTimer && (
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <Clock
                className={cn(
                  'w-5 h-5',
                  state.timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-600',
                )}
              />
              <span
                className={cn(
                  'font-mono font-bold text-lg',
                  state.timeLeft < 300 ? 'text-red-600' : 'text-slate-900',
                )}
              >
                {formatTime(state.timeLeft)}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Counter & Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Soal {state.currentQuestionIndex + 1} dari {allQuestions.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {progress}% selesai
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <QuestionRenderer
            question={currentQuestion}
            selected={state.answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={state.currentQuestionIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>

          <Button
            onClick={() => {
              if (state.currentQuestionIndex === allQuestions.length - 1) {
                handleSubmit()
              } else {
                handleNext()
              }
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {state.currentQuestionIndex === allQuestions.length - 1
              ? 'Selesai'
              : 'Selanjutnya'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Question Navigator Sidebar */}
        {config.features.hasSidebar && (
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-600 mb-4">Navigasi Soal</h3>
            <div className="grid grid-cols-10 gap-2">
              {allQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={cn(
                    'aspect-square rounded-lg text-xs font-bold transition-all border',
                    state.currentQuestionIndex === idx
                      ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                      : state.answers[q.id]
                        ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
                        : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300',
                  )}
                  title={`Soal ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Optional Features */}
      {config.features.hasActivityLog && (
        <ActivityLog
          entries={activityLog}
          isOpen={showActivityLog}
          onToggle={() => setShowActivityLog(!showActivityLog)}
        />
      )}

      {config.features.hasCamera && (
        <CameraProctoring
          isEnabled={showCamera}
          onToggle={() => setShowCamera(!showCamera)}
        />
      )}
    </div>
  )
}

function getAllQuestions(config: any) {
  const questions = [...config.questions]
  config.sections.forEach((section: any) => {
    questions.push(...section.questions)
  })
  return questions.sort((a: any, b: any) => a.order - b.order)
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
