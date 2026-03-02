'use client'

import { useState } from 'react'
import { Edit2, Trash2, FileUp, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useQuestions, useSections, useDeleteQuestion } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { QuestionFormWizard } from './QuestionFormWizard'
import { BulkImportCSV } from './BulkImportCSV'
import type { Question } from '../../types'
import { QUESTION_TYPE_SHORT_LABELS, QUESTION_TYPE_COLORS } from '@features/admin/constants'

interface QuestionStepContentProps {
  testId: string
}

export function QuestionStepContent({ testId }: QuestionStepContentProps) {
  const { data: questions, isLoading } = useQuestions(testId)
  const { data: sections } = useSections(testId)
  const deleteQuestion = useDeleteQuestion()

  const [mode, setMode] = useState<'manual' | 'csv'>('manual')
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAdd = () => {
    setEditingQuestion(undefined)
    setShowForm(true)
  }

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setShowForm(true)
  }

  const handleFormSaved = () => {
    setShowForm(false)
    setEditingQuestion(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingQuestion(undefined)
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(
      { testId, questionId: deleteId },
      { onSuccess: () => setDeleteId(null) },
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    )
  }

  // Group questions by section
  const questionsBySection = (questions ?? []).reduce(
    (acc, q) => {
      const sectionId = q.sectionId || 'unsectioned'
      if (!acc[sectionId]) acc[sectionId] = []
      acc[sectionId].push(q)
      return acc
    },
    {} as Record<string, Question[]>,
  )

  const sortedSections = (sections ?? []).sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={mode === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('manual')}
          >
            <PenLine className="w-4 h-4 mr-2" />
            Input Manual
          </Button>
          <Button
            variant={mode === 'csv' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('csv')}
          >
            <FileUp className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
        </div>

        {mode === 'manual' && (
          <div className="flex items-center gap-3">
            {questions && questions.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {questions.length} soal
              </span>
            )}
            <Button size="sm" onClick={handleAdd}>
              Tambah Pertanyaan
            </Button>
          </div>
        )}
      </div>

      {/* CSV Import mode */}
      {mode === 'csv' && <BulkImportCSV testId={testId} />}

      {/* Manual mode — question list */}
      {mode === 'manual' && (
        <>
          {!questions || questions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-2">Belum ada pertanyaan</p>
              <p className="text-sm text-muted-foreground">
                Tambahkan pertanyaan secara manual atau import dari CSV.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {/* Sectioned questions */}
              {sortedSections.map((section) => {
                const sectionQuestions = (
                  questionsBySection[section.id] || []
                ).sort((a, b) => a.order - b.order)

                if (sectionQuestions.length === 0) return null

                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {section.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {sectionQuestions.length}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 ml-2 border-l-2 pl-3">
                      {sectionQuestions.map((q) => (
                        <QuestionRow
                          key={q.id}
                          question={q}
                          onEdit={() => handleEdit(q)}
                          onDelete={() => setDeleteId(q.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Unsectioned questions */}
              {questionsBySection['unsectioned'] &&
                questionsBySection['unsectioned'].length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Tanpa Seksi
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {questionsBySection['unsectioned'].length}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 ml-2 border-l-2 pl-3">
                      {questionsBySection['unsectioned']
                        .sort((a, b) => a.order - b.order)
                        .map((q) => (
                          <QuestionRow
                            key={q.id}
                            question={q}
                            onEdit={() => handleEdit(q)}
                            onDelete={() => setDeleteId(q.id)}
                          />
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}

      {/* Question Form Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => !open && handleFormCancel()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}
            </DialogTitle>
            <DialogDescription>
              {editingQuestion
                ? 'Ubah pertanyaan, opsi, dan skor indikator'
                : 'Isi pertanyaan, opsi jawaban, dan skor indikator sekaligus'}
            </DialogDescription>
          </DialogHeader>
          <QuestionFormWizard
            testId={testId}
            initialData={editingQuestion}
            onSaved={handleFormSaved}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Pertanyaan"
        description="Apakah Anda yakin ingin menghapus pertanyaan ini? Opsi dan pemetaan indikator yang terkait juga akan dihapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteQuestion.isPending}
      />
    </div>
  )
}

// Simplified question row component
function QuestionRow({
  question,
  onEdit,
  onDelete,
}: {
  question: Question
  onEdit: () => void
  onDelete: () => void
}) {
  const optionCount = question.options?.length ?? 0

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-md border bg-card hover:bg-accent/50 transition-colors group">
      <span className="text-xs font-mono text-muted-foreground w-6 text-right flex-shrink-0">
        #{question.order}
      </span>

      <span
        className={`text-xs px-1.5 py-0.5 rounded border flex-shrink-0 ${QUESTION_TYPE_COLORS[question.type] || ''}`}
      >
        {QUESTION_TYPE_SHORT_LABELS[question.type] || question.type}
      </span>

      <p className="text-sm flex-1 min-w-0 truncate">{question.text}</p>

      {optionCount > 0 && (
        <Badge variant="secondary" className="text-xs flex-shrink-0">
          {optionCount} opsi
        </Badge>
      )}

      <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 w-7 p-0">
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 w-7 p-0 text-destructive">
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}
