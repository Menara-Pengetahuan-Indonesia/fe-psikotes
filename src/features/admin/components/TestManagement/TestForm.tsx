'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FileEdit,
  Clock,
  Settings2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Package,
  Shield,
  Award,
  ChevronDown,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useCreateTest, useUpdateTest } from '../../hooks'
import { createTestSchema, type CreateTestFormData } from '../../schemas'
import type { Test } from '../../types'
import { cn } from '@/lib/utils'

const AVAILABLE_PACKAGES = [
  { id: '1', name: 'Paket Tes Kepribadian', price: 0 },
  { id: '2', name: 'Paket Intelegensi & Kognitif', price: 150000 },
  { id: '3', name: 'Paket Minat & Bakat Karir', price: 0 },
  { id: '4', name: 'Paket Rekrutmen Karyawan', price: 350000 },
  { id: '5', name: 'Paket Kesehatan Mental', price: 0 },
  { id: '6', name: 'Paket Kecerdasan Emosional', price: 99000 },
]

const POPULARITY_OPTIONS = [
  { value: '', label: 'Pilih...' },
  { value: 'COMMON', label: 'Umum di Indonesia' },
  { value: 'LESS_COMMON', label: 'Kurang Umum' },
  { value: 'UNCOMMON', label: 'Tidak Umum' },
]

interface TestFormProps {
  initialData?: Test
  onSuccess?: (data?: Test) => void
}

export function TestForm({ initialData, onSuccess }: TestFormProps) {
  const router = useRouter()
  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const isEditing = !!initialData

  const [originalYear, setOriginalYear] = useState<string>(initialData?.originalYear?.toString() ?? '')
  const [adaptationYear, setAdaptationYear] = useState<string>(initialData?.adaptationYear?.toString() ?? '')
  const [precisionLevel, setPrecisionLevel] = useState<string>(initialData?.precisionLevel?.toString() ?? '')
  const [popularity, setPopularity] = useState<string>(initialData?.popularity ?? '')
  const [selectedPackages, setSelectedPackages] = useState<string[]>(initialData?.packageIds ?? [])
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false)
  const [popularityDropdownOpen, setPopularityDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const popularityRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPackageDropdownOpen(false)
      }
      if (popularityRef.current && !popularityRef.current.contains(e.target as Node)) {
        setPopularityDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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

  const togglePackage = (id: string) => {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Identitas Tes */}
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
                  rows={4}
                  className={cn(
                    "rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all p-4 font-medium text-slate-600 leading-relaxed",
                    errors.description && "border-rose-300 focus:ring-rose-500/10"
                  )}
                  {...register('description')}
                />
              </div>
            </div>
          </div>

          {/* Referensi */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-visible">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <BookOpen className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Referensi</h3>
                <p className="text-xs text-slate-400 font-medium">Metadata alat tes</p>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tahun Original</Label>
                  <Input type="number" placeholder="1962" value={originalYear} onChange={(e) => setOriginalYear(e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tahun Adaptasi</Label>
                  <Input type="number" placeholder="2020" value={adaptationYear} onChange={(e) => setAdaptationYear(e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Presisi (%)</Label>
                  <div className="relative">
                    <Input type="number" placeholder="85" value={precisionLevel} onChange={(e) => setPrecisionLevel(e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black pr-10" />
                    <Shield className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Popularitas</Label>
                  <div ref={popularityRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setPopularityDropdownOpen(!popularityDropdownOpen)}
                      className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 flex items-center justify-between text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-all"
                    >
                      <span className={!popularity ? 'text-slate-400' : ''}>
                        {popularity ? POPULARITY_OPTIONS.find((o) => o.value === popularity)?.label : 'Pilih...'}
                      </span>
                      <ChevronDown className={cn("size-4 text-slate-400 transition-transform", popularityDropdownOpen && "rotate-180")} />
                    </button>
                    {popularityDropdownOpen && (
                      <div className="absolute z-20 top-full mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        {POPULARITY_OPTIONS.filter((o) => o.value !== '').map((opt) => (
                          <div
                            key={opt.value}
                            onClick={() => { setPopularity(opt.value); setPopularityDropdownOpen(false) }}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-slate-50 last:border-0",
                              popularity === opt.value ? "bg-teal-50" : "hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Award className="size-4 text-slate-400" />
                              <p className="text-sm font-bold text-slate-700">{opt.label}</p>
                            </div>
                            {popularity === opt.value && <CheckCircle2 className="size-4 text-teal-600" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Waktu */}
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
                  <Input type="number" className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black pr-12" {...register('duration', { valueAsNumber: true })} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">MIN</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Per Soal (Detik)</Label>
                <div className="relative">
                  <Input type="number" placeholder="∞" className="h-11 rounded-xl bg-slate-50 border-slate-200 font-black pr-14" {...register('timePerQuestion', { setValueAs: (v) => (v === '' || v === undefined ? undefined : Number(v)) })} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">DETIK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Paket (Dropdown Multi-select) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-visible">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Package className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Paket</h3>
                <p className="text-xs text-slate-400 font-medium">Assign tes ke paket</p>
              </div>
            </div>
            <div className="p-8">
              <div ref={dropdownRef} className="relative">
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setPackageDropdownOpen(!packageDropdownOpen)}
                  className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 flex items-center justify-between text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-all"
                >
                  <span className={selectedPackages.length === 0 ? 'text-slate-400' : ''}>
                    {selectedPackages.length === 0 ? 'Pilih paket...' : `${selectedPackages.length} paket dipilih`}
                  </span>
                  <ChevronDown className={cn("size-4 text-slate-400 transition-transform", packageDropdownOpen && "rotate-180")} />
                </button>

                {/* Dropdown */}
                {packageDropdownOpen && (
                  <div className="absolute z-20 top-full mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                    {AVAILABLE_PACKAGES.map((pkg) => {
                      const isSelected = selectedPackages.includes(pkg.id)
                      const isFree = pkg.price === 0
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => togglePackage(pkg.id)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-slate-50 last:border-0",
                            isSelected ? "bg-violet-50" : "hover:bg-slate-50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("size-5 rounded-md border flex items-center justify-center transition-colors", isSelected ? "bg-violet-600 border-violet-600 text-white" : "border-slate-300 bg-white")}>
                              {isSelected && <CheckCircle2 className="size-3" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700">{pkg.name}</p>
                            </div>
                          </div>
                          <span className={cn("text-[9px] font-black uppercase tracking-widest", isFree ? "text-teal-500" : "text-amber-500")}>
                            {isFree ? 'Gratis' : `Rp ${pkg.price.toLocaleString('id-ID')}`}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Selected tags */}
              {selectedPackages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPackages.map((id) => {
                    const pkg = AVAILABLE_PACKAGES.find((p) => p.id === id)
                    if (!pkg) return null
                    return (
                      <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-bold">
                        {pkg.name}
                        <button type="button" onClick={() => togglePackage(id)} className="hover:text-violet-800">
                          <X className="size-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}
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
