'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Clock,
  Trash2,
  FileText,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Shuffle,
  Calendar,
  Search,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useTests, useDeleteTest } from '../../hooks'
import { ConfirmDialog } from '../Common/ConfirmDialog'
import { cn } from '@/lib/utils'

type FilterType = 'all' | 'published' | 'draft'

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '-'
  }
}

export function TestList() {
  const router = useRouter()
  const { data: tests, isLoading } = useTests()
  const deleteTest = useDeleteTest()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  const handleDelete = () => {
    if (!deleteId) return
    deleteTest.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  const publishedCount = tests?.filter((t) => t.isPublished).length ?? 0
  const draftCount = tests?.filter((t) => !t.isPublished).length ?? 0
  const totalCount = tests?.length ?? 0

  const filteredTests = (tests ?? []).filter((test) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && test.isPublished) ||
      (filter === 'draft' && !test.isPublished)
    const matchesSearch =
      !search ||
      test.name.toLowerCase().includes(search.toLowerCase()) ||
      test.description?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Manajemen
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Kelola Tes Psikotes.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Buat, atur, dan publikasikan instrumen tes.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/admin/tests/buat">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Buat Tes Baru
            </Link>
          </Button>
        </div>

        {/* Stats inside banner */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <BarChart3 className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{totalCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Total
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{publishedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Published
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <FileText className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{draftCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Draft
              </p>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <BookOpen className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {(
            [
              { key: 'all', label: 'Semua', count: totalCount },
              { key: 'published', label: 'Published', count: publishedCount },
              { key: 'draft', label: 'Draft', count: draftCount },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {f.label}{' '}
              <span
                className={cn(
                  'ml-1',
                  filter === f.key ? 'text-slate-400' : 'text-slate-300'
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari tes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* TEST LIST */}
      {filteredTests.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <BookOpen className="size-8 text-indigo-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">
            {search || filter !== 'all'
              ? 'Tidak ditemukan.'
              : 'Belum ada tes.'}
          </p>
          <p className="text-slate-400 font-medium text-sm mb-6">
            {search || filter !== 'all'
              ? 'Coba ubah filter atau kata kunci pencarian.'
              : 'Mari mulai dengan membuat instrumen tes pertama.'}
          </p>
          {!search && filter === 'all' && (
            <Button
              size="lg"
              className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800"
              asChild
            >
              <Link href="/admin/tests/buat">
                <Plus className="w-5 h-5 mr-2" />
                Buat Tes Pertama
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filteredTests.map((test) => {
            const isPublished = test.isPublished

            return (
              <div
                key={test.id}
                onClick={() => router.push(`/admin/tests/${test.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Color indicator + Icon */}
                <div
                  className={cn(
                    'size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md',
                    isPublished
                      ? 'bg-gradient-to-br from-teal-400 to-teal-500 text-white'
                      : 'bg-gradient-to-br from-indigo-400 to-indigo-500 text-white'
                  )}
                >
                  <FileText className="size-5" />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {test.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        isPublished
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-violet-50 text-violet-600'
                      )}
                    >
                      {isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">
                    {test.description || 'Tidak ada deskripsi'}
                  </p>
                </div>

                {/* Meta pills */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <Clock className="size-3.5" />
                    <span>{test.duration}m</span>
                  </div>
                  {test.shuffleQuestions && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
                      <Shuffle className="size-3.5" />
                      <span>Acak</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar className="size-3.5" />
                    <span>{formatDate(test.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(test.id)
                    }}
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Tes"
        description="Apakah Anda yakin ingin menghapus tes ini? Semua data terkait akan ikut terhapus. Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteTest.isPending}
      />
    </div>
  )
}
