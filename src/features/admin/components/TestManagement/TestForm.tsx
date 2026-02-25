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
import { useCreateTest } from '../../hooks'
import { createTestSchema, type CreateTestFormData } from '../../schemas'
import { FormField } from '../Common/FormField'

interface TestFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TestForm({ open, onOpenChange }: TestFormProps) {
  const createTest = useCreateTest()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTestFormData>({
    resolver: zodResolver(createTestSchema),
  })

  const onSubmit = async (data: CreateTestFormData) => {
    createTest.mutate(data, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Tes Baru</DialogTitle>
          <DialogDescription>
            Isi informasi dasar untuk membuat tes baru
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Nama Tes" error={errors.name} required>
            <Input
              placeholder="Minat dan Bakat"
              {...register('name')}
            />
          </FormField>

          <FormField label="Deskripsi" error={errors.description}>
            <Textarea
              placeholder="Deskripsi tes..."
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

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createTest.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createTest.isPending}>
              {createTest.isPending ? 'Membuat...' : 'Buat Tes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
