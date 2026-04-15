// ============================================================
// DOMAIN TYPES — matches backend API response shapes
// ============================================================

export type QuestionType = 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'SCALE_RATING' | 'ESSAY'
export type ScoringType = 'IMMEDIATE' | 'END_OF_TEST'

export interface Package {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  childPackages?: ChildPackage[]
}

export interface ChildPackage {
  id: string
  packageId: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  packageTypes?: PackageType[]
}

export interface PackageType {
  id: string
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Test {
  id: string
  packageTypeId: string
  name: string
  description?: string
  scoringType: ScoringType
  order: number
  isActive: boolean
  originalYear?: number | null
  precision?: number | null
  adaptationYear?: number | null
  popularity?: string | null
  createdAt: string
  updatedAt: string
  subTests?: SubTest[]
}

export interface SubTest {
  id: string
  testId: string
  name: string
  description?: string
  duration?: number | null
  order: number
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface QuestionOption {
  id?: string
  optionText: string
  imageUrl?: string | null
  isCorrect: boolean
  points: number
  order: number
}

export interface CorrectAnswer {
  correctEssayKeywords?: string[]
  minScaleValue?: number
  maxScaleValue?: number
  scaleWeights?: Record<string, number>
}

export interface Question {
  id: string
  subTestId: string
  questionType: QuestionType
  questionText: string
  imageUrl?: string | null
  order: number
  points: number
  options?: QuestionOption[]
  correctAnswer?: CorrectAnswer | null
  createdAt: string
  updatedAt: string
}

// ============================================================
// API RESPONSE WRAPPER
// ============================================================

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

// ============================================================
// CREATE / UPDATE DTOs
// ============================================================

export interface CreatePackageDto {
  name: string
  description?: string
  isActive?: boolean
  childPackages?: {
    name: string
    description?: string
    packageTypes: {
      name: string
      description?: string
      price: number
    }[]
  }[]
}

export interface UpdatePackageDto {
  name?: string
  description?: string
  isActive?: boolean
}

export interface CreateChildPackageDto {
  packageId: string
  name: string
  description?: string
  isActive?: boolean
}

export interface UpdateChildPackageDto {
  packageId?: string
  name?: string
  description?: string
  isActive?: boolean
}

export interface CreatePackageTypeDto {
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
  isActive?: boolean
}

export interface UpdatePackageTypeDto {
  childPackageId?: string
  name?: string
  description?: string
  price?: number
  testTool?: string
  isActive?: boolean
}

export interface CreateTestDto {
  packageTypeId: string
  name: string
  description?: string
  scoringType: ScoringType
  order?: number
  isActive?: boolean
  originalYear?: number
  precision?: number
  adaptationYear?: number
  popularity?: string
}

export interface UpdateTestDto {
  packageTypeId?: string
  name?: string
  description?: string
  scoringType?: ScoringType
  order?: number
  isActive?: boolean
  originalYear?: number
  precision?: number
  adaptationYear?: number
  popularity?: string
}

export interface CreateSubTestDto {
  testId: string
  name: string
  description?: string
  duration?: number
  order: number
  isActive: boolean
}

export interface UpdateSubTestDto {
  testId?: string
  name?: string
  description?: string
  duration?: number
  order?: number
  isActive?: boolean
}

export interface CreateQuestionDto {
  subTestId: string
  questionType: QuestionType
  questionText: string
  imageUrl?: string
  order: number
  points?: number
  options?: Omit<QuestionOption, 'id'>[]
  correctAnswer?: CorrectAnswer
}

export interface UpdateQuestionDto {
  subTestId?: string
  questionType?: QuestionType
  questionText?: string
  imageUrl?: string
  order?: number
  points?: number
  options?: Omit<QuestionOption, 'id'>[]
  correctAnswer?: CorrectAnswer
}

// ============================================================
// UPLOAD TYPES
// ============================================================

export interface UploadResponse {
  url: string
  filename: string
}
