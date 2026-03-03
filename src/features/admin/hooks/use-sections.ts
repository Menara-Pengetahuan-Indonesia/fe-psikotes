'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sectionService } from '../services'
import type { CreateSectionDto, UpdateSectionDto } from '../types'
import { adminKeys } from './query-keys'

export function useSections(testId: string) {
  return useQuery({
    queryKey: adminKeys.sections(testId),
    queryFn: () => sectionService.getAll(testId),
    enabled: !!testId,
  })
}

export function useCreateSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateSectionDto) => sectionService.create(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.sections(data.testId),
      })
      toast.success('Seksi berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat seksi')
    },
  })
}

export function useUpdateSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      sectionId,
      dto,
    }: {
      testId: string
      sectionId: string
      dto: UpdateSectionDto
    }) => sectionService.update(testId, sectionId, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.sections(data.testId),
      })
      toast.success('Seksi berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui seksi')
    },
  })
}

export function useDeleteSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ testId, sectionId }: { testId: string; sectionId: string }) =>
      sectionService.delete(testId, sectionId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.sections(testId),
      })
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Seksi berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus seksi')
    },
  })
}
