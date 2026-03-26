'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Tag,
  Brain,
  TrendingUp,
  BookOpen,
  Heart,
  Briefcase,
  Smile,
  FileText,
  Clock,
  Calendar,
  Pencil,
  Trash2,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
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
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

const categoryIcons = [Brain, TrendingUp, BookOpen, Heart, Briefcase, Smile]

const dummyCategories: Record<string, {
  id: string
  name: string
  description: string
  testsCount: number
  color: string
  iconBg: string
  createdAt: string
  tests: { id: string; name: string; isPublished: boolean; duration: number; questionsCount: number; participantsCount: number }[]
}> = {
  '1': {
    id: '1', name: 'Kepribadian', description: 'Tes untuk mengukur tipe dan karakter kepribadian seseorang. Kategori ini mencakup berbagai instrumen seperti MBTI, Big Five, dan DISC yang membantu memahami pola perilaku, preferensi, dan gaya interaksi individu.',
    testsCount: 4, color: 'from-indigo-400 to-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600', createdAt: '2026-01-10T08:00:00Z',
    tests: [
      { id: '1', name: 'Tes Kepribadian MBTI', isPublished: true, duration: 45, questionsCount: 60, participantsCount: 234 },
      { id: '2', name: 'Tes Big Five Personality', isPublished: true, duration: 30, questionsCount: 44, participantsCount: 156 },
      { id: '3', name: 'Tes DISC Assessment', isPublished: false, duration: 25, questionsCount: 28, participantsCount: 0 },
      { id: '4', name: 'Tes Enneagram', isPublished: false, duration: 35, questionsCount: 36, participantsCount: 0 },
    ],
  },
  '2': {
    id: '2', name: 'Intelegensi', description: 'Tes untuk mengukur kemampuan kognitif dan kecerdasan umum. Meliputi tes verbal, numerik, spasial, dan logika yang memberikan gambaran komprehensif tentang kapasitas intelektual seseorang.',
    testsCount: 3, color: 'from-teal-400 to-teal-500', iconBg: 'bg-teal-100 text-teal-600', createdAt: '2026-01-12T10:00:00Z',
    tests: [
      { id: '1', name: 'Tes Intelegensi IST', isPublished: true, duration: 60, questionsCount: 80, participantsCount: 189 },
      { id: '2', name: 'Tes IQ Standard', isPublished: true, duration: 45, questionsCount: 50, participantsCount: 312 },
      { id: '3', name: 'Tes Logika & Penalaran', isPublished: true, duration: 30, questionsCount: 40, participantsCount: 98 },
    ],
  },
  '3': {
    id: '3', name: 'Minat & Bakat', description: 'Tes untuk mengidentifikasi minat karir dan bakat alami. Membantu individu menemukan bidang yang sesuai dengan potensi dan preferensi mereka.',
    testsCount: 2, color: 'from-violet-400 to-violet-500', iconBg: 'bg-violet-100 text-violet-600', createdAt: '2026-01-15T14:00:00Z',
    tests: [
      { id: '1', name: 'Tes Minat Bakat RIASEC', isPublished: true, duration: 35, questionsCount: 48, participantsCount: 278 },
      { id: '2', name: 'Tes Aptitude Battery', isPublished: false, duration: 50, questionsCount: 60, participantsCount: 0 },
    ],
  },
  '4': {
    id: '4', name: 'Kecerdasan Emosional', description: 'Tes untuk mengukur kemampuan mengelola emosi dan empati. Mengukur aspek kesadaran diri, regulasi emosi, motivasi, empati, dan keterampilan sosial.',
    testsCount: 2, color: 'from-rose-400 to-rose-500', iconBg: 'bg-rose-100 text-rose-600', createdAt: '2026-02-01T09:00:00Z',
    tests: [
      { id: '1', name: 'Tes Kecerdasan Emosional', isPublished: true, duration: 40, questionsCount: 50, participantsCount: 145 },
      { id: '2', name: 'Tes EQ Workplace', isPublished: false, duration: 30, questionsCount: 35, participantsCount: 0 },
    ],
  },
  '5': {
    id: '5', name: 'Rekrutmen', description: 'Paket tes khusus untuk proses seleksi dan rekrutmen karyawan. Kombinasi berbagai instrumen yang dirancang untuk menilai kesesuaian kandidat dengan posisi yang dilamar.',
    testsCount: 5, color: 'from-amber-400 to-amber-500', iconBg: 'bg-amber-100 text-amber-600', createdAt: '2026-02-10T11:00:00Z',
    tests: [
      { id: '1', name: 'Paket Rekrutmen Staff', isPublished: true, duration: 90, questionsCount: 120, participantsCount: 450 },
      { id: '2', name: 'Paket Rekrutmen Manager', isPublished: true, duration: 120, questionsCount: 150, participantsCount: 89 },
      { id: '3', name: 'Tes Kompetensi Dasar', isPublished: true, duration: 45, questionsCount: 60, participantsCount: 567 },
      { id: '4', name: 'Tes Kepemimpinan', isPublished: true, duration: 35, questionsCount: 40, participantsCount: 123 },
      { id: '5', name: 'Tes Teamwork Assessment', isPublished: false, duration: 25, questionsCount: 30, participantsCount: 0 },
    ],
  },
  '6': {
    id: '6', name: 'Kesehatan Mental', description: 'Tes skrining awal untuk kesehatan mental dan kesejahteraan psikologis. Membantu mengidentifikasi potensi masalah kesehatan mental secara dini.',
    testsCount: 3, color: 'from-cyan-400 to-cyan-500', iconBg: 'bg-cyan-100 text-cyan-600', createdAt: '2026-02-20T13:00:00Z',
    tests: [
      { id: '1', name: 'Tes Tingkat Stres', isPublished: true, duration: 20, questionsCount: 30, participantsCount: 890 },
      { id: '2', name: 'Tes Kecemasan (GAD-7)', isPublished: true, duration: 10, questionsCount: 7, participantsCount: 1200 },
      { id: '3', name: 'Tes Depresi (PHQ-9)', isPublished: true, duration: 10, questionsCount: 9, participantsCount: 1050 },
    ],
  },
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '-' }
}

const testRowColors = [
  { icon: 'bg-indigo-100 text-indigo-600' },
  { icon: 'bg-teal-100 text-teal-600' },
  { icon: 'bg-violet-100 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600' },
  { icon: 'bg-amber-100 text-amber-600' },
]

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const category = dummyCategories[params.categoryId as string]

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formError, setFormError] = useState('')

  if (!category) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Tag className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Kategori tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID kategori tidak valid.</p>
          <Button onClick={() => router.push('/admin/categories')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const iconIndex = parseInt(category.id) - 1
  const IconComp = categoryIcons[iconIndex % categoryIcons.length]
  const publishedCount = category.tests.filter((t) => t.isPublished).length
  const totalParticipants = category.tests.reduce((sum, t) => sum + t.participantsCount, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/categories')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Kategori</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={cn('size-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg text-white', category.color)}>
                <IconComp className="size-7" />
              </div>
              <div>
                <p className="text-violet-300 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Kategori</p>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{category.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{category.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setFormName(category.name)
                  setFormDesc(category.description)
                  setFormError('')
                  setEditOpen(true)
                }}
              >
                <Pencil className="size-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-rose-400/30 text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="size-4 mr-2" /> Hapus
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <FileText className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{category.testsCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{publishedCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Published</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Users className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{totalParticipants.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Peserta</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Calendar className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatDate(category.createdAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dibuat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Tag className="size-72" />
        </div>
      </div>

      {/* DAFTAR TES */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <BarChart3 className="size-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Daftar Tes</h2>
            <p className="text-xs text-slate-400 font-medium">{category.tests.length} tes dalam kategori ini</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {category.tests.map((test, index) => {
            const rowColor = testRowColors[index % testRowColors.length]
            return (
              <div key={test.id} className="px-8 py-5 flex items-center gap-5 group hover:bg-slate-50/50 transition-all cursor-pointer">
                <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', rowColor.icon)}>
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h4 className="text-sm font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">{test.name}</h4>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      test.isPublished ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'
                    )}>
                      {test.isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="size-3" />{test.duration}m</span>
                    <span>{test.questionsCount} soal</span>
                    <span className="flex items-center gap-1"><Users className="size-3" />{test.participantsCount} peserta</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-[420px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Tag className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">Edit Kategori</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">Perbarui informasi kategori.</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Kategori</label>
                <Input
                  placeholder="Misal: Kepribadian"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
                {formError && (
                  <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1">
                    <AlertCircle className="size-3" />{formError}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</label>
                <Textarea
                  placeholder="Penjelasan singkat..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[80px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => {
                  if (!formName.trim()) { setFormError('Nama kategori wajib diisi.'); return }
                  // dummy — just close
                  setEditOpen(false)
                }}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                Simpan
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setEditOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={deleteOpen}
        title="Hapus Kategori"
        description="Apakah Anda yakin ingin menghapus kategori ini? Tes yang terkait tidak akan terhapus, hanya pengelompokannya."
        onConfirm={() => { setDeleteOpen(false); router.push('/admin/categories') }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}
