'use client'

import { useEffect } from 'react'
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
  useUpdateScoringRule,
  useIndicators,
} from '../../hooks'
import { createScoringRuleSchema, type CreateScoringRuleFormData } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { ScoringRule } from '../../types'

interface ScoringRuleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
  initialData?: ScoringRule
}

export function ScoringRuleForm({
  open,
  onOpenChange,
  testId,
  initialData,
}: ScoringRuleFormProps) {
  const createRule = useCreateScoringRule()
  const updateRule = useUpdateScoringRule()
  const { data: indicators } = useIndicators(testId)
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateScoringRuleFormData>({
    resolver: zodResolver(createScoringRuleSchema),
    defaultValues: {
      indicatorId: initialData?.indicatorId ?? '',
      minScore: initialData?.minScore ?? 0,
      maxScore: initialData?.maxScore ?? 10,
      resultType: initialData?.resultType ?? '',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        indicatorId: initialData?.indicatorId ?? '',
        minScore: initialData?.minScore ?? 0,
        maxScore: initialData?.maxScore ?? 10,
        resultType: initialData?.resultType ?? '',
      })
    }
  }, [open, initialData, reset])

  const selectedIndicatorId = watch('indicatorId')

  const onSubmit = async (data: CreateScoringRuleFormData) => {
    if (isEditing && initialData) {
      updateRule.mutate(
        {
          testId,
          ruleId: initialData.id,
          dto: {
            minScore: data.minScore,
            maxScore: data.maxScore,
            resultType: data.resultType,
          },
        },
        {
          onSuccess: () => {
            reset()
            onOpenChange(false)
          },
        },
      )
    } else {
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
  }

  const isPending = createRule.isPending || updateRule.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Aturan Skor' : 'Tambah Aturan Skor'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Ubah informasi aturan skor'
              : 'Isi informasi aturan skor untuk indikator'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Indikator" error={errors.indicatorId} required>
            <Select
              value={selectedIndicatorId}
              onValueChange={(value) => setValue('indicatorId', value)}
              disabled={isEditing}
            >
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
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditing
                  ? 'Menyimpan...'
                  : 'Menambah...'
                : isEditing
                  ? 'Simpan'
                  : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
