import { z } from 'zod'

export const createTestSchema = z.object({
  packageTypeId: z.string().min(1),
  name: z.string().min(1, 'Nama tes wajib diisi'),
  description: z.string().optional(),
  scoringType: z.enum(['IMMEDIATE', 'END_OF_TEST']),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

export const updateTestSchema = createTestSchema.partial()

export type CreateTestFormData = z.infer<typeof createTestSchema>
export type UpdateTestFormData = z.infer<typeof updateTestSchema>
