'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FileEdit,
  Clock,
  Settings2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useCreateTest, useUpdateTest } from '../../hooks'
import { createTestSchema, type CreateTestFormData } from '../../schemas'
import type { Test } from '../../types'
import { cn } from '@/lib/utils'

interface TestFormProps {
  initialData?: Test
  onSuccess?: (data?: Test) => void
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
        { onSuccess: () => onSuccess?.() },
      )
    } else {
      createTest.mutate(payload, {
        onSuccess: (newTest) => {
          if (onSuccess) {
            onSuccess(newTest)
          } else {
            router.push('/admin/tests')
          }
        },
      })
    }
  }

  const isPending = createTest.isPending || updateTest.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT: Main Info */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                <FileEdit className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Identitas Tes</h3>
                <p className="text-xs text-slate-400 font-medium">Nama dan deskripsi instrumen</p>
              </div>
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Nama Tes</Label>
                <Input
                  id="name"
                  placeholder="Misal: Tes Minat & Bakat Siswa"
                  className={cn(
                    "h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all px-4 font-bold",
                    errors.name && "border-rose-300 focus:ring-rose-500/10"
                  )}
                  {...register('name')}
                />
                {errors.name && <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5"><AlertCircle className="size-3" /> {errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-400">Deskripsi & Instruksi</Label>
                <Textarea
                  id="description"
                  placeholder="Berikan panduan atau deskripsi tentang tes ini..."
                  rows={7}
                  className={cn(
                    "rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all p-4 font-medium text-slate-600 leading-relaxed",
                    errors.description && "border-rose-300 focus:ring-rose-500/10"
                  )}
                  {...register('description')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Config */}
        <div className="md:col-span-5 space-y-6">
          {/* Duration */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Clock className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Waktu</h3>
                <p className="text-xs text-slate-400 font-medium">Durasi pengerjaan tes</p>
              </div>
            </div>

            <div className="p-8 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Durasi (Menit)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black pr-12"
                    {...register('duration', { valueAsNumber: true })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">MIN</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Per Soal (Detik)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="∞"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black pr-14"
                    {...register('timePerQuestion', {
                      setValueAs: (v) => (v === '' || v === undefined ? undefined : Number(v)),
                    })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">DETIK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <Settings2 className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Opsi</h3>
                <p className="text-xs text-slate-400 font-medium">Pengaturan pengacakan</p>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                  shuffleQuestions ? "bg-indigo-50 border-indigo-100" : "bg-slate-50 border-slate-100"
                )}
                onClick={() => setValue('shuffleQuestions', !shuffleQuestions)}
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">Acak Soal</p>
                  <p className="text-[10px] text-slate-400 font-medium">Urutan soal diacak per peserta</p>
                </div>
                <Checkbox
                  className="rounded-md size-5 pointer-events-none"
                  checked={shuffleQuestions}
                />
              </div>

              <div
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                  shuffleOptions ? "bg-indigo-50 border-indigo-100" : "bg-slate-50 border-slate-100"
                )}
                onClick={() => setValue('shuffleOptions', !shuffleOptions)}
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">Acak Opsi</p>
                  <p className="text-[10px] text-slate-400 font-medium">Pilihan jawaban diacak</p>
                </div>
                <Checkbox
                  className="rounded-md size-5 pointer-events-none"
                  checked={shuffleOptions}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-lg transition-all active:scale-95 group"
          >
            {isPending ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="size-5 mr-2 group-hover:scale-110 transition-transform" />
            )}
            {isEditing ? 'Simpan Perubahan' : 'Buat Sekarang'}
          </Button>
        </div>
      </div>
    </form>
  )
}
