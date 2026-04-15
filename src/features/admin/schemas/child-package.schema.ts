import { z } from 'zod'

export const createChildPackageSchema = z.object({
  packageId: z.string().min(1),
  name: z.string().min(1, 'Nama sub-paket wajib diisi'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
})

export const updateChildPackageSchema = createChildPackageSchema.partial()

export type CreateChildPackageFormData = z.infer<typeof createChildPackageSchema>
export type UpdateChildPackageFormData = z.infer<typeof updateChildPackageSchema>
