'use client'

import { Suspense, useState } from 'react'
import { Loader2, FolderTree } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ToggleLeft, ToggleRight } from 'lucide-react'
import { useCreatePackage } from '@/features/admin/hooks'
import { TreeSidebar, ContentPanel, useTreeData, useTreeState } from '@/features/admin/components/KelolaTes'

function KelolaTesContent() {
  const { tree, isLoading } = useTreeData()
  const { selectedNode, selectNode, isExpanded, toggleExpand } = useTreeState()

  const [createPkgOpen, setCreatePkgOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')
  const createPackage = useCreatePackage()

  const openCreatePkg = () => {
    setFormName(''); setFormDesc(''); setFormActive(true); setFormError('')
    setCreatePkgOpen(true)
  }

  const handleCreatePkg = () => {
    if (!formName.trim()) { setFormError('Nama paket wajib diisi.'); return }
    createPackage.mutate(
      { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive },
      { onSuccess: () => setCreatePkgOpen(false) },
    )
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-6 overflow-hidden">
      {/* Rounded container */}
      <div className="flex flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden m-2">
        <TreeSidebar
          tree={tree}
          isLoading={isLoading}
          selectedNode={selectedNode}
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
          selectNode={selectNode}
          onCreateRoot={openCreatePkg}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50/50" role="main" aria-label="Detail konten">
          <ContentPanel
            selectedNode={selectedNode}
            onSelect={selectNode}
          />
        </main>
      </div>

      {/* Create Package Dialog */}
      <Dialog open={createPkgOpen} onOpenChange={setCreatePkgOpen}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">Paket Baru</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">Buat paket psikotes baru.</DialogDescription>
          </div>
          <div className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-pkg-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama Paket</Label>
                <Input
                  id="new-pkg-name"
                  placeholder="Misal: Paket Rekrutmen"
                  value={formName}
                  onChange={e => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-invalid={!!formError}
                  aria-describedby={formError ? 'new-pkg-error' : undefined}
                />
                {formError && <p id="new-pkg-error" role="alert" className="text-rose-600 text-xs font-bold">{formError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pkg-desc" className="text-xs font-bold uppercase tracking-wider text-slate-500">Deskripsi</Label>
                <Textarea
                  id="new-pkg-desc"
                  placeholder="Penjelasan singkat..."
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-sm font-medium min-h-[80px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
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
              <Button
                onClick={handleCreatePkg}
                disabled={createPackage.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-black shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Buat Paket
              </Button>
              <Button variant="ghost" className="h-11 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={() => setCreatePkgOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function KelolaTesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-3">
        <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center">
          <FolderTree className="size-6 text-slate-300" aria-hidden="true" />
        </div>
        <Loader2 className="size-5 animate-spin text-slate-400" aria-hidden="true" />
        <p className="text-xs font-medium text-slate-400">Memuat Kelola Tes...</p>
      </div>
    }>
      <KelolaTesContent />
    </Suspense>
  )
}
