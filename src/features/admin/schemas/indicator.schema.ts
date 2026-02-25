import { z } from 'zod'

export const createIndicatorSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama indikator wajib diisi')
    .max(255, 'Nama indikator terlalu panjang'),
  description: z
    .string()
    .max(1000, 'Deskripsi terlalu panjang')
    .optional(),
  order: z
    .number()
    .min(0, 'Urutan tidak boleh negatif'),
})

export const updateIndicatorSchema = createIndicatorSchema.partial()

export type CreateIndicatorFormData = z.infer<typeof createIndicatorSchema>
export type UpdateIndicatorFormData = z.infer<typeof updateIndicatorSchema>
