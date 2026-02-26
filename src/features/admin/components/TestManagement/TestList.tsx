'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Clock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useTests, useDeleteTest } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'

export function TestList() {
  const router = useRouter()
  const { data: tests, isLoading } = useTests()
  const deleteTest = useDeleteTest()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (!deleteId) return
    deleteTest.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    })
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Kelola Tes</h1>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kelola Tes</h1>
        <Button asChild>
          <Link href="/admin/tests/buat">
            <Plus className="w-4 h-4 mr-2" />
            Buat Tes Baru
          </Link>
        </Button>
      </div>

      {!tests || tests.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            Belum ada tes yang dibuat
          </p>
          <Button asChild>
            <Link href="/admin/tests/buat">
              <Plus className="w-4 h-4 mr-2" />
              Buat Tes Pertama
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Card
              key={test.id}
              className="p-5 cursor-pointer hover:shadow-md transition-shadow relative group"
              onClick={() => router.push(`/admin/tests/${test.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg line-clamp-1 pr-2">
                  {test.name}
                </h3>
                <Badge variant={test.isPublished ? 'default' : 'secondary'}>
                  {test.isPublished ? 'Dipublikasikan' : 'Draft'}
                </Badge>
              </div>

              {test.description && (
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {test.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{test.duration} menit</span>
                </div>
                {test.timePerQuestion && (
                  <span>{test.timePerQuestion} dtk/soal</span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                {test.shuffleQuestions && (
                  <Badge variant="outline" className="text-xs">
                    Acak Soal
                  </Badge>
                )}
                {test.shuffleOptions && (
                  <Badge variant="outline" className="text-xs">
                    Acak Opsi
                  </Badge>
                )}
              </div>

              <Button
                size="sm"
                variant="destructive"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeleteId(test.id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Tes"
        description="Apakah Anda yakin ingin menghapus tes ini? Semua data terkait (indikator, seksi, pertanyaan, aturan skor) akan ikut terhapus. Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteTest.isPending}
      />
    </div>
  )
}
