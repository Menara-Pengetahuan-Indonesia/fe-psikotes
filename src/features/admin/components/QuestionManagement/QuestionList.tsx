'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuestions, useCreateQuestion, useDeleteQuestion } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { QuestionCard } from './QuestionCard'
import type { Question, QuestionType } from '../../types'
import { QUESTION_TYPE_LABELS } from '@features/admin/constants'
import { cn } from '@/lib/utils'

interface QuestionListProps {
  subTestId: string
}

export function QuestionList({ subTestId }: QuestionListProps) {
  const { data: questions, isLoading } = useQuestions()
  const createQuestion = useCreateQuestion()
  const deleteQuestion = useDeleteQuestion()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<QuestionType>('MULTIPLE_CHOICE')

  const filtered = (questions ?? [])
    .filter((q) => q.subTestId === subTestId)
    .sort((a, b) => a.order - b.order)

  const handleAddQuestion = async () => {
    const type = selectedType
    const nextOrder = filtered.length > 0 ? Math.max(...filtered.map(q => q.order)) + 1 : 1

    const dto = {
      subTestId,
      questionType: type,
      questionText: `Pertanyaan ${nextOrder}`,
      order: nextOrder,
      ...(type === 'ESSAY' || type === 'SCALE_RATING' ? { points: 1 } : {}),
      options: (type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX')
        ? [
            { optionText: 'Opsi 1', imageUrl: null, isCorrect: false, points: 0, order: 1 },
            { optionText: 'Opsi 2', imageUrl: null, isCorrect: false, points: 0, order: 2 },
          ]
        : undefined,
      correctAnswer: type === 'ESSAY'
        ? { correctEssayKeywords: [] }
        : type === 'SCALE_RATING'
          ? { minScaleValue: 1, maxScaleValue: 5, scaleWeights: { '1': { label: '1', points: 1 }, '2': { label: '2', points: 2 }, '3': { label: '3', points: 3 }, '4': { label: '4', points: 4 }, '5': { label: '5', points: 5 } } }
          : undefined,
    }

    const result = await createQuestion.mutateAsync(dto)
    if (result?.id) setEditingId(result.id)
  }

  const handleDuplicate = async (source: Question) => {
    const nextOrder = filtered.length > 0 ? Math.max(...filtered.map(q => q.order)) + 1 : 1

    const hasOptions = source.questionType === 'MULTIPLE_CHOICE' || source.questionType === 'CHECKBOX'
    const opts = hasOptions && source.options?.length
      ? source.options.map((o, i) => ({
          optionText: o.optionText,
          imageUrl: o.imageUrl || null,
          isCorrect: o.isCorrect,
          points: o.points ?? 0,
          order: i + 1,
        }))
      : hasOptions
        ? [{ optionText: 'Opsi 1', imageUrl: null, isCorrect: false, points: 0, order: 1 }, { optionText: 'Opsi 2', imageUrl: null, isCorrect: false, points: 0, order: 2 }]
        : undefined

    const ca = source.correctAnswer
    const correctAnswer = source.questionType === 'ESSAY' && ca?.correctEssayKeywords
      ? { correctEssayKeywords: ca.correctEssayKeywords }
      : source.questionType === 'SCALE_RATING' && ca
        ? { minScaleValue: ca.minScaleValue ?? 1, maxScaleValue: ca.maxScaleValue ?? 5, scaleWeights: ca.scaleWeights ?? {} }
        : undefined

    await createQuestion.mutateAsync({
      subTestId,
      questionType: source.questionType,
      questionText: source.questionText || `Pertanyaan ${nextOrder}`,
      order: nextOrder,
      ...(hasOptions ? {} : { points: source.points ?? 1 }),
      ...(source.imageUrl ? { imageUrl: source.imageUrl } : {}),
      ...(opts ? { options: opts } : {}),
      ...(correctAnswer ? { correctAnswer } : {}),
    })
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Type selector — always shown */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(QUESTION_TYPE_LABELS) as [QuestionType, string][]).map(([type, label]) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all',
              selectedType === type
                ? 'border-indigo-400 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200'
                : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Question cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-sm text-slate-400 font-medium">Belum ada pertanyaan</p>
          <p className="text-xs text-slate-400 mt-1">Klik tombol di bawah untuk menambah soal pertama.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((question, idx) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={idx}
              isEditing={editingId === question.id}
              onStartEdit={() => setEditingId(question.id)}
              onStopEdit={() => setEditingId(null)}
              onDuplicate={() => handleDuplicate(question)}
              onDelete={() => setDeleteId(question.id)}
            />
          ))}
        </div>
      )}

      {/* Add question button */}
      <button
        type="button"
        onClick={handleAddQuestion}
        disabled={createQuestion.isPending}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all disabled:opacity-50"
      >
        <Plus className="size-4" />
        {createQuestion.isPending ? 'Menambahkan...' : 'Tambah Pertanyaan'}
      </button>

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Pertanyaan"
        description="Apakah Anda yakin ingin menghapus pertanyaan ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteQuestion.isPending}
      />
    </div>
  )
}
