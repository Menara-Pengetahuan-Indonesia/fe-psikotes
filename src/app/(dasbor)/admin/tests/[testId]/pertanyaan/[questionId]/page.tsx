'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit2 } from 'lucide-react'
import { QuestionFormWizard } from '@/features/admin/components/QuestionManagement/QuestionFormWizard'
import { useQuestions } from '@/features/admin/hooks'
import { Skeleton } from '@/components/ui/skeleton'

interface PageProps {
  params: Promise<{ testId: string; questionId: string }>
}

export default function EditQuestionPage({ params }: PageProps) {
  const router = useRouter()
  const { testId, questionId } = use(params)
  const { data: questions, isLoading } = useQuestions(testId)

  const question = questions?.find((q) => q.id === questionId)

  const handleBack = () => {
    router.push(`/admin/tests/${testId}`)
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
        <Skeleton className="h-36 rounded-[2rem]" />
        <Skeleton className="h-[30rem] rounded-[2rem]" />
      </div>
    )
  }

  if (!question) {
    return (
      <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 max-w-2xl mx-auto mt-20">
        <h3 className="text-xl font-black text-slate-900 mb-2">Pertanyaan Tidak Ditemukan</h3>
        <button onClick={handleBack} className="text-indigo-600 font-bold underline text-sm">Kembali</button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 text-white">
        <div className="relative z-10">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-5"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali ke Wizard</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-violet-500 flex items-center justify-center">
              <Edit2 className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Edit Pertanyaan</h1>
              <p className="text-sm text-slate-400 font-medium">Lakukan perubahan pada butir soal ini.</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Edit2 className="size-48" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8">
        <QuestionFormWizard
          testId={testId}
          initialData={question}
          onSaved={handleBack}
          onCancel={handleBack}
        />
      </div>
    </div>
  )
}
