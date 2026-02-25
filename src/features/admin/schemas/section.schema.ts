import { z } from 'zod'

export const createSectionSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama seksi wajib diisi')
    .max(255, 'Nama seksi terlalu panjang'),
  description: z
    .string()
    .max(1000, 'Deskripsi terlalu panjang')
    .optional(),
  order: z
    .number()
    .min(0, 'Urutan tidak boleh negatif'),
})

export const updateSectionSchema = createSectionSchema.partial()

export type CreateSectionFormData = z.infer<typeof createSectionSchema>
export type UpdateSectionFormData = z.infer<typeof updateSectionSchema>
