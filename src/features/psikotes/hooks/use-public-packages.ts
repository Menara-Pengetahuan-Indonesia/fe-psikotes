'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/store/auth.store'
import type { Package, ApiResponse } from '@/features/admin/types'

export function usePublicPackages() {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery({
    queryKey: ['public', 'packages', accessToken ?? ''],
    queryFn: async (): Promise<Package[]> => {
      try {
        const { data } = await api.get<ApiResponse<Package[]>>('/admin/packages')
        return data.data
      } catch {
        return []
      }
    },
  })
}

export function usePublicPackage(id: string) {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery({
    queryKey: ['public', 'packages', id, accessToken ?? ''],
    queryFn: async (): Promise<Package | null> => {
      try {
        const { data } = await api.get<ApiResponse<Package>>(`/admin/packages/${id}`)
        return data.data
      } catch {
        return null
      }
    },
    enabled: !!id,
  })
}

export function usePublicChildPackage(childId: string) {
  const { data: packages, isLoading } = usePublicPackages()

  const result = (() => {
    if (!packages) return null
    for (const pkg of packages) {
      const child = pkg.childPackages?.find(c => c.id === childId)
      if (child) return { child, parentName: pkg.name, parentId: pkg.id }
    }
    return null
  })()

  return { data: result, isLoading }
}
