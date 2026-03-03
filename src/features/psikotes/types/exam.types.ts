// Generic exam interface types
export interface TestConfig {
  test: {
    id: string
    name: string
    description?: string
    duration: number
  }
  indicators: Indicator[]
  sections: Section[]
  questions: ExamQuestion[]
  features: {
    hasCamera: boolean
    hasSidebar: boolean
    hasActivityLog: boolean
    hasTimer: boolean
  }
}

export interface Indicator {
  id: string
  name: string
  description?: string
  order: number
}

export interface Section {
  id: string
  name: string
  description?: string
  order: number
  questions: ExamQuestion[]
}

export interface ExamQuestion {
  id: string
  text: string
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
  sectionId?: string
  order: number
  options: QuestionOption[]
}

export interface QuestionOption {
  id: string
  text: string
  order: number
}

export interface TestResult {
  testResult: {
    id: string
    testId: string
    userId: string
    completedAt: string
  }
  indicatorScores: Record<string, number>
  resultTypes: Record<string, string>
}

export interface ExamState {
  currentQuestionIndex: number
  answers: Record<string, string> // questionId: optionId
  timeLeft: number
  isFinished: boolean
}

export interface ActivityLogEntry {
  timestamp: Date
  action: string
  questionIndex: number
  details?: string
}
