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
import { useCreateSection } from '../../hooks'
import { createSectionSchema, type CreateSectionFormData } from '../../schemas'
import { FormField } from '../Common/FormField'

interface SectionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
}

export function SectionForm({
  open,
  onOpenChange,
  testId,
}: SectionFormProps) {
  const createSection = useCreateSection()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSectionFormData>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      order: 0,
    },
  })

  const onSubmit = async (data: CreateSectionFormData) => {
    createSection.mutate(
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
          <DialogTitle>Tambah Seksi</DialogTitle>
          <DialogDescription>
            Isi informasi seksi untuk tes ini
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Nama Seksi" error={errors.name} required>
            <Input
              placeholder="Bagian A"
              {...register('name')}
            />
          </FormField>

          <FormField label="Deskripsi" error={errors.description}>
            <Textarea
              placeholder="Deskripsi seksi..."
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
              disabled={createSection.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createSection.isPending}>
              {createSection.isPending ? 'Menambah...' : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
