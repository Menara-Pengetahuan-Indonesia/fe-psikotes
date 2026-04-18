'use client'

import { cn } from '@/lib/utils'
import type { SubIssue } from '../types'

interface RelationshipSubIssueFilterProps {
  subIssues: SubIssue[]
  activeId: string | null
  onSelect: (id: string | null) => void
}

export function RelationshipSubIssueFilter({
  subIssues,
  activeId,
  onSelect,
}: RelationshipSubIssueFilterProps) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Situasi yang relevan:
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            'px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors',
            activeId === null
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300'
          )}
        >
          Semua
        </button>
        {subIssues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => onSelect(issue.id)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors',
              activeId === issue.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300 hover:text-primary-600'
            )}
          >
            {issue.label}
          </button>
        ))}
      </div>
      {activeId && (
        <p className="text-xs text-slate-500 font-medium pt-1">
          {subIssues.find(s => s.id === activeId)?.shortDesc}
        </p>
      )}
    </div>
  )
}
