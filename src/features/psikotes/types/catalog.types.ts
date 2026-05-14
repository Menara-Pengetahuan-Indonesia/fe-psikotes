export interface CatalogPackage {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface CatalogChildPackage {
  id: string
  packageId?: string
  name: string
  description?: string
}

export interface CatalogPackageType {
  id: string
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
}

export interface MyPackageType {
  id: string
  name: string
  description?: string
  price: number
  childPackageName?: string
  packageName?: string
  purchasedAt: string
  tests?: {
    id: string
    name: string
    description?: string
    questionTypes: string[]
    totalDuration: number
    totalQuestions: number
    session: {
      id: string
      status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
      startedAt?: string | null
      completedAt?: string | null
    } | null
  }[]
}
