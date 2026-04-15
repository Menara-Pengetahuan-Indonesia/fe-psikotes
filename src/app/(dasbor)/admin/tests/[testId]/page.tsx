'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Clock,
  Layers,
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
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import {
  useTest,
  useSubTests,
  useCreateSubTest,
  useUpdateSubTest,
  useDeleteSubTest,
} from '@/features/admin/hooks'
import type { SubTest } from '@/features/admin/types'

const accentColors = [
  'from-sky-400 to-sky-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-orange-400 to-orange-500',
]

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string

  const { data: test, isLoading: testLoading, error: testError } = useTest(testId)
  const { data: allSubTests } = useSubTests()

  const subTests = (allSubTests ?? [])
    .filter((st) => st.testId === testId)
    .sort((a, b) => a.order - b.order)
  const activeCount = subTests.filter((st) => st.isActive).length

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<SubTest | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDuration, setFormDuration] = useState<string>('')
  const [formOrder, setFormOrder] = useState(0)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createSubTest = useCreateSubTest()
  const updateSubTest = useUpdateSubTest()
  const deleteSubTest = useDeleteSubTest()

  const filtered = subTests.filter(
    (st) =>
      !search ||
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      (st.description ?? '').toLowerCase().includes(search.toLowerCase()),
  )

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormDuration('')
    setFormOrder(subTests.length)
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (st: SubTest) => {
    setEditData(st)
    setFormName(st.name)
    setFormDesc(st.description ?? '')
    setFormDuration(st.duration != null ? String(st.duration) : '')
    setFormOrder(st.order)
    setFormActive(st.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) {
      setFormError('Nama sub-tes wajib diisi.')
      return
    }
    const dto = {
      name: formName.trim(),
      description: formDesc.trim() || undefined,
      duration: formDuration ? Number(formDuration) : undefined,
      order: formOrder,
      isActive: formActive,
    }
    if (editData) {
      updateSubTest.mutate(
        { id: editData.id, dto },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createSubTest.mutate(
        { testId, ...dto },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteSubTest.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (testLoading) {
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

  if (testError || !test) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <FileText className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tes tidak ditemukan.</p>
          <Button
            onClick={() => router.push('/admin/tests')}
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/tests')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Daftar Tes</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 shadow-lg">
                <FileText className="size-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                      test.isActive
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'bg-slate-500/20 text-slate-300',
                    )}
                  >
                    {test.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/20 text-sky-300">
                    {test.scoringType === 'IMMEDIATE' ? 'Skor Langsung' : 'Skor Akhir'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                  {test.name}
                </h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">
                  {test.description}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-white text-slate-900 hover:bg-sky-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Sub-Tes
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-500/30 flex items-center justify-center">
                <Layers className="size-5 text-sky-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{subTests.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sub-Tes</p>
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
                <p className="text-2xl font-black leading-none">{subTests.length - activeCount}</p>
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
          placeholder="Cari sub-tes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500/10"
        />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5">
            <Layers className="size-8 text-sky-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada sub-tes.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((st, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div
                key={st.id}
                onClick={() => router.push(`/admin/tests/${testId}/subtests/${st.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-black text-slate-300 w-6 text-right">
                    #{st.order}
                  </span>
                  <div
                    className={cn(
                      'size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white transition-all group-hover:scale-105 group-hover:shadow-md',
                      color,
                    )}
                  >
                    <Layers className="size-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                      {st.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        st.isActive
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {st.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                    {st.isDefault && (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 bg-amber-50 text-amber-600">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    {st.description && <span className="truncate">{st.description}</span>}
                    {st.duration != null && (
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock className="size-3" />
                        {st.duration} menit
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openEdit(st)
                    }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(st.id)
                    }}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all">
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
              <div className="size-9 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                <Layers className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Sub-Tes' : 'Sub-Tes Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi sub-tes.' : 'Tambah sub-tes baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Sub-Tes</Label>
                <Input
                  placeholder="Misal: Sub-Tes Verbal"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea
                  placeholder="Penjelasan singkat..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Durasi (menit)</Label>
                  <Input
                    type="number"
                    placeholder="Opsional"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm"
                  />
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
                disabled={createSubTest.isPending || updateSubTest.isPending}
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
        title="Hapus Sub-Tes"
        description="Apakah Anda yakin? Semua soal di dalamnya juga akan terhapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
