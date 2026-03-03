'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { indicatorMappingService } from '../services'
import type { CreateOptionIndicatorMappingDto } from '../types'
import { adminKeys } from './query-keys'

export function useCreateIndicatorMapping() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      optionId,
      dto,
    }: {
      testId: string
      optionId: string
      dto: CreateOptionIndicatorMappingDto
    }) => indicatorMappingService.create(testId, optionId, dto),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Pemetaan indikator berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat pemetaan indikator')
    },
  })
}

export function useDeleteIndicatorMapping() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      mappingId,
    }: {
      testId: string
      mappingId: string
    }) => indicatorMappingService.delete(testId, mappingId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Pemetaan indikator berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus pemetaan indikator')
    },
  })
}
