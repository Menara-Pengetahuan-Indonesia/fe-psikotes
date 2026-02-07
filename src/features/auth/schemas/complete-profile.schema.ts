import { z } from 'zod'

export const completeProfileSchema = z.object({
  age: z
    .number({ error: 'Umur wajib diisi' })
    .min(10, 'Umur minimal 10 tahun')
    .max(100, 'Umur maksimal 100 tahun'),
  gender: z.enum(['male', 'female'], {
    error: 'Jenis kelamin wajib dipilih',
  }),
  address: z
    .string()
    .min(5, 'Alamat minimal 5 karakter'),
})

export type CompleteProfileFormData = z.infer<
  typeof completeProfileSchema
>
