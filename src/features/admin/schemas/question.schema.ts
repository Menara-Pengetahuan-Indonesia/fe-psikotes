import { z } from 'zod'

export const questionOptionSchema = z.object({
  optionText: z.string().min(1, 'Teks opsi wajib diisi'),
  imageUrl: z.string().optional(),
  isCorrect: z.boolean(),
  points: z.number().int(),
  order: z.number().int(),
})

export const createQuestionSchema = z.object({
  subTestId: z.string().min(1),
  questionType: z.enum(['MULTIPLE_CHOICE', 'CHECKBOX', 'SCALE_RATING', 'ESSAY']),
  questionText: z.string().min(1, 'Teks soal wajib diisi'),
  imageUrl: z.string().optional(),
  order: z.number().int().min(0),
  points: z.number().int().min(0).optional(),
  options: z.array(questionOptionSchema).optional(),
  correctAnswer: z.object({
    correctEssayKeywords: z.array(z.string()).optional(),
    minScaleValue: z.number().optional(),
    maxScaleValue: z.number().optional(),
    scaleWeights: z.record(z.string(), z.number()).optional(),
  }).optional(),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>
