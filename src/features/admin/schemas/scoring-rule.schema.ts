import { z } from 'zod'

export const createScoringRuleSchema = z.object({
  indicatorId: z
    .string()
    .min(1, 'Indikator wajib dipilih'),
  minScore: z
    .number()
    .min(-1000, 'Skor minimum tidak valid'),
  maxScore: z
    .number()
    .min(-1000, 'Skor maksimum tidak valid'),
  resultType: z
    .string()
    .min(1, 'Tipe hasil wajib diisi')
    .max(255, 'Tipe hasil terlalu panjang'),
})

export const updateScoringRuleSchema = createScoringRuleSchema.partial()

export type CreateScoringRuleFormData = z.infer<typeof createScoringRuleSchema>
export type UpdateScoringRuleFormData = z.infer<typeof updateScoringRuleSchema>
