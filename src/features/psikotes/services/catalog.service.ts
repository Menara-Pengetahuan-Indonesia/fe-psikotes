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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await api.get<ApiResponse<any[]>>('/catalog/my-packages')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.data ?? []).map((item: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tests = (item.packageType?.tests ?? []).map((t: any) => {
        const questionTypes = new Set<string>()
        let totalDuration = 0
        let totalQuestions = 0
        for (const st of t.subTests ?? []) {
          totalDuration += st.duration ?? 0
          for (const q of st.questions ?? []) {
            questionTypes.add(q.questionType)
            totalQuestions++
          }
        }
        return {
          id: t.id,
          name: t.name,
          description: t.description ?? '',
          questionTypes: Array.from(questionTypes),
          totalDuration,
          totalQuestions,
          session: t.session
            ? {
                id: t.session.id,
                status: t.session.status,
                startedAt: t.session.startedAt,
                completedAt: t.session.completedAt,
              }
            : null,
        }
      })

      return {
        id: item.packageType?.id ?? item.id,
        name: item.packageType?.name ?? '',
        description: item.packageType?.description ?? '',
        price: item.packageType?.price ?? 0,
        childPackageName: item.packageType?.childPackage?.name ?? '',
        packageName: item.packageType?.childPackage?.package?.name ?? '',
        purchasedAt: item.purchasedAt,
        reviewNotes: item.reviewNotes ?? null,
        reviewedAt: item.reviewedAt ?? null,
        reviewedBy: item.reviewedBy ?? null,
        tests,
      }
    })
  },
}
