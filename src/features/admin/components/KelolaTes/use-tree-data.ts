'use client'

import { useMemo } from 'react'
import { usePackages } from '../../hooks/use-packages'
import { useChildPackages } from '../../hooks/use-child-packages'
import { usePackageTypes } from '../../hooks/use-package-types'
import { useTests } from '../../hooks/use-tests'
import { useSubTests } from '../../hooks/use-subtests'
import type { TreeNode } from './types'

export function useTreeData() {
  const { data: packages, isLoading: loadingPkg } = usePackages()
  const { data: childPackages, isLoading: loadingChild } = useChildPackages()
  const { data: packageTypes, isLoading: loadingTypes } = usePackageTypes()
  const { data: tests, isLoading: loadingTests } = useTests()
  const { data: subTests, isLoading: loadingSub } = useSubTests()

  const isLoading = loadingPkg || loadingChild || loadingTypes || loadingTests || loadingSub

  const tree = useMemo<TreeNode[]>(() => {
    if (!packages) return []

    return packages.map((pkg): TreeNode => {
      const isRelationship = pkg.name.toLowerCase().includes('relationship')
      const pkgChildren = (childPackages ?? []).filter(c => c.packageId === pkg.id)

      return {
        type: 'package',
        id: pkg.id,
        label: pkg.name,
        isActive: pkg.isActive,
        data: pkg,
        children: pkgChildren.map((cp): TreeNode => {
          const cpTypes = (packageTypes ?? []).filter(t => t.childPackageId === cp.id)

          return {
            type: 'childPackage',
            id: cp.id,
            label: cp.name,
            parentId: pkg.id,
            isActive: cp.isActive,
            data: cp,
            children: cpTypes.map((pt): TreeNode => {
              const ptTests = (tests ?? []).filter(t => t.packageTypeId === pt.id)

              return {
                type: 'packageType',
                id: pt.id,
                label: pt.name,
                parentId: cp.id,
                isActive: pt.isActive,
                data: pt,
                children: ptTests.map((test): TreeNode => ({
                  type: 'test',
                  id: test.id,
                  label: test.name,
                  parentId: pt.id,
                  isActive: test.isActive,
                  data: test,
                  children: isRelationship
                    ? []
                    : (subTests ?? [])
                        .filter(s => s.testId === test.id)
                        .map((st): TreeNode => ({
                          type: 'subTest',
                          id: st.id,
                          label: st.name,
                          parentId: test.id,
                          isActive: st.isActive,
                          data: st,
                          children: [],
                        })),
                })),
              }
            }),
          }
        }),
      }
    })
  }, [packages, childPackages, packageTypes, tests, subTests])

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
