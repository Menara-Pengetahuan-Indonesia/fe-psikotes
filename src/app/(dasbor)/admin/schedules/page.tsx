'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CalendarClock,
  Search,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Clock,
  Users,
  CheckCircle2,
  CalendarDays,
  Play,
  Hourglass,
  AlertCircle,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

type ScheduleStatus = 'active' | 'upcoming' | 'completed'

interface Schedule {
  id: string
  testName: string
  startDate: string
  endDate: string
  status: ScheduleStatus
  participants: number
  maxParticipants: number
}

const initialSchedules: Schedule[] = [
  { id: '1', testName: 'Tes Kepribadian MBTI', startDate: '2026-03-01', endDate: '2026-03-31', status: 'active', participants: 45, maxParticipants: 100 },
  { id: '2', testName: 'Tes Minat Bakat RIASEC', startDate: '2026-03-15', endDate: '2026-04-15', status: 'active', participants: 28, maxParticipants: 50 },
  { id: '3', testName: 'Tes Intelegensi IST', startDate: '2026-04-01', endDate: '2026-04-30', status: 'upcoming', participants: 12, maxParticipants: 80 },
  { id: '4', testName: 'Rekrutmen Batch 5 - PT Maju Jaya', startDate: '2026-04-10', endDate: '2026-04-12', status: 'upcoming', participants: 0, maxParticipants: 200 },
  { id: '5', testName: 'Tes Kecerdasan Emosional', startDate: '2026-04-20', endDate: '2026-05-20', status: 'upcoming', participants: 5, maxParticipants: 60 },
  { id: '6', testName: 'Tes Kepribadian MBTI - Batch Februari', startDate: '2026-02-01', endDate: '2026-02-28', status: 'completed', participants: 78, maxParticipants: 100 },
  { id: '7', testName: 'Rekrutmen Batch 4 - PT Sejahtera', startDate: '2026-02-15', endDate: '2026-02-17', status: 'completed', participants: 150, maxParticipants: 150 },
  { id: '8', testName: 'Tes Minat Bakat - Kelas 12 SMA', startDate: '2026-01-20', endDate: '2026-01-25', status: 'completed', participants: 320, maxParticipants: 350 },
]

type FilterType = 'all' | 'active' | 'upcoming' | 'completed'

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '-' }
}

const statusConfig: Record<ScheduleStatus, { label: string; badge: string; iconBg: string }> = {
  active: { label: 'Aktif', badge: 'bg-teal-50 text-teal-600', iconBg: 'from-teal-400 to-teal-500' },
  upcoming: { label: 'Mendatang', badge: 'bg-indigo-50 text-indigo-600', iconBg: 'from-indigo-400 to-indigo-500' },
  completed: { label: 'Selesai', badge: 'bg-slate-100 text-slate-500', iconBg: 'from-slate-400 to-slate-500' },
}

export default function AdminSchedulesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules)
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Schedule | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Form state
  const [formTestName, setFormTestName] = useState('')
  const [formStartDate, setFormStartDate] = useState('')
  const [formEndDate, setFormEndDate] = useState('')
  const [formMaxParticipants, setFormMaxParticipants] = useState(100)
  const [formError, setFormError] = useState('')

  const activeCount = schedules.filter((s) => s.status === 'active').length
  const upcomingCount = schedules.filter((s) => s.status === 'upcoming').length
  const completedCount = schedules.filter((s) => s.status === 'completed').length

  const filtered = schedules.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter
    const matchesSearch = !search || s.testName.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setEditData(null)
    setFormTestName('')
    setFormStartDate('')
    setFormEndDate('')
    setFormMaxParticipants(100)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (schedule: Schedule) => {
    setEditData(schedule)
    setFormTestName(schedule.testName)
    setFormStartDate(schedule.startDate)
    setFormEndDate(schedule.endDate)
    setFormMaxParticipants(schedule.maxParticipants)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formTestName.trim()) { setFormError('Nama tes wajib diisi.'); return }
    if (!formStartDate) { setFormError('Tanggal mulai wajib diisi.'); return }
    if (!formEndDate) { setFormError('Tanggal selesai wajib diisi.'); return }

    if (editData) {
      setSchedules((prev) =>
        prev.map((s) =>
          s.id === editData.id
            ? { ...s, testName: formTestName.trim(), startDate: formStartDate, endDate: formEndDate, maxParticipants: formMaxParticipants }
            : s
        )
      )
    } else {
      const now = new Date()
      const start = new Date(formStartDate)
      const end = new Date(formEndDate)
      let status: ScheduleStatus = 'upcoming'
      if (now >= start && now <= end) status = 'active'
      else if (now > end) status = 'completed'

      const newSchedule: Schedule = {
        id: String(Date.now()),
        testName: formTestName.trim(),
        startDate: formStartDate,
        endDate: formEndDate,
        status,
        participants: 0,
        maxParticipants: formMaxParticipants,
      }
      setSchedules((prev) => [...prev, newSchedule])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleteId) return
    setSchedules((prev) => prev.filter((s) => s.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-teal-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Manajemen
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Jadwal Tes.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Atur kapan tes bisa diakses oleh peserta.
            </p>
          </div>
          <Button
            size="lg"
            onClick={openCreate}
            className="bg-white text-slate-900 hover:bg-teal-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Buat Jadwal
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <Play className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{activeCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Hourglass className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{upcomingCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mendatang</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{completedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <CalendarClock className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all', label: 'Semua', count: schedules.length },
            { key: 'active', label: 'Aktif', count: activeCount },
            { key: 'upcoming', label: 'Mendatang', count: upcomingCount },
            { key: 'completed', label: 'Selesai', count: completedCount },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {f.label}{' '}
              <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari jadwal tes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <CalendarClock className="size-8 text-teal-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((schedule) => {
            const config = statusConfig[schedule.status]
            const pct = Math.round((schedule.participants / schedule.maxParticipants) * 100)

            return (
              <div
                key={schedule.id}
                onClick={() => router.push(`/admin/schedules/${schedule.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Icon */}
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', config.iconBg)}>
                  <CalendarDays className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                      {schedule.testName}
                    </h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', config.badge)}>
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      <span>{formatDate(schedule.startDate)} — {formatDate(schedule.endDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Participants progress */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                  <div className="w-32">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-500">{schedule.participants}/{schedule.maxParticipants}</span>
                      <Users className="size-3.5 text-slate-400" />
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', schedule.status === 'active' ? 'bg-teal-500' : schedule.status === 'upcoming' ? 'bg-indigo-500' : 'bg-slate-400')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(schedule) }}
                    className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(schedule.id) }}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <CalendarClock className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editData ? 'Edit Jadwal' : 'Jadwal Baru'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editData ? 'Perbarui informasi jadwal tes.' : 'Buat jadwal tes baru untuk peserta.'}
                </DialogDescription>
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
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal Mulai</Label>
                  <Input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => { setFormStartDate(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal Selesai</Label>
                  <Input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => { setFormEndDate(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Maks. Peserta</Label>
                <Input
                  type="number"
                  value={formMaxParticipants}
                  onChange={(e) => setFormMaxParticipants(Number(e.target.value))}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm w-28 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
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
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {editData ? 'Simpan' : 'Buat Jadwal'}
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

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Jadwal"
        description="Apakah Anda yakin ingin menghapus jadwal ini? Peserta yang sudah terdaftar akan kehilangan akses ke jadwal ini."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
