import { z } from 'zod'

const questionTypeEnum = z.enum([
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
])

export const createQuestionSchema = z.object({
  text: z
    .string()
    .min(1, 'Teks pertanyaan wajib diisi')
    .max(2000, 'Teks pertanyaan terlalu panjang'),
  type: questionTypeEnum,
  sectionId: z.string().optional(),
  order: z
    .number()
    .min(0, 'Urutan tidak boleh negatif'),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>
