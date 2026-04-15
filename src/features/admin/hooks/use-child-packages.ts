import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { childPackageService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateChildPackageDto, UpdateChildPackageDto } from '../types'

export function useChildPackages() {
  return useQuery({
    queryKey: adminKeys.childPackages.all,
    queryFn: childPackageService.getAll,
  })
}

export function useChildPackage(id: string) {
  return useQuery({
    queryKey: adminKeys.childPackages.detail(id),
    queryFn: () => childPackageService.getById(id),
    enabled: !!id,
  })
}

export function useCreateChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateChildPackageDto) => childPackageService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat sub-paket'),
  })
}

export function useUpdateChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateChildPackageDto }) =>
      childPackageService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui sub-paket'),
  })
}

export function useDeleteChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => childPackageService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus sub-paket'),
  })
}
