'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Calculator, ArrowRight, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useScoringRules,
  useDeleteScoringRule,
  useIndicators,
} from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { ScoringRuleForm } from './ScoringRuleForm'
import type { ScoringRule } from '../../types'
import { cn } from '@/lib/utils'

const INDICATOR_ACCENTS = [
  { iconBg: 'bg-teal-500', tagBg: 'bg-teal-50 text-teal-700', borderHover: 'hover:border-teal-200' },
  { iconBg: 'bg-indigo-500', tagBg: 'bg-indigo-50 text-indigo-700', borderHover: 'hover:border-indigo-200' },
  { iconBg: 'bg-violet-500', tagBg: 'bg-violet-50 text-violet-700', borderHover: 'hover:border-violet-200' },
  { iconBg: 'bg-rose-500', tagBg: 'bg-rose-50 text-rose-700', borderHover: 'hover:border-rose-200' },
] as const

interface ScoringRuleListProps {
  testId: string
}

export function ScoringRuleList({ testId }: ScoringRuleListProps) {
  const { data: rules, isLoading } = useScoringRules(testId)
  const { data: indicators } = useIndicators(testId)
  const deleteRule = useDeleteScoringRule()
  const [showForm, setShowForm] = useState(false)
  const [editingRule, setEditingRule] = useState<ScoringRule | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (rule: ScoringRule) => {
    setEditingRule(rule)
    setShowForm(true)
  }

  const handleCloseForm = (open: boolean) => {
    setShowForm(open)
    if (!open) setEditingRule(undefined)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteRule.mutate(
        { testId, ruleId: deleteId },
        { onSuccess: () => setDeleteId(null) },
      )
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    )
  }

  const rulesByIndicator = rules?.reduce(
    (acc, rule) => {
      const indicatorId = rule.indicatorId
      if (!acc[indicatorId]) acc[indicatorId] = []
      acc[indicatorId].push(rule)
      return acc
    },
    {} as Record<string, typeof rules>,
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Aturan Penilaian</h2>
          <p className="text-slate-400 font-medium text-sm mt-0.5">Tentukan interpretasi hasil berdasarkan skor indikator.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="rounded-xl h-11 px-6 font-black bg-slate-900 hover:bg-slate-800 transition-all active:scale-95 group"
        >
          <Plus className="size-4 mr-2 group-hover:rotate-90 transition-transform" />
          Tambah Aturan
        </Button>
      </div>

      {/* Empty */}
      {rules && rules.length === 0 ? (
        <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-14 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center mb-5">
            <Calculator className="size-8" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada aturan skor.</p>
          <p className="text-slate-400 font-medium text-sm mb-6 max-w-sm">
            Aturan skor menerjemahkan nilai angka menjadi narasi hasil (misal: 80-100 = Sangat Baik).
          </p>
          <Button className="rounded-xl h-11 px-6 font-black" onClick={() => setShowForm(true)}>
            <Plus className="size-4 mr-2" />
            Tambah Aturan Pertama
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {indicators?.map((indicator, indicatorIndex) => {
            const indicatorRules = rulesByIndicator?.[indicator.id] || []
            if (indicatorRules.length === 0) return null
            const accent = INDICATOR_ACCENTS[indicatorIndex % INDICATOR_ACCENTS.length]

            return (
              <div key={indicator.id} className="space-y-2">
                {/* Indicator header */}
                <div className="flex items-center gap-3 px-2 mb-1">
                  <div className={cn("size-8 rounded-lg flex items-center justify-center text-white", accent.iconBg)}>
                    <Target className="size-4" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{indicator.name}</h3>
                  <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full", accent.tagBg)}>
                    {indicatorRules.length} ATURAN
                  </span>
                </div>

                {/* Rules as rows */}
                <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                  {indicatorRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="group flex items-center gap-5 px-6 py-4 hover:bg-slate-50/50 transition-all"
                    >
                      {/* Score range */}
                      <div className="flex items-center gap-2 shrink-0 min-w-[100px]">
                        <span className="text-lg font-black text-slate-900">{rule.minScore}</span>
                        <ArrowRight className="size-3.5 text-slate-300" />
                        <span className="text-lg font-black text-slate-900">{rule.maxScore}</span>
                      </div>

                      {/* Result type + description */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-slate-900">{rule.resultType}</h4>
                        {rule.description && (
                          <p className="text-xs text-slate-400 font-medium truncate">{rule.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-xl hover:bg-teal-50 hover:text-teal-600"
                          onClick={() => handleEdit(rule)}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-xl hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => setDeleteId(rule.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ScoringRuleForm
        open={showForm}
        onOpenChange={handleCloseForm}
        testId={testId}
        initialData={editingRule}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Aturan Skor"
        description="Apakah Anda yakin ingin menghapus aturan skor ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteRule.isPending}
      />
    </div>
  )
}
