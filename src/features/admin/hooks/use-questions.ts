import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { questionService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateQuestionDto, UpdateQuestionDto } from '../types'

export function useQuestions() {
  return useQuery({
    queryKey: adminKeys.questions.all,
    queryFn: questionService.getAll,
  })
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: adminKeys.questions.detail(id),
    queryFn: () => questionService.getById(id),
    enabled: !!id,
  })
}

export function useCreateQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateQuestionDto) => questionService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat soal'),
  })
}

export function useUpdateQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateQuestionDto }) =>
      questionService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui soal'),
  })
}

export function useDeleteQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => questionService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus soal'),
  })
}
