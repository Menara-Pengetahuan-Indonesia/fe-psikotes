'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQuestions, useCreateQuestion, useDeleteQuestion, useUpdateQuestion } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { QuestionCard } from './QuestionCard'
import type { Question, QuestionType } from '../../types'

interface QuestionListProps {
  subTestId: string
}

function SortableQuestionCard({ question, index, isEditing, onToggleEdit, onStopEdit, onDuplicate, onDelete, onChangeType }: {
  question: Question
  index: number
  isEditing: boolean
  onToggleEdit: () => void
  onStopEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onChangeType: (type: QuestionType) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: question.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <QuestionCard
        question={question}
        index={index}
        isEditing={isEditing}
        onStartEdit={onToggleEdit}
        onStopEdit={onStopEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        onChangeType={onChangeType}
        dragListeners={listeners}
      />
    </div>
  )
}

export function QuestionList({ subTestId }: QuestionListProps) {
  const { data: questions, isLoading } = useQuestions()
  const createQuestion = useCreateQuestion()
  const deleteQuestion = useDeleteQuestion()
  const updateQuestion = useUpdateQuestion()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const filtered = (questions ?? [])
    .filter((q) => q.subTestId === subTestId)
    .sort((a, b) => a.order - b.order)

  const handleToggleEdit = (id: string) => {
    setEditingId(prev => prev === id ? null : id)
  }

  const handleAddQuestion = async () => {
    const nextOrder = filtered.length > 0 ? Math.max(...filtered.map(q => q.order)) + 1 : 1

    const result = await createQuestion.mutateAsync({
      subTestId,
      questionType: 'MULTIPLE_CHOICE',
      questionText: `Pertanyaan ${nextOrder}`,
      order: nextOrder,
      options: [
        { optionText: 'Opsi 1', imageUrl: null, isCorrect: false, points: 0, order: 1 },
        { optionText: 'Opsi 2', imageUrl: null, isCorrect: false, points: 0, order: 2 },
      ],
    })
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

  const handleChangeType = (questionId: string, newType: QuestionType) => {
    const hasOptions = newType === 'MULTIPLE_CHOICE' || newType === 'CHECKBOX'
    const options = hasOptions
      ? [
          { optionText: 'Opsi 1', imageUrl: null, isCorrect: false, points: 0, order: 1 },
          { optionText: 'Opsi 2', imageUrl: null, isCorrect: false, points: 0, order: 2 },
        ]
      : []
    const correctAnswer = newType === 'ESSAY'
      ? { correctEssayKeywords: [] }
      : newType === 'SCALE_RATING'
        ? { minScaleValue: 1, maxScaleValue: 5, scaleWeights: { '1': { label: '1', points: 1 }, '2': { label: '2', points: 2 }, '3': { label: '3', points: 3 }, '4': { label: '4', points: 4 }, '5': { label: '5', points: 5 } } }
        : undefined

    updateQuestion.mutate({
      id: questionId,
      dto: {
        questionType: newType,
        options,
        correctAnswer: correctAnswer ?? { correctEssayKeywords: [] },
        points: (newType === 'ESSAY' || newType === 'SCALE_RATING') ? 1 : undefined,
      },
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = filtered.findIndex(q => q.id === active.id)
    const newIndex = filtered.findIndex(q => q.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = [...filtered]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    reordered.forEach((q, i) => {
      const newOrder = i + 1
      if (q.order !== newOrder) {
        updateQuestion.mutate({ id: q.id, dto: { order: newOrder } })
      }
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
          <Skeleton key={i} className="h-12 rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-sm text-slate-400 font-medium">Belum ada pertanyaan</p>
          <p className="text-xs text-slate-400 mt-1">Klik tombol di bawah untuk menambah soal pertama.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map(q => q.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {filtered.map((question, idx) => (
                <SortableQuestionCard
                  key={question.id}
                  question={question}
                  index={idx}
                  isEditing={editingId === question.id}
                  onToggleEdit={() => handleToggleEdit(question.id)}
                  onStopEdit={() => setEditingId(null)}
                  onDuplicate={() => handleDuplicate(question)}
                  onDelete={() => setDeleteId(question.id)}
                  onChangeType={(type) => handleChangeType(question.id, type)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

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
