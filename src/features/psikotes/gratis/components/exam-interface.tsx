'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// Mock data — placeholder until real questions are fetched from the backend.
// ---------------------------------------------------------------------------
const MOCK_QUESTIONS = [
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
  totalQuestions?: number
}

export function ExamInterface({ totalQuestions = 3 }: ExamInterfaceProps) {
  const questions = MOCK_QUESTIONS.slice(0, totalQuestions)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const question = questions[currentIdx]
  const progress = ((currentIdx + 1) / questions.length) * 100

  const handleSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx)
    setAnswers((prev) => ({ ...prev, [question.id]: optionIdx }))
  }

  const handleNext = () => {
    if (selectedOption === null) return

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1)
      // Restore previously saved answer for the next question, or reset
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
    // Navigate to result page (placeholder — real submission would hit the backend first)
    window.location.href = './result'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimalist Exam Header */}
      <header className="pt-32 pb-8 px-6 border-b border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="./" className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Detail
          </Link>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-3xl mx-auto px-6 py-12 w-full">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100 rounded-full mb-16 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
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
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-start gap-4 ${
                    isSelected
                      ? 'border-black bg-slate-50'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                    {opt.text}
                  </span>
                  {isSelected && <CheckCircle2 className="w-6 h-6 text-black ml-auto" />}
                </button>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 transition-all border border-slate-200 ${
                currentIdx === 0
                  ? 'opacity-50 cursor-not-allowed text-slate-300 bg-slate-50'
                  : 'bg-white text-slate-500 hover:border-black hover:text-black'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 transition-all ${
                selectedOption !== null
                  ? 'bg-black text-white hover:bg-slate-800 hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentIdx === questions.length - 1 ? (
                'Submit Answers'
              ) : (
                <>
                  Next Question <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 text-black" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Selesaikan Tes?</h3>
              <p className="text-sm text-slate-500">
                Pastikan semua jawaban sudah sesuai. Anda tidak dapat mengubah jawaban setelah ini.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-white border-t border-slate-100 py-12 px-6 mt-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 mb-2">Disclaimer</h4>
              <p className="text-red-700/80 text-xs leading-relaxed max-w-2xl">
                Jika Anda sedang mengalami krisis psikologis yang mengancam hidup Anda (seperti keinginan menyakiti diri sendiri atau bunuh diri), layanan ini <strong>TIDAK</strong> direkomendasikan. Segera hubungi profesional kesehatan mental terdekat atau layanan darurat{' '}
                <strong>119</strong> / <strong>112</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
