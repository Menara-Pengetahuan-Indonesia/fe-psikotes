'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  testService,
  indicatorService,
  sectionService,
  questionService,
  optionService,
  indicatorMappingService,
  scoringRuleService,
  uploadService,
} from '../services'
import type {
  CreateTestDto,
  UpdateTestDto,
  CreateIndicatorDto,
  UpdateIndicatorDto,
  CreateSectionDto,
  UpdateSectionDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto,
  CreateOptionIndicatorMappingDto,
  CreateScoringRuleDto,
  UpdateScoringRuleDto,
} from '../types'

// ============================================================
// QUERY KEY FACTORY
// ============================================================

export const adminKeys = {
  all: ['admin'] as const,
  tests: () => [...adminKeys.all, 'tests'] as const,
  test: (id: string) => [...adminKeys.tests(), id] as const,
  indicators: (testId: string) =>
    [...adminKeys.all, 'indicators', testId] as const,
  sections: (testId: string) =>
    [...adminKeys.all, 'sections', testId] as const,
  questions: (testId: string) =>
    [...adminKeys.all, 'questions', testId] as const,
  scoringRules: (testId: string) =>
    [...adminKeys.all, 'scoring-rules', testId] as const,
}

// ============================================================
// TEST HOOKS
// ============================================================

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

// ============================================================
// INDICATOR HOOKS
// ============================================================

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

// ============================================================
// SECTION HOOKS
// ============================================================

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

// ============================================================
// QUESTION HOOKS
// ============================================================

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

// ============================================================
// OPTION HOOKS
// ============================================================

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

// ============================================================
// INDICATOR MAPPING HOOKS
// ============================================================

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

// ============================================================
// UPLOAD HOOKS
// ============================================================

export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => uploadService.uploadImage(file),
    onSuccess: () => {
      toast.success('Gambar berhasil diunggah')
    },
    onError: () => {
      toast.error('Gagal mengunggah gambar')
    },
  })
}

// ============================================================
// SCORING RULE HOOKS
// ============================================================

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
