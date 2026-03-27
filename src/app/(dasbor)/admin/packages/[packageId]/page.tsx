'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Package,
  FileText,
  Clock,
  Users,
  BadgeDollarSign,
  CheckCircle2,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  BarChart3,
  AlertCircle,
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
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

const dummyPackages: Record<string, {
  id: string; name: string; description: string; price: number; estimatedDuration: number; isPublished: boolean; createdAt: string
  tests: { id: string; name: string; duration: number; questionsCount: number; order: number; isPublished: boolean }[]
}> = {
  '1': {
    id: '1', name: 'Paket Tes Kepribadian', description: 'Kumpulan tes untuk mengukur tipe kepribadian, karakter, dan gaya interaksi individu. Paket ini mencakup MBTI, Big Five, DISC, dan Enneagram.',
    price: 0, estimatedDuration: 90, isPublished: true, createdAt: '2026-01-10T08:00:00Z',
    tests: [
      { id: '1', name: 'Tes Kepribadian MBTI', duration: 45, questionsCount: 60, order: 1, isPublished: true },
      { id: '2', name: 'Tes Big Five Personality', duration: 30, questionsCount: 44, order: 2, isPublished: true },
      { id: '3', name: 'Tes DISC Assessment', duration: 25, questionsCount: 28, order: 3, isPublished: false },
      { id: '4', name: 'Tes Enneagram', duration: 35, questionsCount: 36, order: 4, isPublished: false },
    ],
  },
  '2': {
    id: '2', name: 'Paket Intelegensi & Kognitif', description: 'Tes komprehensif untuk mengukur kemampuan kognitif, verbal, numerik, dan logika. Cocok untuk asesmen kemampuan intelektual.',
    price: 150000, estimatedDuration: 120, isPublished: true, createdAt: '2026-01-12T10:00:00Z',
    tests: [
      { id: '1', name: 'Tes Intelegensi IST', duration: 60, questionsCount: 80, order: 1, isPublished: true },
      { id: '2', name: 'Tes IQ Standard', duration: 45, questionsCount: 50, order: 2, isPublished: true },
      { id: '3', name: 'Tes Logika & Penalaran', duration: 30, questionsCount: 40, order: 3, isPublished: true },
    ],
  },
  '3': {
    id: '3', name: 'Paket Minat & Bakat Karir', description: 'Identifikasi minat karir dan bakat alami untuk perencanaan masa depan.',
    price: 0, estimatedDuration: 60, isPublished: true, createdAt: '2026-01-15T14:00:00Z',
    tests: [
      { id: '1', name: 'Tes Minat Bakat RIASEC', duration: 35, questionsCount: 48, order: 1, isPublished: true },
      { id: '2', name: 'Tes Aptitude Battery', duration: 50, questionsCount: 60, order: 2, isPublished: false },
    ],
  },
  '4': {
    id: '4', name: 'Paket Rekrutmen Karyawan', description: 'Paket lengkap untuk proses seleksi dan rekrutmen karyawan baru perusahaan. Mencakup tes kompetensi, kepemimpinan, dan teamwork.',
    price: 350000, estimatedDuration: 180, isPublished: true, createdAt: '2026-02-01T09:00:00Z',
    tests: [
      { id: '1', name: 'Paket Rekrutmen Staff', duration: 90, questionsCount: 120, order: 1, isPublished: true },
      { id: '2', name: 'Tes Kompetensi Dasar', duration: 45, questionsCount: 60, order: 2, isPublished: true },
      { id: '3', name: 'Tes Kepemimpinan', duration: 35, questionsCount: 40, order: 3, isPublished: true },
      { id: '4', name: 'Tes Teamwork Assessment', duration: 25, questionsCount: 30, order: 4, isPublished: false },
      { id: '5', name: 'Paket Rekrutmen Manager', duration: 120, questionsCount: 150, order: 5, isPublished: true },
    ],
  },
  '5': {
    id: '5', name: 'Paket Kesehatan Mental', description: 'Skrining awal kesehatan mental: stres, kecemasan, dan kesejahteraan psikologis.',
    price: 0, estimatedDuration: 45, isPublished: true, createdAt: '2026-02-10T11:00:00Z',
    tests: [
      { id: '1', name: 'Tes Tingkat Stres', duration: 20, questionsCount: 30, order: 1, isPublished: true },
      { id: '2', name: 'Tes Kecemasan (GAD-7)', duration: 10, questionsCount: 7, order: 2, isPublished: true },
      { id: '3', name: 'Tes Depresi (PHQ-9)', duration: 10, questionsCount: 9, order: 3, isPublished: true },
    ],
  },
  '6': {
    id: '6', name: 'Paket Kecerdasan Emosional', description: 'Mengukur kemampuan mengelola emosi, empati, dan keterampilan sosial.',
    price: 99000, estimatedDuration: 60, isPublished: false, createdAt: '2026-02-20T13:00:00Z',
    tests: [
      { id: '1', name: 'Tes Kecerdasan Emosional', duration: 40, questionsCount: 50, order: 1, isPublished: true },
      { id: '2', name: 'Tes EQ Workplace', duration: 30, questionsCount: 35, order: 2, isPublished: false },
    ],
  },
}

function formatDate(dateStr: string) {
  try { return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) } catch { return '-' }
}

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const testRowColors = [
  { icon: 'bg-indigo-100 text-indigo-600' },
  { icon: 'bg-teal-100 text-teal-600' },
  { icon: 'bg-violet-100 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600' },
  { icon: 'bg-amber-100 text-amber-600' },
]

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const pkg = dummyPackages[params.packageId as string]

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formDuration, setFormDuration] = useState(60)
  const [formError, setFormError] = useState('')

  if (!pkg) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Paket tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID paket tidak valid.</p>
          <Button onClick={() => router.push('/admin/packages')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isFree = pkg.price === 0
  const publishedTests = pkg.tests.filter((t) => t.isPublished).length
  const totalQuestions = pkg.tests.reduce((sum, t) => sum + t.questionsCount, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/packages')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Paket</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg">
                <Package className="size-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    pkg.isPublished ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300'
                  )}>
                    {pkg.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    isFree ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-500/20 text-amber-300'
                  )}>
                    {formatPrice(pkg.price)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{pkg.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{pkg.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setFormName(pkg.name)
                  setFormDesc(pkg.description)
                  setFormPrice(pkg.price)
                  setFormDuration(pkg.estimatedDuration)
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
                <p className="text-2xl font-black leading-none">{pkg.tests.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{publishedTests}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Published</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Clock className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{pkg.estimatedDuration}<span className="text-sm font-bold text-slate-400">m</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Durasi</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <BarChart3 className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{totalQuestions}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Soal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Package className="size-72" />
        </div>
      </div>

      {/* DAFTAR TES DALAM PAKET */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <BarChart3 className="size-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Daftar Tes dalam Paket</h2>
            <p className="text-xs text-slate-400 font-medium">{pkg.tests.length} tes, urutan pengerjaan dari atas ke bawah</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {pkg.tests.sort((a, b) => a.order - b.order).map((test, index) => {
            const rowColor = testRowColors[index % testRowColors.length]
            return (
              <div key={test.id} className="px-8 py-5 flex items-center gap-5 group hover:bg-slate-50/50 transition-all">
                {/* Order number */}
                <div className="flex items-center gap-2">
                  <GripVertical className="size-4 text-slate-300" />
                  <span className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
                    {test.order}
                  </span>
                </div>

                {/* Icon */}
                <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', rowColor.icon)}>
                  <FileText className="size-5" />
                </div>

                {/* Info */}
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
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                <Package className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">Edit Paket</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">Perbarui informasi paket.</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Paket</Label>
                <Input value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm" />
                {formError && <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle className="size-3" />{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harga (Rp)</Label>
                  <Input type="number" value={formPrice} onChange={(e) => setFormPrice(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimasi (Menit)</Label>
                  <Input type="number" value={formDuration} onChange={(e) => setFormDuration(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={() => { if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }; setEditOpen(false) }} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md active:scale-95">
                Simpan
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setEditOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={deleteOpen}
        title="Hapus Paket"
        description="Apakah Anda yakin ingin menghapus paket ini? Tes yang terkait tidak akan terhapus."
        onConfirm={() => { setDeleteOpen(false); router.push('/admin/packages') }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}
