'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuestions, useDeleteQuestion } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { QuestionForm } from './QuestionForm'
import type { Question } from '../../types'
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_COLORS } from '@features/admin/constants'

interface QuestionListProps {
  subTestId: string
}

export function QuestionList({ subTestId }: QuestionListProps) {
  const { data: questions, isLoading } = useQuestions()
  const deleteQuestion = useDeleteQuestion()
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = (questions ?? [])
    .filter((q) => q.subTestId === subTestId)
    .sort((a, b) => a.order - b.order)

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setShowForm(true)
  }

  const handleCloseForm = (open: boolean) => {
    setShowForm(open)
    if (!open) setEditingQuestion(undefined)
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Pertanyaan
          {filtered.length > 0 && (
            <span className="text-muted-foreground font-normal text-sm ml-2">
              ({filtered.length} total)
            </span>
          )}
        </h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pertanyaan
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-3">Belum ada pertanyaan</p>
          <p className="text-sm text-muted-foreground">
            Tambahkan pertanyaan untuk subtes ini.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((question) => (
            <Card key={question.id} className="p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${QUESTION_TYPE_COLORS[question.questionType] || ''}`}>
                      {QUESTION_TYPE_LABELS[question.questionType] || question.questionType}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      #{question.order}
                    </span>
                    {(question.options?.length ?? 0) > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {question.options!.length} opsi
                      </Badge>
                    )}
                    {question.imageUrl && (
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{question.questionText}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(question)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteId(question.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <QuestionForm
        subTestId={subTestId}
        open={showForm}
        onOpenChange={handleCloseForm}
        initialData={editingQuestion}
      />

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
