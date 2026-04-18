'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  ChevronRight,
  UserCheck,
  UserX,
  Eye,
  ShieldBan,
  ShieldCheck,
  Calendar,
  Mail,
  FileBarChart,
  User,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const dummyParticipants = [
  { id: '1', name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', status: 'active' as const, registeredAt: '2026-01-15T08:00:00Z', testsCompleted: 3 },
  { id: '2', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@email.com', status: 'active' as const, registeredAt: '2026-01-20T10:30:00Z', testsCompleted: 2 },
  { id: '3', name: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'active' as const, registeredAt: '2026-02-01T14:00:00Z', testsCompleted: 1 },
  { id: '4', name: 'Dewi Lestari', email: 'dewi.lestari@email.com', status: 'active' as const, registeredAt: '2026-02-10T09:15:00Z', testsCompleted: 4 },
  { id: '5', name: 'Rizky Pratama', email: 'rizky.pratama@email.com', status: 'blocked' as const, registeredAt: '2026-02-14T11:00:00Z', testsCompleted: 0 },
  { id: '6', name: 'Anisa Rahma', email: 'anisa.rahma@email.com', status: 'active' as const, registeredAt: '2026-02-20T16:45:00Z', testsCompleted: 2 },
  { id: '7', name: 'Fajar Nugroho', email: 'fajar.nugroho@email.com', status: 'active' as const, registeredAt: '2026-03-01T08:30:00Z', testsCompleted: 1 },
  { id: '8', name: 'Maya Putri', email: 'maya.putri@email.com', status: 'blocked' as const, registeredAt: '2026-03-05T13:20:00Z', testsCompleted: 0 },
  { id: '9', name: 'Hendra Wijaya', email: 'hendra.wijaya@email.com', status: 'active' as const, registeredAt: '2026-03-10T10:00:00Z', testsCompleted: 3 },
  { id: '10', name: 'Putri Amelia', email: 'putri.amelia@email.com', status: 'active' as const, registeredAt: '2026-03-18T07:45:00Z', testsCompleted: 1 },
]

type FilterType = 'all' | 'active' | 'blocked'

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return '-'
  }
}

const accentColors = [
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-violet-400 to-violet-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-rose-400 to-rose-500', text: 'text-white' },
]

export default function AdminParticipantsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  const activeCount = dummyParticipants.filter((p) => p.status === 'active').length
  const blockedCount = dummyParticipants.filter((p) => p.status === 'blocked').length

  const filtered = dummyParticipants.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && p.status === 'active') ||
      (filter === 'blocked' && p.status === 'blocked')
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
            Manajemen
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
            Peserta.
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Kelola dan pantau seluruh peserta yang terdaftar.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Users className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{dummyParticipants.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <UserCheck className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{activeCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <UserX className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{blockedCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Diblokir</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Users className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all', label: 'Semua', count: dummyParticipants.length },
            { key: 'active', label: 'Aktif', count: activeCount },
            { key: 'blocked', label: 'Diblokir', count: blockedCount },
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
            placeholder="Cari nama atau email peserta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <Users className="size-8 text-indigo-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((participant, index) => {
            const accent = accentColors[index % accentColors.length]
            const isActive = participant.status === 'active'

            return (
              <div
                key={participant.id}
                onClick={() => router.push(`/admin/participants/${participant.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Avatar */}
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <User className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {participant.name}
                    </h3>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                    )}>
                      {isActive ? 'Aktif' : 'Diblokir'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                    <Mail className="size-3.5" />
                    <span className="truncate">{participant.email}</span>
                  </div>
                </div>

                {/* Meta pills */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
                    <FileBarChart className="size-3.5" />
                    <span>{participant.testsCompleted} tes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar className="size-3.5" />
                    <span>{formatDate(participant.registeredAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation() }}
                    className={cn(
                      'size-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all',
                      isActive
                        ? 'text-rose-400 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500'
                        : 'text-indigo-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500'
                    )}
                    title={isActive ? 'Blokir' : 'Aktifkan'}
                  >
                    {isActive ? <ShieldBan className="size-4" /> : <ShieldCheck className="size-4" />}
                  </button>
                  <button className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500">
                    <Eye className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
