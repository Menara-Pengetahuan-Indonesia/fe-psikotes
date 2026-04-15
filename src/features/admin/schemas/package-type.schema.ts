import { z } from 'zod'

export const createPackageTypeSchema = z.object({
  childPackageId: z.string().min(1),
  name: z.string().min(1, 'Nama tipe paket wajib diisi'),
  description: z.string().optional(),
  price: z.number().min(0),
  testTool: z.string().optional(),
  isActive: z.boolean().optional(),
})

export const updatePackageTypeSchema = createPackageTypeSchema.partial()

export type CreatePackageTypeFormData = z.infer<typeof createPackageTypeSchema>
export type UpdatePackageTypeFormData = z.infer<typeof updatePackageTypeSchema>
