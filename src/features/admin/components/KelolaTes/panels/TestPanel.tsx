'use client'

import { useState } from 'react'
import {
  FileText, Plus, Search, Pencil, Trash2, BookOpen,
  ToggleLeft, ToggleRight, CheckCircle2, XCircle, ArrowRight,
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
  useTests, useUpdateTest,
  useSubTests, useCreateSubTest, useUpdateSubTest, useDeleteSubTest,
} from '@/features/admin/hooks'
import { QuestionList } from '@/features/admin/components/QuestionManagement/QuestionList'
import type { SubTest, ScoringType } from '@/features/admin/types'
import type { TreeSelection } from '../types'

interface TestPanelProps {
  testId: string
  onSelect: (sel: TreeSelection) => void
}

export function TestPanel({ testId, onSelect }: TestPanelProps) {
  const { data: allTests } = useTests()
  const { data: allSubTests } = useSubTests()
  const test = (allTests ?? []).find(t => t.id === testId)
  const subTests = (allSubTests ?? []).filter(s => s.testId === testId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editTest, setEditTest] = useState(false)
  const [editSubId, setEditSubId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDuration, setFormDuration] = useState<number | undefined>(undefined)
  const [formOrder, setFormOrder] = useState(1)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')
  const [formScoring, setFormScoring] = useState<ScoringType>('IMMEDIATE')
  const [formOriginalYear, setFormOriginalYear] = useState<number | undefined>(undefined)
  const [formPrecision, setFormPrecision] = useState<number | undefined>(undefined)
  const [formAdaptationYear, setFormAdaptationYear] = useState<number | undefined>(undefined)
  const [formPopularity, setFormPopularity] = useState('')

  const updateTest = useUpdateTest()
  const createSub = useCreateSubTest()
  const updateSub = useUpdateSubTest()
  const deleteSub = useDeleteSubTest()

  const filtered = subTests.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase())
  )

  const openCreateSub = () => {
    setEditTest(false); setEditSubId(null)
    setFormName(''); setFormDesc(''); setFormDuration(undefined); setFormOrder(subTests.length + 1); setFormActive(true); setFormError('')
    setFormOpen(true)
  }

  const openEditTest = () => {
    if (!test) return
    setEditTest(true); setEditSubId(null)
    setFormName(test.name); setFormDesc(test.description ?? ''); setFormScoring(test.scoringType); setFormOrder(test.order ?? 1)
    setFormOriginalYear(test.originalYear ?? undefined); setFormPrecision(test.precision ?? undefined)
    setFormAdaptationYear(test.adaptationYear ?? undefined); setFormPopularity(test.popularity ?? '')
    setFormActive(test.isActive); setFormError('')
    setFormOpen(true)
  }

  const openEditSub = (s: SubTest) => {
    setEditTest(false); setEditSubId(s.id)
    setFormName(s.name); setFormDesc(s.description ?? ''); setFormDuration(s.duration ?? undefined); setFormOrder(s.order); setFormActive(s.isActive); setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    if (editTest && test) {
      updateTest.mutate(
        { id: test.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, scoringType: formScoring, order: formOrder, originalYear: formOriginalYear, precision: formPrecision, adaptationYear: formAdaptationYear, popularity: formPopularity.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else if (editSubId) {
      updateSub.mutate(
        { id: editSubId, dto: { name: formName.trim(), description: formDesc.trim() || undefined, duration: formDuration, order: formOrder, isActive: formActive } },
        { onSuccess: () => { setFormOpen(false); setEditSubId(null) } },
      )
    } else {
      createSub.mutate(
        { testId, name: formName.trim(), description: formDesc.trim() || undefined, duration: formDuration, order: formOrder, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  if (!test) return null

  const isDefaultOnly = subTests.length === 1 && subTests[0].name === '_default'

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-200/50">
            <FileText className="size-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{test.name}</h2>
              <span className={cn('text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                test.isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              )} role="status">{test.isActive ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            {test.description && <p className="text-sm text-slate-500 font-medium mt-1">{test.description}</p>}
            <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-widest">
              Tes &middot; {test.scoringType === 'IMMEDIATE' ? 'Skor Langsung' : 'Skor Akhir'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openEditTest}
          aria-label={`Edit tes ${test.name}`}
          className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <Pencil className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
              <div className="size-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <BookOpen className="size-5 text-sky-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{subTests.length}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sub Tes</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
              <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-indigo-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{subTests.filter(s => s.isActive).length}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
              <div className="size-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <XCircle className="size-5 text-rose-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{subTests.filter(s => !s.isActive).length}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Nonaktif</p>
              </div>
            </div>
          </div>

          {/* Subtest content — depends on mode */}
          {subTests.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 tracking-tight">Sub Tes</h3>
                <Button size="sm" onClick={openCreateSub}
                  className="h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                  <Plus className="size-4 mr-1.5" aria-hidden="true" /> Tambah
                </Button>
              </div>
              <div className="text-center py-12">
                <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="size-6 text-slate-300" aria-hidden="true" />
                </div>
                <p className="text-sm font-bold text-slate-500">Belum ada sub tes</p>
                <p className="text-xs text-slate-400 mt-1">Tambahkan sub tes untuk memulai.</p>
              </div>
            </div>
          ) : isDefaultOnly ? (
            /* Default subtest — show questions directly */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 tracking-tight">Soal</h3>
                <button type="button" onClick={() => onSelect({ type: 'subTest', id: subTests[0].id })}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                  Kelola <ArrowRight className="size-3" />
                </button>
              </div>
              <QuestionList subTestId={subTests[0].id} />
            </div>
          ) : (
            /* Normal subtests */
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 tracking-tight">Sub Tes</h3>
                <Button size="sm" onClick={openCreateSub}
                  className="h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                  <Plus className="size-4 mr-1.5" aria-hidden="true" /> Tambah
                </Button>
              </div>

              {subTests.length > 0 && (
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" aria-hidden="true" />
                  <Input
                    placeholder="Cari sub tes..."
                    aria-label="Cari sub tes"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 h-10 bg-white border-slate-200 rounded-xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  />
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="size-6 text-slate-300" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold text-slate-500">Tidak ditemukan</p>
                </div>
              ) : (
                <div className="space-y-2" role="list" aria-label="Daftar sub tes">
                  {filtered.map(s => (
                <div key={s.id} role="listitem"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 hover:shadow-md cursor-pointer transition-all duration-200"
                  onClick={() => onSelect({ type: 'subTest', id: s.id })}
                  onKeyDown={e => e.key === 'Enter' && onSelect({ type: 'subTest', id: s.id })}
                  tabIndex={0}
                  aria-label={`Sub tes: ${s.name}`}
                >
                  <div className="size-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white shadow-sm shrink-0">
                    <BookOpen className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black text-slate-900 truncate">{s.name}</span>
                      <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-md',
                        s.isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                      )}>{s.isActive ? 'Aktif' : 'Nonaktif'}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Urutan #{s.order}{s.duration ? ` · ${s.duration} menit` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); openEditSub(s) }}
                      aria-label={`Edit ${s.name}`}
                      className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      <Pencil className="size-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setDeleteId(s.id) }}
                      aria-label={`Hapus ${s.name}`}
                      className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
            </>
          )}

          {/* Dialog */}
          <Dialog open={formOpen} onOpenChange={v => { setFormOpen(v); if (!v) { setEditSubId(null); setEditTest(false) } }}>
            <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl">
              <div className="px-6 pt-6 pb-3">
                <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">
                  {editTest ? 'Edit Tes' : editSubId ? 'Edit Sub Tes' : 'Sub Tes Baru'}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 mt-1">
                  {editTest ? 'Perbarui tes.' : editSubId ? 'Perbarui sub tes.' : 'Tambah sub tes baru.'}
                </DialogDescription>
              </div>
              <div className="px-6 pb-6 space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama</Label>
                    <Input id="test-name" placeholder="Nama..." value={formName} onChange={e => { setFormName(e.target.value); setFormError('') }}
                      className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-invalid={!!formError} aria-describedby={formError ? 'test-name-error' : undefined} />
                    {formError && <p id="test-name-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                    <Textarea id="test-desc" placeholder="Deskripsi..." value={formDesc} onChange={e => setFormDesc(e.target.value)}
                      className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
                  </div>
                  {editTest && (
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
                  {editTest && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-edit-order" className="text-xs font-bold uppercase tracking-wider text-slate-500">Urutan</Label>
                        <Input id="test-edit-order" type="number" value={formOrder} onChange={e => setFormOrder(Number(e.target.value))}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="test-edit-popularity" className="text-xs font-bold uppercase tracking-wider text-slate-500">Popularitas</Label>
                        <Select value={formPopularity} onValueChange={setFormPopularity}>
                          <SelectTrigger id="test-edit-popularity" className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
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
                  {editTest && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-edit-origyear" className="text-xs font-bold uppercase tracking-wider text-slate-500">Tahun Asli</Label>
                        <Input id="test-edit-origyear" type="number" placeholder="Opsional" value={formOriginalYear ?? ''} onChange={e => setFormOriginalYear(e.target.value ? Number(e.target.value) : undefined)}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="test-edit-adaptyear" className="text-xs font-bold uppercase tracking-wider text-slate-500">Tahun Adaptasi</Label>
                        <Input id="test-edit-adaptyear" type="number" placeholder="Opsional" value={formAdaptationYear ?? ''} onChange={e => setFormAdaptationYear(e.target.value ? Number(e.target.value) : undefined)}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="test-edit-precision" className="text-xs font-bold uppercase tracking-wider text-slate-500">Presisi</Label>
                        <Input id="test-edit-precision" type="number" step="0.01" placeholder="Opsional" value={formPrecision ?? ''} onChange={e => setFormPrecision(e.target.value ? Number(e.target.value) : undefined)}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
                    </div>
                  )}
                  {!editTest && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-dur" className="text-xs font-bold uppercase tracking-wider text-slate-500">Durasi (menit)</Label>
                        <Input id="test-dur" type="number" placeholder="Opsional" value={formDuration ?? ''} onChange={e => setFormDuration(e.target.value ? Number(e.target.value) : undefined)}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="test-order" className="text-xs font-bold uppercase tracking-wider text-slate-500">Urutan</Label>
                        <Input id="test-order" type="number" value={formOrder} onChange={e => setFormOrder(Number(e.target.value))}
                          className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                      </div>
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
                    disabled={updateTest.isPending || createSub.isPending || updateSub.isPending}
                    className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                    {editTest || editSubId ? 'Simpan' : 'Tambah'}
                  </Button>
                  <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setFormOpen(false)}>Batal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <ConfirmDialog open={!!deleteId} title="Hapus Sub Tes"
            description="Semua soal di dalamnya juga akan terhapus."
            onConfirm={() => { if (deleteId) deleteSub.mutate(deleteId, { onSuccess: () => setDeleteId(null) }) }}
            onCancel={() => setDeleteId(null)} />
    </div>
  )
}
