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
  FileText,
  Clock,
  BadgeDollarSign,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { usePackages, useCreatePackage, useUpdatePackage, useDeletePackage, usePublishPackage, useUnpublishPackage } from '@/features/admin/hooks'
import type { Package as PackageType } from '@/features/admin/types'

type FilterType = 'all' | 'published' | 'draft' | 'free' | 'premium'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const accentColors = [
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
  'from-violet-400 to-violet-500',
  'from-rose-400 to-rose-500',
  'from-amber-400 to-amber-500',
  'from-cyan-400 to-cyan-500',
]

export default function AdminPackagesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<PackageType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Form state
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formDuration, setFormDuration] = useState(60)
  const [formError, setFormError] = useState('')

  // API hooks
  const { data: packages, isLoading } = usePackages()
  const createPackage = useCreatePackage()
  const updatePackage = useUpdatePackage()
  const deletePackage = useDeletePackage()
  const publishPackage = usePublishPackage()
  const unpublishPackage = useUnpublishPackage()

  const allPackages = packages ?? []
  const publishedCount = allPackages.filter((p) => p.isPublished).length
  const draftCount = allPackages.filter((p) => !p.isPublished).length
  const freeCount = allPackages.filter((p) => p.price === 0).length
  const premiumCount = allPackages.filter((p) => p.price > 0).length

  const filtered = allPackages.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && p.isPublished) ||
      (filter === 'draft' && !p.isPublished) ||
      (filter === 'free' && p.price === 0) ||
      (filter === 'premium' && p.price > 0)
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormPrice(0)
    setFormDuration(60)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (pkg: PackageType) => {
    setEditData(pkg)
    setFormName(pkg.name)
    setFormDesc(pkg.description ?? '')
    setFormPrice(pkg.price)
    setFormDuration(pkg.estimatedDuration ?? 60)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama paket wajib diisi.'); return }
    if (editData) {
      updatePackage.mutate({ id: editData.id, dto: { name: formName.trim(), description: formDesc.trim(), price: formPrice, estimatedDuration: formDuration } }, { onSuccess: () => setFormOpen(false) })
    } else {
      createPackage.mutate({ name: formName.trim(), description: formDesc.trim(), price: formPrice, estimatedDuration: formDuration }, { onSuccess: () => setFormOpen(false) })
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deletePackage.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  const handleTogglePublish = (id: string, isPublished: boolean) => {
    if (isPublished) {
      unpublishPackage.mutate(id)
    } else {
      publishPackage.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <Skeleton className="h-11 rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      </div>
    )
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
              Paket Tes.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Buat dan kelola paket bundel tes untuk peserta.
            </p>
          </div>
          <Button
            size="lg"
            onClick={openCreate}
            className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Buat Paket
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Package className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{allPackages.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{publishedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Published</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <BadgeDollarSign className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{freeCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Gratis</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <BadgeDollarSign className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{premiumCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Premium</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Package className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1 overflow-x-auto no-scrollbar">
          {([
            { key: 'all', label: 'Semua', count: allPackages.length },
            { key: 'published', label: 'Published', count: publishedCount },
            { key: 'draft', label: 'Draft', count: draftCount },
            { key: 'free', label: 'Gratis', count: freeCount },
            { key: 'premium', label: 'Premium', count: premiumCount },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {f.label}{' '}
              <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-violet-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((pkg, index) => {
            const color = accentColors[index % accentColors.length]
            const isFree = pkg.price === 0

            return (
              <div
                key={pkg.id}
                onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Icon */}
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <Package className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      pkg.isPublished ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'
                    )}>
                      {pkg.isPublished ? 'Live' : 'Draft'}
                    </span>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      isFree ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                    )}>
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{pkg.description}</p>
                </div>

                {/* Meta */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full">
                    <FileText className="size-3.5" />
                    <span>{pkg.tests?.length ?? 0} tes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <Clock className="size-3.5" />
                    <span>{pkg.estimatedDuration}m</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleTogglePublish(pkg.id, pkg.isPublished) }}
                    className={cn(
                      'size-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all',
                      pkg.isPublished
                        ? 'text-amber-400 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-500'
                        : 'text-teal-400 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-500'
                    )}
                    title={pkg.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {pkg.isPublished ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(pkg) }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(pkg.id) }}
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
                <Package className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Paket' : 'Paket Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi paket.' : 'Buat paket bundel tes baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Paket</Label>
                <Input
                  placeholder="Misal: Paket Rekrutmen Karyawan"
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
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea
                  placeholder="Penjelasan singkat tentang paket ini..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harga (Rp)</Label>
                  <Input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">0 = Gratis</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimasi (Menit)</Label>
                  <Input
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {editData ? 'Simpan' : 'Buat Paket'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Paket"
        description="Apakah Anda yakin ingin menghapus paket ini? Tes yang terkait tidak akan terhapus, hanya bundel paketnya."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
