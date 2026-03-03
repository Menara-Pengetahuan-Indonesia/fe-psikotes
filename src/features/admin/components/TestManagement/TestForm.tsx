'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useCreateTest, useUpdateTest } from '../../hooks'
import { createTestSchema, type CreateTestFormData } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { Test } from '../../types'

interface TestFormProps {
  initialData?: Test
  onSuccess?: () => void
}

export function TestForm({ initialData, onSuccess }: TestFormProps) {
  const router = useRouter()
  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateTestFormData>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      duration: initialData?.duration ?? 60,
      timePerQuestion: initialData?.timePerQuestion ?? undefined,
      shuffleQuestions: initialData?.shuffleQuestions ?? false,
      shuffleOptions: initialData?.shuffleOptions ?? false,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description ?? '',
        duration: initialData.duration,
        timePerQuestion: initialData.timePerQuestion ?? undefined,
        shuffleQuestions: initialData.shuffleQuestions,
        shuffleOptions: initialData.shuffleOptions,
      })
    }
  }, [initialData, reset])

  const shuffleQuestions = watch('shuffleQuestions')
  const shuffleOptions = watch('shuffleOptions')

  const onSubmit = async (data: CreateTestFormData) => {
    const payload = {
      ...data,
      description: data.description || undefined,
      timePerQuestion: data.timePerQuestion || undefined,
    }

    if (isEditing && initialData) {
      updateTest.mutate(
        { id: initialData.id, dto: payload },
        {
          onSuccess: () => {
            onSuccess?.()
          },
        },
      )
    } else {
      createTest.mutate(payload, {
        onSuccess: (newTest) => {
          router.push(`/admin/tests/${newTest.id}`)
        },
      })
    }
  }

  const isPending = createTest.isPending || updateTest.isPending

  return (
    <Card className="p-6 max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Nama Tes" error={errors.name} required>
          <Input
            placeholder="Minat dan Bakat"
            {...register('name')}
          />
        </FormField>

        <FormField label="Deskripsi" error={errors.description}>
          <Textarea
            placeholder="Deskripsi tes..."
            rows={4}
            {...register('description')}
          />
        </FormField>

        <FormField label="Durasi (menit)" error={errors.duration} required>
          <Input
            type="number"
            placeholder="60"
            {...register('duration', { valueAsNumber: true })}
          />
        </FormField>

        <FormField label="Waktu per Soal (detik)" error={errors.timePerQuestion}>
          <Input
            type="number"
            placeholder="Opsional, misal: 30"
            {...register('timePerQuestion', {
              setValueAs: (v) => (v === '' || v === undefined ? undefined : Number(v)),
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Kosongkan jika tidak ada batas waktu per soal
          </p>
        </FormField>

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-sm">Pengaturan Tambahan</h3>

          <div className="flex items-center gap-3">
            <Checkbox
              id="shuffleQuestions"
              checked={shuffleQuestions}
              onCheckedChange={(checked) =>
                setValue('shuffleQuestions', checked === true)
              }
            />
            <Label htmlFor="shuffleQuestions" className="cursor-pointer">
              Acak urutan soal
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="shuffleOptions"
              checked={shuffleOptions}
              onCheckedChange={(checked) =>
                setValue('shuffleOptions', checked === true)
              }
            />
            <Label htmlFor="shuffleOptions" className="cursor-pointer">
              Acak urutan opsi jawaban
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEditing
                ? 'Menyimpan...'
                : 'Membuat...'
              : isEditing
                ? 'Simpan Perubahan'
                : 'Buat Tes'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
