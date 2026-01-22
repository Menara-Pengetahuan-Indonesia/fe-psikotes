export interface Test {
  id: string
  title: string
  description: string
  duration: number // in minutes
  questionCount: number
  category: TestCategory
  status: 'draft' | 'published' | 'archived'
}

export type TestCategory = 'intelligence' | 'personality' | 'aptitude' | 'interest'

export interface Question {
  id: string
  testId: string
  text: string
  type: 'multiple_choice' | 'essay' | 'scale'
  options?: QuestionOption[]
  order: number
}

export interface QuestionOption {
  id: string
  text: string
  value: number
}

export interface TestSession {
  id: string
  testId: string
  userId: string
  startedAt: string
  completedAt?: string
  answers: Answer[]
  status: 'in_progress' | 'completed' | 'expired'
}

export interface Answer {
  questionId: string
  value: string | number
}

export interface TestResult {
  id: string
  sessionId: string
  userId: string
  testId: string
  score: number
  interpretation: string
  completedAt: string
}
