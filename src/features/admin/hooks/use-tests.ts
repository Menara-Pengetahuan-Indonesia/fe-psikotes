import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { testService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateTestDto, UpdateTestDto } from '../types'

export function useTests() {
  return useQuery({
    queryKey: adminKeys.tests.all,
    queryFn: testService.getAll,
  })
}

export function useTest(id: string) {
  return useQuery({
    queryKey: adminKeys.tests.detail(id),
    queryFn: () => testService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTestDto) => testService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Tes berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat tes'),
  })
}

export function useUpdateTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTestDto }) =>
      testService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      toast.success('Tes berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui tes'),
  })
}

export function useDeleteTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => testService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      toast.success('Tes berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus tes'),
  })
}
