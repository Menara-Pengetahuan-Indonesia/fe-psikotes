'use client'

import { CheckCircle2, AlertTriangle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  useTest,
  useIndicators,
  useQuestions,
  useScoringRules,
  usePublishTest,
  useUnpublishTest,
} from '../../hooks'

interface PublishTabProps {
  testId: string
}

interface CheckItem {
  label: string
  passed: boolean
  warning?: string
}

export function PublishTab({ testId }: PublishTabProps) {
  const { data: test } = useTest(testId)
  const { data: indicators } = useIndicators(testId)
  const { data: questions } = useQuestions(testId)
  const { data: scoringRules } = useScoringRules(testId)
  const publishTest = usePublishTest()
  const unpublishTest = useUnpublishTest()

  const hasQuestions = (questions?.length ?? 0) > 0
  const hasIndicators = (indicators?.length ?? 0) > 0
  const hasDuration = (test?.duration ?? 0) > 0

  const questionsWithOptions = questions?.filter(
    (q) =>
      q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE',
  ) ?? []
  const allQuestionsHaveOptions = questionsWithOptions.every(
    (q) => (q.options?.length ?? 0) > 0,
  )

  const allOptionsHaveMappings = questionsWithOptions.every((q) =>
    q.options?.every(
      (opt) => (opt.mappings?.length ?? 0) > 0,
    ),
  )

  const indicatorIds = new Set(indicators?.map((i) => i.id) ?? [])
  const indicatorsWithRules = new Set(
    scoringRules?.map((r) => r.indicatorId) ?? [],
  )
  const allIndicatorsHaveRules =
    hasIndicators && [...indicatorIds].every((id) => indicatorsWithRules.has(id))

  const checks: CheckItem[] = [
    {
      label: 'Tes memiliki durasi',
      passed: hasDuration,
      warning: 'Durasi tes belum diatur',
    },
    {
      label: 'Tes memiliki pertanyaan',
      passed: hasQuestions,
      warning: 'Tambahkan minimal 1 pertanyaan',
    },
    {
      label: 'Tes memiliki indikator',
      passed: hasIndicators,
      warning: 'Tambahkan minimal 1 indikator',
    },
    {
      label: 'Semua pertanyaan (PG/B-S) memiliki opsi',
      passed: questionsWithOptions.length === 0 || allQuestionsHaveOptions,
      warning: 'Beberapa pertanyaan belum memiliki opsi jawaban',
    },
    {
      label: 'Semua opsi memiliki pemetaan indikator',
      passed: questionsWithOptions.length === 0 || allOptionsHaveMappings,
      warning: 'Beberapa opsi belum dipetakan ke indikator',
    },
    {
      label: 'Semua indikator memiliki aturan skor',
      passed: !hasIndicators || allIndicatorsHaveRules,
      warning: 'Beberapa indikator belum memiliki aturan skor',
    },
  ]

  const allChecksPassed = checks.every((c) => c.passed)

  const handlePublish = () => {
    publishTest.mutate(testId)
  }

  const handleUnpublish = () => {
    unpublishTest.mutate(testId)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Status Publikasi</h3>
        <div className="flex items-center gap-2 mb-4">
          {test?.isPublished ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-semibold">
                Dipublikasikan
              </span>
            </>
          ) : (
            <>
              <Circle className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-semibold">
                Draft
              </span>
            </>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3 pt-4 border-t">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Pertanyaan</p>
            <p className="text-2xl font-bold">{questions?.length ?? 0}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Indikator</p>
            <p className="text-2xl font-bold">{indicators?.length ?? 0}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Durasi</p>
            <p className="text-2xl font-bold">{test?.duration ?? 0} menit</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Pengecekan</h3>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-3">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={
                    check.passed
                      ? 'text-sm font-medium'
                      : 'text-sm font-medium text-yellow-700'
                  }
                >
                  {check.label}
                </p>
                {!check.passed && check.warning && (
                  <p className="text-xs text-yellow-600 mt-0.5">
                    {check.warning}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        {test?.isPublished ? (
          <Button
            variant="outline"
            onClick={handleUnpublish}
            disabled={unpublishTest.isPending}
          >
            {unpublishTest.isPending
              ? 'Membatalkan...'
              : 'Batalkan Publikasi'}
          </Button>
        ) : (
          <Button
            onClick={handlePublish}
            disabled={!allChecksPassed || publishTest.isPending}
          >
            {publishTest.isPending
              ? 'Mempublikasikan...'
              : 'Publikasikan Tes'}
          </Button>
        )}
      </div>

      {!test?.isPublished && !allChecksPassed && (
        <p className="text-sm text-muted-foreground">
          Selesaikan semua pengecekan di atas sebelum mempublikasikan tes.
        </p>
      )}
    </div>
  )
}
