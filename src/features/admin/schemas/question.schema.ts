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
  sectionId: z.string().optional().or(z.literal('')),
  order: z
    .number({ message: 'Urutan harus berupa angka' })
    .min(0, 'Urutan tidak boleh negatif'),
  imageUrl: z.string().optional().nullable(),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>
