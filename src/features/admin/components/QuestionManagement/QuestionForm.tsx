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
import type { Question, QuestionType, ScaleWeight } from '../../types'
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
      setEssayKeywords(initialData?.correctAnswer?.correctEssayKeywords ?? [])
      setKeywordInput('')
      setMinScale(initialData?.correctAnswer?.minScaleValue ?? 1)
      setMaxScale(initialData?.correctAnswer?.maxScaleValue ?? 5)
      setScaleWeights(initialData?.correctAnswer?.scaleWeights ?? {})
    }
  }, [open, initialData, isEditing, reset, subTestId])

  // eslint-disable-next-line react-hooks/incompatible-library
  const questionType = watch('questionType')
  const showOptions = questionType === 'MULTIPLE_CHOICE' || questionType === 'CHECKBOX'
  const showEssay = questionType === 'ESSAY'
  const showScale = questionType === 'SCALE_RATING'

  const [essayKeywords, setEssayKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState('')
  const [minScale, setMinScale] = useState(1)
  const [maxScale, setMaxScale] = useState(5)
  const [scaleWeights, setScaleWeights] = useState<Record<string, ScaleWeight>>({})

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
    const correctAnswer = showEssay
      ? { correctEssayKeywords: essayKeywords }
      : showScale
        ? { minScaleValue: minScale, maxScaleValue: maxScale, scaleWeights }
        : undefined

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
            correctAnswer,
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
          correctAnswer,
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

          {showEssay && (
            <FormField label="Poin" error={errors.points}>
              <Input type="number" placeholder="1" className="w-32" {...register('points', { valueAsNumber: true })} />
            </FormField>
          )}
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

          {/* Essay Keywords */}
          {showEssay && (
            <div className="space-y-3 border-t pt-4">
              <label className="font-semibold text-sm">Kata Kunci Jawaban (Essay)</label>
              <p className="text-xs text-muted-foreground">Tambahkan kata kunci yang digunakan untuk penilaian otomatis.</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Ketik kata kunci..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (keywordInput.trim()) {
                        setEssayKeywords([...essayKeywords, keywordInput.trim()])
                        setKeywordInput('')
                      }
                    }
                  }}
                  className="flex-1"
                />
                <Button type="button" size="sm" variant="outline"
                  onClick={() => {
                    if (keywordInput.trim()) {
                      setEssayKeywords([...essayKeywords, keywordInput.trim()])
                      setKeywordInput('')
                    }
                  }}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {essayKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {essayKeywords.map((kw, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                      {kw}
                      <button type="button" onClick={() => setEssayKeywords(essayKeywords.filter((_, idx) => idx !== i))}
                        className="hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Scale Rating */}
          {showScale && (
            <div className="space-y-3 border-t pt-4">
              <label className="font-semibold text-sm">Pengaturan Skala</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Nilai Minimum</label>
                  <Input type="number" value={minScale} onChange={(e) => {
                    const v = Number(e.target.value)
                    setMinScale(v)
                    const newWeights: Record<string, ScaleWeight> = {}
                    for (let i = v; i <= maxScale; i++) newWeights[String(i)] = scaleWeights[String(i)] ?? { label: String(i), points: i }
                    setScaleWeights(newWeights)
                  }} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Nilai Maksimum</label>
                  <Input type="number" value={maxScale} onChange={(e) => {
                    const v = Number(e.target.value)
                    setMaxScale(v)
                    const newWeights: Record<string, ScaleWeight> = {}
                    for (let i = minScale; i <= v; i++) newWeights[String(i)] = scaleWeights[String(i)] ?? { label: String(i), points: i }
                    setScaleWeights(newWeights)
                  }} />
                </div>
              </div>
              {minScale <= maxScale && (
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Label & Bobot per Skala</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: maxScale - minScale + 1 }, (_, i) => minScale + i).map((val) => (
                      <div key={val} className="space-y-1">
                        <label className="text-xs font-medium text-center block">{val}</label>
                        <Input placeholder="Label" className="text-center text-xs h-8"
                          value={scaleWeights[String(val)]?.label ?? String(val)}
                          onChange={(e) => setScaleWeights({ ...scaleWeights, [String(val)]: { ...scaleWeights[String(val)] ?? { points: val }, label: e.target.value } })} />
                        <Input type="number" placeholder="Poin" className="text-center text-sm h-8"
                          value={scaleWeights[String(val)]?.points ?? val}
                          onChange={(e) => setScaleWeights({ ...scaleWeights, [String(val)]: { ...scaleWeights[String(val)] ?? { label: String(val) }, points: Number(e.target.value) } })} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
