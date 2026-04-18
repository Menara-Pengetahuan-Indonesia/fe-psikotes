'use client'

import { ChevronRight, Package, Layers, FileText, BookOpen, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TreeNode, TreeSelection, TreeNodeType } from './types'

const LEVEL_ICONS: Record<TreeNodeType, React.ElementType> = {
  package: Package,
  childPackage: Layers,
  packageType: FlaskConical,
  test: FileText,
  subTest: BookOpen,
}

const ICON_COLORS: Record<TreeNodeType, string> = {
  package: 'text-indigo-600',
  childPackage: 'text-indigo-600',
  packageType: 'text-violet-600',
  test: 'text-emerald-600',
  subTest: 'text-sky-600',
}

const SELECTED_BG: Record<TreeNodeType, string> = {
  package: 'bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200/60',
  childPackage: 'bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200/60',
  packageType: 'bg-violet-50 text-violet-800 ring-1 ring-violet-200/60',
  test: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/60',
  subTest: 'bg-sky-50 text-sky-800 ring-1 ring-sky-200/60',
}

const INDENT: Record<TreeNodeType, string> = {
  package: 'pl-2',
  childPackage: 'pl-6',
  packageType: 'pl-10',
  test: 'pl-14',
  subTest: 'pl-[4.5rem]',
}

interface TreeNodeItemProps {
  node: TreeNode
  selectedNode: TreeSelection | null
  isExpanded: (type: string, id: string) => boolean
  toggleExpand: (type: string, id: string) => void
  selectNode: (sel: TreeSelection) => void
}

export function TreeNodeItem({ node, selectedNode, isExpanded, toggleExpand, selectNode }: TreeNodeItemProps) {
  const Icon = LEVEL_ICONS[node.type]
  const iconColor = ICON_COLORS[node.type]
  const indent = INDENT[node.type]
  const hasChildren = node.children.length > 0
  const expanded = isExpanded(node.type, node.id)
  const isSelected = selectedNode?.type === node.type && selectedNode?.id === node.id

  return (
    <div>
      <div className={cn('flex items-center gap-1.5 pr-2 rounded-xl', indent)}>
        {hasChildren ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={expanded ? `Tutup ${node.label}` : `Buka ${node.label}`}
            className="size-7 shrink-0 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
            onClick={() => toggleExpand(node.type, node.id)}
          >
            <ChevronRight className={cn('size-3.5 transition-transform duration-200', expanded && 'rotate-90')} />
          </button>
        ) : (
          <span className="size-7 shrink-0" aria-hidden="true" />
        )}

        <button
          type="button"
          role="treeitem"
          aria-selected={isSelected}
          aria-label={`${node.label}${!node.isActive ? ' (nonaktif)' : ''}`}
          className={cn(
            'flex-1 flex items-center gap-2 py-2 px-2.5 rounded-xl text-sm font-bold transition-all duration-150 min-w-0',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
            isSelected
              ? SELECTED_BG[node.type]
              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
            !node.isActive && 'opacity-50'
          )}
          onClick={() => selectNode({ type: node.type, id: node.id })}
        >
          <Icon className={cn('size-4 shrink-0', isSelected ? 'opacity-80' : iconColor)} aria-hidden="true" />
          <span className="truncate">{node.label}</span>
          {hasChildren && (
            <span className={cn(
              'ml-auto text-xs font-bold tabular-nums shrink-0',
              isSelected ? 'opacity-60' : 'text-slate-400'
            )}>
              {node.children.length}
            </span>
          )}
        </button>
      </div>

      {hasChildren && expanded && (
        <div className="animate-in slide-in-from-top-1 fade-in duration-200">
          {node.children.map(child => (
            <TreeNodeItem
              key={`${child.type}:${child.id}`}
              node={child}
              selectedNode={selectedNode}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              selectNode={selectNode}
            />
          ))}
        </div>
      )}
    </div>
  )
}
