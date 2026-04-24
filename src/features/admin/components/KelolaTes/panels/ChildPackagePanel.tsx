'use client'

import { useState } from 'react'
import {
  Layers, Plus, Search, Pencil, Trash2, FlaskConical, Copy,
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
  useChildPackages, useUpdateChildPackage,
  usePackageTypes, useCreatePackageType, useUpdatePackageType, useDeletePackageType,
  useTests, useSubTests, useQuestions,
} from '@/features/admin/hooks'
import { packageTypeService, testService, subTestService, questionService } from '@/features/admin/services'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { PackageType } from '@/features/admin/types'
import type { TreeSelection } from '../types'

interface ChildPackagePanelProps {
  childPackageId: string
  onSelect: (sel: TreeSelection) => void
}

export function ChildPackagePanel({ childPackageId, onSelect }: ChildPackagePanelProps) {
  const { data: allChildPackages } = useChildPackages()
  const { data: allPackageTypes } = usePackageTypes()
  const cp = (allChildPackages ?? []).find(c => c.id === childPackageId)
  const packageTypes = (allPackageTypes ?? []).filter(t => t.childPackageId === childPackageId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editCp, setEditCp] = useState(false)
  const [editTypeId, setEditTypeId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formTestTool, setFormTestTool] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const [duplicateSourceId, setDuplicateSourceId] = useState<string | null>(null)
  const [duplicateName, setDuplicateName] = useState('')
  const [duplicateNameError, setDuplicateNameError] = useState('')
  const [duplicating, setDuplicating] = useState(false)

  const { data: allTests } = useTests()
  const { data: allSubTests } = useSubTests()
  const { data: allQuestions } = useQuestions()
  const qc = useQueryClient()

  const handleDuplicate = async () => {
    if (!duplicateName.trim()) { setDuplicateNameError('Nama wajib diisi.'); return }
    const source = (allPackageTypes ?? []).find(pt => pt.id === duplicateSourceId)
    if (!source) return

    // Snapshot before any awaits — React Query can refetch mid-loop otherwise
    const testsSnapshot = (allTests ?? []).filter(t => t.packageTypeId === source.id)
    const subTestsSnapshot = allSubTests ?? []
    const questionsSnapshot = allQuestions ?? []

    setDuplicating(true)
    try {
      const newPt = await packageTypeService.create({
        childPackageId: source.childPackageId,
        name: duplicateName.trim(),
        description: source.description,
        price: source.price,
        testTool: source.testTool,
        isActive: source.isActive,
      })
      for (const test of testsSnapshot) {
        const newTest = await testService.create({
          packageTypeId: newPt.id,
          name: test.name,
          description: test.description,
          scoringType: test.scoringType,
          order: test.order,
          isActive: test.isActive,
          originalYear: test.originalYear ?? undefined,
          precision: test.precision ?? undefined,
          adaptationYear: test.adaptationYear ?? undefined,
          popularity: test.popularity ?? undefined,
        })
        const subTests = subTestsSnapshot.filter(s => s.testId === test.id)
        for (const sub of subTests) {
          const newSub = await subTestService.create({
            testId: newTest.id,
            name: sub.name,
            description: sub.description,
            duration: sub.duration ?? undefined,
            order: sub.order,
            isActive: sub.isActive,
          })
          const questions = questionsSnapshot.filter(q => q.subTestId === sub.id)
          for (const q of questions) {
            await questionService.create({
              subTestId: newSub.id,
              questionType: q.questionType,
              questionText: q.questionText,
              imageUrl: q.imageUrl ?? undefined,
              order: q.order,
              points: q.points,
              options: q.options?.map(o => ({
                optionText: o.optionText,
                imageUrl: o.imageUrl,
                isCorrect: o.isCorrect,
                points: o.points,
                order: o.order,
              })),
              correctAnswer: q.correctAnswer ?? undefined,
            })
          }
        }
      }
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success(`Berhasil menduplikasi ke "${duplicateName.trim()}"`)
      setDuplicateSourceId(null)
      setDuplicateName('')
    } catch {
      toast.error('Gagal menduplikasi paket')
    } finally {
      setDuplicating(false)
    }
  }

  const updateCp = useUpdateChildPackage()
  const createType = useCreatePackageType()
  const updateType = useUpdatePackageType()
  const deleteType = useDeletePackageType()

  const filtered = packageTypes.filter(pt =>
    !search || pt.name.toLowerCase().includes(search.toLowerCase())
  )

  const openCreateType = () => {
    setEditCp(false); setEditTypeId(null)
    setFormName(''); setFormDesc(''); setFormPrice(0); setFormTestTool(''); setFormActive(true); setFormError('')
    setFormOpen(true)
  }

  const openEditCp = () => {
    if (!cp) return
    setEditCp(true); setEditTypeId(null)
    setFormName(cp.name); setFormDesc(cp.description ?? ''); setFormActive(cp.isActive); setFormError('')
    setFormOpen(true)
  }

  const openEditType = (pt: PackageType) => {
    setEditCp(false); setEditTypeId(pt.id)
    setFormName(pt.name); setFormDesc(pt.description ?? ''); setFormPrice(pt.price); setFormTestTool(pt.testTool ?? ''); setFormActive(pt.isActive); setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    if (editCp && cp) {
      updateCp.mutate(
        { id: cp.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else if (editTypeId) {
      updateType.mutate(
        { id: editTypeId, dto: { name: formName.trim(), description: formDesc.trim() || undefined, price: formPrice, testTool: formTestTool.trim() || undefined, isActive: formActive } },
        { onSuccess: () => { setFormOpen(false); setEditTypeId(null) } },
      )
    } else {
      createType.mutate(
        { childPackageId, name: formName.trim(), description: formDesc.trim() || undefined, price: formPrice, testTool: formTestTool.trim() || undefined, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  if (!cp) return null

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200/50">
            <Layers className="size-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{cp.name}</h2>
              <span className={cn('text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                cp.isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              )} role="status">{cp.isActive ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            {cp.description && <p className="text-sm text-slate-500 font-medium mt-1">{cp.description}</p>}
            <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-widest">Paket Kecil</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openEditCp}
          aria-label={`Edit ${cp.name}`}
          className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Pencil className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-violet-50 flex items-center justify-center">
            <FlaskConical className="size-5 text-violet-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{packageTypes.length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tipe Paket</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CheckCircle2 className="size-5 text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{packageTypes.filter(t => t.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <XCircle className="size-5 text-rose-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{packageTypes.filter(t => !t.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Nonaktif</p>
          </div>
        </div>
      </div>

      {/* Children header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 tracking-tight">Tipe Paket</h3>
        <Button size="sm" onClick={openCreateType}
          className="h-9 rounded-xl bg-violet-600 hover:bg-violet-700 text-xs font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
          <Plus className="size-4 mr-1.5" aria-hidden="true" /> Tambah
        </Button>
      </div>

      {/* Search */}
      {packageTypes.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" aria-hidden="true" />
          <Input
            placeholder="Cari tipe paket..."
            aria-label="Cari tipe paket"
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
            <FlaskConical className="size-6 text-slate-300" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold text-slate-500">Belum ada tipe paket</p>
          <p className="text-xs text-slate-400 mt-1">Tambahkan tipe paket untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Daftar tipe paket">
          {filtered.map(pt => (
            <div key={pt.id} role="listitem"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-violet-200 hover:shadow-md cursor-pointer transition-all duration-200"
              onClick={() => onSelect({ type: 'packageType', id: pt.id })}
              onKeyDown={e => e.key === 'Enter' && onSelect({ type: 'packageType', id: pt.id })}
              tabIndex={0}
              aria-label={`Tipe paket: ${pt.name}`}
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center text-white shadow-sm shrink-0">
                <FlaskConical className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-black text-slate-900 truncate">{pt.name}</span>
                  <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-md',
                    pt.isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                  )}>{pt.isActive ? 'Aktif' : 'Nonaktif'}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Rp {pt.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); openEditType(pt) }}
                  aria-label={`Edit ${pt.name}`}
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setDuplicateSourceId(pt.id); setDuplicateName(''); setDuplicateNameError('') }}
                  aria-label={`Duplikasi ${pt.name}`}
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Copy className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setDeleteId(pt.id) }}
                  aria-label={`Hapus ${pt.name}`}
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
      <Dialog open={formOpen} onOpenChange={v => { setFormOpen(v); if (!v) { setEditTypeId(null); setEditCp(false) } }}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">
              {editCp ? 'Edit Paket Kecil' : editTypeId ? 'Edit Tipe Paket' : 'Tipe Paket Baru'}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">
              {editCp ? 'Perbarui paket kecil.' : editTypeId ? 'Perbarui tipe paket.' : 'Tambah tipe paket baru.'}
            </DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cp-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama</Label>
                <Input id="cp-name" placeholder="Nama..." value={formName} onChange={e => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-invalid={!!formError} aria-describedby={formError ? 'cp-name-error' : undefined} />
                {formError && <p id="cp-name-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cp-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                <Textarea id="cp-desc" placeholder="Deskripsi..." value={formDesc} onChange={e => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
              </div>
              {!editCp && (
                <div className="space-y-2">
                  <Label htmlFor="cp-price" className="text-xs font-bold uppercase tracking-wider text-slate-500">Harga (Rp)</Label>
                  <Input id="cp-price" type="number" placeholder="0" value={formPrice || ''} onChange={e => setFormPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                </div>
              )}
              {!editCp && (
                <div className="space-y-2">
                  <Label htmlFor="cp-testtool" className="text-xs font-bold uppercase tracking-wider text-slate-500">Alat Tes</Label>
                  <Input id="cp-testtool" placeholder="Nama alat tes..." value={formTestTool} onChange={e => setFormTestTool(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                </div>
              )}
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
                disabled={updateCp.isPending || createType.isPending || updateType.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                {(updateCp.isPending || createType.isPending || updateType.isPending) ? 'Menyimpan...' : editCp || editTypeId ? 'Simpan' : 'Tambah'}
              </Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Tipe Paket"
        description="Semua tes di dalamnya juga akan terhapus."
        onConfirm={() => { if (deleteId) deleteType.mutate(deleteId, { onSuccess: () => setDeleteId(null) }) }}
        onCancel={() => setDeleteId(null)} />

      {/* Duplicate dialog */}
      <Dialog open={!!duplicateSourceId} onOpenChange={v => { if (!v) { setDuplicateSourceId(null); setDuplicateName('') } }}>
        <DialogContent className="max-w-[400px] p-0 border-0 rounded-[1.5rem] bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">Duplikasi Tipe Paket</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">
              Masukkan nama untuk tipe paket baru. Semua tes, sub tes, dan soal akan disalin.
            </DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dup-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama Baru</Label>
              <Input
                id="dup-name"
                placeholder="Contoh: Paket Lengkap"
                value={duplicateName}
                onChange={e => { setDuplicateName(e.target.value); setDuplicateNameError('') }}
                aria-invalid={!!duplicateNameError}
                className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
              {duplicateNameError && <p role="alert" className="text-rose-600 text-xs font-bold">{duplicateNameError}</p>}
            </div>
            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleDuplicate}
                disabled={duplicating}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98]"
              >
                {duplicating ? 'Menduplikasi...' : 'Duplikasi'}
              </Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50"
                onClick={() => { setDuplicateSourceId(null); setDuplicateName('') }}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
