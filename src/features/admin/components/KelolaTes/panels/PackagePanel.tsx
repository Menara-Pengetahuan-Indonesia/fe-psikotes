'use client'

import { useState } from 'react'
import {
  Package as PackageIcon, Plus, Search, Pencil, Trash2, Layers,
  ToggleLeft, ToggleRight, CheckCircle2, XCircle,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import {
  usePackages, useUpdatePackage, useDeletePackage,
  useChildPackages, useCreateChildPackage, useUpdateChildPackage, useDeleteChildPackage,
} from '@/features/admin/hooks'
import type { ChildPackage } from '@/features/admin/types'
import type { TreeSelection } from '../types'

interface PackagePanelProps {
  packageId: string
  onSelect: (sel: TreeSelection) => void
}

export function PackagePanel({ packageId, onSelect }: PackagePanelProps) {
  const { data: packages } = usePackages()
  const { data: allChildPackages } = useChildPackages()
  const pkg = (packages ?? []).find(p => p.id === packageId)
  const childPackages = (allChildPackages ?? []).filter(c => c.packageId === packageId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editPkg, setEditPkg] = useState(false)
  const [editChildId, setEditChildId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')
  const [deletePkgOpen, setDeletePkgOpen] = useState(false)

  const updatePackage = useUpdatePackage()
  const deletePackage = useDeletePackage()
  const createChildPkg = useCreateChildPackage()
  const updateChildPkg = useUpdateChildPackage()
  const deleteChildPkg = useDeleteChildPackage()

  const filtered = childPackages.filter(cp =>
    !search || cp.name.toLowerCase().includes(search.toLowerCase()) ||
    (cp.description ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const openCreateChild = () => {
    setEditPkg(false); setEditChildId(null)
    setFormName(''); setFormDesc(''); setFormActive(true); setFormError('')
    setFormOpen(true)
  }

  const openEditPkg = () => {
    if (!pkg) return
    setEditPkg(true); setEditChildId(null)
    setFormName(pkg.name); setFormDesc(pkg.description ?? ''); setFormActive(pkg.isActive); setFormError('')
    setFormOpen(true)
  }

  const openEditChild = (cp: ChildPackage) => {
    setEditPkg(false); setEditChildId(cp.id)
    setFormName(cp.name); setFormDesc(cp.description ?? ''); setFormActive(cp.isActive); setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    if (editPkg && pkg) {
      updatePackage.mutate(
        { id: pkg.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else if (editChildId) {
      updateChildPkg.mutate(
        { id: editChildId, dto: { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive } },
        { onSuccess: () => { setFormOpen(false); setEditChildId(null) } },
      )
    } else {
      createChildPkg.mutate(
        { packageId, name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  if (!pkg) return null

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200/50">
            <PackageIcon className="size-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{pkg.name}</h2>
              <span className={cn('text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                pkg.isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              )} role="status">{pkg.isActive ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            {pkg.description && <p className="text-sm text-slate-500 font-medium mt-1">{pkg.description}</p>}
            <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-widest">Paket</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openEditPkg}
            aria-label={`Edit paket ${pkg.name}`}
            className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDeletePkgOpen(true)}
            aria-label={`Hapus paket ${pkg.name}`}
            className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Layers className="size-5 text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{childPackages.length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Paket Kecil</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CheckCircle2 className="size-5 text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{childPackages.filter(c => c.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <XCircle className="size-5 text-rose-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{childPackages.filter(c => !c.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Nonaktif</p>
          </div>
        </div>
      </div>

      {/* Children header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 tracking-tight">Paket Kecil</h3>
        <Button size="sm" onClick={openCreateChild}
          className="h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
          <Plus className="size-4 mr-1.5" aria-hidden="true" /> Tambah
        </Button>
      </div>

      {/* Search */}
      {childPackages.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" aria-hidden="true" />
          <Input
            placeholder="Cari paket kecil..."
            aria-label="Cari paket kecil"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-10 bg-white border-slate-200 rounded-xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
            <Layers className="size-6 text-slate-300" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold text-slate-500">Belum ada paket kecil</p>
          <p className="text-xs text-slate-400 mt-1">Tambahkan paket kecil untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Daftar paket kecil">
          {filtered.map(cp => (
            <div key={cp.id} role="listitem"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md cursor-pointer transition-all duration-200"
              onClick={() => onSelect({ type: 'childPackage', id: cp.id })}
              onKeyDown={e => e.key === 'Enter' && onSelect({ type: 'childPackage', id: cp.id })}
              tabIndex={0}
              aria-label={`Paket kecil: ${cp.name}`}
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center text-white shadow-sm shrink-0">
                <Layers className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-black text-slate-900 truncate">{cp.name}</span>
                  <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-md',
                    cp.isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                  )}>{cp.isActive ? 'Aktif' : 'Nonaktif'}</span>
                </div>
                {cp.description && <p className="text-xs text-slate-500 truncate mt-0.5">{cp.description}</p>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); openEditChild(cp) }}
                  aria-label={`Edit ${cp.name}`}
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setDeleteId(cp.id) }}
                  aria-label={`Hapus ${cp.name}`}
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={formOpen} onOpenChange={v => { setFormOpen(v); if (!v) { setEditChildId(null); setEditPkg(false) } }}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">
              {editPkg ? 'Edit Paket' : editChildId ? 'Edit Paket Kecil' : 'Paket Kecil Baru'}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">
              {editPkg ? 'Perbarui informasi paket.' : editChildId ? 'Perbarui paket kecil.' : 'Tambah paket kecil baru.'}
            </DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pkg-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama</Label>
                <Input id="pkg-name" placeholder="Nama..." value={formName} onChange={e => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-invalid={!!formError} aria-describedby={formError ? 'pkg-name-error' : undefined} />
                {formError && <p id="pkg-name-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pkg-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                <Textarea id="pkg-desc" placeholder="Deskripsi..." value={formDesc} onChange={e => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
              </div>
              <div className="flex items-center justify-between py-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</Label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={formActive}
                  aria-label="Status aktif"
                  onClick={() => setFormActive(!formActive)}
                  className={cn(
                    'flex items-center gap-2 text-sm font-bold transition-colors rounded-lg px-2 py-1',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
                    formActive ? 'text-indigo-700' : 'text-slate-500'
                  )}
                >
                  {formActive ? <ToggleRight className="size-5" aria-hidden="true" /> : <ToggleLeft className="size-5" aria-hidden="true" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSubmit}
                disabled={updatePackage.isPending || createChildPkg.isPending || updateChildPkg.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                {editPkg || editChildId ? 'Simpan' : 'Tambah'}
              </Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Paket Kecil"
        description="Semua sub paket di dalamnya juga akan terhapus."
        onConfirm={() => { if (deleteId) deleteChildPkg.mutate(deleteId, { onSuccess: () => setDeleteId(null) }) }}
        onCancel={() => setDeleteId(null)} />

      <ConfirmDialog open={deletePkgOpen} title="Hapus Paket"
        description="Semua paket kecil dan isinya juga akan terhapus."
        onConfirm={() => { deletePackage.mutate(packageId, { onSuccess: () => { setDeletePkgOpen(false); onSelect({ type: 'package', id: '' }) } }) }}
        onCancel={() => setDeletePkgOpen(false)} />
    </div>
  )
}
