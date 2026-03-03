'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { testService } from '../services'
import type { CreateTestDto, UpdateTestDto } from '../types'
import { adminKeys } from './query-keys'

export function useTests() {
  return useQuery({
    queryKey: adminKeys.tests(),
    queryFn: () => testService.getAll(),
  })
}

export function useTest(id: string) {
  return useQuery({
    queryKey: adminKeys.test(id),
    queryFn: () => testService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateTestDto) => testService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.tests() })
      toast.success('Tes berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat tes')
    },
  })
}

export function useUpdateTest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTestDto }) =>
      testService.update(id, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.tests() })
      queryClient.invalidateQueries({ queryKey: adminKeys.test(data.id) })
      toast.success('Tes berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui tes')
    },
  })
}

export function useDeleteTest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => testService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.tests() })
      toast.success('Tes berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus tes')
    },
  })
}

export function usePublishTest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => testService.publish(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.tests() })
      queryClient.invalidateQueries({ queryKey: adminKeys.test(data.id) })
      toast.success('Tes berhasil dipublikasikan')
    },
    onError: () => {
      toast.error('Gagal mempublikasikan tes')
    },
  })
}

export function useUnpublishTest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => testService.unpublish(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.tests() })
      queryClient.invalidateQueries({ queryKey: adminKeys.test(data.id) })
      toast.success('Tes berhasil dibatalkan publikasinya')
    },
    onError: () => {
      toast.error('Gagal membatalkan publikasi tes')
    },
  })
}
