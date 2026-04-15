import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { packageTypeService } from '../services'
import { adminKeys } from './query-keys'
import type { CreatePackageTypeDto, UpdatePackageTypeDto } from '../types'

export function usePackageTypes() {
  return useQuery({
    queryKey: adminKeys.packageTypes.all,
    queryFn: packageTypeService.getAll,
  })
}

export function usePackageType(id: string) {
  return useQuery({
    queryKey: adminKeys.packageTypes.detail(id),
    queryFn: () => packageTypeService.getById(id),
    enabled: !!id,
  })
}

export function useCreatePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePackageTypeDto) => packageTypeService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat tipe paket'),
  })
}

export function useUpdatePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePackageTypeDto }) =>
      packageTypeService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui tipe paket'),
  })
}

export function useDeletePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageTypeService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus tipe paket'),
  })
}
