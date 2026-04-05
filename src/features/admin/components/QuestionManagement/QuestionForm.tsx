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
  useCreateOption,
  useUploadImage,
} from '../../hooks'
import { createQuestionSchema, type CreateQuestionFormData } from '../../schemas'
import { FormField } from '../Common/FormField'
import type { Question, Section } from '../../types'
import { QUESTION_TYPE_LABELS, DISPLAY_STYLE_OPTIONS } from '@features/admin/constants/question-types.constants'
import { cn } from '@/lib/utils'

interface QuestionFormProps {
  testId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Question
  sections: Section[]
}

interface QuestionFormValues extends CreateQuestionFormData {
  options?: Array<{ text: string; order: number }>
}

export function QuestionForm({
  testId,
  open,
  onOpenChange,
  initialData,
  sections,
}: QuestionFormProps) {
  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const createOption = useCreateOption()
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
    control,
    setValue,
  } = useForm<QuestionFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createQuestionSchema) as any,
    defaultValues: {
      text: initialData?.text ?? '',
      type: initialData?.type ?? 'MULTIPLE_CHOICE',
      sectionId: initialData?.sectionId ?? '',
      order: initialData?.order ?? 0,
      imageUrl: initialData?.imageUrl ?? undefined,
      displayStyle: initialData?.displayStyle ?? 'UPPERCASE',
      options: [
        { text: '', order: 0 },
        { text: '', order: 1 },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  useEffect(() => {
    if (open) {
      const defaults: QuestionFormValues = {
        text: initialData?.text ?? '',
        type: initialData?.type ?? 'MULTIPLE_CHOICE',
        sectionId: initialData?.sectionId ?? '',
        order: initialData?.order ?? 0,
        imageUrl: initialData?.imageUrl ?? undefined,
        displayStyle: initialData?.displayStyle ?? 'UPPERCASE',
        optionImageEnabled: initialData?.optionImageEnabled ?? false,
        options: isEditing
          ? []
          : [
              { text: '', order: 0 },
              { text: '', order: 1 },
            ],
      }
      reset(defaults)
      setImagePreview(initialData?.imageUrl ?? null)
    }
  }, [open, initialData, isEditing, reset])

  const questionType = watch('type')
  const showOptions =
    !isEditing &&
    (questionType === 'MULTIPLE_CHOICE' || questionType === 'TRUE_FALSE')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadImage.mutateAsync(file)
      setValue('imageUrl', result.url)
      setImagePreview(result.url)
    } catch {
      // Error handled by hook
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = () => {
    setValue('imageUrl', null)
    setImagePreview(null)
  }

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      const questionPayload = {
        text: data.text,
        type: data.type,
        sectionId: data.sectionId || undefined,
        order: data.order,
        imageUrl: data.imageUrl || null,
        displayStyle: data.type === 'MULTIPLE_CHOICE' ? (data.displayStyle || 'UPPERCASE') : undefined,
      }

      if (isEditing && initialData) {
        await updateQuestion.mutateAsync({
          testId,
          questionId: initialData.id,
          dto: questionPayload,
        })
        onOpenChange(false)
      } else {
        const question = await createQuestion.mutateAsync({
          ...questionPayload,
          testId,
        })

        if (showOptions && data.options && data.options.length > 0) {
          for (const option of data.options) {
            if (option.text.trim()) {
              await createOption.mutateAsync({
                testId,
                questionId: question.id,
                dto: {
                  questionId: question.id,
                  text: option.text,
                  order: option.order,
                },
              })
            }
          }
        }

        reset()
        onOpenChange(false)
      }
    } catch {
      // Errors handled by hooks
    }
  }

  const isPending =
    createQuestion.isPending ||
    updateQuestion.isPending ||
    createOption.isPending ||
    uploadImage.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Ubah informasi pertanyaan'
              : 'Isi informasi pertanyaan untuk tes ini'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Teks Pertanyaan" error={errors.text} required>
            <Textarea
              placeholder="Masukkan teks pertanyaan..."
              rows={3}
              {...register('text')}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipe Pertanyaan" error={errors.type} required>
              <Select
                value={questionType}
                onValueChange={(value) =>
                  setValue(
                    'type',
                    value as QuestionFormValues['type'],
                  )
                }
              >
                <SelectTrigger className="w-full bg-white border-transparent shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-transparent shadow-lg">
                  {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Seksi" error={errors.sectionId}>
              <Select
                value={watch('sectionId') || '_none'}
                onValueChange={(value) =>
                  setValue('sectionId', value === '_none' ? '' : value)
                }
              >
                <SelectTrigger className="w-full bg-white border-transparent shadow-sm">
                  <SelectValue placeholder="Pilih seksi..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-transparent shadow-lg">
                  <SelectItem value="_none" className="">Tanpa Seksi</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id} className="">
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {questionType === 'MULTIPLE_CHOICE' && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Gaya Tampilan</label>
              <div className="flex gap-1 bg-slate-50 border rounded-lg p-1">
                {DISPLAY_STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setValue('displayStyle', style.value)}
                    className={cn(
                      "flex-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                      watch('displayStyle') === style.value
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-white"
                    )}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <FormField label="Urutan" error={errors.order} required>
            <Input
              type="number"
              placeholder="0"
              className="w-32"
              {...register('order', { valueAsNumber: true })}
            />
          </FormField>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gambar (Opsional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={192}
                  className="max-h-48 rounded-md border object-contain"
                  unoptimized
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadImage.isPending}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadImage.isPending ? 'Mengunggah...' : 'Unggah Gambar'}
                </Button>
              </div>
            )}
          </div>

          {/* Dynamic Options for MC/TF in create mode */}
          {showOptions && (
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm">Opsi Jawaban</label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    append({ text: '', order: fields.length })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Opsi
                </Button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      placeholder={`Opsi ${index + 1}`}
                      {...register(`options.${index}.text`)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Urutan"
                      className="w-20"
                      {...register(`options.${index}.order`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <p className="text-xs text-muted-foreground border-t pt-3">
              Opsi jawaban dapat dikelola melalui pemetaan indikator di daftar pertanyaan.
            </p>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
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
