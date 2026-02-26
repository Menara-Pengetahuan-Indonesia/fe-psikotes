'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useIndicators, useDeleteIndicator } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { IndicatorForm } from './IndicatorForm'
import type { Indicator } from '../../types'

interface IndicatorListProps {
  testId: string
}

export function IndicatorList({ testId }: IndicatorListProps) {
  const { data: indicators, isLoading } = useIndicators(testId)
  const deleteIndicator = useDeleteIndicator()
  const [showForm, setShowForm] = useState(false)
  const [editingIndicator, setEditingIndicator] = useState<Indicator | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (indicator: Indicator) => {
    setEditingIndicator(indicator)
    setShowForm(true)
  }

  const handleCloseForm = (open: boolean) => {
    setShowForm(open)
    if (!open) {
      setEditingIndicator(undefined)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteIndicator.mutate(
      { testId, indicatorId: deleteId },
      { onSuccess: () => setDeleteId(null) },
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Indikator</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Indikator
        </Button>
      </div>

      {!indicators || indicators.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-3">Belum ada indikator</p>
          <p className="text-sm text-muted-foreground">
            Indikator digunakan untuk mengukur aspek-aspek psikologis dari peserta tes.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {indicators
            .sort((a, b) => a.order - b.order)
            .map((indicator) => (
              <Card
                key={indicator.id}
                className="p-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      #{indicator.order}
                    </span>
                    <h3 className="font-semibold">{indicator.name}</h3>
                  </div>
                  {indicator.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {indicator.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(indicator)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(indicator.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      )}

      <IndicatorForm
        testId={testId}
        open={showForm}
        onOpenChange={handleCloseForm}
        initialData={editingIndicator}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Indikator"
        description="Apakah Anda yakin ingin menghapus indikator ini? Pemetaan skor yang terkait juga akan dihapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteIndicator.isPending}
      />
    </div>
  )
}
