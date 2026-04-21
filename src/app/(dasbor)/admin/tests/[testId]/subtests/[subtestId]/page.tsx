'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  GripVertical,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import {
  useSubTest,
  useQuestions,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from '@/features/admin/hooks'
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_COLORS } from '@/features/admin/constants'
import type { Question, QuestionType } from '@/features/admin/types'

export default function SubTestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const subtestId = params.subtestId as string

  const { data: subTest, isLoading: stLoading, error: stError } = useSubTest(subtestId)
  const { data: allQuestions } = useQuestions()

  const questions = (allQuestions ?? [])
    .filter((q) => q.subTestId === subtestId)
    .sort((a, b) => a.order - b.order)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Question | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formText, setFormText] = useState('')
  const [formType, setFormType] = useState<QuestionType>('MULTIPLE_CHOICE')
  const [formOrder, setFormOrder] = useState(0)
  const [formPoints, setFormPoints] = useState(1)
  const [formError, setFormError] = useState('')

  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const deleteQuestion = useDeleteQuestion()

  const filtered = questions.filter(
    (q) =>
      !search ||
      q.questionText.toLowerCase().includes(search.toLowerCase()),
  )

  const typeCount = (type: QuestionType) => questions.filter((q) => q.questionType === type).length

  const openCreate = () => {
    setEditData(null)
    setFormText('')
    setFormType('MULTIPLE_CHOICE')
    setFormOrder(questions.length)
    setFormPoints(1)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (q: Question) => {
    setEditData(q)
    setFormText(q.questionText)
    setFormType(q.questionType)
    setFormOrder(q.order)
    setFormPoints(q.points ?? 0)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formText.trim()) {
      setFormError('Teks soal wajib diisi.')
      return
    }
    const dto = {
      questionText: formText.trim(),
      questionType: formType,
      order: formOrder,
      points: formPoints,
    }
    if (editData) {
      updateQuestion.mutate(
        { id: editData.id, dto },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createQuestion.mutate(
        { subTestId: subtestId, ...dto },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (stLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (stError || !subTest) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Layers className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Sub-tes tidak ditemukan.</p>
          <Button
            onClick={() => router.push(`/admin/tests/${testId}`)}
            className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800"
          >
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-fuchsia-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push(`/admin/tests/${testId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Sub-Tes</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg">
                <Layers className="size-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                      subTest.isActive
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-slate-500/20 text-slate-300',
                    )}
                  >
                    {subTest.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  {subTest.duration != null && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 flex items-center gap-1">
                      <Clock className="size-3" />
                      {subTest.duration} menit
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                  {subTest.name}
                </h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">
                  {subTest.description}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-white text-slate-900 hover:bg-fuchsia-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Soal
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-fuchsia-500/30 flex items-center justify-center">
                <HelpCircle className="size-5 text-fuchsia-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{questions.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Soal</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-sky-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{typeCount('MULTIPLE_CHOICE')}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pilgan</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
                <FileText className="size-5 text-amber-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{typeCount('ESSAY')}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Esai</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <GripVertical className="size-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{typeCount('SCALE_RATING')}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Skala</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <HelpCircle className="size-72" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Cari soal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-fuchsia-500/10"
        />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-fuchsia-50 flex items-center justify-center mb-5">
            <HelpCircle className="size-8 text-fuchsia-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada soal.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((q) => {
            const typeLabel = QUESTION_TYPE_LABELS[q.questionType] ?? q.questionType
            const typeColor = QUESTION_TYPE_COLORS[q.questionType] ?? 'bg-slate-100 text-slate-600'
            return (
              <div
                key={q.id}
                className="group flex items-start gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex items-center gap-3 shrink-0 pt-0.5">
                  <span className="text-xs font-black text-slate-300 w-6 text-right">
                    #{q.order}
                  </span>
                  <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <HelpCircle className="size-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full', typeColor)}>
                      {typeLabel}
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      {q.points} poin
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-fuchsia-600 transition-colors">
                    {q.questionText}
                  </p>
                  {q.options && q.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {q.options.slice(0, 4).map((opt, i) => (
                        <span
                          key={i}
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-lg',
                            opt.isCorrect
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'bg-slate-50 text-slate-400',
                          )}
                        >
                          {opt.optionText.length > 30
                            ? opt.optionText.slice(0, 30) + '...'
                            : opt.optionText}
                        </span>
                      ))}
                      {q.options.length > 4 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-400">
                          +{q.options.length - 4} lainnya
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <button
                    onClick={() => openEdit(q)}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(q.id)}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[520px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-fuchsia-500 text-white flex items-center justify-center">
                <HelpCircle className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Soal' : 'Soal Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi soal.' : 'Tambah soal baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teks Soal</Label>
                <Textarea
                  placeholder="Tulis pertanyaan di sini..."
                  value={formText}
                  onChange={(e) => { setFormText(e.target.value); setFormError('') }}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[100px] resize-none focus:bg-white focus:ring-2 focus:ring-fuchsia-500/10"
                />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe</Label>
                  <Select value={formType} onValueChange={(v) => setFormType(v as QuestionType)}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MULTIPLE_CHOICE">Pilihan Ganda</SelectItem>
                      <SelectItem value="CHECKBOX">Checkbox</SelectItem>
                      <SelectItem value="SCALE_RATING">Skala</SelectItem>
                      <SelectItem value="ESSAY">Esai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</Label>
                  <Input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Poin</Label>
                  <Input
                    type="number"
                    value={formPoints}
                    onChange={(e) => setFormPoints(Number(e.target.value))}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={createQuestion.isPending || updateQuestion.isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm"
                onClick={() => setFormOpen(false)}
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Soal"
        description="Apakah Anda yakin ingin menghapus soal ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
