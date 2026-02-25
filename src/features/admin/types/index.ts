// ============================================================
// DOMAIN TYPES
// ============================================================

export interface Test {
  id: string
  name: string
  description?: string
  duration: number // in minutes
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Indicator {
  id: string
  testId: string
  name: string
  description?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Section {
  id: string
  testId: string
  name: string
  description?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  testId: string
  sectionId?: string
  text: string
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
  order: number
  createdAt: string
  updatedAt: string
  options?: QuestionOption[]
}

export interface QuestionOption {
  id: string
  questionId: string
  text: string
  order: number
  createdAt: string
  updatedAt: string
  mappings?: OptionIndicatorMapping[]
}

export interface OptionIndicatorMapping {
  id: string
  optionId: string
  indicatorId: string
  scoreValue: number
  createdAt: string
  updatedAt: string
}

export interface ScoringRule {
  id: string
  testId: string
  indicatorId: string
  minScore: number
  maxScore: number
  resultType: string
  createdAt: string
  updatedAt: string
}

// ============================================================
// CREATE/UPDATE DTOs
// ============================================================

export interface CreateTestDto {
  name: string
  description?: string
  duration: number
}

export interface UpdateTestDto {
  name?: string
  description?: string
  duration?: number
}

export interface CreateIndicatorDto {
  testId: string
  name: string
  description?: string
  order: number
}

export interface UpdateIndicatorDto {
  name?: string
  description?: string
  order?: number
}

export interface CreateSectionDto {
  testId: string
  name: string
  description?: string
  order: number
}

export interface UpdateSectionDto {
  name?: string
  description?: string
  order?: number
}

export interface CreateQuestionDto {
  testId: string
  sectionId?: string
  text: string
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
  order: number
}

export interface UpdateQuestionDto {
  text?: string
  type?: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
  sectionId?: string
  order?: number
}

export interface CreateQuestionOptionDto {
  questionId: string
  text: string
  order: number
}

export interface UpdateQuestionOptionDto {
  text?: string
  order?: number
}

export interface CreateOptionIndicatorMappingDto {
  optionId: string
  indicatorId: string
  scoreValue: number
}

export interface UpdateOptionIndicatorMappingDto {
  scoreValue?: number
}

export interface CreateScoringRuleDto {
  testId: string
  indicatorId: string
  minScore: number
  maxScore: number
  resultType: string
}

export interface UpdateScoringRuleDto {
  minScore?: number
  maxScore?: number
  resultType?: string
}
