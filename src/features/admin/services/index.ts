import { api } from '@/lib/axios'
import type {
  Test,
  Indicator,
  Section,
  Question,
  QuestionOption,
  OptionIndicatorMapping,
  ScoringRule,
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

const BASE_PATH = '/admin/tests'

// ============================================================
// TEST SERVICE
// ============================================================

export const testService = {
  getAll: async (): Promise<Test[]> => {
    const { data } = await api.get<Test[]>(BASE_PATH)
    return data
  },

  getById: async (id: string): Promise<Test> => {
    const { data } = await api.get<Test>(`${BASE_PATH}/${id}`)
    return data
  },

  create: async (dto: CreateTestDto): Promise<Test> => {
    const { data } = await api.post<Test>(BASE_PATH, dto)
    return data
  },

  update: async (id: string, dto: UpdateTestDto): Promise<Test> => {
    const { data } = await api.patch<Test>(`${BASE_PATH}/${id}`, dto)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${id}`)
  },

  publish: async (id: string): Promise<Test> => {
    const { data } = await api.post<Test>(`${BASE_PATH}/${id}/publish`)
    return data
  },

  unpublish: async (id: string): Promise<Test> => {
    const { data } = await api.post<Test>(`${BASE_PATH}/${id}/unpublish`)
    return data
  },
}

// ============================================================
// INDICATOR SERVICE
// ============================================================

export const indicatorService = {
  getAll: async (testId: string): Promise<Indicator[]> => {
    const { data } = await api.get<Indicator[]>(
      `${BASE_PATH}/${testId}/indicators`,
    )
    return data
  },

  create: async (dto: CreateIndicatorDto): Promise<Indicator> => {
    const { testId, ...body } = dto
    const { data } = await api.post<Indicator>(
      `${BASE_PATH}/${testId}/indicators`,
      body,
    )
    return data
  },

  update: async (
    testId: string,
    indicatorId: string,
    dto: UpdateIndicatorDto,
  ): Promise<Indicator> => {
    const { data } = await api.patch<Indicator>(
      `${BASE_PATH}/${testId}/indicators/${indicatorId}`,
      dto,
    )
    return data
  },

  delete: async (testId: string, indicatorId: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${testId}/indicators/${indicatorId}`)
  },
}

// ============================================================
// SECTION SERVICE
// ============================================================

export const sectionService = {
  getAll: async (testId: string): Promise<Section[]> => {
    const { data } = await api.get<Section[]>(
      `${BASE_PATH}/${testId}/sections`,
    )
    return data
  },

  create: async (dto: CreateSectionDto): Promise<Section> => {
    const { testId, ...body } = dto
    const { data } = await api.post<Section>(
      `${BASE_PATH}/${testId}/sections`,
      body,
    )
    return data
  },

  update: async (
    testId: string,
    sectionId: string,
    dto: UpdateSectionDto,
  ): Promise<Section> => {
    const { data } = await api.patch<Section>(
      `${BASE_PATH}/${testId}/sections/${sectionId}`,
      dto,
    )
    return data
  },

  delete: async (testId: string, sectionId: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${testId}/sections/${sectionId}`)
  },
}

// ============================================================
// QUESTION SERVICE
// ============================================================

export const questionService = {
  getAll: async (testId: string): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(
      `${BASE_PATH}/${testId}/questions`,
    )
    return data
  },

  create: async (dto: CreateQuestionDto): Promise<Question> => {
    const { testId, ...body } = dto
    const { data } = await api.post<Question>(
      `${BASE_PATH}/${testId}/questions`,
      body,
    )
    return data
  },

  update: async (
    testId: string,
    questionId: string,
    dto: UpdateQuestionDto,
  ): Promise<Question> => {
    const { data } = await api.patch<Question>(
      `${BASE_PATH}/${testId}/questions/${questionId}`,
      dto,
    )
    return data
  },

  delete: async (testId: string, questionId: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${testId}/questions/${questionId}`)
  },
}

// ============================================================
// QUESTION OPTION SERVICE
// ============================================================

export const optionService = {
  create: async (
    testId: string,
    questionId: string,
    dto: CreateQuestionOptionDto,
  ): Promise<QuestionOption> => {
    const { data } = await api.post<QuestionOption>(
      `${BASE_PATH}/${testId}/questions/${questionId}/options`,
      dto,
    )
    return data
  },

  update: async (
    testId: string,
    optionId: string,
    dto: UpdateQuestionOptionDto,
  ): Promise<QuestionOption> => {
    const { data } = await api.patch<QuestionOption>(
      `${BASE_PATH}/${testId}/questions/options/${optionId}`,
      dto,
    )
    return data
  },

  delete: async (
    testId: string,
    optionId: string,
  ): Promise<void> => {
    await api.delete(
      `${BASE_PATH}/${testId}/questions/options/${optionId}`,
    )
  },
}

// ============================================================
// INDICATOR MAPPING SERVICE
// ============================================================

export const indicatorMappingService = {
  create: async (
    testId: string,
    optionId: string,
    dto: CreateOptionIndicatorMappingDto,
  ): Promise<OptionIndicatorMapping> => {
    const { data } = await api.post<OptionIndicatorMapping>(
      `${BASE_PATH}/${testId}/questions/options/${optionId}/indicator-mapping`,
      dto,
    )
    return data
  },

  delete: async (
    testId: string,
    mappingId: string,
  ): Promise<void> => {
    await api.delete(
      `${BASE_PATH}/${testId}/questions/indicator-mapping/${mappingId}`,
    )
  },
}

// ============================================================
// SCORING RULE SERVICE
// ============================================================

export const scoringRuleService = {
  getAll: async (testId: string): Promise<ScoringRule[]> => {
    const { data } = await api.get<ScoringRule[]>(
      `${BASE_PATH}/${testId}/scoring-rules`,
    )
    return data
  },

  create: async (dto: CreateScoringRuleDto): Promise<ScoringRule> => {
    const { testId, ...body } = dto
    const { data } = await api.post<ScoringRule>(
      `${BASE_PATH}/${testId}/scoring-rules`,
      body,
    )
    return data
  },

  update: async (
    testId: string,
    ruleId: string,
    dto: UpdateScoringRuleDto,
  ): Promise<ScoringRule> => {
    const { data } = await api.patch<ScoringRule>(
      `${BASE_PATH}/${testId}/scoring-rules/${ruleId}`,
      dto,
    )
    return data
  },

  delete: async (testId: string, ruleId: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${testId}/scoring-rules/${ruleId}`)
  },
}

// ============================================================
// UPLOAD SERVICE
// ============================================================

export const uploadService = {
  uploadImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<{ url: string; filename: string }>(
      '/admin/upload/image',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data
  },
}
