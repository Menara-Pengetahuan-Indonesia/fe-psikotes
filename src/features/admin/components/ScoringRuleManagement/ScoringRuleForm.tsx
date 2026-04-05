'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
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
import type { ScoringRule } from '../../types'
import { Calculator } from 'lucide-react'

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
    formState: {},
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
          dto: { minScore: data.minScore, maxScore: data.maxScore, resultType: data.resultType }
        },
        { onSuccess: () => onOpenChange(false) }
      )
    } else {
      createRule.mutate(
        { ...data, testId },
        { onSuccess: () => onOpenChange(false) }
      )
    }
  }

  const isPending = createRule.isPending || updateRule.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-9 rounded-xl bg-teal-500 text-white flex items-center justify-center">
              <Calculator className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-slate-900">
                {isEditing ? 'Edit Aturan' : 'Aturan Baru'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 font-medium">
                Interpretasi hasil berdasarkan skor.
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Indikator</label>
              <Select value={selectedIndicatorId} onValueChange={(v) => setValue('indicatorId', v)} disabled={isEditing}>
                <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm px-4">
                  <SelectValue placeholder="Pilih indikator..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg border-slate-100">
                  {indicators?.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id} className="rounded-lg font-bold text-sm">{ind.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Min Skor</label>
                <Input
                  type="number"
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 font-black text-sm"
                  {...register('minScore', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Skor</label>
                <Input
                  type="number"
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 font-black text-sm"
                  {...register('maxScore', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interpretasi Hasil</label>
              <Input
                placeholder="Misal: Sangat Baik, Baik, Cukup..."
                className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm px-4 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                {...register('resultType')}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              disabled={isPending}
              className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
            >
              {isPending ? <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isEditing ? 'Simpan' : 'Tambah'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
