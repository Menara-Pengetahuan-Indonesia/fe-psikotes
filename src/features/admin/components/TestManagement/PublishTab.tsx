'use client'

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  useTest,
  useIndicators,
  useQuestions,
  useScoringRules,
  usePublishTest,
  useUnpublishTest,
} from '../../hooks'
import { cn } from '@/lib/utils'

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
    (q) => q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE',
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

    return { name: indicator.name, questionCount, minTotal, maxTotal, ruleCount }
  })

  const unusedIndicators = indicatorStats.filter((s) => s.questionCount === 0)
  const questionsWithoutSections = (questions ?? []).filter((q) => !q.sectionId)

  const checks: CheckItem[] = [
    { label: 'Durasi telah diatur', passed: hasDuration, warning: 'Durasi tes belum diatur', severity: 'blocker' },
    { label: 'Minimal 1 pertanyaan', passed: hasQuestions, warning: 'Tambahkan minimal 1 pertanyaan', severity: 'blocker' },
    { label: 'Minimal 1 indikator', passed: hasIndicators, warning: 'Tambahkan minimal 1 indikator', severity: 'blocker' },
    { label: 'Semua pertanyaan memiliki opsi', passed: questionsWithOptions.length === 0 || allQuestionsHaveOptions, warning: 'Beberapa pertanyaan belum memiliki opsi', severity: 'blocker' },
    { label: 'Semua indikator memiliki aturan skor', passed: !hasIndicators || allIndicatorsHaveRules, warning: 'Beberapa indikator belum memiliki aturan skor', severity: 'blocker' },
    { label: 'Semua pertanyaan memiliki seksi', passed: questionsWithoutSections.length === 0, warning: `${questionsWithoutSections.length} pertanyaan belum memiliki seksi`, severity: 'warning' },
    { label: 'Semua indikator digunakan', passed: unusedIndicators.length === 0, warning: `${unusedIndicators.length} indikator belum terhubung`, severity: 'warning' },
  ]

  const hasBlockers = checks.some((c) => !c.passed && c.severity === 'blocker')

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Status Banner */}
      <div className={cn(
        "rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6",
        test?.isPublished ? "bg-teal-500 text-white" : "bg-slate-900 text-white"
      )}>
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              {test?.isPublished ? 'Tes Aktif' : 'Final Check'}
            </h2>
            <p className="text-sm font-medium opacity-70">
              {test?.isPublished
                ? 'Tes ini sudah aktif dan dapat diakses pengguna.'
                : 'Pastikan semua persyaratan terpenuhi.'}
            </p>
          </div>
        </div>

        {test?.isPublished ? (
          <Button
            variant="outline"
            className="h-12 px-8 rounded-xl font-black bg-white/10 border-white/20 text-white hover:bg-white hover:text-teal-600 transition-all"
            onClick={() => unpublishTest.mutate(testId)}
            disabled={unpublishTest.isPending}
          >
            Batalkan Publikasi
          </Button>
        ) : (
          <Button
            className={cn(
              "h-12 px-8 rounded-xl font-black transition-all group",
              hasBlockers ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-white text-slate-900 hover:bg-slate-50 shadow-lg"
            )}
            onClick={() => publishTest.mutate(testId)}
            disabled={hasBlockers || publishTest.isPending}
          >
            <Send className="size-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            Publikasikan
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900 px-1">Daftar Pengecekan</h3>
          <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center gap-4 px-5 py-4">
                {check.passed ? (
                  <div className="size-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-4" />
                  </div>
                ) : check.severity === 'blocker' ? (
                  <div className="size-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <XCircle className="size-4" />
                  </div>
                ) : (
                  <div className="size-8 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="size-4" />
                  </div>
                )}
                <span className={cn(
                  "text-sm font-bold",
                  check.passed ? "text-slate-900" : "text-slate-400"
                )}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicator Stats */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900 px-1">Statistik Indikator</h3>
          <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {/* Header */}
            <div className="grid grid-cols-4 px-5 py-3 bg-slate-50/50">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indikator</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Soal</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Range</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aturan</span>
            </div>
            {indicatorStats.map((stat) => (
              <div key={stat.name} className="grid grid-cols-4 items-center px-5 py-3.5">
                <span className="text-sm font-bold text-slate-900 truncate pr-2">{stat.name}</span>
                <span className="text-sm font-black text-slate-600 text-center">{stat.questionCount}</span>
                <span className="text-xs font-bold text-slate-400 text-center">
                  {stat.questionCount > 0 ? `${stat.minTotal}–${stat.maxTotal}` : '-'}
                </span>
                <div className="text-center">
                  {stat.ruleCount === 0 ? (
                    <Badge className="bg-rose-50 text-rose-500 border-0 rounded-full font-black text-[9px]">BELUM</Badge>
                  ) : (
                    <Badge className="bg-teal-50 text-teal-600 border-0 rounded-full font-black text-[9px]">{stat.ruleCount}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-indigo-600">{questions?.length ?? 0}</p>
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Pertanyaan</p>
        </div>
        <div className="bg-violet-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-violet-600">{indicators?.length ?? 0}</p>
          <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mt-0.5">Indikator</p>
        </div>
        <div className="bg-teal-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-teal-600">{test?.duration ?? 0}m</p>
          <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mt-0.5">Durasi</p>
        </div>
      </div>
    </div>
  )
}
