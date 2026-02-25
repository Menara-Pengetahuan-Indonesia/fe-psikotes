'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
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

interface QuestionListProps {
  testId: string
}

export function QuestionList({ testId }: QuestionListProps) {
  const { data: questions, isLoading: questionsLoading } = useQuestions(testId)
  const { data: sections } = useSections(testId)
  const deleteQuestion = useDeleteQuestion()
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections?.map((s) => s.id) || []),
  )

  const handleDelete = () => {
    if (deleteId) {
      deleteQuestion.mutate({ testId, questionId: deleteId })
      setDeleteId(null)
    }
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

  if (questionsLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    )
  }

  const questionsBySection = questions?.reduce(
    (acc, q) => {
      const sectionId = q.sectionId || 'unsectioned'
      if (!acc[sectionId]) acc[sectionId] = []
      acc[sectionId].push(q)
      return acc
    },
    {} as Record<string, typeof questions>,
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pertanyaan</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pertanyaan
        </Button>
      </div>

      {questions && questions.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">
          Belum ada pertanyaan
        </Card>
      ) : (
        <div className="space-y-3">
          {sections?.map((section) => {
            const sectionQuestions = questionsBySection?.[section.id] || []
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
                    <Badge variant="secondary">{sectionQuestions.length}</Badge>
                  </div>
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-2 space-y-2 border-l-2 pl-4">
                    {sectionQuestions.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-2">
                        Belum ada pertanyaan di seksi ini
                      </p>
                    ) : (
                      sectionQuestions.map((question) => (
                        <Card key={question.id} className="p-3">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {question.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  #{question.order}
                                </span>
                              </div>
                              <p className="text-sm mt-2">{question.text}</p>
                              {question.options && question.options.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  {question.options.length} opsi
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowForm(true)}
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
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {questionsBySection?.['unsectioned'] && (
            <div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <span className="font-semibold text-sm">Tanpa Seksi</span>
                <Badge variant="secondary" className="ml-2">
                  {questionsBySection['unsectioned'].length}
                </Badge>
              </div>
              <div className="ml-4 mt-2 space-y-2 border-l-2 pl-4">
                {questionsBySection['unsectioned'].map((question) => (
                  <Card key={question.id} className="p-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{question.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            #{question.order}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{question.text}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowForm(true)}
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
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <QuestionForm open={showForm} onOpenChange={setShowForm} testId={testId} />

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
