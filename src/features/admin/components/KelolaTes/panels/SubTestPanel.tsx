'use client'

import { useState } from 'react'
import { BookOpen, Pencil, ToggleLeft, ToggleRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { QuestionList } from '@/features/admin/components/QuestionManagement/QuestionList'
import { BulkImportCSV } from '@/features/admin/components/QuestionManagement/BulkImportCSV'
import { useSubTests, useUpdateSubTest } from '@/features/admin/hooks'

interface SubTestPanelProps {
  subTestId: string
}

export function SubTestPanel({ subTestId }: SubTestPanelProps) {
  const { data: allSubTests } = useSubTests()
  const st = (allSubTests ?? []).find(s => s.id === subTestId)

  const [formOpen, setFormOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDuration, setFormDuration] = useState<number | undefined>(undefined)
  const [formOrder, setFormOrder] = useState(1)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const updateSub = useUpdateSubTest()

  const openEdit = () => {
    if (!st) return
    setFormName(st.name)
    setFormDesc(st.description ?? '')
    setFormDuration(st.duration ?? undefined)
    setFormOrder(st.order)
    setFormActive(st.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    updateSub.mutate(
      { id: subTestId, dto: { name: formName.trim(), description: formDesc.trim() || undefined, duration: formDuration, order: formOrder, isActive: formActive } },
      { onSuccess: () => setFormOpen(false) },
    )
  }

  if (!st) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-200/50">
            <BookOpen className="size-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{st.name}</h2>
              <span className={cn('text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                st.isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              )} role="status">{st.isActive ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            {st.description && <p className="text-sm text-slate-500 font-medium mt-1">{st.description}</p>}
            <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-widest">
              Sub Tes &middot; Urutan #{st.order}{st.duration ? ` · ${st.duration} menit` : ''}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openEdit}
          aria-label={`Edit sub tes ${st.name}`}
          className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          <Pencil className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-slate-900 tracking-tight">Soal</h3>
        <QuestionList subTestId={subTestId} />
      </div>

      {/* Bulk import */}
      <BulkImportCSV subTestId={subTestId} />

      {/* Edit dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">Edit Sub Tes</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">Perbarui informasi sub tes.</DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="st-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama</Label>
                <Input id="st-name" placeholder="Nama..." value={formName} onChange={e => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-invalid={!!formError} aria-describedby={formError ? 'st-name-error' : undefined} />
                {formError && <p id="st-name-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="st-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                <Textarea id="st-desc" placeholder="Deskripsi..." value={formDesc} onChange={e => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="st-dur" className="text-xs font-bold uppercase tracking-wider text-slate-500">Durasi (menit)</Label>
                  <Input id="st-dur" type="number" placeholder="Opsional" value={formDuration ?? ''} onChange={e => setFormDuration(e.target.value ? Number(e.target.value) : undefined)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="st-order" className="text-xs font-bold uppercase tracking-wider text-slate-500">Urutan</Label>
                  <Input id="st-order" type="number" value={formOrder} onChange={e => setFormOrder(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500" />
                </div>
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
              <Button onClick={handleSubmit} disabled={updateSub.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">Simpan</Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
