'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useIndicators,
  useDeleteIndicator,
} from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { IndicatorForm } from './IndicatorForm'

interface IndicatorListProps {
  testId: string
}

export function IndicatorList({ testId }: IndicatorListProps) {
  const { data: indicators, isLoading } = useIndicators(testId)
  const deleteIndicator = useDeleteIndicator()
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      deleteIndicator.mutate({ testId, indicatorId: deleteId })
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
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

      {indicators && indicators.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">
          Belum ada indikator
        </Card>
      ) : (
        <div className="space-y-2">
          {indicators?.map((indicator) => (
            <Card key={indicator.id} className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{indicator.name}</h3>
                {indicator.description && (
                  <p className="text-sm text-muted-foreground">
                    {indicator.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Urutan: {indicator.order}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(true)}
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

      <IndicatorForm open={showForm} onOpenChange={setShowForm} testId={testId} />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Indikator"
        description="Apakah Anda yakin ingin menghapus indikator ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteIndicator.isPending}
      />
    </div>
  )
}
