'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CalendarClock,
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Hourglass,
  Pencil,
  Trash2,
  FileText,
  MapPin,
  User,
  Mail,
  Award,
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
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

type ScheduleStatus = 'active' | 'upcoming' | 'completed'

const statusConfig: Record<ScheduleStatus, { label: string; badge: string; bannerGrad: string; iconBg: string }> = {
  active: { label: 'Aktif', badge: 'bg-indigo-500/20 text-indigo-300', bannerGrad: 'from-slate-900 via-slate-800 to-indigo-900', iconBg: 'from-indigo-400 to-indigo-500' },
  upcoming: { label: 'Mendatang', badge: 'bg-indigo-500/20 text-indigo-300', bannerGrad: 'from-slate-900 via-slate-800 to-indigo-900', iconBg: 'from-indigo-400 to-indigo-500' },
  completed: { label: 'Selesai', badge: 'bg-slate-500/20 text-slate-300', bannerGrad: 'from-slate-900 via-slate-800 to-slate-700', iconBg: 'from-slate-400 to-slate-500' },
}

const dummySchedules: Record<string, {
  id: string; testName: string; description: string; startDate: string; endDate: string; status: ScheduleStatus
  participants: number; maxParticipants: number; location: string; createdBy: string
  registeredUsers: { id: string; name: string; email: string; status: 'completed' | 'registered' | 'in_progress'; score: number }[]
}> = {
  '1': {
    id: '1', testName: 'Tes Kepribadian MBTI', description: 'Sesi tes kepribadian MBTI untuk batch Maret 2026. Terbuka untuk umum dengan kuota terbatas.',
    startDate: '2026-03-01T08:00:00Z', endDate: '2026-03-31T23:59:00Z', status: 'active',
    participants: 45, maxParticipants: 100, location: 'Online', createdBy: 'Admin Utama',
    registeredUsers: [
      { id: '1', name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', status: 'completed', score: 87 },
      { id: '2', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@email.com', status: 'completed', score: 92 },
      { id: '3', name: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'in_progress', score: 0 },
      { id: '4', name: 'Dewi Lestari', email: 'dewi.lestari@email.com', status: 'completed', score: 90 },
      { id: '5', name: 'Anisa Rahma', email: 'anisa.rahma@email.com', status: 'registered', score: 0 },
    ],
  },
  '2': {
    id: '2', testName: 'Tes Minat Bakat RIASEC', description: 'Tes minat bakat untuk membantu peserta menemukan karir yang sesuai.',
    startDate: '2026-03-15T08:00:00Z', endDate: '2026-04-15T23:59:00Z', status: 'active',
    participants: 28, maxParticipants: 50, location: 'Online', createdBy: 'Admin Utama',
    registeredUsers: [
      { id: '1', name: 'Hendra Wijaya', email: 'hendra.wijaya@email.com', status: 'completed', score: 84 },
      { id: '2', name: 'Putri Amelia', email: 'putri.amelia@email.com', status: 'completed', score: 78 },
      { id: '3', name: 'Fajar Nugroho', email: 'fajar.nugroho@email.com', status: 'registered', score: 0 },
    ],
  },
  '3': {
    id: '3', testName: 'Tes Intelegensi IST', description: 'Tes intelegensi komprehensif untuk mengukur kemampuan kognitif peserta.',
    startDate: '2026-04-01T08:00:00Z', endDate: '2026-04-30T23:59:00Z', status: 'upcoming',
    participants: 12, maxParticipants: 80, location: 'Online', createdBy: 'Admin Utama',
    registeredUsers: [
      { id: '1', name: 'Maya Putri', email: 'maya.putri@email.com', status: 'registered', score: 0 },
      { id: '2', name: 'Rizky Pratama', email: 'rizky.pratama@email.com', status: 'registered', score: 0 },
    ],
  },
  '4': {
    id: '4', testName: 'Rekrutmen Batch 5 - PT Maju Jaya', description: 'Paket tes rekrutmen untuk seleksi karyawan baru PT Maju Jaya batch ke-5.',
    startDate: '2026-04-10T08:00:00Z', endDate: '2026-04-12T17:00:00Z', status: 'upcoming',
    participants: 0, maxParticipants: 200, location: 'Gedung Serbaguna Lt. 3, Jakarta', createdBy: 'Admin HR',
    registeredUsers: [],
  },
  '5': {
    id: '5', testName: 'Tes Kecerdasan Emosional', description: 'Tes EQ untuk mengukur kemampuan mengelola emosi.',
    startDate: '2026-04-20T08:00:00Z', endDate: '2026-05-20T23:59:00Z', status: 'upcoming',
    participants: 5, maxParticipants: 60, location: 'Online', createdBy: 'Admin Utama',
    registeredUsers: [
      { id: '1', name: 'Dewi Lestari', email: 'dewi.lestari@email.com', status: 'registered', score: 0 },
    ],
  },
  '6': {
    id: '6', testName: 'Tes Kepribadian MBTI - Batch Februari', description: 'Sesi tes MBTI batch Februari yang sudah selesai.',
    startDate: '2026-02-01T08:00:00Z', endDate: '2026-02-28T23:59:00Z', status: 'completed',
    participants: 78, maxParticipants: 100, location: 'Online', createdBy: 'Admin Utama',
    registeredUsers: [
      { id: '1', name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', status: 'completed', score: 85 },
      { id: '2', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@email.com', status: 'completed', score: 91 },
      { id: '3', name: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'completed', score: 74 },
      { id: '4', name: 'Anisa Rahma', email: 'anisa.rahma@email.com', status: 'completed', score: 81 },
    ],
  },
  '7': {
    id: '7', testName: 'Rekrutmen Batch 4 - PT Sejahtera', description: 'Paket tes rekrutmen PT Sejahtera yang sudah selesai.',
    startDate: '2026-02-15T08:00:00Z', endDate: '2026-02-17T17:00:00Z', status: 'completed',
    participants: 150, maxParticipants: 150, location: 'Aula Utama, Bandung', createdBy: 'Admin HR',
    registeredUsers: [
      { id: '1', name: 'Hendra Wijaya', email: 'hendra.wijaya@email.com', status: 'completed', score: 89 },
      { id: '2', name: 'Fajar Nugroho', email: 'fajar.nugroho@email.com', status: 'completed', score: 76 },
      { id: '3', name: 'Putri Amelia', email: 'putri.amelia@email.com', status: 'completed', score: 83 },
    ],
  },
  '8': {
    id: '8', testName: 'Tes Minat Bakat - Kelas 12 SMA', description: 'Tes minat bakat untuk siswa kelas 12 SMA se-Jabodetabek.',
    startDate: '2026-01-20T08:00:00Z', endDate: '2026-01-25T23:59:00Z', status: 'completed',
    participants: 320, maxParticipants: 350, location: 'Online', createdBy: 'Admin Pendidikan',
    registeredUsers: [
      { id: '1', name: 'Maya Putri', email: 'maya.putri@email.com', status: 'completed', score: 88 },
      { id: '2', name: 'Rizky Pratama', email: 'rizky.pratama@email.com', status: 'completed', score: 72 },
    ],
  },
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '-' }
}

function formatShortDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  } catch { return '-' }
}

const userRowColors = [
  { icon: 'bg-indigo-100 text-indigo-600' },
  { icon: 'bg-indigo-100 text-indigo-600' },
  { icon: 'bg-violet-100 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600' },
  { icon: 'bg-amber-100 text-amber-600' },
]

const userStatusConfig = {
  completed: { label: 'Selesai', badge: 'bg-indigo-50 text-indigo-600' },
  in_progress: { label: 'Mengerjakan', badge: 'bg-amber-50 text-amber-600' },
  registered: { label: 'Terdaftar', badge: 'bg-indigo-50 text-indigo-600' },
}

export default function ScheduleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const schedule = dummySchedules[params.scheduleId as string]

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formTestName, setFormTestName] = useState('')
  const [formStartDate, setFormStartDate] = useState('')
  const [formEndDate, setFormEndDate] = useState('')
  const [formMaxParticipants, setFormMaxParticipants] = useState(100)
  const [formError, setFormError] = useState('')

  if (!schedule) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <CalendarClock className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Jadwal tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID jadwal tidak valid.</p>
          <Button onClick={() => router.push('/admin/schedules')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const config = statusConfig[schedule.status]
  const pct = Math.round((schedule.participants / schedule.maxParticipants) * 100)
  const completedUsers = schedule.registeredUsers.filter((u) => u.status === 'completed').length

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className={cn('relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-8 md:p-10 text-white', config.bannerGrad)}>
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/schedules')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Jadwal</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={cn('size-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg text-white', config.iconBg)}>
                <CalendarDays className="size-7" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', config.badge)}>
                    {config.label}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{schedule.testName}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{schedule.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setFormTestName(schedule.testName)
                  setFormStartDate(schedule.startDate.split('T')[0])
                  setFormEndDate(schedule.endDate.split('T')[0])
                  setFormMaxParticipants(schedule.maxParticipants)
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
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Users className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{schedule.participants}<span className="text-sm font-bold text-slate-400">/{schedule.maxParticipants}</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Peserta</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{completedUsers}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Clock className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatShortDate(schedule.startDate)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mulai</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <CalendarDays className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatShortDate(schedule.endDate)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <CalendarClock className="size-72" />
        </div>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT: Peserta Terdaftar */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Users className="size-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Peserta Terdaftar</h2>
                <p className="text-xs text-slate-400 font-medium">{schedule.registeredUsers.length} peserta ditampilkan</p>
              </div>
            </div>
            {schedule.registeredUsers.length === 0 ? (
              <div className="p-12 text-center">
                <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <Users className="size-6 text-slate-300" />
                </div>
                <p className="text-slate-400 font-bold text-sm">Belum ada peserta terdaftar.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {schedule.registeredUsers.map((user, index) => {
                  const rowColor = userRowColors[index % userRowColors.length]
                  const uStatus = userStatusConfig[user.status]
                  return (
                    <div key={user.id} className="px-8 py-4 flex items-center gap-5 group hover:bg-slate-50/50 transition-all">
                      <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', rowColor.icon)}>
                        <User className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <h4 className="text-sm font-black text-slate-900 truncate">{user.name}</h4>
                          <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', uStatus.badge)}>
                            {uStatus.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Mail className="size-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                      {user.status === 'completed' && (
                        <div className="flex items-center gap-1.5 text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full shrink-0">
                          <Award className="size-3.5" />
                          <span>{user.score}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Info Jadwal + Progress */}
        <div className="md:col-span-5 space-y-6">
          {/* Info */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FileText className="size-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Detail Jadwal</h2>
                <p className="text-xs text-slate-400 font-medium">Informasi lengkap jadwal</p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { label: 'Tanggal Mulai', value: formatDate(schedule.startDate), icon: <Play className="size-4" />, color: 'bg-indigo-100 text-indigo-600' },
                { label: 'Tanggal Selesai', value: formatDate(schedule.endDate), icon: <CheckCircle2 className="size-4" />, color: 'bg-rose-100 text-rose-600' },
                { label: 'Lokasi', value: schedule.location, icon: <MapPin className="size-4" />, color: 'bg-violet-100 text-violet-600' },
                { label: 'Dibuat Oleh', value: schedule.createdBy, icon: <User className="size-4" />, color: 'bg-indigo-100 text-indigo-600' },
              ].map((item, i) => (
                <div key={i} className="px-8 py-4 flex items-center gap-4">
                  <div className={cn('size-9 rounded-xl flex items-center justify-center shrink-0', item.color)}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    <p className="text-sm font-black text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Hourglass className="size-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Kapasitas</h2>
                <p className="text-xs text-slate-400 font-medium">Progress pendaftaran peserta</p>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black text-slate-900">{schedule.participants} dari {schedule.maxParticipants}</span>
                <span className="text-sm font-black text-slate-400">{pct}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-1000', schedule.status === 'active' ? 'bg-indigo-500' : schedule.status === 'upcoming' ? 'bg-indigo-500' : 'bg-slate-400')}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 font-medium mt-2">
                {schedule.maxParticipants - schedule.participants} slot tersisa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                <CalendarClock className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">Edit Jadwal</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">Perbarui informasi jadwal tes.</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Tes</Label>
                <Input
                  placeholder="Misal: Tes Kepribadian MBTI"
                  value={formTestName}
                  onChange={(e) => { setFormTestName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal Mulai</Label>
                  <Input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => { setFormStartDate(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal Selesai</Label>
                  <Input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => { setFormEndDate(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Maks. Peserta</Label>
                <Input
                  type="number"
                  value={formMaxParticipants}
                  onChange={(e) => setFormMaxParticipants(Number(e.target.value))}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm w-28 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              {formError && (
                <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle className="size-3" />{formError}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => {
                  if (!formTestName.trim()) { setFormError('Nama tes wajib diisi.'); return }
                  if (!formStartDate) { setFormError('Tanggal mulai wajib diisi.'); return }
                  if (!formEndDate) { setFormError('Tanggal selesai wajib diisi.'); return }
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
        title="Hapus Jadwal"
        description="Apakah Anda yakin ingin menghapus jadwal ini? Peserta yang sudah terdaftar akan kehilangan akses."
        onConfirm={() => { setDeleteOpen(false); router.push('/admin/schedules') }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}
