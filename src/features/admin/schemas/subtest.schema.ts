import { z } from 'zod'

export const createSubTestSchema = z.object({
  testId: z.string().min(1),
  name: z.string().min(1, 'Nama sub-tes wajib diisi'),
  description: z.string().optional(),
  duration: z.number().int().positive().optional(),
  order: z.number().int().min(0),
  isActive: z.boolean(),
})

export const updateSubTestSchema = createSubTestSchema.partial()

export type CreateSubTestFormData = z.infer<typeof createSubTestSchema>
export type UpdateSubTestFormData = z.infer<typeof updateSubTestSchema>
