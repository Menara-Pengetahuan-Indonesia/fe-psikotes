'use client'

import { cn } from '@/lib/utils'
import { ExamQuestion } from '../types/exam.types'

interface QuestionRendererProps {
  question: ExamQuestion
  selected?: string
  onChange: (optionId: string) => void
}

export function QuestionRenderer({
  question,
  selected,
  onChange,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'TRUE_FALSE':
      return (
        <TrueFalseQuestion
          question={question}
          selected={selected}
          onChange={onChange}
        />
      )
    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoiceQuestion
          question={question}
          selected={selected}
          onChange={onChange}
        />
      )
    case 'RATING_SCALE':
      return (
        <RatingScaleQuestion
          question={question}
          selected={selected}
          onChange={onChange}
        />
      )
    case 'ESSAY':
      return (
        <EssayQuestion
          question={question}
          selected={selected}
          onChange={onChange}
        />
      )
    default:
      return <div>Unknown question type</div>
  }
}

function TrueFalseQuestion({
  question,
  selected,
  onChange,
}: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">{question.text}</h3>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map(option => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              'p-4 rounded-lg border-2 font-bold transition-colors',
              selected === option.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultipleChoiceQuestion({
  question,
  selected,
  onChange,
}: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx)
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-colors',
                selected === option.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 bg-white hover:border-slate-300',
              )}
            >
              <div
                className={cn(
                  'size-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm',
                  selected === option.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 text-slate-600',
                )}
              >
                {label}
              </div>
              <span
                className={cn(
                  'font-semibold',
                  selected === option.id ? 'text-primary-700' : 'text-slate-600',
                )}
              >
                {option.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RatingScaleQuestion({
  question,
  selected,
  onChange,
}: QuestionRendererProps) {
  const scale = [1, 2, 3, 4, 5]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">{question.text}</h3>
      <div className="flex justify-between gap-2">
        {scale.map(value => (
          <button
            key={value}
            onClick={() => onChange(String(value))}
            className={cn(
              'flex-1 py-3 rounded-lg border-2 font-bold transition-colors',
              selected === String(value)
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
            )}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

function EssayQuestion({
  question,
  selected,
  onChange,
}: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">{question.text}</h3>
      <textarea
        value={selected || ''}
        onChange={e => onChange(e.target.value)}
        placeholder="Tulis jawaban Anda di sini..."
        className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-primary-500 focus:outline-none resize-none"
        rows={6}
      />
    </div>
  )
}
