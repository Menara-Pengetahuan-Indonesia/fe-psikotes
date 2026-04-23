'use client'

import { useState } from 'react'
import {
  FlaskConical, Plus, Search, Pencil, Trash2, FileText,
  ToggleLeft, ToggleRight, CheckCircle2, XCircle,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
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
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import {
  usePackageTypes, useUpdatePackageType,
  useTests, useCreateTest, useUpdateTest, useDeleteTest,
  useCreateSubTest,
} from '@/features/admin/hooks'
import type { Test, ScoringType } from '@/features/admin/types'
import type { TreeSelection } from '../types'

interface PackageTypePanelProps {
  packageTypeId: string
  onSelect: (sel: TreeSelection) => void
}

export function PackageTypePanel({ packageTypeId, onSelect }: PackageTypePanelProps) {
  const { data: allPackageTypes } = usePackageTypes()
  const { data: allTests } = useTests()
  const pt = (allPackageTypes ?? []).find(t => t.id === packageTypeId)
  const tests = (allTests ?? []).filter(t => t.packageTypeId === packageTypeId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editPt, setEditPt] = useState(false)
  const [editTestId, setEditTestId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formScoring, setFormScoring] = useState<ScoringType>('IMMEDIATE')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formTestTool, setFormTestTool] = useState('')
  const [formOrder, setFormOrder] = useState(1)
  const [formOriginalYear, setFormOriginalYear] = useState<number | undefined>(undefined)
  const [formPrecision, setFormPrecision] = useState<number | undefined>(undefined)
  const [formAdaptationYear, setFormAdaptationYear] = useState<number | undefined>(undefined)
  const [formPopularity, setFormPopularity] = useState('')

  const updatePt = useUpdatePackageType()
  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const deleteTest = useDeleteTest()
  const createSubTest = useCreateSubTest()

  const [formUseSubtest, setFormUseSubtest] = useState(true)

  const filtered = tests.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase())
  )

  const openCreateTest = () => {
    setEditPt(false); setEditTestId(null)
    setFormName(''); setFormDesc(''); setFormScoring('IMMEDIATE'); setFormOrder(tests.length + 1)
    setFormOriginalYear(undefined); setFormPrecision(undefined); setFormAdaptationYear(undefined); setFormPopularity('')
    setFormActive(true); setFormError('')
    setFormOpen(true)
  }

  const openEditPt = () => {
    if (!pt) return
    setEditPt(true); setEditTestId(null)
    setFormName(pt.name); setFormDesc(pt.description ?? ''); setFormPrice(pt.price); setFormTestTool(pt.testTool ?? '')
    setFormActive(pt.isActive); setFormError('')
    setFormOpen(true)
  }

  const openEditTest = (t: Test) => {
    setEditPt(false); setEditTestId(t.id)
    setFormName(t.name); setFormDesc(t.description ?? ''); setFormScoring(t.scoringType); setFormOrder(t.order ?? 1)
    setFormOriginalYear(t.originalYear ?? undefined); setFormPrecision(t.precision ?? undefined)
    setFormAdaptationYear(t.adaptationYear ?? undefined); setFormPopularity(t.popularity ?? '')
    setFormActive(t.isActive); setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    if (editPt && pt) {
      updatePt.mutate(
        { id: pt.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, price: formPrice, testTool: formTestTool.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else if (editTestId) {
      updateTest.mutate(
        { id: editTestId, dto: { name: formName.trim(), description: formDesc.trim() || undefined, scoringType: formScoring, order: formOrder, originalYear: formOriginalYear, precision: formPrecision, adaptationYear: formAdaptationYear, popularity: formPopularity.trim() || undefined, isActive: formActive } },
        { onSuccess: () => { setFormOpen(false); setEditTestId(null) } },
      )
    } else {
      createTest.mutate(
        { packageTypeId, name: formName.trim(), description: formDesc.trim() || undefined, scoringType: formScoring, order: formOrder, originalYear: formOriginalYear, precision: formPrecision, adaptationYear: formAdaptationYear, popularity: formPopularity.trim() || undefined, isActive: formActive },
        {
          onSuccess: (newTest) => {
            setFormOpen(false)
            if (newTest?.id) {
              if (!formUseSubtest) {
                createSubTest.mutate(
                  { testId: newTest.id, name: 'Default', description: 'Default subtest', order: 1, isActive: true },
                  { onSuccess: (newSub) => { if (newSub?.id) onSelect({ type: 'subTest', id: newSub.id }) } },
                )
              } else {
                onSelect({ type: 'test', id: newTest.id })
              }
            }
          },
        },
      )
    }
  }

  if (!pt) return null

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center text-white shadow-md shadow-violet-200/50">
            <FlaskConical className="size-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{pt.name}</h2>
              <span className={cn('text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                pt.isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              )} role="status">{pt.isActive ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            {pt.description && <p className="text-sm text-slate-500 font-medium mt-1">{pt.description}</p>}
            <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-widest">Tipe Paket &middot; Rp {pt.price.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openEditPt}
            aria-label={`Edit tipe paket ${pt.name}`}
            className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FileText className="size-5 text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{tests.length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CheckCircle2 className="size-5 text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{tests.filter(t => t.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="size-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <XCircle className="size-5 text-rose-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{tests.filter(t => !t.isActive).length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Nonaktif</p>
          </div>
        </div>
      </div>

      {/* Children header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 tracking-tight">Tes</h3>
        <Button size="sm" onClick={openCreateTest}
          className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
          <Plus className="size-4 mr-1.5" aria-hidden="true" /> Tambah
        </Button>
      </div>

      {/* Search */}
      {tests.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" aria-hidden="true" />
          <Input
            placeholder="Cari tes..."
            aria-label="Cari tes"
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
            <FileText className="size-6 text-slate-300" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold text-slate-500">Belum ada tes</p>
          <p className="text-xs text-slate-400 mt-1">Tambahkan tes untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Daftar tes">
          {filtered.map(t => (
            <div key={t.id} role="listitem"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all duration-200"
              onClick={() => onSelect({ type: 'test', id: t.id })}
              onKeyDown={e => e.key === 'Enter' && onSelect({ type: 'test', id: t.id })}
              tabIndex={0}
              aria-label={`Tes: ${t.name}`}
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-white shadow-sm shrink-0">
                <FileText className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-black text-slate-900 truncate">{t.name}</span>
                  <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-md',
                    t.isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                  )}>{t.isActive ? 'Aktif' : 'Nonaktif'}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{t.scoringType === 'IMMEDIATE' ? 'Skor Langsung' : 'Skor Akhir'}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); openEditTest(t) }}
                  aria-label={`Edit ${t.name}`}
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setDeleteId(t.id) }}
                  aria-label={`Hapus ${t.name}`}
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
      <Dialog open={formOpen} onOpenChange={v => { setFormOpen(v); if (!v) { setEditTestId(null); setEditPt(false) } }}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">
              {editPt ? 'Edit Tipe Paket' : editTestId ? 'Edit Tes' : 'Tes Baru'}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">
              {editPt ? 'Perbarui tipe paket.' : editTestId ? 'Perbarui tes.' : 'Tambah tes baru.'}
            </DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pt-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama</Label>
                <Input id="pt-name" placeholder="Nama..." value={formName} onChange={e => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-invalid={!!formError} aria-describedby={formError ? 'pt-name-error' : undefined} />
                {formError && <p id="pt-name-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pt-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                <Textarea id="pt-desc" placeholder="Deskripsi..." value={formDesc} onChange={e => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
              </div>
              {editPt && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pt-price" className="text-xs font-bold uppercase tracking-wider text-slate-500">Harga (Rp)</Label>
                    <Input id="pt-price" type="number" placeholder="0" value={formPrice || ''} onChange={e => setFormPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pt-testtool" className="text-xs font-bold uppercase tracking-wider text-slate-500">Alat Tes</Label>
                    <Input id="pt-testtool" placeholder="Nama alat tes..." value={formTestTool} onChange={e => setFormTestTool(e.target.value)}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                </div>
              )}
              {!editPt && (
                <fieldset className="space-y-2">
                  <legend className="text-xs font-bold uppercase tracking-wider text-slate-500">Tipe Skor</legend>
                  <div className="flex gap-3">
                    {(['IMMEDIATE', 'END_OF_TEST'] as const).map(s => (
                      <button key={s} type="button" onClick={() => setFormScoring(s)}
                        aria-pressed={formScoring === s}
                        className={cn(
                          'flex-1 h-10 rounded-xl text-xs font-bold border transition-all',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
                          formScoring === s
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                        )}>
                        {s === 'IMMEDIATE' ? 'Langsung' : 'Akhir Tes'}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              {!editPt && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pt-order" className="text-xs font-bold uppercase tracking-wider text-slate-500">Urutan</Label>
                    <Input id="pt-order" type="number" value={formOrder || ''} onChange={e => setFormOrder(e.target.value === '' ? 0 : Number(e.target.value))}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pt-popularity" className="text-xs font-bold uppercase tracking-wider text-slate-500">Popularitas</Label>
                    <Select value={formPopularity} onValueChange={setFormPopularity}>
                      <SelectTrigger id="pt-popularity" className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <SelectValue placeholder="Pilih popularitas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rendah">Rendah</SelectItem>
                        <SelectItem value="Sedang">Sedang</SelectItem>
                        <SelectItem value="Tinggi">Tinggi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {!editPt && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pt-origyear" className="text-xs font-bold uppercase tracking-wider text-slate-500">Tahun Asli</Label>
                    <Input id="pt-origyear" type="number" placeholder="Opsional" value={formOriginalYear ?? ''} onChange={e => setFormOriginalYear(e.target.value ? Number(e.target.value) : undefined)}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pt-adaptyear" className="text-xs font-bold uppercase tracking-wider text-slate-500">Tahun Adaptasi</Label>
                    <Input id="pt-adaptyear" type="number" placeholder="Opsional" value={formAdaptationYear ?? ''} onChange={e => setFormAdaptationYear(e.target.value ? Number(e.target.value) : undefined)}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pt-precision" className="text-xs font-bold uppercase tracking-wider text-slate-500">Presisi</Label>
                    <Input id="pt-precision" type="number" step="0.01" placeholder="Opsional" value={formPrecision ?? ''} onChange={e => setFormPrecision(e.target.value ? Number(e.target.value) : undefined)}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                </div>
              )}
              {!editPt && !editTestId && (
                <fieldset className="space-y-2">
                  <legend className="text-xs font-bold uppercase tracking-wider text-slate-500">Struktur Soal</legend>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setFormUseSubtest(true)}
                      aria-pressed={formUseSubtest}
                      className={cn(
                        'flex-1 h-10 rounded-xl text-xs font-bold border transition-all',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
                        formUseSubtest
                          ? 'bg-sky-50 border-sky-300 text-sky-700 ring-1 ring-sky-200'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                      )}>
                      Pakai Sub Tes
                    </button>
                    <button type="button" onClick={() => setFormUseSubtest(false)}
                      aria-pressed={!formUseSubtest}
                      className={cn(
                        'flex-1 h-10 rounded-xl text-xs font-bold border transition-all',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
                        !formUseSubtest
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-1 ring-emerald-200'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                      )}>
                      Tanpa Sub Tes
                    </button>
                  </div>
                </fieldset>
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
                disabled={updatePt.isPending || createTest.isPending || updateTest.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                {editPt || editTestId ? 'Simpan' : 'Tambah'}
              </Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Tes"
        description="Semua sub tes dan soal di dalamnya juga akan terhapus."
        onConfirm={() => { if (deleteId) deleteTest.mutate(deleteId, { onSuccess: () => setDeleteId(null) }) }}
        onCancel={() => setDeleteId(null)} />
    </div>
  )
}
