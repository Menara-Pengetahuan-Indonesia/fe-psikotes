'use client'

import { useQuery } from '@tanstack/react-query'
import { publicPackageService } from '@/features/admin/services'

export function usePublicPackageDetail(packageId: string) {
  return useQuery({
    queryKey: ['public', 'packages', packageId, 'detail'],
    queryFn: () => publicPackageService.getById(packageId),
    enabled: !!packageId,
  })
}
