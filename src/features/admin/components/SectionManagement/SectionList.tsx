'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useSections, useDeleteSection } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { SectionForm } from './SectionForm'
import type { Section } from '../../types'

interface SectionListProps {
  testId: string
}

export function SectionList({ testId }: SectionListProps) {
  const { data: sections, isLoading } = useSections(testId)
  const deleteSection = useDeleteSection()
  const [showForm, setShowForm] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (section: Section) => {
    setEditingSection(section)
    setShowForm(true)
  }

  const handleCloseForm = (open: boolean) => {
    setShowForm(open)
    if (!open) {
      setEditingSection(undefined)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteSection.mutate(
      { testId, sectionId: deleteId },
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
        <h2 className="text-xl font-semibold">Seksi</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Seksi
        </Button>
      </div>

      {!sections || sections.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-3">Belum ada seksi</p>
          <p className="text-sm text-muted-foreground">
            Seksi digunakan untuk mengelompokkan pertanyaan dalam tes.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <Card
                key={section.id}
                className="p-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      #{section.order}
                    </span>
                    <h3 className="font-semibold">{section.name}</h3>
                    {section.duration && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {section.duration} menit
                      </Badge>
                    )}
                  </div>
                  {section.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(section)}
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

      <SectionForm
        testId={testId}
        open={showForm}
        onOpenChange={handleCloseForm}
        initialData={editingSection}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Seksi"
        description="Apakah Anda yakin ingin menghapus seksi ini? Pertanyaan di dalam seksi ini tidak akan dihapus, tetapi akan menjadi tanpa seksi."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteSection.isPending}
      />
    </div>
  )
}
