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
import { useCreateSection, useUpdateSection } from '../../hooks'
import { createSectionSchema, type CreateSectionFormData } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { Section } from '../../types'

interface SectionFormProps {
  testId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Section
}

export function SectionForm({
  testId,
  open,
  onOpenChange,
  initialData,
}: SectionFormProps) {
  const createSection = useCreateSection()
  const updateSection = useUpdateSection()
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSectionFormData>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      order: initialData?.order ?? 0,
      duration: initialData?.duration ?? undefined,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        order: initialData?.order ?? 0,
        duration: initialData?.duration ?? undefined,
      })
    }
  }, [open, initialData, reset])

  const onSubmit = (data: CreateSectionFormData) => {
    const payload = {
      ...data,
      duration: data.duration || undefined,
    }

    if (isEditing && initialData) {
      updateSection.mutate(
        {
          testId,
          sectionId: initialData.id,
          dto: payload,
        },
        {
          onSuccess: () => {
            reset()
            onOpenChange(false)
          },
        },
      )
    } else {
      createSection.mutate(
        { ...payload, testId },
        {
          onSuccess: () => {
            reset()
            onOpenChange(false)
          },
        },
      )
    }
  }

  const isPending = createSection.isPending || updateSection.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Seksi' : 'Tambah Seksi'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Ubah informasi seksi'
              : 'Isi informasi seksi untuk tes ini'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Nama Seksi" error={errors.name} required>
            <Input placeholder="Bagian A" {...register('name')} />
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

          <FormField label="Durasi (menit)" error={errors.duration}>
            <Input
              type="number"
              placeholder="Opsional"
              {...register('duration', {
                setValueAs: (v) =>
                  v === '' || v === undefined ? undefined : Number(v),
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Kosongkan jika menggunakan durasi tes utama
            </p>
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
