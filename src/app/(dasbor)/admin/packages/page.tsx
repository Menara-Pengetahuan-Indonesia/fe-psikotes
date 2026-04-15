'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
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
  usePackages,
  useCreatePackage,
  useUpdatePackage,
  useDeletePackage,
} from '@/features/admin/hooks'
import type { Package as PackageT } from '@/features/admin/types'

type FilterType = 'all' | 'active' | 'inactive'

const accentColors = [
  'from-sky-400 to-sky-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-orange-400 to-orange-500',
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
]

export default function AdminPackagesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<PackageT | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const { data: packages, isLoading } = usePackages()
  const createPackage = useCreatePackage()
  const updatePackage = useUpdatePackage()
  const deletePackage = useDeletePackage()

  const allPackages = packages ?? []
  const activeCount = allPackages.filter((p) => p.isActive).length
  const inactiveCount = allPackages.filter((p) => !p.isActive).length

  const filtered = allPackages.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && p.isActive) ||
      (filter === 'inactive' && !p.isActive)
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (pkg: PackageT) => {
    setEditData(pkg)
    setFormName(pkg.name)
    setFormDesc(pkg.description ?? '')
    setFormActive(pkg.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) {
      setFormError('Nama paket wajib diisi.')
      return
    }
    if (editData) {
      updatePackage.mutate(
        {
          id: editData.id,
          dto: {
            name: formName.trim(),
            description: formDesc.trim() || undefined,
            isActive: formActive,
          },
        },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createPackage.mutate(
        {
          name: formName.trim(),
          description: formDesc.trim() || undefined,
          isActive: formActive,
        },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deletePackage.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <Skeleton className="h-11 rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <p className="text-sky-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
            Manajemen
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
                Paket Psikotes.
              </h1>
              <p className="text-slate-400 font-medium text-sm">
                Kelola paket, sub-paket, dan tipe paket.
              </p>
            </div>
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-white text-slate-900 hover:bg-sky-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Buat Paket
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-500/30 flex items-center justify-center">
                <Package className="size-5 text-sky-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">
                  {allPackages.length}
                </p>
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
                <p className="text-2xl font-black leading-none">{activeCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Aktif
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <XCircle className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">
                  {inactiveCount}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Nonaktif
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Package className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {(
            [
              { key: 'all', label: 'Semua', count: allPackages.length },
              { key: 'active', label: 'Aktif', count: activeCount },
              { key: 'inactive', label: 'Nonaktif', count: inactiveCount },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50',
              )}
            >
              {f.label}{' '}
              <span
                className={cn(
                  'ml-1',
                  filter === f.key ? 'text-slate-400' : 'text-slate-300',
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
            placeholder="Cari paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-sky-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">
            Belum ada paket.
          </p>
          <p className="text-slate-400 font-medium text-sm">
            Klik tombol di atas untuk membuat paket baru.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((pkg, index) => {
            const color = accentColors[index % accentColors.length]
            const childCount = pkg.childPackages?.length ?? 0
            return (
              <div
                key={pkg.id}
                onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                <div
                  className={cn(
                    'size-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md',
                    color,
                  )}
                >
                  <Package className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        pkg.isActive
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {pkg.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    {pkg.description && (
                      <span className="truncate">{pkg.description}</span>
                    )}
                    <span className="flex items-center gap-1 shrink-0">
                      <Layers className="size-3" />
                      {childCount} sub-paket
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openEdit(pkg)
                    }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(pkg.id)
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
                <Package className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Paket' : 'Paket Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData
                    ? 'Perbarui informasi paket.'
                    : 'Buat paket psikotes baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Nama Paket
                </Label>
                <Input
                  placeholder="Misal: Paket Rekrutmen"
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value)
                    setFormError('')
                  }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                />
                {formError && (
                  <p className="text-rose-500 text-[10px] font-bold">
                    {formError}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Deskripsi
                </Label>
                <Textarea
                  placeholder="Penjelasan singkat tentang paket..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[80px] resize-none focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status Aktif
                </Label>
                <button
                  type="button"
                  onClick={() => setFormActive(!formActive)}
                  className={cn(
                    'flex items-center gap-2 text-sm font-bold transition-colors',
                    formActive ? 'text-teal-600' : 'text-slate-400',
                  )}
                >
                  {formActive ? (
                    <ToggleRight className="size-6" />
                  ) : (
                    <ToggleLeft className="size-6" />
                  )}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={createPackage.isPending || updatePackage.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {editData ? 'Simpan' : 'Buat Paket'}
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
        title="Hapus Paket"
        description="Apakah Anda yakin? Semua sub-paket dan tipe paket di dalamnya juga akan terhapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
