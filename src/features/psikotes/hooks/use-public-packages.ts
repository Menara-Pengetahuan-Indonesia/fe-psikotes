'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '@/lib/env'
import type { Package, ApiResponse } from '@/features/admin/types'

const publicApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export function usePublicPackages() {
  return useQuery({
    queryKey: ['public', 'packages'],
    queryFn: async (): Promise<Package[]> => {
      try {
        const { data } = await publicApi.get<ApiResponse<Package[]>>('/admin/packages')
        return data.data
      } catch {
        return []
      }
    },
  })
}

export function usePublicPackage(id: string) {
  return useQuery({
    queryKey: ['public', 'packages', id],
    queryFn: async (): Promise<Package | null> => {
      try {
        const { data } = await publicApi.get<ApiResponse<Package>>(`/admin/packages/${id}`)
        return data.data
      } catch {
        return null
      }
    },
    enabled: !!id,
  })
}
