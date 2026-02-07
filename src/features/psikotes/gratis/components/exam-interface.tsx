'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
  Hexagon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Question } from '@/features/psikotes/constants'

// ----------------------------------------------------------
// Fallback mock data — used when no questions prop provided.
// ----------------------------------------------------------
const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Mana yang lebih kamu pilih?',
    options: [
      { label: 'A', text: 'Sedikit teman, namun sering bertemu' },
      { label: 'B', text: 'Banyak teman walaupun jarang bertemu' },
    ],
  },
  {
    id: 2,
    question: 'Saat ada masalah, apa yang biasanya kamu lakukan?',
    options: [
      { label: 'A', text: 'Menceritakannya kepada orang terdekat' },
      { label: 'B', text: 'Merenung dan menyelesaikannya sendiri' },
    ],
  },
  {
    id: 3,
    question: 'Bagaimana caramu mengisi waktu luang?',
    options: [
      { label: 'A', text: 'Pergi keluar mencari suasana baru' },
      { label: 'B', text: 'Menikmati waktu santai di rumah' },
    ],
  },
]

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

  return (
    <div
      className={cn(
        'min-h-screen bg-[#faf5e4]',
        'flex flex-col',
      )}
    >
      {/* ── Themed Header ────────────────── */}
      <header
        className={cn(
          'relative overflow-hidden',
          'bg-linear-to-b from-emerald-800',
          'via-emerald-700 to-emerald-500',
          'text-white pt-28 pb-10 md:pt-36 md:pb-14',
        )}
      >
        {/* Topographic Pattern */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.05]',
            'pointer-events-none mix-blend-overlay',
          )}
          style={{
            backgroundImage:
              'url("data:image/svg+xml,'
              + '%3Csvg width=\'200\''
              + ' height=\'200\''
              + ' viewBox=\'0 0 200 200\''
              + ' xmlns=\'http://www.w3.org/'
              + '2000/svg\'%3E%3Cpath'
              + ' d=\'M0 100 C 20 80, 40 120,'
              + ' 60 100 S 100 80, 120 100'
              + ' S 160 120, 200 100\''
              + ' stroke=\'white\''
              + ' fill=\'transparent\''
              + ' stroke-width=\'1\'/%3E'
              + '%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Ornaments */}
        <Plus
          className={cn(
            'absolute top-[15%] left-[8%]',
            'text-emerald-400/20 w-8 h-8',
            'pointer-events-none',
          )}
        />
        <Hexagon
          className={cn(
            'absolute bottom-[12%] right-[8%]',
            'text-white/5 w-24 h-24',
            '-rotate-12 pointer-events-none',
          )}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-96 h-96 bg-emerald-500/20',
            'rounded-full blur-[120px]',
            '-translate-x-1/2 -translate-y-1/2',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-80 h-80 bg-amber-500/10',
            'rounded-full blur-[100px]',
            'translate-x-1/4 translate-y-1/4',
            'pointer-events-none',
          )}
        />

        <div
          className={cn(
            'max-w-3xl mx-auto px-6',
            'relative z-10',
          )}
        >
          {/* Back link + Badge row */}
          <div
            className={cn(
              'flex items-center',
              'justify-between mb-6',
            )}
          >
            <Link
              href={
                backHref
                  ?? `/psikotes/gratis/${slug}`
              }
              className={cn(
                'inline-flex items-center gap-2',
                'text-emerald-200/80',
                'hover:text-white transition-colors',
                'text-sm font-bold',
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Detail
            </Link>

            <div
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'bg-white/10 border border-white/10',
                'backdrop-blur-md',
              )}
            >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5',
                'text-amber-300 fill-amber-300',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-emerald-100 uppercase',
              )}
            >
              Soal {currentIdx + 1} dari{' '}
              {questions.length}
            </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className={cn(
              'w-full h-1.5 bg-white/10',
              'rounded-full overflow-hidden',
            )}
          >
            <div
              className={cn(
                'h-full bg-amber-300',
                'transition-all duration-500',
                'ease-out rounded-full',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

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
              const isSelected = selectedOption === idx
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
                      ? 'border-emerald-500 bg-white'
                        + ' shadow-emerald-900/5'
                      : 'border-slate-100 bg-white'
                        + ' shadow-stone-200/50'
                        + ' hover:border-emerald-300'
                        + ' hover:-translate-y-0.5'
                        + ' hover:shadow-xl',
                  )}
                >
                  <span
                    className={cn(
                      'w-9 h-9 rounded-xl',
                      'flex items-center justify-center',
                      'text-sm font-black',
                      'transition-colors shrink-0',
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-50 text-slate-400'
                          + ' group-hover:bg-emerald-50'
                          + ' group-hover:text-emerald-600',
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
                        'w-6 h-6 text-emerald-600',
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
                    + ' hover:border-emerald-500'
                    + ' hover:text-emerald-700'
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
                  ? 'bg-emerald-600 text-white'
                    + ' hover:bg-emerald-700'
                    + ' shadow-lg'
                    + ' shadow-emerald-600/20'
                    + ' hover:shadow-xl'
                    + ' hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400'
                    + ' cursor-not-allowed',
              )}
            >
              {currentIdx === questions.length - 1 ? (
                'Selesai & Kirim'
              ) : (
                <>
                  Selanjutnya
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* ── Submit Confirmation Modal ───── */}
      {showSubmitModal && (
        <div
          className={cn(
            'fixed inset-0 z-50',
            'flex items-center justify-center p-6',
            'bg-black/50 backdrop-blur-sm',
          )}
        >
          <div
            className={cn(
              'bg-white rounded-3xl p-8',
              'max-w-sm w-full',
              'shadow-2xl shadow-slate-900/20',
              'space-y-6 text-center',
            )}
          >
            <div
              className={cn(
                'w-16 h-16 bg-emerald-50',
                'rounded-full flex items-center',
                'justify-center mx-auto mb-2',
                'border border-emerald-200',
              )}
            >
              <CheckCircle2
                className="w-8 h-8 text-emerald-600"
              />
            </div>
            <div className="space-y-2">
              <h3
                className={cn(
                  'text-xl font-black',
                  'text-stone-800',
                )}
              >
                Selesaikan Tes?
              </h3>
              <p
                className={cn(
                  'text-sm text-stone-500',
                  'font-medium',
                )}
              >
                Pastikan semua jawaban sudah sesuai.
                Anda tidak dapat mengubah jawaban
                setelah ini.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className={cn(
                  'flex-1 py-3 bg-white',
                  'border border-slate-200',
                  'text-stone-800 rounded-2xl',
                  'font-bold text-sm',
                  'hover:bg-slate-50',
                  'transition-colors',
                )}
              >
                Kembali
              </button>
              <button
                onClick={handleConfirmSubmit}
                className={cn(
                  'flex-1 py-3',
                  'bg-emerald-600 text-white',
                  'rounded-2xl font-bold text-sm',
                  'hover:bg-emerald-700',
                  'transition-colors shadow-lg',
                  'shadow-emerald-600/20',
                )}
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Disclaimer ───────────────────── */}
      <div
        className={cn(
          'bg-[#faf5e4] py-12 px-6 mt-auto',
        )}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              'bg-red-50 border border-red-100',
              'rounded-3xl p-6',
              'flex flex-col md:flex-row',
              'gap-6 items-start',
            )}
          >
            <div
              className={cn(
                'w-10 h-10 bg-white',
                'rounded-full flex items-center',
                'justify-center text-red-500',
                'shadow-sm flex-shrink-0',
              )}
            >
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4
                className={cn(
                  'font-bold text-red-900 mb-2',
                )}
              >
                Disclaimer
              </h4>
              <p
                className={cn(
                  'text-red-700/80 text-xs',
                  'leading-relaxed max-w-2xl',
                )}
              >
                Jika Anda sedang mengalami krisis
                psikologis yang mengancam hidup Anda
                (seperti keinginan menyakiti diri
                sendiri atau bunuh diri), layanan
                ini{' '}
                <strong>TIDAK</strong>{' '}
                direkomendasikan. Segera hubungi
                profesional kesehatan mental terdekat
                atau layanan darurat{' '}
                <strong>119</strong> /{' '}
                <strong>112</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
