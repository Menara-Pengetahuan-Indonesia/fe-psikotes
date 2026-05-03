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
}
