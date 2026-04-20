'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '@/lib/env'
import { useAuthStore } from '@/store/auth.store'
import type { Package, ApiResponse } from '@/features/admin/types'

function getPublicApi() {
  const instance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
  })
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
  return instance
}

export function usePublicPackages() {
  return useQuery({
    queryKey: ['public', 'packages'],
    queryFn: async (): Promise<Package[]> => {
      try {
        const api = getPublicApi()
        const { data } = await api.get<ApiResponse<Package[]>>('/admin/packages')
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
        const api = getPublicApi()
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
      if (child) return { child, parentName: pkg.name }
    }
    return null
  })()

  return { data: result, isLoading }
}
