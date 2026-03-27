'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { packageService } from '../services'
import type { CreatePackageDto, UpdatePackageDto, AddTestToPackageDto } from '../types'
import { adminKeys } from './query-keys'

export function usePackages() {
  return useQuery({
    queryKey: adminKeys.packages(),
    queryFn: () => packageService.getAll(),
  })
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: adminKeys.package(id),
    queryFn: () => packageService.getById(id),
    enabled: !!id,
  })
}

export function useCreatePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePackageDto) => packageService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat paket'),
  })
}

export function useUpdatePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePackageDto }) => packageService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui paket'),
  })
}

export function useDeletePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus paket'),
  })
}

export function usePublishPackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageService.publish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Paket dipublikasikan')
    },
    onError: () => toast.error('Gagal mempublikasikan paket'),
  })
}

export function useUnpublishPackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageService.unpublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Paket di-unpublish')
    },
    onError: () => toast.error('Gagal meng-unpublish paket'),
  })
}

export function useAddTestToPackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ packageId, dto }: { packageId: string; dto: AddTestToPackageDto }) => packageService.addTest(packageId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Tes ditambahkan ke paket')
    },
    onError: () => toast.error('Gagal menambahkan tes'),
  })
}

export function useRemoveTestFromPackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ packageId, testId }: { packageId: string; testId: string }) => packageService.removeTest(packageId, testId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.packages() })
      toast.success('Tes dihapus dari paket')
    },
    onError: () => toast.error('Gagal menghapus tes dari paket'),
  })
}
