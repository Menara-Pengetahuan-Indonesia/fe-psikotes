import { api } from '@/lib/axios'
import type {
  CatalogPackage,
  CatalogChildPackage,
  CatalogPackageType,
  MyPackageType,
} from '../types/catalog.types'

interface ApiResponse<T> {
  data: T
}

export const catalogService = {
  getPackages: async (): Promise<CatalogPackage[]> => {
    const { data } = await api.get<ApiResponse<CatalogPackage[]>>('/catalog/packages')
    return data.data
  },

  getChildPackages: async (packageId: string): Promise<CatalogChildPackage[]> => {
    const { data } = await api.get<ApiResponse<CatalogChildPackage[]>>(
      `/catalog/packages/${packageId}/child-packages`,
    )
    return data.data
  },

  getPackageTypes: async (childPackageId: string): Promise<CatalogPackageType[]> => {
    const { data } = await api.get<ApiResponse<CatalogPackageType[]>>(
      `/catalog/child-packages/${childPackageId}/package-types`,
    )
    return data.data
  },

  purchasePackageType: async (packageTypeId: string): Promise<void> => {
    await api.post(`/catalog/package-types/${packageTypeId}/purchase`)
  },

  getMyPackages: async (): Promise<MyPackageType[]> => {
    const { data } = await api.get<ApiResponse<MyPackageType[]>>('/catalog/my-packages')
    return data.data
  },
}
