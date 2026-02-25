'use client'

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
import { Plus, Trash2 } from 'lucide-react'
import {
  useCreateQuestion,
  useCreateOption,
  useSections,
} from '../../hooks'
import { createQuestionSchema, type CreateQuestionFormData } from '../../schemas'
import { FormField } from '../Common/FormField'

interface QuestionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
}

interface QuestionFormValues extends CreateQuestionFormData {
  options?: Array<{ text: string; order: number }>
}

export function QuestionForm({
  open,
  onOpenChange,
  testId,
}: QuestionFormProps) {
  const createQuestion = useCreateQuestion()
  const createOption = useCreateOption()
  const { data: sections } = useSections(testId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      order: 0,
      type: 'MULTIPLE_CHOICE',
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

  const questionType = watch('type')
  const showOptions =
    questionType === 'MULTIPLE_CHOICE' || questionType === 'TRUE_FALSE'

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      // Create question first
      const questionData = {
        testId,
        text: data.text,
        type: data.type,
        sectionId: data.sectionId,
        order: data.order,
      }

      const question = await createQuestion.mutateAsync(questionData)

      // Create options if applicable
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
    } catch (error) {
      console.error('Error creating question:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Pertanyaan</DialogTitle>
          <DialogDescription>
            Isi informasi pertanyaan untuk tes ini
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Teks Pertanyaan" error={errors.text} required>
            <Textarea
              placeholder="Masukkan teks pertanyaan..."
              {...register('text')}
            />
          </FormField>

          <FormField label="Tipe Pertanyaan" error={errors.type} required>
            <Select defaultValue="MULTIPLE_CHOICE">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MULTIPLE_CHOICE">Pilihan Ganda</SelectItem>
                <SelectItem value="TRUE_FALSE">Benar/Salah</SelectItem>
                <SelectItem value="RATING_SCALE">Skala Rating</SelectItem>
                <SelectItem value="ESSAY">Essay</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Seksi (Opsional)" error={errors.sectionId}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih seksi..." />
              </SelectTrigger>
              <SelectContent>
                {sections?.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Urutan" error={errors.order} required>
            <Input
              type="number"
              placeholder="0"
              {...register('order', { valueAsNumber: true })}
            />
          </FormField>

          {showOptions && (
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Opsi</label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    append({
                      text: '',
                      order: fields.length,
                    })
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

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createQuestion.isPending || createOption.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={createQuestion.isPending || createOption.isPending}
            >
              {createQuestion.isPending || createOption.isPending
                ? 'Menambah...'
                : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
