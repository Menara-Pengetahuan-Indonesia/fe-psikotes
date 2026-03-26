'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { QuestionFormWizard } from '@/features/admin/components/QuestionManagement/QuestionFormWizard'

interface PageProps {
  params: Promise<{ testId: string }>
}

export default function CreateQuestionPage({ params }: PageProps) {
  const router = useRouter()
  const { testId } = use(params)

  const handleBack = () => {
    router.push(`/admin/tests/${testId}`)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white">
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
            <div className="size-11 rounded-xl bg-indigo-500 flex items-center justify-center">
              <HelpCircle className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Pertanyaan Baru</h1>
              <p className="text-sm text-slate-400 font-medium">Buat pertanyaan psikotes untuk instrumen ini.</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <HelpCircle className="size-48" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8">
        <QuestionFormWizard
          testId={testId}
          onSaved={handleBack}
          onCancel={handleBack}
        />
      </div>
    </div>
  )
}
