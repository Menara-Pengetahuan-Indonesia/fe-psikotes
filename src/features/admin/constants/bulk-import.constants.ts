import type { QuestionType } from '../types'

export const VALID_QUESTION_TYPES: readonly QuestionType[] = [
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
] as const
