'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, X, HelpCircle, Layout, ImageIcon, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react'
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
import type { Question, QuestionType } from '../../types'
import { QUESTION_TYPE_LABELS, DISPLAY_STYLE_OPTIONS } from '@features/admin/constants'
import { cn } from '@/lib/utils'

// ============================================================
// SCHEMA
// ============================================================

const questionTypeEnum = z.enum([
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
])

const displayStyleEnum = z.enum(['UPPERCASE', 'LOWERCASE', 'NUMBER', 'RADIO'])

const optionScoreSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'Teks opsi wajib diisi').max(500, 'Teks opsi terlalu panjang'),
  order: z.number().min(0, 'Urutan tidak boleh negatif'),
  imageUrl: z.string().optional().nullable(),
  scores: z.record(z.string(), z.union([z.number(), z.literal('')])),
})

const questionFormWizardSchema = z.object({
  text: z.string().min(1, 'Teks soal wajib diisi'),
  type: questionTypeEnum,
  sectionId: z.string().optional().or(z.literal('')),
  order: z.number().min(0),
  imageUrl: z.string().optional().nullable(),
  displayStyle: displayStyleEnum.optional().nullable(),
  optionImageEnabled: z.boolean().optional().default(false),
  options: z.array(optionScoreSchema),
})

type FormValues = z.infer<typeof questionFormWizardSchema>

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
      return Array.from({ length: 4 }, (_, i) => ({ text: '', order: i + 1, scores: {} }))
    case 'TRUE_FALSE':
      return [
        { text: 'Benar', order: 1, scores: {} },
        { text: 'Salah', order: 2, scores: {} },
      ]
    case 'RATING_SCALE':
      return Array.from({ length: 5 }, (_, i) => ({ text: String(i + 1), order: i + 1, scores: {} }))
    case 'ESSAY':
      return []
  }
}

function buildInitialValues(initialData?: Question): FormValues {
  if (!initialData) {
    return { text: '', type: 'MULTIPLE_CHOICE', sectionId: '', order: 0, imageUrl: null, displayStyle: 'UPPERCASE', optionImageEnabled: false, options: buildDefaultOptions('MULTIPLE_CHOICE') }
  }
  return {
    text: initialData.text,
    type: initialData.type,
    sectionId: initialData.sectionId ?? '',
    order: initialData.order,
    imageUrl: initialData.imageUrl ?? null,
    displayStyle: initialData.displayStyle ?? 'UPPERCASE',
    optionImageEnabled: initialData.optionImageEnabled ?? false,
    options: (initialData.options ?? [])
      .sort((a, b) => a.order - b.order)
      .map((opt) => ({
        id: opt.id,
        text: opt.text,
        order: opt.order,
        imageUrl: opt.imageUrl ?? null,
        scores: (opt.mappings ?? []).reduce((acc, m) => { acc[m.indicatorId] = m.scoreValue; return acc }, {} as Record<string, number | ''>),
      })),
  }
}

function OptionImageCell({ imageUrl, onUpload, onRemove, uploading }: {
  imageUrl?: string | null
  onUpload: (file: File) => void
  onRemove: () => void
  uploading: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)

  if (imageUrl) {
    return (
      <div className="relative group w-fit mx-auto">
        <Image src={imageUrl} alt="" width={48} height={36} className="rounded-lg border border-slate-200 object-cover w-12 h-9" unoptimized />
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
        >
          <X className="size-2.5" />
        </button>
      </div>
    )
  }

  return (
    <>
      <input ref={ref} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); if (ref.current) ref.current.value = '' }} className="hidden" />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="w-12 h-9 mx-auto rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all"
      >
        {uploading ? <div className="size-3 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" /> : <Plus className="size-3.5" />}
      </button>
    </>
  )
}

export function QuestionFormWizard({ testId, initialData, onSaved, onCancel }: QuestionFormWizardProps) {
  const isEditing = !!initialData
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl ?? null)
  const [isSaving, setIsSaving] = useState(false)
  const prevTypeRef = useRef<QuestionType | null>(null)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false)
  const typeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { data: indicators } = useIndicators(testId)
  const { data: sections } = useSections(testId)

  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const createOption = useCreateOption()
  const updateOption = useUpdateOption()
  const deleteOption = useDeleteOption()
  const createMapping = useCreateIndicatorMapping()
  const deleteMapping = useDeleteIndicatorMapping()
  const uploadImage = useUploadImage()

  const { register, handleSubmit, formState: { errors }, reset, watch, control, setValue } = useForm<FormValues>({
    resolver: zodResolver(questionFormWizardSchema) as any,
    defaultValues: buildInitialValues(initialData),
  })

  const { fields, append, remove, replace } = useFieldArray({ control, name: 'options' })
  const questionType = watch('type')

  useEffect(() => {
    if (prevTypeRef.current === null) { prevTypeRef.current = questionType; return }
    if (prevTypeRef.current !== questionType) {
      prevTypeRef.current = questionType
      replace(buildDefaultOptions(questionType))
    }
  }, [questionType, replace])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) setTypeDropdownOpen(false)
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) setSectionDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const result = await uploadImage.mutateAsync(file)
      setValue('imageUrl', result.url)
      setImagePreview(result.url)
    } catch {}
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemoveImage = () => {
    setValue('imageUrl', null)
    setImagePreview(null)
  }

  const saveForm = useCallback(async (data: FormValues): Promise<boolean> => {
    try {
      setIsSaving(true)
      if (isEditing && initialData) {
        await updateQuestion.mutateAsync({ testId, questionId: initialData.id, dto: { text: data.text, type: data.type, sectionId: data.sectionId || undefined, order: data.order, imageUrl: data.imageUrl || null, displayStyle: data.displayStyle || undefined, optionImageEnabled: data.optionImageEnabled ?? false } })
        const formOptionIds = new Set(data.options.filter((o) => o.id).map((o) => o.id!))
        for (const existingOpt of initialData.options ?? []) { if (!formOptionIds.has(existingOpt.id)) await deleteOption.mutateAsync({ testId, optionId: existingOpt.id }) }
        const savedOptions: Array<{ optionId: string, scores: Record<string, number | ''> }> = []
        for (const formOpt of data.options) {
          if (formOpt.id) {
            await updateOption.mutateAsync({ testId, optionId: formOpt.id, dto: { text: formOpt.text, order: formOpt.order, imageUrl: formOpt.imageUrl || null } })
            savedOptions.push({ optionId: formOpt.id, scores: formOpt.scores })
          } else {
            const created = await createOption.mutateAsync({ testId, questionId: initialData.id, dto: { questionId: initialData.id, text: formOpt.text, order: formOpt.order, imageUrl: formOpt.imageUrl || null } })
            savedOptions.push({ optionId: created.id, scores: formOpt.scores })
          }
        }
        for (const existingOpt of initialData.options ?? []) { for (const mapping of existingOpt.mappings ?? []) await deleteMapping.mutateAsync({ testId, mappingId: mapping.id }) }
        for (const saved of savedOptions) {
          for (const [indicatorId, value] of Object.entries(saved.scores)) {
            if (value !== '' && value !== null) await createMapping.mutateAsync({ testId, optionId: saved.optionId, dto: { indicatorId, scoreValue: Number(value) } })
          }
        }
      } else {
        const question = await createQuestion.mutateAsync({ testId, text: data.text, type: data.type, sectionId: data.sectionId || undefined, order: data.order, imageUrl: data.imageUrl || null, displayStyle: data.displayStyle || undefined, optionImageEnabled: data.optionImageEnabled ?? false })
        for (const formOpt of data.options) {
          const createdOpt = await createOption.mutateAsync({ testId, questionId: question.id, dto: { questionId: question.id, text: formOpt.text, order: formOpt.order, imageUrl: formOpt.imageUrl || null } })
          for (const [indicatorId, value] of Object.entries(formOpt.scores)) {
            if (value !== '' && value !== null) await createMapping.mutateAsync({ testId, optionId: createdOpt.id, dto: { indicatorId, scoreValue: Number(value) } })
          }
        }
      }
      await queryClient.invalidateQueries({ queryKey: adminKeys.questions(testId) })
      toast.success(isEditing ? 'Diperbarui' : 'Dibuat')
      return true
    } catch { toast.error('Gagal menyimpan'); return false }
    finally { setIsSaving(false) }
  }, [isEditing, initialData, testId, queryClient, createQuestion, updateQuestion, createOption, updateOption, deleteOption, createMapping, deleteMapping])

  const handleSaveAndClose = handleSubmit(async (data) => { if (await saveForm(data)) onSaved() })
  const handleSaveAndAddAnother = handleSubmit(async (data) => {
    if (await saveForm(data)) {
      const nextOrder = data.order + 1
      prevTypeRef.current = null
      reset({ text: '', type: data.type, sectionId: data.sectionId, order: nextOrder, imageUrl: null, displayStyle: data.displayStyle, optionImageEnabled: false, options: buildDefaultOptions(data.type) })
      setImagePreview(null)
      prevTypeRef.current = data.type
    }
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Section 1: Question Content */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
            <HelpCircle className="size-4" />
          </div>
          <h3 className="text-base font-black text-slate-900">Konten Pertanyaan</h3>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teks Soal</label>
          <Textarea
            placeholder="Ketik pertanyaan di sini..."
            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-sm font-medium min-h-[100px] p-4 resize-none"
            {...register('text')}
          />
          {errors.text && <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle className="size-3" />{errors.text.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe</label>
            <div ref={typeRef} className="relative">
              <button
                type="button"
                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-4 flex items-center justify-between text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-all"
              >
                <span>{QUESTION_TYPE_LABELS[questionType]}</span>
                <ChevronDown className={cn("size-4 text-slate-400 transition-transform", typeDropdownOpen && "rotate-180")} />
              </button>
              {typeDropdownOpen && (
                <div className="absolute z-20 top-full mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                  {Object.entries(QUESTION_TYPE_LABELS).map(([v, l]) => (
                    <div
                      key={v}
                      onClick={() => { setValue('type', v as QuestionType); setTypeDropdownOpen(false) }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-slate-50 last:border-0",
                        questionType === v ? "bg-indigo-50" : "hover:bg-slate-50"
                      )}
                    >
                      <p className="text-sm font-bold text-slate-700">{l}</p>
                      {questionType === v && <CheckCircle2 className="size-4 text-indigo-600" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {questionType === 'MULTIPLE_CHOICE' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gaya Tampilan</label>
              <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                {DISPLAY_STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setValue('displayStyle', style.value)}
                    className={cn(
                      "flex-1 px-2 py-1.5 rounded-lg text-xs font-black transition-all",
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

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seksi</label>
            <div ref={sectionRef} className="relative">
              <button
                type="button"
                onClick={() => setSectionDropdownOpen(!sectionDropdownOpen)}
                className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-4 flex items-center justify-between text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-all"
              >
                <span className={!watch('sectionId') ? 'text-slate-400' : ''}>
                  {watch('sectionId') ? (sections ?? []).find((s) => s.id === watch('sectionId'))?.name ?? 'Tanpa Seksi' : 'Tanpa Seksi'}
                </span>
                <ChevronDown className={cn("size-4 text-slate-400 transition-transform", sectionDropdownOpen && "rotate-180")} />
              </button>
              {sectionDropdownOpen && (
                <div className="absolute z-20 top-full mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                  <div
                    onClick={() => { setValue('sectionId', ''); setSectionDropdownOpen(false) }}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-slate-50",
                      !watch('sectionId') ? "bg-indigo-50" : "hover:bg-slate-50"
                    )}
                  >
                    <p className="text-sm font-bold text-slate-700">Tanpa Seksi</p>
                    {!watch('sectionId') && <CheckCircle2 className="size-4 text-indigo-600" />}
                  </div>
                  {(sections ?? []).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => { setValue('sectionId', s.id); setSectionDropdownOpen(false) }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-slate-50 last:border-0",
                        watch('sectionId') === s.id ? "bg-indigo-50" : "hover:bg-slate-50"
                      )}
                    >
                      <p className="text-sm font-bold text-slate-700">{s.name}</p>
                      {watch('sectionId') === s.id && <CheckCircle2 className="size-4 text-indigo-600" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</label>
            <Input type="number" className="h-10 rounded-xl bg-slate-50 border-slate-200 font-black text-sm" {...register('order', { valueAsNumber: true })} />
          </div>
        </div>

        {/* Image upload */}
        <div>
          {imagePreview ? (
            <div className="relative group w-fit">
              <Image src={imagePreview} alt="Preview" width={200} height={100} className="rounded-xl border border-slate-200 object-cover" unoptimized />
              <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 size-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <X className="size-3" />
              </button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2.5 text-xs font-bold text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors p-3 rounded-xl border border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 w-fit">
              <ImageIcon className="size-4" />
              <span>Lampirkan Gambar</span>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          )}
        </div>
      </div>

      {/* Image toggle for options */}
      {questionType !== 'ESSAY' && (
        <div className="flex items-center gap-3 px-1">
          <button
            type="button"
            onClick={() => {
              const current = watch('optionImageEnabled')
              setValue('optionImageEnabled', !current)
              if (current) {
                fields.forEach((_, idx) => setValue(`options.${idx}.imageUrl`, null))
              }
            }}
            className={cn(
              "relative w-10 h-[22px] rounded-full transition-colors",
              watch('optionImageEnabled') ? "bg-indigo-500" : "bg-slate-200"
            )}
          >
            <span className={cn(
              "absolute top-[2px] size-[18px] rounded-full bg-white shadow-sm transition-all",
              watch('optionImageEnabled') ? "left-[20px]" : "left-[2px]"
            )} />
          </button>
          <span className="text-xs font-bold text-slate-600">Opsi Jawaban Bergambar</span>
        </div>
      )}

      {/* Section 2: Options & Scoring */}
      {questionType !== 'ESSAY' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <Layout className="size-4" />
              </div>
              <h3 className="text-base font-black text-slate-900">Opsi & Penilaian</h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => append({ text: '', order: fields.length + 1, scores: {} })}
              className="h-9 rounded-xl font-black text-xs text-indigo-600 hover:bg-indigo-50"
            >
              <Plus className="size-3.5 mr-1.5" /> Tambah Opsi
            </Button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-14">#</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[180px]">Teks Jawaban</th>
                  {watch('optionImageEnabled') && (
                    <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20">Gambar</th>
                  )}
                  {(indicators ?? []).map(ind => (
                    <th key={ind.id} className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20">
                      <span className="truncate block max-w-[70px] mx-auto">{ind.name}</span>
                    </th>
                  ))}
                  <th className="px-3 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        className="h-9 w-12 text-center rounded-lg bg-slate-50 border-slate-200 text-xs font-black p-0"
                        {...register(`options.${index}.order`, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder={`Opsi ${index + 1}`}
                        className="h-9 rounded-lg bg-white border-slate-200 text-sm font-bold px-3 focus:ring-2 focus:ring-indigo-500/10"
                        {...register(`options.${index}.text`)}
                      />
                    </td>
                    {watch('optionImageEnabled') && (
                      <td className="px-3 py-3">
                        <OptionImageCell
                          imageUrl={watch(`options.${index}.imageUrl`)}
                          onUpload={async (file: File) => {
                            const result = await uploadImage.mutateAsync(file)
                            setValue(`options.${index}.imageUrl`, result.url)
                          }}
                          onRemove={() => setValue(`options.${index}.imageUrl`, null)}
                          uploading={uploadImage.isPending}
                        />
                      </td>
                    )}
                    {(indicators ?? []).map(ind => (
                      <td key={ind.id} className="px-3 py-3">
                        <Input
                          type="number"
                          placeholder="0"
                          className="h-9 w-16 mx-auto text-center rounded-lg bg-white border-slate-200 text-xs font-black p-0 focus:ring-2 focus:ring-teal-500/10"
                          {...register(`options.${index}.scores.${ind.id}`, { setValueAs: (v) => v === '' ? '' : Number(v) })}
                        />
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                        className="text-slate-300 hover:text-rose-500 transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="h-11 rounded-xl px-6 font-bold text-slate-400"
        >
          Batal
        </Button>
        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAndAddAnother}
            disabled={isSaving}
            className="h-11 rounded-xl px-6 font-black border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          >
            Simpan & Tambah Lagi
          </Button>
        )}
        <Button
          type="submit"
          onClick={handleSaveAndClose}
          disabled={isSaving}
          className="h-11 rounded-xl px-8 font-black bg-slate-900 hover:bg-slate-800 text-white shadow-lg active:scale-95 transition-all group"
        >
          {isSaving ? (
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <CheckCircle2 className="size-4 mr-2 group-hover:scale-110 transition-transform" />
          )}
          {isEditing ? 'Simpan Perubahan' : 'Selesai & Simpan'}
        </Button>
      </div>
    </div>
  )
}
