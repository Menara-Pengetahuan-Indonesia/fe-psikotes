import { z } from 'zod'

export const createOptionSchema = z.object({
  text: z
    .string()
    .min(1, 'Teks opsi wajib diisi')
    .max(500, 'Teks opsi terlalu panjang'),
  order: z
    .number()
    .min(0, 'Urutan tidak boleh negatif'),
})

export const updateOptionSchema = createOptionSchema.partial()

export type CreateOptionFormData = z.infer<typeof createOptionSchema>
export type UpdateOptionFormData = z.infer<typeof updateOptionSchema>
