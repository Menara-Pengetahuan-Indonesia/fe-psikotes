'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { scoringRuleService } from '../services'
import type { CreateScoringRuleDto, UpdateScoringRuleDto } from '../types'
import { adminKeys } from './query-keys'

export function useScoringRules(testId: string) {
  return useQuery({
    queryKey: adminKeys.scoringRules(testId),
    queryFn: () => scoringRuleService.getAll(testId),
    enabled: !!testId,
  })
}

export function useCreateScoringRule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateScoringRuleDto) => scoringRuleService.create(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.scoringRules(data.testId),
      })
      toast.success('Aturan skor berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat aturan skor')
    },
  })
}

export function useUpdateScoringRule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      ruleId,
      dto,
    }: {
      testId: string
      ruleId: string
      dto: UpdateScoringRuleDto
    }) => scoringRuleService.update(testId, ruleId, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.scoringRules(data.testId),
      })
      toast.success('Aturan skor berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui aturan skor')
    },
  })
}

export function useDeleteScoringRule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ testId, ruleId }: { testId: string; ruleId: string }) =>
      scoringRuleService.delete(testId, ruleId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.scoringRules(testId),
      })
      toast.success('Aturan skor berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus aturan skor')
    },
  })
}
