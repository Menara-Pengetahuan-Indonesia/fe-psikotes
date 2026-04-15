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
  DollarSign,
  Wrench,
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
  useChildPackage,
  usePackageTypes,
  useCreatePackageType,
  useUpdatePackageType,
  useDeletePackageType,
} from '@/features/admin/hooks'
import type { PackageType } from '@/features/admin/types'

const accentColors = [
  'from-violet-400 to-violet-500',
  'from-cyan-400 to-cyan-500',
  'from-pink-400 to-pink-500',
  'from-yellow-400 to-yellow-500',
]

export default function ChildPackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.packageId as string
  const childId = params.childId as string

  const { data: childPkg, isLoading: cpLoading, error: cpError } = useChildPackage(childId)
  const { data: allTypes } = usePackageTypes()

  const packageTypes = (allTypes ?? []).filter((t) => t.childPackageId === childId)
  const activeCount = packageTypes.filter((t) => t.isActive).length

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<PackageType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formTestTool, setFormTestTool] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createType = useCreatePackageType()
  const updateType = useUpdatePackageType()
  const deleteType = useDeletePackageType()

  const filtered = packageTypes.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description ?? '').toLowerCase().includes(search.toLowerCase()),
  )

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormPrice(0)
    setFormTestTool('')
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (t: PackageType) => {
    setEditData(t)
    setFormName(t.name)
    setFormDesc(t.description ?? '')
    setFormPrice(t.price)
    setFormTestTool(t.testTool ?? '')
    setFormActive(t.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) {
      setFormError('Nama tipe paket wajib diisi.')
      return
    }
    const dto = {
      name: formName.trim(),
      description: formDesc.trim() || undefined,
      price: formPrice,
      testTool: formTestTool.trim() || undefined,
      isActive: formActive,
    }
    if (editData) {
      updateType.mutate(
        { id: editData.id, dto },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createType.mutate(
        { childPackageId: childId, ...dto },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteType.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

  if (cpLoading) {
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

  if (cpError || !childPkg) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Layers className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Sub-paket tidak ditemukan.</p>
          <Button
            onClick={() => router.push(`/admin/packages/${packageId}`)}
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push(`/admin/packages/${packageId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Sub-Paket</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg">
                <Layers className="size-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                      childPkg.isActive
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'bg-slate-500/20 text-slate-300',
                    )}
                  >
                    {childPkg.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                  {childPkg.name}
                </h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">
                  {childPkg.description}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Tipe
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Layers className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{packageTypes.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tipe</p>
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
                <p className="text-2xl font-black leading-none">{packageTypes.length - activeCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Layers className="size-72" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Cari tipe paket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10"
        />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
            <Layers className="size-8 text-violet-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada tipe paket.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((t, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div
                key={t.id}
                onClick={() =>
                  router.push(
                    `/admin/packages/${packageId}/child-packages/${childId}/${t.id}`,
                  )
                }
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                <div
                  className={cn(
                    'size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md',
                    color,
                  )}
                >
                  <Layers className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">
                      {t.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        t.isActive
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {t.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <DollarSign className="size-3" />
                      {formatPrice(t.price)}
                    </span>
                    {t.testTool && (
                      <span className="flex items-center gap-1">
                        <Wrench className="size-3" />
                        {t.testTool}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openEdit(t)
                    }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(t.id)
                    }}
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
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Layers className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Tipe Paket' : 'Tipe Paket Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi tipe paket.' : 'Tambah tipe paket baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama</Label>
                <Input
                  placeholder="Misal: Tipe Premium"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea
                  placeholder="Penjelasan singkat..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harga (IDR)</Label>
                  <Input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alat Tes</Label>
                  <Input
                    placeholder="Opsional"
                    value={formTestTool}
                    onChange={(e) => setFormTestTool(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-medium text-sm"
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
                disabled={createType.isPending || updateType.isPending}
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
        title="Hapus Tipe Paket"
        description="Apakah Anda yakin? Semua tes di dalamnya juga akan terhapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
