'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { WizardStepper } from '@/components/ui/wizard-stepper'
import { useTest, useIndicators, useQuestions, useScoringRules } from '../../hooks'
import { TestForm } from './TestForm'
import { IndicatorList } from '../IndicatorManagement/IndicatorList'
import { SectionList } from '../SectionManagement/SectionList'
import { QuestionList } from '../QuestionManagement/QuestionList'
import { ScoringRuleList } from '../ScoringRuleManagement/ScoringRuleList'
import { PublishTab } from './PublishTab'

interface TestWizardProps {
  testId: string
}

export function TestWizard({ testId }: TestWizardProps) {
  const { data: test, isLoading } = useTest(testId)
  const { data: indicators } = useIndicators(testId)
  const { data: questions } = useQuestions(testId)
  const { data: scoringRules } = useScoringRules(testId)
  const [activeStep, setActiveStep] = useState(0)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!test) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Tes tidak ditemukan</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/admin/tests">Kembali ke Daftar Tes</Link>
        </Button>
      </div>
    )
  }

  // Step completion logic
  const indicatorIds = new Set(indicators?.map((i) => i.id) ?? [])
  const indicatorsWithRules = new Set(
    scoringRules?.map((r) => r.indicatorId) ?? [],
  )
  const allIndicatorsHaveRules =
    (indicators?.length ?? 0) > 0 &&
    [...indicatorIds].every((id) => indicatorsWithRules.has(id))

  const steps = [
    { label: 'Info Tes', completed: !!(test.name && test.duration) },
    { label: 'Indikator', completed: (indicators?.length ?? 0) > 0 },
    { label: 'Seksi', completed: true },
    { label: 'Soal', completed: (questions?.length ?? 0) > 0 },
    { label: 'Aturan Skor', completed: allIndicatorsHaveRules },
    { label: 'Publish', completed: !!test.isPublished },
  ]

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <TestForm
            initialData={test}
            onSuccess={() => setActiveStep(1)}
          />
        )
      case 1:
        return <IndicatorList testId={testId} />
      case 2:
        return <SectionList testId={testId} />
      case 3:
        return <QuestionList testId={testId} />
      case 4:
        return <ScoringRuleList testId={testId} />
      case 5:
        return <PublishTab testId={testId} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button + Test name + Badge */}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/tests">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Tes
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{test.name}</h1>
          <Badge variant={test.isPublished ? 'default' : 'secondary'}>
            {test.isPublished ? 'Dipublikasikan' : 'Draft'}
          </Badge>
        </div>
      </div>

      {/* Wizard Stepper */}
      <WizardStepper
        steps={steps}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />

      {/* Step content area */}
      <Card className="p-6">
        {renderStepContent()}
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        {activeStep > 0 ? (
          <Button
            variant="outline"
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
        ) : (
          <div />
        )}
        {activeStep < 5 ? (
          <Button
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
