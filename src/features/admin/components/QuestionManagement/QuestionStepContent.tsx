'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Edit2,
  Trash2,
  FileUp,
  PenLine,
  HelpCircle,
  Plus,
  Layout,
  Hash,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuestions, useSections, useDeleteQuestion } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { BulkImportCSV } from './BulkImportCSV'
import type { Question } from '../../types'
import { QUESTION_TYPE_SHORT_LABELS, QUESTION_TYPE_COLORS } from '@features/admin/constants'
import { cn } from '@/lib/utils'

interface QuestionStepContentProps {
  testId: string
}

export function QuestionStepContent({ testId }: QuestionStepContentProps) {
  const router = useRouter()
  const { data: questions, isLoading } = useQuestions(testId)
  const { data: sections } = useSections(testId)
  const deleteQuestion = useDeleteQuestion()

  const [mode, setMode] = useState<'manual' | 'csv'>('manual')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAdd = () => {
    router.push(`/admin/tests/${testId}/pertanyaan/buat`)
  }

  const handleEdit = (question: Question) => {
    router.push(`/admin/tests/${testId}/pertanyaan/${question.id}`)
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
      <div className="space-y-4 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
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

  const sortedSections = (sections ?? []).sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Mode toggle + Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-slate-100 rounded-xl w-fit">
          <button
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all",
              mode === 'manual' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
            onClick={() => setMode('manual')}
          >
            <PenLine className="size-3.5" />
            Manual
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all",
              mode === 'csv' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
            onClick={() => setMode('csv')}
          >
            <FileUp className="size-3.5" />
            Import CSV
          </button>
        </div>

        {mode === 'manual' && (
          <Button
            onClick={handleAdd}
            className="rounded-xl h-11 px-6 font-black bg-slate-900 hover:bg-slate-800 transition-all active:scale-95 group"
          >
            <Plus className="size-4 mr-2 group-hover:rotate-90 transition-transform" />
            Tambah Pertanyaan
          </Button>
        )}
      </div>

      {/* Content */}
      {mode === 'csv' ? (
        <div className="rounded-2xl border border-slate-100 p-6">
          <BulkImportCSV testId={testId} />
        </div>
      ) : (
        <>
          {!questions || questions.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-14 text-center flex flex-col items-center">
              <div className="size-16 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center mb-5">
                <HelpCircle className="size-8" />
              </div>
              <p className="text-slate-900 font-black text-lg mb-1">Bank Soal Kosong.</p>
              <p className="text-slate-400 font-medium text-sm mb-6 max-w-sm">
                Tambahkan pertanyaan secara manual atau import CSV.
              </p>
              <Button className="rounded-xl h-11 px-6 font-black" onClick={handleAdd}>
                <Plus className="size-4 mr-2" />
                Buat Pertanyaan Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sectioned questions */}
              {sortedSections.map((section) => {
                const sectionQuestions = (
                  questionsBySection[section.id] || []
                ).sort((a, b) => a.order - b.order)

                if (sectionQuestions.length === 0) return null

                return (
                  <div key={section.id} className="space-y-2">
                    <div className="flex items-center gap-3 px-2">
                      <div className="size-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                        <Layout className="size-4" />
                      </div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        {section.name}
                      </h3>
                      <Badge className="bg-slate-100 text-slate-500 border-0 rounded-full font-black text-[10px] px-2.5">
                        {sectionQuestions.length} SOAL
                      </Badge>
                    </div>

                    <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-2">
                      <div className="size-8 rounded-lg bg-slate-300 text-white flex items-center justify-center">
                        <AlertCircle className="size-4" />
                      </div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Tanpa Seksi
                      </h3>
                      <Badge className="bg-slate-100 text-slate-500 border-0 rounded-full font-black text-[10px] px-2.5">
                        {questionsBySection['unsectioned'].length} SOAL
                      </Badge>
                    </div>

                    <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
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
    <div className="group flex items-center gap-5 px-6 py-4 hover:bg-slate-50/50 transition-all">
      {/* Order + Type */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="size-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
          #{question.order}
        </div>
        <Badge className={cn(
          "border-0 rounded-full font-black text-[9px] uppercase tracking-widest py-0.5 px-2.5",
          QUESTION_TYPE_COLORS[question.type] || "bg-slate-100 text-slate-500"
        )}>
          {QUESTION_TYPE_SHORT_LABELS[question.type] || question.type}
        </Badge>
      </div>

      {/* Text + Meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-700 line-clamp-1 group-hover:text-slate-900 transition-colors">
          {question.text}
        </p>
        {optionCount > 0 && (
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
            {optionCount} opsi jawaban
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="size-9 rounded-xl hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Edit2 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="size-9 rounded-xl hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}
