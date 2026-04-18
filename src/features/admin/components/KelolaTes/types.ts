import type { Package, ChildPackage, PackageType, Test, SubTest, Question } from '../../types'

export type TreeNodeType = 'package' | 'childPackage' | 'packageType' | 'test' | 'subTest'

export interface TreeSelection {
  type: TreeNodeType
  id: string
}

export type ContentMode = 'view' | 'create' | 'edit'

export interface TreeNode {
  type: TreeNodeType
  id: string
  label: string
  parentId?: string
  isActive: boolean
  children: TreeNode[]
  data: Package | ChildPackage | PackageType | Test | SubTest
}

export const LEVEL_LABELS: Record<TreeNodeType, string> = {
  package: 'Paket',
  childPackage: 'Paket Kecil',
  packageType: 'Sub Paket',
  test: 'Tes',
  subTest: 'Sub Tes',
}

export const LEVEL_COLORS: Record<TreeNodeType, string> = {
  package: 'text-teal-600',
  childPackage: 'text-indigo-600',
  packageType: 'text-violet-600',
  test: 'text-emerald-600',
  subTest: 'text-sky-600',
}
