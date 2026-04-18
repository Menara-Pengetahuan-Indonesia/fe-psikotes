'use client'

import { PackagePanel } from './panels/PackagePanel'
import { ChildPackagePanel } from './panels/ChildPackagePanel'
import { PackageTypePanel } from './panels/PackageTypePanel'
import { TestPanel } from './panels/TestPanel'
import { SubTestPanel } from './panels/SubTestPanel'
import { EmptyState } from './panels/EmptyState'
import type { TreeSelection } from './types'

interface ContentPanelProps {
  selectedNode: TreeSelection | null
  onSelect: (sel: TreeSelection) => void
}

export function ContentPanel({ selectedNode, onSelect }: ContentPanelProps) {
  if (!selectedNode) return <EmptyState />

  switch (selectedNode.type) {
    case 'package':
      return <PackagePanel packageId={selectedNode.id} onSelect={onSelect} />
    case 'childPackage':
      return <ChildPackagePanel childPackageId={selectedNode.id} onSelect={onSelect} />
    case 'packageType':
      return <PackageTypePanel packageTypeId={selectedNode.id} onSelect={onSelect} />
    case 'test':
      return (
        <TestPanel
          testId={selectedNode.id}
          onSelect={onSelect}
        />
      )
    case 'subTest':
      return <SubTestPanel subTestId={selectedNode.id} />
    default:
      return <EmptyState />
  }
}
