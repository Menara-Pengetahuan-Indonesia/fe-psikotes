'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Package, ApiResponse } from '@/features/admin/types'

export function usePublicPackages() {
  return useQuery({
    queryKey: ['public', 'packages'],
    queryFn: async (): Promise<Package[]> => {
      const { data } = await api.get<ApiResponse<Package[]>>('/admin/packages')
      return data.data
    },
  })
}

export function usePublicPackage(id: string) {
  return useQuery({
    queryKey: ['public', 'packages', id],
    queryFn: async (): Promise<Package> => {
      const { data } = await api.get<ApiResponse<Package>>(`/admin/packages/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}
