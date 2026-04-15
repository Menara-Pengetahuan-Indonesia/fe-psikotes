'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Layers,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  FileText,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import {
  usePackageType,
  useTests,
  useCreateTest,
  useUpdateTest,
  useDeleteTest,
} from '@/features/admin/hooks'
import type { Test, ScoringType } from '@/features/admin/types'

const accentColors = [
  'from-sky-400 to-sky-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-orange-400 to-orange-500',
]

export default function PackageTypeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.packageId as string
  const childId = params.childId as string
  const typeId = params.typeId as string

  const { data: pkgType, isLoading: typeLoading, error: typeError } = usePackageType(typeId)
  const { data: allTests } = useTests()

  const tests = (allTests ?? []).filter((t) => t.packageTypeId === typeId)
  const activeCount = tests.filter((t) => t.isActive).length

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Test | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formScoring, setFormScoring] = useState<ScoringType>('IMMEDIATE')
  const [formOrder, setFormOrder] = useState(0)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const deleteTest = useDeleteTest()

  const filtered = tests.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description ?? '').toLowerCase().includes(search.toLowerCase()),
  )

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormScoring('IMMEDIATE')
    setFormOrder(tests.length)
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (t: Test) => {
    setEditData(t)
    setFormName(t.name)
    setFormDesc(t.description ?? '')
    setFormScoring(t.scoringType)
    setFormOrder(t.order)
    setFormActive(t.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) {
      setFormError('Nama tes wajib diisi.')
      return
    }
    const dto = {
      name: formName.trim(),
      description: formDesc.trim() || undefined,
      scoringType: formScoring,
      order: formOrder,
      isActive: formActive,
    }
    if (editData) {
      updateTest.mutate(
        { id: editData.id, dto },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createTest.mutate(
        { packageTypeId: typeId, ...dto },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteTest.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (typeLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (typeError || !pkgType) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Layers className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tipe paket tidak ditemukan.</p>
          <Button
            onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${childId}`)}
            className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800"
          >
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${childId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Tipe Paket</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
                <Layers className="size-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                      pkgType.isActive
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'bg-slate-500/20 text-slate-300',
                    )}
                  >
                    {pkgType.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                  {pkgType.name}
                </h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">
                  {pkgType.description}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-white text-slate-900 hover:bg-emerald-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Tes
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <FileText className="size-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{tests.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tes</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{activeCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <XCircle className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{tests.length - activeCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <FileText className="size-72" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Cari tes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10"
        />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
            <FileText className="size-8 text-emerald-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada tes.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((test, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div
                key={test.id}
                onClick={() => router.push(`/admin/tests/${test.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                <div
                  className={cn(
                    'size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md',
                    color,
                  )}
                >
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
                      {test.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        test.isActive
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {test.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 bg-sky-50 text-sky-600">
                      {test.scoringType === 'IMMEDIATE' ? 'Langsung' : 'Akhir Tes'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">
                    {test.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openEdit(test)
                    }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(test.id)
                    }}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
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
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <FileText className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Tes' : 'Tes Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi tes.' : 'Tambah tes baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Tes</Label>
                <Input
                  placeholder="Misal: Tes Kepribadian"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea
                  placeholder="Penjelasan singkat..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe Skor</Label>
                  <Select value={formScoring} onValueChange={(v) => setFormScoring(v as ScoringType)}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMMEDIATE">Langsung</SelectItem>
                      <SelectItem value="END_OF_TEST">Akhir Tes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</Label>
                  <Input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button
                  type="button"
                  onClick={() => setFormActive(!formActive)}
                  className={cn(
                    'flex items-center gap-2 text-sm font-bold transition-colors',
                    formActive ? 'text-teal-600' : 'text-slate-400',
                  )}
                >
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={createTest.isPending || updateTest.isPending}
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

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Tes"
        description="Apakah Anda yakin? Semua sub-tes dan soal di dalamnya juga akan terhapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
