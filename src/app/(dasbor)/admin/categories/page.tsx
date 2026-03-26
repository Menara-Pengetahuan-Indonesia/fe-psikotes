'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Tag,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  BookOpen,
  Brain,
  TrendingUp,
  Heart,
  Briefcase,
  Smile,
  BarChart3,
  AlertCircle,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

const categoryIcons = [Brain, TrendingUp, BookOpen, Heart, Briefcase, Smile]
const categoryColors = [
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
  'from-violet-400 to-violet-500',
  'from-rose-400 to-rose-500',
  'from-amber-400 to-amber-500',
  'from-cyan-400 to-cyan-500',
]

interface Category {
  id: string
  name: string
  description: string
  testsCount: number
  createdAt: string
}

const initialCategories: Category[] = [
  { id: '1', name: 'Kepribadian', description: 'Tes untuk mengukur tipe dan karakter kepribadian seseorang', testsCount: 4, createdAt: '2026-01-10T08:00:00Z' },
  { id: '2', name: 'Intelegensi', description: 'Tes untuk mengukur kemampuan kognitif dan kecerdasan umum', testsCount: 3, createdAt: '2026-01-12T10:00:00Z' },
  { id: '3', name: 'Minat & Bakat', description: 'Tes untuk mengidentifikasi minat karir dan bakat alami', testsCount: 2, createdAt: '2026-01-15T14:00:00Z' },
  { id: '4', name: 'Kecerdasan Emosional', description: 'Tes untuk mengukur kemampuan mengelola emosi dan empati', testsCount: 2, createdAt: '2026-02-01T09:00:00Z' },
  { id: '5', name: 'Rekrutmen', description: 'Paket tes khusus untuk proses seleksi dan rekrutmen karyawan', testsCount: 5, createdAt: '2026-02-10T11:00:00Z' },
  { id: '6', name: 'Kesehatan Mental', description: 'Tes skrining awal untuk kesehatan mental dan kesejahteraan psikologis', testsCount: 3, createdAt: '2026-02-20T13:00:00Z' },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '-' }
}

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Category | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Form state
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formError, setFormError] = useState('')

  const totalTests = categories.reduce((sum, c) => sum + c.testsCount, 0)

  const filtered = categories.filter((c) =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (category: Category) => {
    setEditData(category)
    setFormName(category.name)
    setFormDesc(category.description)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) {
      setFormError('Nama kategori wajib diisi.')
      return
    }

    if (editData) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editData.id ? { ...c, name: formName.trim(), description: formDesc.trim() } : c
        )
      )
    } else {
      const newCategory: Category = {
        id: String(Date.now()),
        name: formName.trim(),
        description: formDesc.trim(),
        testsCount: 0,
        createdAt: new Date().toISOString(),
      }
      setCategories((prev) => [...prev, newCategory])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleteId) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-violet-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Manajemen
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Kategori Tes.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Kelompokkan tes berdasarkan jenis dan tujuan.
            </p>
          </div>
          <Button
            size="lg"
            onClick={openCreate}
            className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Tambah Kategori
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Tag className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{categories.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Kategori</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <BarChart3 className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{totalTests}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Tag className="size-72" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10"
        />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
            <Tag className="size-8 text-violet-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((category, index) => {
            const IconComp = categoryIcons[index % categoryIcons.length]
            const color = categoryColors[index % categoryColors.length]

            return (
              <div
                key={category.id}
                onClick={() => router.push(`/admin/categories/${category.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Icon */}
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <IconComp className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 shrink-0">
                      {category.testsCount} tes
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{category.description}</p>
                </div>

                {/* Date */}
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400 shrink-0">
                  <span>{formatDate(category.createdAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(category) }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(category.id) }}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[420px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Tag className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Kategori' : 'Kategori Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi kategori.' : 'Tambahkan kategori tes baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Kategori</label>
                <Input
                  placeholder="Misal: Kepribadian, Intelegensi"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
                {formError && (
                  <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1">
                    <AlertCircle className="size-3" />{formError}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</label>
                <Textarea
                  placeholder="Penjelasan singkat tentang kategori ini..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[80px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm"
                onClick={() => setFormOpen(false)}
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Kategori"
        description="Apakah Anda yakin ingin menghapus kategori ini? Tes yang terkait tidak akan terhapus, hanya pengelompokannya."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
