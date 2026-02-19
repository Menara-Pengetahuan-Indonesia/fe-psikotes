'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Question } from '@/features/psikotes/constants'
import { ExamHeader } from './exam-header'
import { ExamSubmitModal } from './exam-submit-modal'
import { ExamDisclaimer } from './exam-disclaimer'
import { MOCK_QUESTIONS } from './exam-constants'

interface ExamInterfaceProps {
  slug?: string
  totalQuestions?: number
  questions?: Question[]
  backHref?: string
  resultHref?: string
}

export function ExamInterface({
  slug = '',
  totalQuestions = 5,
  questions: questionsProp,
  backHref,
  resultHref,
}: ExamInterfaceProps) {
  const questions = questionsProp
    ?? MOCK_QUESTIONS.slice(0, totalQuestions)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<
    number | null
  >(null)
  const [answers, setAnswers] = useState<
    Record<number, number>
  >({})
  const [showSubmitModal, setShowSubmitModal] =
    useState(false)

  const question = questions[currentIdx]
  const progress =
    ((currentIdx + 1) / questions.length) * 100

  const handleSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx)
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionIdx,
    }))
  }

  const handleNext = () => {
    if (selectedOption === null) return

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1)
      const nextId = questions[currentIdx + 1].id
      setSelectedOption(answers[nextId] ?? null)
    } else {
      setShowSubmitModal(true)
    }
  }

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1)
      const prevId = questions[currentIdx - 1].id
      setSelectedOption(answers[prevId] ?? null)
    }
  }

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false)
    window.location.href = resultHref
      ?? `/psikotes/gratis/${slug}/result`
  }

  const resolvedBackHref =
    backHref ?? `/psikotes/gratis/${slug}`

  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        'flex flex-col',
      )}
    >
      <ExamHeader
        currentIdx={currentIdx}
        questionsLength={questions.length}
        progress={progress}
        backHref={resolvedBackHref}
        slug={slug}
      />

      {/* ── Question Body ────────────────── */}
      <main
        className={cn(
          'flex-grow max-w-3xl mx-auto',
          'px-6 py-12 w-full',
        )}
      >
        <div className="space-y-8">
          <h2
            className={cn(
              'text-2xl md:text-3xl font-black',
              'text-stone-800 leading-tight',
              'tracking-tight',
            )}
          >
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((opt, idx) => {
              const isSelected =
                selectedOption === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    'w-full text-left p-6',
                    'rounded-3xl border-2',
                    'transition-all duration-500',
                    'group flex items-start gap-4',
                    'shadow-lg',
                    isSelected
                      ? 'border-primary-500 bg-white'
                        + ' shadow-primary-900/5'
                      : 'border-slate-100 bg-white'
                        + ' shadow-stone-200/50'
                        + ' hover:border-primary-300'
                        + ' hover:-translate-y-0.5'
                        + ' hover:shadow-xl',
                  )}
                >
                  <span
                    className={cn(
                      'w-9 h-9 rounded-xl',
                      'flex items-center',
                      'justify-center',
                      'text-sm font-black',
                      'transition-colors shrink-0',
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-50 text-slate-400'
                          + ' group-hover:bg-primary-50'
                          + ' group-hover:text-primary-600',
                    )}
                  >
                    {opt.label}
                  </span>
                  <span
                    className={cn(
                      'font-medium pt-1.5',
                      isSelected
                        ? 'text-stone-800'
                        : 'text-stone-500',
                    )}
                  >
                    {opt.text}
                  </span>
                  {isSelected && (
                    <CheckCircle2
                      className={cn(
                        'w-6 h-6 text-primary-600',
                        'ml-auto shrink-0 mt-1.5',
                      )}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className={cn(
                'px-8 py-3 rounded-2xl',
                'font-bold text-sm tracking-wide',
                'flex items-center gap-2',
                'transition-all border',
                currentIdx === 0
                  ? 'opacity-50 cursor-not-allowed'
                    + ' text-stone-300 bg-white/50'
                    + ' border-slate-200'
                  : 'bg-white text-stone-500'
                    + ' border-slate-200'
                    + ' hover:border-primary-500'
                    + ' hover:text-primary-700'
                    + ' shadow-lg shadow-stone-200/50',
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={cn(
                'px-8 py-3 rounded-2xl',
                'font-bold text-sm tracking-wide',
                'flex items-center gap-2',
                'transition-all',
                selectedOption !== null
                  ? 'bg-primary-600 text-white'
                    + ' hover:bg-primary-700'
                    + ' shadow-lg'
                    + ' shadow-primary-600/20'
                    + ' hover:shadow-xl'
                    + ' hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400'
                    + ' cursor-not-allowed',
              )}
            >
              {currentIdx === questions.length - 1
                ? 'Selesai & Kirim'
                : (
                    <>
                      Selanjutnya
                      <ArrowRight
                        className="w-4 h-4"
                      />
                    </>
                  )}
            </button>
          </div>
        </div>
      </main>

      {showSubmitModal && (
        <ExamSubmitModal
          onCancel={() =>
            setShowSubmitModal(false)
          }
          onConfirm={handleConfirmSubmit}
        />
      )}

      <ExamDisclaimer />
    </div>
  )
}
