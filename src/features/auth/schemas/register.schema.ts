import { z } from 'zod'

const PHONE_REGEX = /^(\+62|62|08)\d{8,13}$/

const baseSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Nama depan minimal 2 karakter')
    .max(50, 'Nama depan maksimal 50 karakter'),
  lastName: z
    .string()
    .min(2, 'Nama belakang minimal 2 karakter')
    .max(50, 'Nama belakang maksimal 50 karakter'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  telp: z
    .string()
    .min(1, 'Nomor HP wajib diisi')
    .regex(PHONE_REGEX, 'Format nomor HP tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password terlalu panjang')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(
      /[^A-Za-z0-9]/,
      'Harus mengandung karakter spesial',
    ),
  confirmPassword: z.string(),
})

export const registerSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Password tidak cocok', path: ['confirmPassword'] },
)

export type RegisterFormData = z.infer<typeof baseSchema>
