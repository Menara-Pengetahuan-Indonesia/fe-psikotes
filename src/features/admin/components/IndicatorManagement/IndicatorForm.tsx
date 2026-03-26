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
import { Textarea } from '@/components/ui/textarea'
import { useCreateIndicator, useUpdateIndicator } from '../../hooks'
import { createIndicatorSchema, type CreateIndicatorFormData } from '../../schemas'
import type { Indicator } from '../../types'
import { Target, AlertCircle } from 'lucide-react'

interface IndicatorFormProps {
  testId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Indicator
}

export function IndicatorForm({
  testId,
  open,
  onOpenChange,
  initialData,
}: IndicatorFormProps) {
  const createIndicator = useCreateIndicator()
  const updateIndicator = useUpdateIndicator()
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateIndicatorFormData>({
    resolver: zodResolver(createIndicatorSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      order: initialData?.order ?? 0,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        order: initialData?.order ?? 0,
      })
    }
  }, [open, initialData, reset])

  const onSubmit = (data: CreateIndicatorFormData) => {
    if (isEditing && initialData) {
      updateIndicator.mutate(
        { testId, indicatorId: initialData.id, dto: data },
        { onSuccess: () => { reset(); onOpenChange(false) } },
      )
    } else {
      createIndicator.mutate(
        { ...data, testId },
        { onSuccess: () => { reset(); onOpenChange(false) } },
      )
    }
  }

  const isPending = createIndicator.isPending || updateIndicator.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
              <Target className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-slate-900">
                {isEditing ? 'Edit Indikator' : 'Indikator Baru'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 font-medium">
                Isi parameter penilaian di bawah ini.
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama</label>
              <Input
                placeholder="Misal: IQ, EQ, Kepemimpinan"
                className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                {...register('name')}
              />
              {errors.name && <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle className="size-3" />{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</label>
              <Textarea
                placeholder="Penjelasan singkat..."
                className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                {...register('description')}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</label>
              <Input
                type="number"
                className="h-10 rounded-xl bg-slate-50 border-slate-200 w-20 font-black text-sm"
                {...register('order', { valueAsNumber: true })}
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
