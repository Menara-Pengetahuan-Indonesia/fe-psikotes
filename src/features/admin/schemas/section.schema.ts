import { z } from 'zod'

export const createSectionSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama seksi wajib diisi')
    .max(255, 'Nama seksi terlalu panjang'),
  description: z
    .string()
    .max(1000, 'Deskripsi terlalu panjang')
    .optional()
    .or(z.literal('')),
  order: z
    .number({ message: 'Urutan harus berupa angka' })
    .min(0, 'Urutan tidak boleh negatif'),
  duration: z
    .number({ message: 'Durasi harus berupa angka' })
    .min(1, 'Minimal 1 menit')
    .max(480, 'Maksimal 480 menit')
    .optional()
    .nullable(),
})

export const updateSectionSchema = createSectionSchema.partial()

export type CreateSectionFormData = z.infer<typeof createSectionSchema>
export type UpdateSectionFormData = z.infer<typeof updateSectionSchema>
