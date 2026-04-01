import { z } from 'zod'

const questionTypeEnum = z.enum([
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
])

const displayStyleEnum = z.enum([
  'UPPERCASE',
  'LOWERCASE',
  'NUMBER',
  'RADIO',
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
  displayStyle: displayStyleEnum.optional().nullable(),
  optionImageEnabled: z.boolean().optional().default(false),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>
