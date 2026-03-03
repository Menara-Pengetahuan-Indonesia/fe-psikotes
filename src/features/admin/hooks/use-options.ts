'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { optionService } from '../services'
import type { CreateQuestionOptionDto, UpdateQuestionOptionDto } from '../types'
import { adminKeys } from './query-keys'

export function useCreateOption() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      questionId,
      dto,
    }: {
      testId: string
      questionId: string
      dto: CreateQuestionOptionDto
    }) => optionService.create(testId, questionId, dto),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Opsi berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat opsi')
    },
  })
}

export function useUpdateOption() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      optionId,
      dto,
    }: {
      testId: string
      optionId: string
      dto: UpdateQuestionOptionDto
    }) => optionService.update(testId, optionId, dto),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Opsi berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui opsi')
    },
  })
}

export function useDeleteOption() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      optionId,
    }: {
      testId: string
      optionId: string
    }) => optionService.delete(testId, optionId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Opsi berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus opsi')
    },
  })
}
