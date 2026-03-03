import { z } from 'zod'

export const createTestSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama tes wajib diisi')
    .max(255, 'Nama tes terlalu panjang'),
  description: z
    .string()
    .max(1000, 'Deskripsi terlalu panjang')
    .optional()
    .or(z.literal('')),
  duration: z
    .number({ message: 'Durasi harus berupa angka' })
    .min(1, 'Durasi minimal 1 menit')
    .max(480, 'Durasi maksimal 480 menit'),
  timePerQuestion: z
    .number({ message: 'Waktu per soal harus berupa angka' })
    .min(1, 'Minimal 1 detik')
    .max(3600, 'Maksimal 3600 detik')
    .optional()
    .nullable(),
  shuffleQuestions: z.boolean().optional(),
  shuffleOptions: z.boolean().optional(),
})

export const updateTestSchema = createTestSchema.partial()

export type CreateTestFormData = z.infer<typeof createTestSchema>
export type UpdateTestFormData = z.infer<typeof updateTestSchema>
