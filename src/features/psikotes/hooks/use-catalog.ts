'use client'

import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catalogService } from '../services/catalog.service'

export const catalogKeys = {
  packages: ['catalog', 'packages'] as const,
  childPackages: (packageId: string) => ['catalog', 'child-packages', packageId] as const,
  packageTypes: (childPackageId: string) => ['catalog', 'package-types', childPackageId] as const,
  myPackages: ['catalog', 'my-packages'] as const,
}

export function useCatalogPackages() {
  return useQuery({
    queryKey: catalogKeys.packages,
    queryFn: catalogService.getPackages,
  })
}

export function useCatalogChildPackages(packageId: string) {
  return useQuery({
    queryKey: catalogKeys.childPackages(packageId),
    queryFn: () => catalogService.getChildPackages(packageId),
    enabled: !!packageId,
  })
}

export function useAllChildPackages(packageIds: string[]) {
  return useQueries({
    queries: packageIds.map((id) => ({
      queryKey: catalogKeys.childPackages(id),
      queryFn: () => catalogService.getChildPackages(id),
      enabled: !!id,
    })),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const data = results.flatMap((r, i) =>
        (r.data ?? []).map((child) => ({ ...child, packageId: packageIds[i] }))
      )
      return { data, isLoading }
    },
  })
}

export function useCatalogPackageTypes(childPackageId: string) {
  return useQuery({
    queryKey: catalogKeys.packageTypes(childPackageId),
    queryFn: () => catalogService.getPackageTypes(childPackageId),
    enabled: !!childPackageId,
  })
}

export function useAllPackageTypes(childPackageIds: string[]) {
  return useQueries({
    queries: childPackageIds.map((id) => ({
      queryKey: catalogKeys.packageTypes(id),
      queryFn: () => catalogService.getPackageTypes(id),
      enabled: !!id,
    })),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const priceMap = new Map<string, number>()
      results.forEach((r, i) => {
        const types = r.data ?? []
        if (types.length > 0) {
          const lowest = Math.min(...types.map((t) => t.price))
          priceMap.set(childPackageIds[i], lowest)
        }
      })
      return { priceMap, isLoading }
    },
  })
}

export function usePurchasePackageType() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (packageTypeId: string) => catalogService.purchasePackageType(packageTypeId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: catalogKeys.myPackages })
      toast.success('Paket berhasil dibeli!')
      router.push('/pengguna/paket-saya')
    },
    onError: (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status
      if (status === 409) {
        toast.info('Kamu sudah memiliki paket ini')
        router.push('/pengguna/paket-saya')
      } else if (status === 401) {
        const currentPath = window.location.pathname
        router.push(`/masuk?redirect=${encodeURIComponent(currentPath)}`)
      } else {
        toast.error('Gagal membeli paket. Coba lagi.')
      }
    },
  })
}

export function useMyPackages() {
  return useQuery({
    queryKey: catalogKeys.myPackages,
    queryFn: catalogService.getMyPackages,
  })
}

export function useCatalogChildPackageById(childPackageId: string) {
  const { data: packages, isLoading: packagesLoading } = useCatalogPackages()
  const packageIds = packages?.map((p) => p.id) ?? []
  const { data: allChildren, isLoading: childrenLoading } = useAllChildPackages(packageIds)

  const result = (() => {
    if (!allChildren.length) return null
    const child = allChildren.find((c) => c.id === childPackageId)
    if (!child) return null
    const parent = packages?.find((p) => p.id === child.packageId)
    return { child, parentName: parent?.name ?? '', parentId: parent?.id ?? '' }
  })()

  return { data: result, isLoading: packagesLoading || childrenLoading }
}
