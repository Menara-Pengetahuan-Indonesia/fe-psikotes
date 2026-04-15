'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2, Upload, X } from 'lucide-react'
import {
  useCreateQuestion,
  useUpdateQuestion,
  useUploadImage,
} from '../../hooks'
import { z } from 'zod'
import { createQuestionSchema } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { Question, QuestionType } from '../../types'
import { QUESTION_TYPE_LABELS } from '@features/admin/constants/question-types.constants'
import { cn } from '@/lib/utils'

type QuestionFormValues = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  subTestId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Question
}

export function QuestionForm({
  subTestId,
  open,
  onOpenChange,
  initialData,
}: QuestionFormProps) {
  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const uploadImage = useUploadImage()
  const isEditing = !!initialData
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      subTestId,
      questionType: 'MULTIPLE_CHOICE',
      questionText: '',
      order: 1,
      points: 1,
      options: [
        { optionText: '', isCorrect: false, points: 0, order: 1 },
        { optionText: '', isCorrect: false, points: 0, order: 2 },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'options' })

  useEffect(() => {
    if (open) {
      reset({
        subTestId,
        questionType: (initialData?.questionType ?? 'MULTIPLE_CHOICE') as QuestionType,
        questionText: initialData?.questionText ?? '',
        order: initialData?.order ?? 1,
        points: initialData?.points ?? 1,
        imageUrl: initialData?.imageUrl ?? undefined,
        options: isEditing
          ? (initialData?.options ?? []).map((o) => ({
              optionText: o.optionText,
              isCorrect: o.isCorrect,
              points: o.points,
              order: o.order,
            }))
          : [
              { optionText: '', isCorrect: false, points: 0, order: 1 },
              { optionText: '', isCorrect: false, points: 0, order: 2 },
            ],
      })
      setImagePreview(initialData?.imageUrl ?? null)
    }
  }, [open, initialData, isEditing, reset, subTestId])

  const questionType = watch('questionType')
  const showOptions = questionType === 'MULTIPLE_CHOICE' || questionType === 'CHECKBOX'

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const result = await uploadImage.mutateAsync(file)
      setValue('imageUrl', result.url)
      setImagePreview(result.url)
    } catch { /* handled by hook */ }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      if (isEditing && initialData) {
        await updateQuestion.mutateAsync({
          id: initialData.id,
          dto: {
            questionType: data.questionType as QuestionType,
            questionText: data.questionText,
            order: data.order,
            points: data.points,
            imageUrl: data.imageUrl,
            options: showOptions
              ? data.options?.filter((o) => o.optionText.trim())
              : undefined,
          },
        })
      } else {
        await createQuestion.mutateAsync({
          subTestId,
          questionType: data.questionType as QuestionType,
          questionText: data.questionText,
          order: data.order,
          points: data.points,
          imageUrl: data.imageUrl,
          options: showOptions
            ? data.options?.filter((o) => o.optionText.trim())
            : undefined,
        })
      }
      reset()
      onOpenChange(false)
    } catch { /* handled by hooks */ }
  }

  const isPending = createQuestion.isPending || updateQuestion.isPending || uploadImage.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Ubah informasi pertanyaan' : 'Isi informasi pertanyaan untuk subtes ini'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Teks Pertanyaan" error={errors.questionText} required>
            <Textarea placeholder="Masukkan teks pertanyaan..." rows={3} {...register('questionText')} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipe Pertanyaan" error={errors.questionType} required>
              <Select
                value={questionType}
                onValueChange={(v) => setValue('questionType', v as QuestionType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Urutan" error={errors.order} required>
              <Input type="number" placeholder="1" {...register('order', { valueAsNumber: true })} />
            </FormField>
          </div>

          <FormField label="Poin" error={errors.points}>
            <Input type="number" placeholder="1" className="w-32" {...register('points', { valueAsNumber: true })} />
          </FormField>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gambar (Opsional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <Image src={imagePreview} alt="Preview" width={400} height={192}
                  className="max-h-48 rounded-md border object-contain" unoptimized />
                <Button type="button" variant="destructive" size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => { setValue('imageUrl', undefined); setImagePreview(null) }}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button type="button" variant="outline" size="sm"
                  onClick={() => fileInputRef.current?.click()} disabled={uploadImage.isPending}>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadImage.isPending ? 'Mengunggah...' : 'Unggah Gambar'}
                </Button>
              </div>
            )}
          </div>

          {/* Options for MC/Checkbox */}
          {showOptions && (
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm">Opsi Jawaban</label>
                <Button type="button" size="sm" variant="outline"
                  onClick={() => append({ optionText: '', isCorrect: false, points: 0, order: fields.length + 1 })}>
                  <Plus className="w-4 h-4 mr-2" /> Tambah Opsi
                </Button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="shrink-0"
                      {...register(`options.${index}.isCorrect`)}
                      title="Jawaban benar"
                    />
                    <Input placeholder={`Opsi ${index + 1}`} {...register(`options.${index}.optionText`)} className="flex-1" />
                    <Input type="number" placeholder="Poin" className="w-20"
                      {...register(`options.${index}.points`, { valueAsNumber: true })} />
                    <Button type="button" variant="outline" size="sm"
                      onClick={() => remove(index)} disabled={fields.length <= 1}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Centang checkbox untuk menandai jawaban benar.</p>
            </div>
          )}

          <div className={cn('flex justify-end gap-2 pt-4 border-t')}>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (isEditing ? 'Menyimpan...' : 'Menambah...') : (isEditing ? 'Simpan' : 'Tambah')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
