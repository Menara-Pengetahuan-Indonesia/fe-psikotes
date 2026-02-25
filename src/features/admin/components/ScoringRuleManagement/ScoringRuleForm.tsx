'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCreateScoringRule,
  useIndicators,
} from '../../hooks'
import { createScoringRuleSchema, type CreateScoringRuleFormData } from '../../schemas'
import { FormField } from '../Common/FormField'

interface ScoringRuleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
}

export function ScoringRuleForm({
  open,
  onOpenChange,
  testId,
}: ScoringRuleFormProps) {
  const createRule = useCreateScoringRule()
  const { data: indicators } = useIndicators(testId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateScoringRuleFormData>({
    resolver: zodResolver(createScoringRuleSchema),
  })

  const onSubmit = async (data: CreateScoringRuleFormData) => {
    createRule.mutate(
      { ...data, testId },
      {
        onSuccess: () => {
          reset()
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Aturan Skor</DialogTitle>
          <DialogDescription>
            Isi informasi aturan skor untuk indikator
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Indikator" error={errors.indicatorId} required>
            <Select onValueChange={(value) => setValue('indicatorId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih indikator..." />
              </SelectTrigger>
              <SelectContent>
                {indicators?.map((indicator) => (
                  <SelectItem key={indicator.id} value={indicator.id}>
                    {indicator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Skor Minimum" error={errors.minScore} required>
            <Input
              type="number"
              placeholder="0"
              {...register('minScore', { valueAsNumber: true })}
            />
          </FormField>

          <FormField label="Skor Maksimum" error={errors.maxScore} required>
            <Input
              type="number"
              placeholder="10"
              {...register('maxScore', { valueAsNumber: true })}
            />
          </FormField>

          <FormField label="Tipe Hasil" error={errors.resultType} required>
            <Input
              placeholder="Contoh: High Extrovert"
              {...register('resultType')}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createRule.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createRule.isPending}>
              {createRule.isPending ? 'Menambah...' : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
