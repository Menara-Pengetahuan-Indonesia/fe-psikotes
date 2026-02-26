'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useScoringRules,
  useDeleteScoringRule,
  useIndicators,
} from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { ScoringRuleForm } from './ScoringRuleForm'
import type { ScoringRule } from '../../types'

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
    if (!open) {
      setEditingRule(undefined)
    }
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
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Aturan Skor</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Aturan
        </Button>
      </div>

      {rules && rules.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-3">Belum ada aturan skor</p>
          <p className="text-sm text-muted-foreground">
            Aturan skor menentukan interpretasi hasil berdasarkan rentang skor per indikator.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {indicators?.map((indicator) => {
            const indicatorRules = rulesByIndicator?.[indicator.id] || []

            if (indicatorRules.length === 0) return null

            return (
              <div key={indicator.id} className="space-y-2">
                <h3 className="font-semibold text-sm">{indicator.name}</h3>
                <div className="space-y-2 ml-4">
                  {indicatorRules.map((rule) => (
                    <Card key={rule.id} className="p-3 flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{rule.resultType}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Skor: {rule.minScore} - {rule.maxScore}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(rule)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteId(rule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
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
