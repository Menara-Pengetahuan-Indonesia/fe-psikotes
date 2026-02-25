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
import { Textarea } from '@/components/ui/textarea'
import { useCreateIndicator } from '../../hooks'
import { createIndicatorSchema, type CreateIndicatorFormData } from '../../schemas'
import { FormField } from '../Common/FormField'

interface IndicatorFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
}

export function IndicatorForm({
  open,
  onOpenChange,
  testId,
}: IndicatorFormProps) {
  const createIndicator = useCreateIndicator()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateIndicatorFormData>({
    resolver: zodResolver(createIndicatorSchema),
    defaultValues: {
      order: 0,
    },
  })

  const onSubmit = async (data: CreateIndicatorFormData) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Indikator</DialogTitle>
          <DialogDescription>
            Isi informasi indikator untuk tes ini
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Nama Indikator" error={errors.name} required>
            <Input
              placeholder="Extrovert"
              {...register('name')}
            />
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
              disabled={createIndicator.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createIndicator.isPending}>
              {createIndicator.isPending ? 'Menambah...' : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
