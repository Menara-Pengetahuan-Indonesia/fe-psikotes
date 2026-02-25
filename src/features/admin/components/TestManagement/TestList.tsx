'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useTests, useDeleteTest } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { TestForm } from './TestForm'

export function TestList() {
  const { data: tests, isLoading } = useTests()
  const deleteTest = useDeleteTest()
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      deleteTest.mutate(deleteId)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Tes</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Tes Baru
        </Button>
      </div>

      {tests && tests.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Belum ada tes. Buat tes baru untuk memulai.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests?.map((test) => (
            <Card key={test.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold line-clamp-2">{test.name}</h3>
                  <Badge
                    variant={test.isPublished ? 'default' : 'secondary'}
                  >
                    {test.isPublished ? 'Dipublikasikan' : 'Draft'}
                  </Badge>
                </div>

                {test.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {test.description}
                  </p>
                )}

                <div className="text-sm text-muted-foreground">
                  Durasi: {test.duration} menit
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/admin/tests/${test.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat
                    </Button>
                  </Link>
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
                    onClick={() => setDeleteId(test.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <TestForm open={showForm} onOpenChange={setShowForm} />

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Tes"
        description="Apakah Anda yakin ingin menghapus tes ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteTest.isPending}
      />
    </div>
  )
}
