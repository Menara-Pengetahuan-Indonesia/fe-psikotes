'use client'

import { useMemo } from 'react'
import { usePackages } from '../../hooks/use-packages'
import type { TreeNode } from './types'

export function useTreeData() {
  const { data: packages, isLoading } = usePackages()

  const tree = useMemo<TreeNode[]>(() => {
    if (!packages) return []

    return packages.map((pkg): TreeNode => {
      const isRelationship = pkg.name.toLowerCase().includes('relationship')

      return {
        type: 'package',
        id: pkg.id,
        label: pkg.name,
        isActive: pkg.isActive,
        data: pkg,
        children: (pkg.childPackages ?? []).map((cp): TreeNode => ({
          type: 'childPackage',
          id: cp.id,
          label: cp.name,
          parentId: pkg.id,
          isActive: cp.isActive,
          data: cp,
          children: (cp.packageTypes ?? []).map((pt): TreeNode => ({
            type: 'packageType',
            id: pt.id,
            label: pt.name,
            parentId: cp.id,
            isActive: pt.isActive,
            data: pt,
            children: (pt.tests ?? []).map((test): TreeNode => ({
              type: 'test',
              id: test.id,
              label: test.name,
              parentId: pt.id,
              isActive: test.isActive,
              data: test,
              children: isRelationship
                ? []
                : (test.subTests ?? []).map((st): TreeNode => ({
                    type: 'subTest',
                    id: st.id,
                    label: st.name,
                    parentId: test.id,
                    isActive: st.isActive,
                    data: st,
                    children: [],
                  })),
            })),
          })),
        })),
      }
    })
  }, [packages])

  const isRelationshipPackage = useMemo(() => {
    const set = new Set<string>()
    if (!packages) return set
    for (const pkg of packages) {
      if (pkg.name.toLowerCase().includes('relationship')) set.add(pkg.id)
    }
    return set
  }, [packages])

  const findAncestorPackageId = (nodeType: TreeNode['type'], nodeId: string): string | undefined => {
    for (const pkg of tree) {
      if (nodeType === 'package' && pkg.id === nodeId) return pkg.id
      for (const cp of pkg.children) {
        if (nodeType === 'childPackage' && cp.id === nodeId) return pkg.id
        for (const pt of cp.children) {
          if (nodeType === 'packageType' && pt.id === nodeId) return pkg.id
          for (const t of pt.children) {
            if (nodeType === 'test' && t.id === nodeId) return pkg.id
            for (const st of t.children) {
              if (nodeType === 'subTest' && st.id === nodeId) return pkg.id
            }
          }
        }
      }
    }
    return undefined
  }

  const isRelationshipContext = (nodeType: TreeNode['type'], nodeId: string): boolean => {
    const pkgId = findAncestorPackageId(nodeType, nodeId)
    return pkgId ? isRelationshipPackage.has(pkgId) : false
  }

  return { tree, isLoading, isRelationshipContext }
}

