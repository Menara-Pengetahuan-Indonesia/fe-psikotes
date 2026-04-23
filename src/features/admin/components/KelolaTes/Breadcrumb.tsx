'use client'

import { ChevronRight, Home } from 'lucide-react'
import {
  usePackages, useChildPackages, usePackageTypes, useTests, useSubTests,
} from '../../hooks'
import type { TreeSelection, TreeNodeType } from './types'

interface BreadcrumbItem {
  type: TreeNodeType
  id: string
  label: string
}

interface BreadcrumbProps {
  selectedNode: TreeSelection | null
  onSelect: (sel: TreeSelection) => void
}

export function Breadcrumb({ selectedNode, onSelect }: BreadcrumbProps) {
  const { data: packages } = usePackages()
  const { data: childPackages } = useChildPackages()
  const { data: packageTypes } = usePackageTypes()
  const { data: tests } = useTests()
  const { data: subTests } = useSubTests()

  if (!selectedNode) return null

  const crumbs: BreadcrumbItem[] = []

  if (selectedNode.type === 'subTest') {
    const st = (subTests ?? []).find(s => s.id === selectedNode.id)
    if (st) {
      const t = (tests ?? []).find(t => t.id === st.testId)
      if (t) {
        const pt = (packageTypes ?? []).find(p => p.id === t.packageTypeId)
        if (pt) {
          const cp = (childPackages ?? []).find(c => c.id === pt.childPackageId)
          if (cp) {
            const pkg = (packages ?? []).find(p => p.id === cp.packageId)
            if (pkg) crumbs.push({ type: 'package', id: pkg.id, label: pkg.name })
            crumbs.push({ type: 'childPackage', id: cp.id, label: cp.name })
          }
          crumbs.push({ type: 'packageType', id: pt.id, label: pt.name })
        }
        crumbs.push({ type: 'test', id: t.id, label: t.name })
      }
      if (!st.isDefault) {
        crumbs.push({ type: 'subTest', id: st.id, label: st.name })
      } else {
        crumbs.push({ type: 'subTest', id: st.id, label: 'Soal' })
      }
    }
  } else if (selectedNode.type === 'test') {
    const t = (tests ?? []).find(t => t.id === selectedNode.id)
    if (t) {
      const pt = (packageTypes ?? []).find(p => p.id === t.packageTypeId)
      if (pt) {
        const cp = (childPackages ?? []).find(c => c.id === pt.childPackageId)
        if (cp) {
          const pkg = (packages ?? []).find(p => p.id === cp.packageId)
          if (pkg) crumbs.push({ type: 'package', id: pkg.id, label: pkg.name })
          crumbs.push({ type: 'childPackage', id: cp.id, label: cp.name })
        }
        crumbs.push({ type: 'packageType', id: pt.id, label: pt.name })
      }
      crumbs.push({ type: 'test', id: t.id, label: t.name })
    }
  } else if (selectedNode.type === 'packageType') {
    const pt = (packageTypes ?? []).find(p => p.id === selectedNode.id)
    if (pt) {
      const cp = (childPackages ?? []).find(c => c.id === pt.childPackageId)
      if (cp) {
        const pkg = (packages ?? []).find(p => p.id === cp.packageId)
        if (pkg) crumbs.push({ type: 'package', id: pkg.id, label: pkg.name })
        crumbs.push({ type: 'childPackage', id: cp.id, label: cp.name })
      }
      crumbs.push({ type: 'packageType', id: pt.id, label: pt.name })
    }
  } else if (selectedNode.type === 'childPackage') {
    const cp = (childPackages ?? []).find(c => c.id === selectedNode.id)
    if (cp) {
      const pkg = (packages ?? []).find(p => p.id === cp.packageId)
      if (pkg) crumbs.push({ type: 'package', id: pkg.id, label: pkg.name })
      crumbs.push({ type: 'childPackage', id: cp.id, label: cp.name })
    }
  } else if (selectedNode.type === 'package') {
    const pkg = (packages ?? []).find(p => p.id === selectedNode.id)
    if (pkg) crumbs.push({ type: 'package', id: pkg.id, label: pkg.name })
  }

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="px-8 pt-6 pb-0">
      <ol className="flex items-center gap-1.5 flex-wrap text-sm">
        <li className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelect({ type: 'package', id: '' })}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Kelola Tes"
          >
            <Home className="size-3.5" />
          </button>
          <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={`${crumb.type}-${crumb.id}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="font-bold text-slate-900 truncate max-w-[200px]">{crumb.label}</span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onSelect({ type: crumb.type, id: crumb.id })}
                    className="text-slate-400 hover:text-indigo-600 font-medium transition-colors truncate max-w-[200px]"
                  >
                    {crumb.label}
                  </button>
                  <ChevronRight className="size-3 text-slate-300 shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
