'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { indicatorService } from '../services'
import type { CreateIndicatorDto, UpdateIndicatorDto } from '../types'
import { adminKeys } from './query-keys'

export function useIndicators(testId: string) {
  return useQuery({
    queryKey: adminKeys.indicators(testId),
    queryFn: () => indicatorService.getAll(testId),
    enabled: !!testId,
  })
}

export function useCreateIndicator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateIndicatorDto) => indicatorService.create(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.indicators(data.testId),
      })
      toast.success('Indikator berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat indikator')
    },
  })
}

export function useUpdateIndicator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      indicatorId,
      dto,
    }: {
      testId: string
      indicatorId: string
      dto: UpdateIndicatorDto
    }) => indicatorService.update(testId, indicatorId, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.indicators(data.testId),
      })
      toast.success('Indikator berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui indikator')
    },
  })
}

export function useDeleteIndicator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ testId, indicatorId }: { testId: string; indicatorId: string }) =>
      indicatorService.delete(testId, indicatorId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.indicators(testId),
      })
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Indikator berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus indikator')
    },
  })
}
