import { z } from 'zod'

export const createTestSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama tes wajib diisi')
    .max(255, 'Nama tes terlalu panjang'),
  description: z
    .string()
    .max(1000, 'Deskripsi terlalu panjang')
    .optional(),
  duration: z
    .number()
    .min(1, 'Durasi minimal 1 menit')
    .max(480, 'Durasi maksimal 480 menit'),
})

export const updateTestSchema = createTestSchema.partial()

export type CreateTestFormData = z.infer<typeof createTestSchema>
export type UpdateTestFormData = z.infer<typeof updateTestSchema>
