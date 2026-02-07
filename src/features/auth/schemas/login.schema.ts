import { z } from 'zod'

const PHONE_REGEX = /^(\+62|62|08)\d{8,13}$/

export const loginSchema = z.object({
  method: z.enum(['email', 'phone']),
  identifier: z.string().min(1, 'Field ini wajib diisi'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password terlalu panjang'),
}).superRefine((data, ctx) => {
  if (data.method === 'email') {
    const result = z.string().email('Format email tidak valid')
      .safeParse(data.identifier)
    if (!result.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Format email tidak valid',
        path: ['identifier'],
      })
    }
  } else {
    if (!PHONE_REGEX.test(data.identifier)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Format nomor HP tidak valid',
        path: ['identifier'],
      })
    }
  }
})

export type LoginFormData = z.infer<typeof loginSchema>
