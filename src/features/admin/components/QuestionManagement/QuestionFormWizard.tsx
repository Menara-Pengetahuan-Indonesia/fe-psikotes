'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
  useIndicators,
  useSections,
  useCreateQuestion,
  useUpdateQuestion,
  useCreateOption,
  useUpdateOption,
  useDeleteOption,
  useCreateIndicatorMapping,
  useDeleteIndicatorMapping,
  useUploadImage,
  adminKeys,
} from '../../hooks'
import { FormField } from '../Common/FormField'
import type { Question, QuestionType } from '../../types'
import { QUESTION_TYPE_LABELS } from '@features/admin/constants'

// ============================================================
// SCHEMA
// ============================================================

const questionTypeEnum = z.enum([
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
])

const optionScoreSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'Teks opsi wajib diisi').max(500, 'Teks opsi terlalu panjang'),
  order: z.number().min(0, 'Urutan tidak boleh negatif'),
  scores: z.record(z.string(), z.union([z.number(), z.literal('')])),
})

const questionFormWizardSchema = z.object({
  text: z
    .string()
    .min(1, 'Teks pertanyaan wajib diisi')
    .max(2000, 'Teks pertanyaan terlalu panjang'),
  type: questionTypeEnum,
  sectionId: z.string().optional().or(z.literal('')),
  order: z
    .number({ message: 'Urutan harus berupa angka' })
    .min(0, 'Urutan tidak boleh negatif'),
  imageUrl: z.string().optional().nullable(),
  options: z.array(optionScoreSchema),
})

// ============================================================
// TYPES
// ============================================================

interface FormValues {
  text: string
  type: QuestionType
  sectionId: string
  order: number
  imageUrl?: string | null
  options: {
    id?: string
    text: string
    order: number
    scores: Record<string, number | ''>
  }[]
}

interface QuestionFormWizardProps {
  testId: string
  initialData?: Question
  onSaved: () => void
  onCancel: () => void
}

// ============================================================
// HELPERS
// ============================================================

function buildDefaultOptions(type: QuestionType): FormValues['options'] {
  switch (type) {
    case 'MULTIPLE_CHOICE':
      return Array.from({ length: 4 }, (_, i) => ({
        text: '',
        order: i + 1,
        scores: {},
      }))
    case 'TRUE_FALSE':
      return [
        { text: 'Benar', order: 1, scores: {} },
        { text: 'Salah', order: 2, scores: {} },
      ]
    case 'RATING_SCALE':
      return Array.from({ length: 5 }, (_, i) => ({
        text: String(i + 1),
        order: i + 1,
        scores: {},
      }))
    case 'ESSAY':
      return []
  }
}

function buildInitialValues(initialData?: Question): FormValues {
  if (!initialData) {
    return {
      text: '',
      type: 'MULTIPLE_CHOICE',
      sectionId: '',
      order: 0,
      imageUrl: null,
      options: buildDefaultOptions('MULTIPLE_CHOICE'),
    }
  }

  return {
    text: initialData.text,
    type: initialData.type,
    sectionId: initialData.sectionId ?? '',
    order: initialData.order,
    imageUrl: initialData.imageUrl ?? null,
    options: (initialData.options ?? [])
      .sort((a, b) => a.order - b.order)
      .map((opt) => ({
        id: opt.id,
        text: opt.text,
        order: opt.order,
        scores: (opt.mappings ?? []).reduce(
          (acc, m) => {
            acc[m.indicatorId] = m.scoreValue
            return acc
          },
          {} as Record<string, number | ''>,
        ),
      })),
  }
}

// ============================================================
// COMPONENT
// ============================================================

export function QuestionFormWizard({
  testId,
  initialData,
  onSaved,
  onCancel,
}: QuestionFormWizardProps) {
  const isEditing = !!initialData
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl ?? null,
  )
  const [isSaving, setIsSaving] = useState(false)

  // Track previous type to detect user-initiated changes
  const prevTypeRef = useRef<QuestionType | null>(null)

  // ---- Queries ----
  const { data: indicators } = useIndicators(testId)
  const { data: sections } = useSections(testId)

  // ---- Mutations ----
  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const createOption = useCreateOption()
  const updateOption = useUpdateOption()
  const deleteOption = useDeleteOption()
  const createMapping = useCreateIndicatorMapping()
  const deleteMapping = useDeleteIndicatorMapping()
  const uploadImage = useUploadImage()

  // ---- Form ----
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(questionFormWizardSchema),
    defaultValues: buildInitialValues(initialData),
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'options',
  })

  const questionType = watch('type')

  // Reset options when question type changes (user-initiated only)
  useEffect(() => {
    // Skip the initial render
    if (prevTypeRef.current === null) {
      prevTypeRef.current = questionType
      return
    }

    // Only reset if the type actually changed
    if (prevTypeRef.current !== questionType) {
      prevTypeRef.current = questionType
      replace(buildDefaultOptions(questionType))
    }
  }, [questionType, replace])

  // ---- Image upload ----
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

  // ---- Save logic ----
  const saveForm = useCallback(
    async (data: FormValues): Promise<boolean> => {
      try {
        setIsSaving(true)

        if (isEditing && initialData) {
          // ---- UPDATE FLOW ----

          // 1. Update question
          await updateQuestion.mutateAsync({
            testId,
            questionId: initialData.id,
            dto: {
              text: data.text,
              type: data.type,
              sectionId: data.sectionId || undefined,
              order: data.order,
              imageUrl: data.imageUrl || null,
            },
          })

          // 2. Diff options
          const existingOptionIds = new Set(
            (initialData.options ?? []).map((o) => o.id),
          )
          const formOptionIds = new Set(
            data.options.filter((o) => o.id).map((o) => o.id!),
          )

          // Delete removed options
          for (const existingOpt of initialData.options ?? []) {
            if (!formOptionIds.has(existingOpt.id)) {
              await deleteOption.mutateAsync({
                testId,
                optionId: existingOpt.id,
              })
            }
          }

          // Update existing & create new options, collecting real IDs
          const savedOptions: Array<{
            optionId: string
            scores: Record<string, number | ''>
          }> = []

          for (const formOpt of data.options) {
            if (formOpt.id && existingOptionIds.has(formOpt.id)) {
              // Update existing option
              await updateOption.mutateAsync({
                testId,
                optionId: formOpt.id,
                dto: { text: formOpt.text, order: formOpt.order },
              })
              savedOptions.push({
                optionId: formOpt.id,
                scores: formOpt.scores,
              })
            } else {
              // Create new option
              const created = await createOption.mutateAsync({
                testId,
                questionId: initialData.id,
                dto: {
                  questionId: initialData.id,
                  text: formOpt.text,
                  order: formOpt.order,
                },
              })
              savedOptions.push({
                optionId: created.id,
                scores: formOpt.scores,
              })
            }
          }

          // 3. Rebuild mappings: delete all old, create new
          for (const existingOpt of initialData.options ?? []) {
            for (const mapping of existingOpt.mappings ?? []) {
              await deleteMapping.mutateAsync({
                testId,
                mappingId: mapping.id,
              })
            }
          }

          for (const saved of savedOptions) {
            for (const [indicatorId, value] of Object.entries(saved.scores)) {
              if (value !== '' && value !== null && value !== undefined) {
                await createMapping.mutateAsync({
                  testId,
                  optionId: saved.optionId,
                  dto: {
                    indicatorId,
                    scoreValue: Number(value),
                  },
                })
              }
            }
          }
        } else {
          // ---- CREATE FLOW ----

          // 1. Create question
          const question = await createQuestion.mutateAsync({
            testId,
            text: data.text,
            type: data.type,
            sectionId: data.sectionId || undefined,
            order: data.order,
            imageUrl: data.imageUrl || null,
          })

          // 2. Create options
          for (const formOpt of data.options) {
            const createdOpt = await createOption.mutateAsync({
              testId,
              questionId: question.id,
              dto: {
                questionId: question.id,
                text: formOpt.text,
                order: formOpt.order,
              },
            })

            // 3. Create mappings for this option
            for (const [indicatorId, value] of Object.entries(formOpt.scores)) {
              if (value !== '' && value !== null && value !== undefined) {
                await createMapping.mutateAsync({
                  testId,
                  optionId: createdOpt.id,
                  dto: {
                    indicatorId,
                    scoreValue: Number(value),
                  },
                })
              }
            }
          }
        }

        // 4. Invalidate questions query
        await queryClient.invalidateQueries({
          queryKey: adminKeys.questions(testId),
        })

        toast.success(
          isEditing
            ? 'Pertanyaan berhasil diperbarui'
            : 'Pertanyaan berhasil dibuat',
        )
        return true
      } catch {
        toast.error('Gagal menyimpan pertanyaan. Silakan coba lagi.')
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [
      isEditing,
      initialData,
      testId,
      queryClient,
      createQuestion,
      updateQuestion,
      createOption,
      updateOption,
      deleteOption,
      createMapping,
      deleteMapping,
    ],
  )

  const handleSaveAndClose = handleSubmit(async (data) => {
    const success = await saveForm(data)
    if (success) {
      onSaved()
    }
  })

  const handleSaveAndAddAnother = handleSubmit(async (data) => {
    const success = await saveForm(data)
    if (success) {
      // Reset form for next question, keep type and section
      const nextOrder = data.order + 1
      prevTypeRef.current = null // Allow the reset to take effect cleanly
      reset({
        text: '',
        type: data.type,
        sectionId: data.sectionId,
        order: nextOrder,
        imageUrl: null,
        options: buildDefaultOptions(data.type),
      })
      setImagePreview(null)
      // Re-sync prevTypeRef after reset
      prevTypeRef.current = data.type
    }
  })

  // ---- Derived state ----
  const showOptionsTable = questionType !== 'ESSAY'
  const indicatorList = indicators ?? []

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* QUESTION INFO SECTION */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informasi Pertanyaan</h3>

        <FormField label="Teks Pertanyaan" error={errors.text} required>
          <Textarea
            placeholder="Masukkan teks pertanyaan..."
            rows={3}
            {...register('text')}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Tipe Pertanyaan" error={errors.type} required>
            <Select
              value={questionType}
              onValueChange={(value) =>
                setValue('type', value as QuestionType)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
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
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih seksi..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_none">Tanpa Seksi</SelectItem>
                {(sections ?? []).map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

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
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-md border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
                disabled={isSaving}
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
                disabled={uploadImage.isPending || isSaving}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadImage.isPending ? 'Mengunggah...' : 'Unggah Gambar'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* OPTIONS + SCORES TABLE */}
      {/* ============================================================ */}
      {showOptionsTable && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Opsi & Skor Indikator</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                append({
                  text: '',
                  order: fields.length + 1,
                  scores: {},
                })
              }
              disabled={isSaving}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Opsi
            </Button>
          </div>

          {indicatorList.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Belum ada indikator untuk tes ini. Tambahkan indikator terlebih
              dahulu untuk mengisi skor pada setiap opsi.
            </p>
          )}

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-3 py-2 text-left font-medium w-12">#</th>
                  <th className="px-3 py-2 text-left font-medium min-w-[200px]">
                    Teks Opsi
                  </th>
                  {indicatorList.map((indicator) => (
                    <th
                      key={indicator.id}
                      className="px-3 py-2 text-center font-medium min-w-[100px]"
                      title={indicator.description || indicator.name}
                    >
                      {indicator.name}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-center font-medium w-16">
                    Hapus
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3 + indicatorList.length}
                      className="px-3 py-6 text-center text-muted-foreground"
                    >
                      Belum ada opsi. Klik &quot;Tambah Opsi&quot; untuk
                      menambahkan.
                    </td>
                  </tr>
                ) : (
                  fields.map((field, index) => (
                    <tr
                      key={field.id}
                      className="border-b last:border-b-0 hover:bg-muted/25"
                    >
                      {/* Order */}
                      <td className="px-3 py-2">
                        <Input
                          type="number"
                          className="w-14 text-center"
                          {...register(`options.${index}.order`, {
                            valueAsNumber: true,
                          })}
                          disabled={isSaving}
                        />
                      </td>

                      {/* Option text */}
                      <td className="px-3 py-2">
                        <Input
                          placeholder={`Opsi ${index + 1}`}
                          {...register(`options.${index}.text`)}
                          disabled={isSaving}
                        />
                        {errors.options?.[index]?.text && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.options[index].text?.message}
                          </p>
                        )}
                      </td>

                      {/* Score per indicator */}
                      {indicatorList.map((indicator) => (
                        <td key={indicator.id} className="px-3 py-2">
                          <Input
                            type="number"
                            className="w-20 mx-auto text-center"
                            placeholder="--"
                            {...register(
                              `options.${index}.scores.${indicator.id}`,
                              {
                                setValueAs: (v: string) =>
                                  v === '' || v === undefined ? '' : Number(v),
                              },
                            )}
                            disabled={isSaving}
                          />
                        </td>
                      ))}

                      {/* Delete button */}
                      <td className="px-3 py-2 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1 || isSaving}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {questionType === 'ESSAY' && (
        <p className="text-sm text-muted-foreground border rounded-lg p-4 bg-muted/30">
          Tipe Essay tidak memiliki opsi jawaban. Skor akan diberikan secara
          manual saat penilaian.
        </p>
      )}

      {/* ============================================================ */}
      {/* ACTION BUTTONS */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          Batal
        </Button>
        {!isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveAndAddAnother}
            disabled={isSaving}
          >
            {isSaving ? 'Menyimpan...' : 'Simpan & Tambah Lagi'}
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSaveAndClose}
          disabled={isSaving}
        >
          {isSaving ? 'Menyimpan...' : 'Simpan & Tutup'}
        </Button>
      </div>
    </div>
  )
}
