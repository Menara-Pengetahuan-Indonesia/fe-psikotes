import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { subTestService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateSubTestDto, UpdateSubTestDto } from '../types'

export function useSubTests() {
  return useQuery({
    queryKey: adminKeys.subTests.all,
    queryFn: subTestService.getAll,
  })
}

export function useSubTest(id: string) {
  return useQuery({
    queryKey: adminKeys.subTests.detail(id),
    queryFn: () => subTestService.getById(id),
    enabled: !!id,
  })
}

export function useCreateSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateSubTestDto) => subTestService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat sub-tes'),
  })
}

export function useUpdateSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSubTestDto }) =>
      subTestService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui sub-tes'),
  })
}

export function useDeleteSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => subTestService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus sub-tes'),
  })
}
