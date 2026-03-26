'use client'

import { useState } from 'react'
import {
  Bell,
  CheckCircle2,
  UserPlus,
  FileText,
  CalendarClock,
  AlertTriangle,
  Trash2,
  Check,
  CheckCheck,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NotifType = 'test_completed' | 'new_user' | 'test_updated' | 'schedule_created' | 'warning'

interface Notification {
  id: string
  type: NotifType
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'test_completed', title: 'Tes Selesai', description: 'Ahmad Fauzi menyelesaikan Tes Kepribadian MBTI dengan skor 87', time: '5 menit lalu', read: false },
  { id: '2', type: 'new_user', title: 'Peserta Baru', description: 'Siti Nurhaliza mendaftar sebagai peserta baru', time: '12 menit lalu', read: false },
  { id: '3', type: 'test_updated', title: 'Tes Diperbarui', description: 'Tes Intelegensi IST berhasil diperbarui dan dipublikasikan', time: '1 jam lalu', read: false },
  { id: '4', type: 'test_completed', title: 'Tes Selesai', description: 'Dewi Lestari menyelesaikan Tes Minat Bakat RIASEC dengan skor 92', time: '2 jam lalu', read: false },
  { id: '5', type: 'schedule_created', title: 'Jadwal Dibuat', description: 'Jadwal Rekrutmen Batch 5 - PT Maju Jaya berhasil dibuat', time: '3 jam lalu', read: true },
  { id: '6', type: 'warning', title: 'Kuota Hampir Penuh', description: 'Jadwal Tes Kepribadian MBTI sudah terisi 90% kapasitas', time: '4 jam lalu', read: true },
  { id: '7', type: 'new_user', title: 'Peserta Baru', description: 'Budi Santoso mendaftar sebagai peserta baru', time: '5 jam lalu', read: true },
  { id: '8', type: 'test_completed', title: 'Tes Selesai', description: 'Anisa Rahma menyelesaikan Tes Kecerdasan Emosional dengan skor 81', time: '6 jam lalu', read: true },
  { id: '9', type: 'test_updated', title: 'Tes Dibuat', description: 'Tes Big Five Personality berhasil dibuat sebagai draft', time: 'Kemarin', read: true },
  { id: '10', type: 'schedule_created', title: 'Jadwal Selesai', description: 'Jadwal Rekrutmen Batch 4 - PT Sejahtera telah berakhir', time: 'Kemarin', read: true },
  { id: '11', type: 'warning', title: 'Tes Tanpa Soal', description: 'Tes Enneagram belum memiliki soal. Tambahkan soal sebelum dipublikasikan.', time: '2 hari lalu', read: true },
  { id: '12', type: 'new_user', title: 'Peserta Baru', description: 'Maya Putri mendaftar sebagai peserta baru', time: '2 hari lalu', read: true },
]

const typeConfig: Record<NotifType, { icon: typeof Bell; color: string }> = {
  test_completed: { icon: CheckCircle2, color: 'bg-teal-100 text-teal-600' },
  new_user: { icon: UserPlus, color: 'bg-indigo-100 text-indigo-600' },
  test_updated: { icon: FileText, color: 'bg-violet-100 text-violet-600' },
  schedule_created: { icon: CalendarClock, color: 'bg-rose-100 text-rose-600' },
  warning: { icon: AlertTriangle, color: 'bg-amber-100 text-amber-600' },
}

type FilterType = 'all' | 'unread' | 'read'

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<FilterType>('all')

  const unreadCount = notifications.filter((n) => !n.read).length
  const readCount = notifications.filter((n) => n.read).length

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    if (filter === 'read') return n.read
    return true
  })

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-rose-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Pusat
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Notifikasi.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Pantau semua aktivitas dan pemberitahuan platform.
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              size="lg"
              onClick={markAllRead}
              className="bg-white text-slate-900 hover:bg-rose-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <CheckCheck className="w-5 h-5 mr-2" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <Bell className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{notifications.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Clock className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{unreadCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Belum Dibaca</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{readCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sudah Dibaca</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Bell className="size-72" />
        </div>
      </div>

      {/* FILTER */}
      <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1 w-fit">
        {([
          { key: 'all', label: 'Semua', count: notifications.length },
          { key: 'unread', label: 'Belum Dibaca', count: unreadCount },
          { key: 'read', label: 'Sudah Dibaca', count: readCount },
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

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Bell className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ada notifikasi.</p>
          <p className="text-slate-400 font-medium text-sm">Semua sudah bersih.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((notif) => {
            const config = typeConfig[notif.type]
            const Icon = config.icon

            return (
              <div
                key={notif.id}
                className={cn(
                  'group flex items-center gap-5 px-6 md:px-8 py-5 transition-all',
                  !notif.read && 'bg-indigo-50/30'
                )}
              >
                {/* Icon */}
                <div className={cn('size-11 rounded-2xl flex items-center justify-center shrink-0', config.color)}>
                  <Icon className="size-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={cn('text-sm font-black truncate', notif.read ? 'text-slate-600' : 'text-slate-900')}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="size-2 rounded-full bg-indigo-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{notif.description}</p>
                </div>

                {/* Time */}
                <span className="text-xs text-slate-400 font-medium shrink-0 hidden md:block">{notif.time}</span>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="size-8 rounded-lg bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                      title="Tandai dibaca"
                    >
                      <Check className="size-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="size-8 rounded-lg bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                    title="Hapus"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
