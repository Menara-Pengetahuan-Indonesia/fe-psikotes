'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { questionService } from '../services'
import type { CreateQuestionDto, UpdateQuestionDto } from '../types'
import { adminKeys } from './query-keys'

export function useQuestions(testId: string) {
  return useQuery({
    queryKey: adminKeys.questions(testId),
    queryFn: () => questionService.getAll(testId),
    enabled: !!testId,
  })
}

export function useCreateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateQuestionDto) => questionService.create(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(data.testId),
      })
      toast.success('Pertanyaan berhasil dibuat')
    },
    onError: () => {
      toast.error('Gagal membuat pertanyaan')
    },
  })
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      testId,
      questionId,
      dto,
    }: {
      testId: string
      questionId: string
      dto: UpdateQuestionDto
    }) => questionService.update(testId, questionId, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(data.testId),
      })
      toast.success('Pertanyaan berhasil diperbarui')
    },
    onError: () => {
      toast.error('Gagal memperbarui pertanyaan')
    },
  })
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ testId, questionId }: { testId: string; questionId: string }) =>
      questionService.delete(testId, questionId),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })
      toast.success('Pertanyaan berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus pertanyaan')
    },
  })
}
