'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  Target,
  Layers,
  HelpCircle,
  Calculator,
  Send,
  Clock,
  Shuffle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { WizardStepper } from '@/components/ui/wizard-stepper'
import { useTest, useIndicators, useQuestions, useScoringRules, useSections } from '../../hooks'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { TestForm } from './TestForm'
import { IndicatorList } from '../IndicatorManagement/IndicatorList'
import { SectionList } from '../SectionManagement/SectionList'
import { QuestionStepContent } from '../QuestionManagement/QuestionStepContent'
import { ScoringRuleList } from '../ScoringRuleManagement/ScoringRuleList'
import { PublishTab } from './PublishTab'
import { cn } from '@/lib/utils'

interface TestWizardProps {
  testId: string
}

export function TestWizard({ testId }: TestWizardProps) {
  const [activeStep, setActiveStep] = useState(0)
  const { _hasHydrated } = useAuthStoreHydrated()

  const { data: test, isLoading: testLoading } = useTest(testId)
  const { data: indicators, isLoading: indicatorsLoading } = useIndicators(testId)
  const { data: sections, isLoading: sectionsLoading } = useSections(testId)
  const { data: questions, isLoading: questionsLoading } = useQuestions(testId)
  const { data: scoringRules, isLoading: rulesLoading } = useScoringRules(testId)

  const stepStatus = useMemo(() => {
    const isIdentityDone = !!(test?.name && test?.duration && test.duration > 0)
    const isIndicatorsDone = Array.isArray(indicators) && indicators.length > 0
    const isSectionsDone = Array.isArray(sections) && sections.length > 0
    const hasQuestions = Array.isArray(questions) && questions.length > 0
    const allQuestionsValid = hasQuestions && questions.every(q =>
      (q.type === 'ESSAY' || q.type === 'RATING_SCALE') || (q.options && q.options.length > 0)
    )
    const isQuestionsDone = hasQuestions && allQuestionsValid
    const currentIndicatorIds = Array.isArray(indicators) ? indicators.map(i => i.id) : []
    const indicatorsWithRules = new Set(Array.isArray(scoringRules) ? scoringRules.map(r => r.indicatorId) : [])
    const isScoringDone = currentIndicatorIds.length > 0 && currentIndicatorIds.every(id => indicatorsWithRules.has(id))
    const isPublished = !!test?.isPublished

    return { isIdentityDone, isIndicatorsDone, isSectionsDone, isQuestionsDone, isScoringDone, isPublished }
  }, [test, indicators, sections, questions, scoringRules])

  const steps = [
    { label: 'Identitas', completed: stepStatus.isIdentityDone, icon: FileText },
    { label: 'Indikator', completed: stepStatus.isIndicatorsDone, icon: Target },
    { label: 'Seksi', completed: stepStatus.isSectionsDone, icon: Layers },
    { label: 'Bank Soal', completed: stepStatus.isQuestionsDone, icon: HelpCircle },
    { label: 'Penilaian', completed: stepStatus.isScoringDone, icon: Calculator },
    { label: 'Publikasi', completed: stepStatus.isPublished, icon: Send },
  ]

  const isAnyDataLoading = testLoading || indicatorsLoading || sectionsLoading || questionsLoading || rulesLoading

  if (isAnyDataLoading || !_hasHydrated) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-48 rounded-[2.5rem]" />
        <Skeleton className="h-16 rounded-2xl" />
        <Skeleton className="h-[30rem] rounded-[2.5rem]" />
      </div>
    )
  }

  if (!test) return null

  const completedCount = steps.filter(s => s.completed).length

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <TestForm initialData={test} onSuccess={() => setActiveStep(1)} />
      case 1:
        return <IndicatorList testId={testId} />
      case 2:
        return <SectionList testId={testId} />
      case 3:
        return <QuestionStepContent testId={testId} />
      case 4:
        return <ScoringRuleList testId={testId} />
      case 5:
        return <PublishTab testId={testId} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          {/* Back + Badge */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/admin/tests"
              className="group flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
            >
              <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <ArrowLeft className="size-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali</span>
            </Link>
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full",
              test.isPublished ? "bg-teal-500/20 text-teal-300" : "bg-violet-500/20 text-violet-300"
            )}>
              {test.isPublished ? 'Live & Active' : 'Draft Mode'}
            </span>
          </div>

          {/* Title + Meta */}
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-3">
            {test.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="size-4" />
              <span className="font-bold">{test.duration} menit</span>
            </div>
            {test.shuffleQuestions && (
              <div className="flex items-center gap-1.5 text-indigo-300">
                <Shuffle className="size-4" />
                <span className="font-bold">Acak Soal</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-bold">{completedCount}/{steps.length} langkah selesai</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full transition-all duration-700"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <FileText className="size-64" />
        </div>
      </div>

      {/* STEPPER */}
      <div className="bg-white rounded-2xl border border-slate-100 px-8 py-6">
        <WizardStepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
      </div>

      {/* STEP CONTENT */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">
          {renderStepContent()}
        </div>

        {/* FOOTER NAV */}
        <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          {activeStep > 0 ? (
            <Button
              variant="ghost"
              size="lg"
              className="rounded-xl h-12 px-6 font-black text-slate-400 hover:text-slate-900 transition-all group"
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              <ChevronLeft className="size-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              Sebelumnya
            </Button>
          ) : (
            <div />
          )}

          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            {activeStep + 1} / {steps.length}
          </span>

          {activeStep < 5 ? (
            <Button
              size="lg"
              className="rounded-xl h-12 px-6 font-black bg-slate-900 hover:bg-slate-800 text-white transition-all group"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Berikutnya
              <ChevronRight className="size-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
