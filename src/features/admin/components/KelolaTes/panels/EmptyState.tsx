'use client'

import { FolderTree, MousePointerClick } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative mb-6">
        <div className="size-20 rounded-[1.75rem] bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shadow-sm">
          <FolderTree className="size-9 text-indigo-500" />
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 size-8 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-100">
          <MousePointerClick className="size-4 text-violet-500" />
        </div>
      </div>
      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Kelola Tes & Paket</h3>
      <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
        Pilih item dari pohon navigasi di sebelah kiri untuk melihat detail dan mengelola isinya.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
        <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Menunggu pilihan
      </div>
    </div>
  )
}
