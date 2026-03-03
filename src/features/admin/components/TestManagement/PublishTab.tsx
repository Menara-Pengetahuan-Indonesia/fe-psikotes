'use client'

import { CheckCircle2, AlertTriangle, XCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  severity: 'blocker' | 'warning'
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

  const indicatorIds = new Set(indicators?.map((i) => i.id) ?? [])
  const indicatorsWithRules = new Set(
    scoringRules?.map((r) => r.indicatorId) ?? [],
  )
  const allIndicatorsHaveRules =
    hasIndicators && [...indicatorIds].every((id) => indicatorsWithRules.has(id))

  // Indicator statistics computation
  const indicatorStats = (indicators ?? []).map((indicator) => {
    let questionCount = 0
    let minTotal = 0
    let maxTotal = 0

    ;(questions ?? []).forEach((q) => {
      const optionScores = q.options
        ?.flatMap(
          (o) =>
            o.mappings?.filter((m) => m.indicatorId === indicator.id) ?? [],
        )
        .map((m) => m.scoreValue) ?? []

      if (optionScores.length > 0) {
        questionCount++
        minTotal += Math.min(...optionScores)
        maxTotal += Math.max(...optionScores)
      }
    })

    const ruleCount = (scoringRules ?? []).filter(
      (r) => r.indicatorId === indicator.id,
    ).length

    return {
      name: indicator.name,
      questionCount,
      minTotal,
      maxTotal,
      ruleCount,
    }
  })

  // Unused indicators (0 linked questions)
  const unusedIndicators = indicatorStats.filter((s) => s.questionCount === 0)

  // Questions without sections
  const questionsWithoutSections = (questions ?? []).filter((q) => !q.sectionId)

  const checks: CheckItem[] = [
    {
      label: 'Tes memiliki durasi',
      passed: hasDuration,
      warning: 'Durasi tes belum diatur',
      severity: 'blocker',
    },
    {
      label: 'Tes memiliki pertanyaan',
      passed: hasQuestions,
      warning: 'Tambahkan minimal 1 pertanyaan',
      severity: 'blocker',
    },
    {
      label: 'Tes memiliki indikator',
      passed: hasIndicators,
      warning: 'Tambahkan minimal 1 indikator',
      severity: 'blocker',
    },
    {
      label: 'Semua pertanyaan (PG/B-S) memiliki opsi',
      passed: questionsWithOptions.length === 0 || allQuestionsHaveOptions,
      warning: 'Beberapa pertanyaan belum memiliki opsi jawaban',
      severity: 'blocker',
    },
    {
      label: 'Semua indikator memiliki aturan skor',
      passed: !hasIndicators || allIndicatorsHaveRules,
      warning: 'Beberapa indikator belum memiliki aturan skor',
      severity: 'blocker',
    },
    {
      label: 'Semua pertanyaan memiliki seksi',
      passed: questionsWithoutSections.length === 0,
      warning: `${questionsWithoutSections.length} pertanyaan belum memiliki seksi`,
      severity: 'warning',
    },
    {
      label: 'Semua indikator digunakan di pertanyaan',
      passed: unusedIndicators.length === 0,
      warning: `${unusedIndicators.length} indikator belum terhubung ke pertanyaan: ${unusedIndicators.map((i) => i.name).join(', ')}`,
      severity: 'warning',
    },
  ]

  const hasBlockers = checks.some((c) => !c.passed && c.severity === 'blocker')
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
              ) : check.severity === 'blocker' ? (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={
                    check.passed
                      ? 'text-sm font-medium'
                      : check.severity === 'blocker'
                        ? 'text-sm font-medium text-red-700'
                        : 'text-sm font-medium text-yellow-700'
                  }
                >
                  {check.label}
                </p>
                {!check.passed && check.warning && (
                  <p
                    className={
                      check.severity === 'blocker'
                        ? 'text-xs text-red-600 mt-0.5'
                        : 'text-xs text-yellow-600 mt-0.5'
                    }
                  >
                    {check.warning}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Indicator Statistics Table */}
      {hasIndicators && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Statistik Indikator</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indikator</TableHead>
                <TableHead className="text-center">Soal Terkait</TableHead>
                <TableHead className="text-center">Range Skor</TableHead>
                <TableHead className="text-center">Aturan Skor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicatorStats.map((stat) => (
                <TableRow key={stat.name}>
                  <TableCell className="font-medium">{stat.name}</TableCell>
                  <TableCell className="text-center">
                    {stat.questionCount === 0 ? (
                      <span className="text-muted-foreground">0</span>
                    ) : (
                      stat.questionCount
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {stat.questionCount === 0 ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      `${stat.minTotal} — ${stat.maxTotal}`
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {stat.ruleCount === 0 ? (
                      <span className="text-red-500">0</span>
                    ) : (
                      stat.ruleCount
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

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
            disabled={hasBlockers || publishTest.isPending}
          >
            {publishTest.isPending
              ? 'Mempublikasikan...'
              : 'Publikasikan Tes'}
          </Button>
        )}
      </div>

      {!test?.isPublished && hasBlockers && (
        <p className="text-sm text-red-600">
          Selesaikan semua pengecekan wajib (❌) sebelum mempublikasikan tes.
        </p>
      )}

      {!test?.isPublished && !hasBlockers && !allChecksPassed && (
        <p className="text-sm text-yellow-600">
          Ada peringatan (⚠️) yang sebaiknya diselesaikan, tapi tidak menghalangi publikasi.
        </p>
      )}
    </div>
  )
}
