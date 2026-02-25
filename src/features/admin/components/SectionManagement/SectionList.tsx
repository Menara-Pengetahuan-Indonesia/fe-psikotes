'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useSections,
  useDeleteSection,
} from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { SectionForm } from './SectionForm'

interface SectionListProps {
  testId: string
}

export function SectionList({ testId }: SectionListProps) {
  const { data: sections, isLoading } = useSections(testId)
  const deleteSection = useDeleteSection()
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      deleteSection.mutate({ testId, sectionId: deleteId })
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
        <h2 className="text-xl font-semibold">Seksi</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Seksi
        </Button>
      </div>

      {sections && sections.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">
          Belum ada seksi
        </Card>
      ) : (
        <div className="space-y-2">
          {sections?.map((section) => (
            <Card key={section.id} className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{section.name}</h3>
                {section.description && (
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Urutan: {section.order}
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
                  onClick={() => setDeleteId(section.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <SectionForm open={showForm} onOpenChange={setShowForm} testId={testId} />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Seksi"
        description="Apakah Anda yakin ingin menghapus seksi ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteSection.isPending}
      />
    </div>
  )
}
