import type { QuestionType } from '../types'

export const VALID_QUESTION_TYPES: readonly QuestionType[] = [
  'MULTIPLE_CHOICE',
  'CHECKBOX',
  'SCALE_RATING',
  'ESSAY',
] as const
