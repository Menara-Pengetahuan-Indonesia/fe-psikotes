'use client'

import { useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useQuestions,
  useSections,
  useDeleteQuestion,
} from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { QuestionForm } from './QuestionForm'
import { OptionMapper } from './OptionMapper'
import type { Question } from '../../types'
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_COLORS } from '@features/admin/constants'

interface QuestionListProps {
  testId: string
}

export function QuestionList({ testId }: QuestionListProps) {
  const { data: questions, isLoading: questionsLoading } = useQuestions(testId)
  const { data: sections } = useSections(testId)
  const deleteQuestion = useDeleteQuestion()
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['unsectioned']),
  )
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(
    new Set(),
  )

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setShowForm(true)
  }

  const handleCloseForm = (open: boolean) => {
    setShowForm(open)
    if (!open) {
      setEditingQuestion(undefined)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(
      { testId, questionId: deleteId },
      { onSuccess: () => setDeleteId(null) },
    )
  }

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const toggleOptions = (questionId: string) => {
    const newExpanded = new Set(expandedOptions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedOptions(newExpanded)
  }

  if (questionsLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  const questionsBySection = (questions ?? []).reduce(
    (acc, q) => {
      const sectionId = q.sectionId || 'unsectioned'
      if (!acc[sectionId]) acc[sectionId] = []
      acc[sectionId].push(q)
      return acc
    },
    {} as Record<string, Question[]>,
  )

  const renderQuestion = (question: Question) => {
    const hasOptions = (question.options?.length ?? 0) > 0
    const isOptionsExpanded = expandedOptions.has(question.id)

    return (
      <div key={question.id} className="space-y-2">
        <Card className="p-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${QUESTION_TYPE_COLORS[question.type] || ''}`}
                >
                  {QUESTION_TYPE_LABELS[question.type] || question.type}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  #{question.order}
                </span>
                {hasOptions && (
                  <Badge variant="secondary" className="text-xs">
                    {question.options!.length} opsi
                  </Badge>
                )}
                {question.imageUrl && (
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm mt-2 line-clamp-2">{question.text}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {hasOptions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleOptions(question.id)}
                  title="Pemetaan indikator"
                >
                  {isOptionsExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(question)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteId(question.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {isOptionsExpanded && question.options && (
          <div className="ml-4 space-y-2">
            {question.options
              .sort((a, b) => a.order - b.order)
              .map((option) => (
                <OptionMapper
                  key={option.id}
                  testId={testId}
                  questionId={question.id}
                  option={option}
                />
              ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Pertanyaan
          {questions && questions.length > 0 && (
            <span className="text-muted-foreground font-normal text-sm ml-2">
              ({questions.length} total)
            </span>
          )}
        </h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pertanyaan
        </Button>
      </div>

      {!questions || questions.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-3">Belum ada pertanyaan</p>
          <p className="text-sm text-muted-foreground">
            Tambahkan pertanyaan untuk tes ini.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {/* Sectioned questions */}
          {(sections ?? [])
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              const sectionQuestions = (
                questionsBySection[section.id] || []
              ).sort((a, b) => a.order - b.order)
              const isExpanded = expandedSections.has(section.id)

              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 text-left">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold">{section.name}</span>
                      <Badge variant="secondary">
                        {sectionQuestions.length}
                      </Badge>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-2 space-y-2 border-l-2 pl-4">
                      {sectionQuestions.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">
                          Belum ada pertanyaan di seksi ini
                        </p>
                      ) : (
                        sectionQuestions.map(renderQuestion)
                      )}
                    </div>
                  )}
                </div>
              )
            })}

          {/* Unsectioned questions */}
          {questionsBySection['unsectioned'] &&
            questionsBySection['unsectioned'].length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('unsectioned')}
                  className="w-full flex items-center justify-between p-3 border rounded-lg bg-muted/50 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 text-left">
                    {expandedSections.has('unsectioned') ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold text-sm">Tanpa Seksi</span>
                    <Badge variant="secondary">
                      {questionsBySection['unsectioned'].length}
                    </Badge>
                  </div>
                </button>

                {expandedSections.has('unsectioned') && (
                  <div className="ml-4 mt-2 space-y-2 border-l-2 pl-4">
                    {questionsBySection['unsectioned']
                      .sort((a, b) => a.order - b.order)
                      .map(renderQuestion)}
                  </div>
                )}
              </div>
            )}
        </div>
      )}

      <QuestionForm
        testId={testId}
        open={showForm}
        onOpenChange={handleCloseForm}
        initialData={editingQuestion}
        sections={sections ?? []}
      />

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
