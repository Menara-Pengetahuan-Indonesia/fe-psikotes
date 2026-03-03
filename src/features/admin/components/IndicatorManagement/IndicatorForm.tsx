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
import { Textarea } from '@/components/ui/textarea'
import { useCreateIndicator, useUpdateIndicator } from '../../hooks'
import { createIndicatorSchema, type CreateIndicatorFormData } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { Indicator } from '../../types'

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
        {
          testId,
          indicatorId: initialData.id,
          dto: data,
        },
        {
          onSuccess: () => {
            reset()
            onOpenChange(false)
          },
        },
      )
    } else {
      createIndicator.mutate(
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

  const isPending = createIndicator.isPending || updateIndicator.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Indikator' : 'Tambah Indikator'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Ubah informasi indikator'
              : 'Isi informasi indikator untuk tes ini'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Nama Indikator" error={errors.name} required>
            <Input placeholder="Extrovert" {...register('name')} />
          </FormField>

          <FormField label="Deskripsi" error={errors.description}>
            <Textarea
              placeholder="Deskripsi indikator..."
              {...register('description')}
            />
          </FormField>

          <FormField label="Urutan" error={errors.order} required>
            <Input
              type="number"
              placeholder="0"
              {...register('order', { valueAsNumber: true })}
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
