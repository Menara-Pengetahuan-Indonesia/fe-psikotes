'use client'

import { Plus, Loader2, FolderTree, Search } from 'lucide-react'
import { useState } from 'react'
import { TreeNodeItem } from './TreeNodeItem'
import { cn } from '@/lib/utils'
import type { TreeNode, TreeSelection } from './types'

interface TreeSidebarProps {
  tree: TreeNode[]
  isLoading: boolean
  selectedNode: TreeSelection | null
  isExpanded: (type: string, id: string) => boolean
  toggleExpand: (type: string, id: string) => void
  selectNode: (sel: TreeSelection | null) => void
  onCreateRoot: () => void
}

export function TreeSidebar({
  tree,
  isLoading,
  selectedNode,
  isExpanded,
  toggleExpand,
  selectNode,
  onCreateRoot,
}: TreeSidebarProps) {
  const [search, setSearch] = useState('')

  const filterTree = (nodes: TreeNode[], query: string): TreeNode[] => {
    if (!query) return nodes
    const q = query.toLowerCase()
    return nodes.reduce<TreeNode[]>((acc, node) => {
      const childMatches = filterTree(node.children, query)
      if (node.label.toLowerCase().includes(q) || childMatches.length > 0) {
        acc.push({ ...node, children: childMatches.length > 0 ? childMatches : node.children })
      }
      return acc
    }, [])
  }

  const filtered = filterTree(tree, search)

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-slate-200/80 flex flex-col h-full" role="navigation" aria-label="Navigasi pohon tes">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm">
              <FolderTree className="size-4 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">Kelola Tes</h2>
          </div>
          <button
            type="button"
            onClick={onCreateRoot}
            aria-label="Buat paket baru"
            className={cn(
              'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all',
              'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
              'active:scale-95'
            )}
          >
            <Plus className="size-3.5" aria-hidden="true" />
            Paket
          </button>
        </div>

        {/* Search */}
        {tree.length > 0 && (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari..."
              aria-label="Cari item dalam pohon navigasi"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={cn(
                'w-full h-8 pl-8 pr-3 rounded-lg text-xs font-medium',
                'bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                'transition-colors'
              )}
            />
          </div>
        )}
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5" role="tree" aria-label="Hierarki paket dan tes">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="size-5 animate-spin text-slate-400" aria-hidden="true" />
            <p className="text-xs font-medium text-slate-400">Memuat data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
              <FolderTree className="size-6 text-slate-300" aria-hidden="true" />
            </div>
            {search ? (
              <>
                <p className="text-sm font-bold text-slate-500">Tidak ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">Coba kata kunci lain.</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-500">Belum ada paket</p>
                <button
                  type="button"
                  onClick={onCreateRoot}
                  className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                >
                  Buat paket pertama
                </button>
              </>
            )}
          </div>
        ) : (
          filtered.map(node => (
            <TreeNodeItem
              key={`${node.type}:${node.id}`}
              node={node}
              selectedNode={selectedNode}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              selectNode={selectNode}
            />
          ))
        )}
      </div>
    </aside>
  )
}
