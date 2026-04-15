import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { packageService } from '../services'
import { adminKeys } from './query-keys'
import type { CreatePackageDto, UpdatePackageDto } from '../types'

export function usePackages() {
  return useQuery({
    queryKey: adminKeys.packages.all,
    queryFn: packageService.getAll,
  })
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: adminKeys.packages.detail(id),
    queryFn: () => packageService.getById(id),
    enabled: !!id,
  })
}

export function useCreatePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePackageDto) => packageService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat paket'),
  })
}

export function useUpdatePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePackageDto }) =>
      packageService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui paket'),
  })
}

export function useDeletePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus paket'),
  })
}
