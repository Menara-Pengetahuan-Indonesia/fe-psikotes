'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Clock, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSections, useDeleteSection } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { SectionForm } from './SectionForm'
import type { Section } from '../../types'
import { cn } from '@/lib/utils'

const ROW_ACCENTS = [
  'bg-violet-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
] as const

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
    if (!open) setEditingSection(undefined)
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Seksi Instrumen</h2>
          <p className="text-slate-400 font-medium text-sm mt-0.5">Kelompokkan pertanyaan ke dalam bagian-bagian tertentu.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="rounded-xl h-11 px-6 font-black bg-slate-900 hover:bg-slate-800 transition-all active:scale-95 group"
        >
          <Plus className="size-4 mr-2 group-hover:rotate-90 transition-transform" />
          Tambah Seksi
        </Button>
      </div>

      {/* Empty */}
      {!sections || sections.length === 0 ? (
        <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-14 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center mb-5">
            <Layers className="size-8" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada seksi.</p>
          <p className="text-slate-400 font-medium text-sm mb-6 max-w-sm">
            Gunakan seksi untuk memisahkan jenis soal atau batas waktu per bagian.
          </p>
          <Button className="rounded-xl h-11 px-6 font-black" onClick={() => setShowForm(true)}>
            <Plus className="size-4 mr-2" />
            Tambah Seksi Pertama
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              const accent = ROW_ACCENTS[index % ROW_ACCENTS.length]
              return (
                <div
                  key={section.id}
                  className="group flex items-center gap-5 px-6 py-5 hover:bg-slate-50/50 transition-all"
                >
                  {/* Icon */}
                  <div className={cn("size-11 rounded-xl flex items-center justify-center text-white shrink-0", accent)}>
                    <Layers className="size-5" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-0.5">
                      <h3 className="text-base font-black text-slate-900 truncate">{section.name}</h3>
                      <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                        SECTION #{section.order}
                      </span>
                      {section.duration && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full shrink-0">
                          <Clock className="size-3" />
                          {section.duration}m
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 font-medium truncate">
                      {section.description || 'Tidak ada deskripsi'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-xl hover:bg-violet-50 hover:text-violet-600"
                      onClick={() => handleEdit(section)}
                    >
                      <Edit2 className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-xl hover:bg-rose-50 hover:text-rose-600"
                      onClick={() => setDeleteId(section.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
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
