'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  FileBarChart,
  Clock,
  Award,
  TrendingUp,
  ShieldBan,
  ShieldCheck,
  KeyRound,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const dummyParticipants: Record<string, {
  id: string
  name: string
  email: string
  status: 'active' | 'blocked'
  registeredAt: string
  phone: string
  gender: string
  birthDate: string
  testsCompleted: number
  avgScore: number
  totalDuration: number
  testHistory: { id: string; testName: string; score: number; resultType: string; status: 'completed' | 'in_progress'; completedAt: string; duration: number }[]
}> = {
  '1': {
    id: '1', name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', status: 'active',
    registeredAt: '2026-01-15T08:00:00Z', phone: '0812-3456-7890', gender: 'Laki-laki', birthDate: '1998-05-12',
    testsCompleted: 3, avgScore: 84, totalDuration: 120,
    testHistory: [
      { id: '1', testName: 'Tes Kepribadian MBTI', score: 87, resultType: 'INTJ - Architect', status: 'completed', completedAt: '2026-03-24T14:30:00Z', duration: 42 },
      { id: '2', testName: 'Tes Minat Bakat RIASEC', score: 78, resultType: 'Investigative', status: 'completed', completedAt: '2026-03-20T10:15:00Z', duration: 35 },
      { id: '3', testName: 'Tes Intelegensi IST', score: 88, resultType: 'Above Average', status: 'completed', completedAt: '2026-03-15T09:00:00Z', duration: 43 },
    ],
  },
  '2': {
    id: '2', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@email.com', status: 'active',
    registeredAt: '2026-01-20T10:30:00Z', phone: '0813-5678-1234', gender: 'Perempuan', birthDate: '1999-08-22',
    testsCompleted: 2, avgScore: 90, totalDuration: 70,
    testHistory: [
      { id: '1', testName: 'Tes Minat Bakat RIASEC', score: 92, resultType: 'Investigative', status: 'completed', completedAt: '2026-03-24T10:15:00Z', duration: 35 },
      { id: '2', testName: 'Tes Kepribadian MBTI', score: 88, resultType: 'INFJ - Advocate', status: 'completed', completedAt: '2026-03-18T14:00:00Z', duration: 35 },
    ],
  },
  '3': {
    id: '3', name: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'active',
    registeredAt: '2026-02-01T14:00:00Z', phone: '0814-9012-3456', gender: 'Laki-laki', birthDate: '2000-01-30',
    testsCompleted: 1, avgScore: 74, totalDuration: 38,
    testHistory: [
      { id: '1', testName: 'Tes Kepribadian MBTI', score: 74, resultType: 'ENFP - Campaigner', status: 'completed', completedAt: '2026-03-23T16:45:00Z', duration: 38 },
    ],
  },
  '4': {
    id: '4', name: 'Dewi Lestari', email: 'dewi.lestari@email.com', status: 'active',
    registeredAt: '2026-02-10T09:15:00Z', phone: '0815-2345-6789', gender: 'Perempuan', birthDate: '1997-11-05',
    testsCompleted: 4, avgScore: 91, totalDuration: 180,
    testHistory: [
      { id: '1', testName: 'Tes Intelegensi IST', score: 95, resultType: 'Superior', status: 'completed', completedAt: '2026-03-23T09:20:00Z', duration: 55 },
      { id: '2', testName: 'Tes Kepribadian MBTI', score: 90, resultType: 'ENTJ - Commander', status: 'completed', completedAt: '2026-03-19T11:00:00Z', duration: 40 },
      { id: '3', testName: 'Tes Minat Bakat RIASEC', score: 88, resultType: 'Enterprising', status: 'completed', completedAt: '2026-03-12T14:30:00Z', duration: 42 },
      { id: '4', testName: 'Tes Kecerdasan Emosional', score: 92, resultType: 'Tinggi', status: 'completed', completedAt: '2026-03-05T10:00:00Z', duration: 43 },
    ],
  },
  '5': {
    id: '5', name: 'Rizky Pratama', email: 'rizky.pratama@email.com', status: 'blocked',
    registeredAt: '2026-02-14T11:00:00Z', phone: '0816-7890-1234', gender: 'Laki-laki', birthDate: '2001-03-18',
    testsCompleted: 0, avgScore: 0, totalDuration: 0,
    testHistory: [],
  },
  '6': {
    id: '6', name: 'Anisa Rahma', email: 'anisa.rahma@email.com', status: 'active',
    registeredAt: '2026-02-20T16:45:00Z', phone: '0817-3456-7890', gender: 'Perempuan', birthDate: '1999-06-14',
    testsCompleted: 2, avgScore: 82, totalDuration: 78,
    testHistory: [
      { id: '1', testName: 'Tes Kepribadian MBTI', score: 81, resultType: 'ISFJ - Defender', status: 'completed', completedAt: '2026-03-22T13:10:00Z', duration: 40 },
      { id: '2', testName: 'Tes Minat Bakat RIASEC', score: 83, resultType: 'Social', status: 'completed', completedAt: '2026-03-16T09:30:00Z', duration: 38 },
    ],
  },
  '7': {
    id: '7', name: 'Fajar Nugroho', email: 'fajar.nugroho@email.com', status: 'active',
    registeredAt: '2026-03-01T08:30:00Z', phone: '0818-9012-3456', gender: 'Laki-laki', birthDate: '2000-09-25',
    testsCompleted: 1, avgScore: 78, totalDuration: 50,
    testHistory: [
      { id: '1', testName: 'Tes Intelegensi IST', score: 78, resultType: 'Above Average', status: 'completed', completedAt: '2026-03-22T11:00:00Z', duration: 50 },
    ],
  },
  '8': {
    id: '8', name: 'Maya Putri', email: 'maya.putri@email.com', status: 'blocked',
    registeredAt: '2026-03-05T13:20:00Z', phone: '0819-5678-1234', gender: 'Perempuan', birthDate: '2001-12-01',
    testsCompleted: 0, avgScore: 0, totalDuration: 0,
    testHistory: [],
  },
  '9': {
    id: '9', name: 'Hendra Wijaya', email: 'hendra.wijaya@email.com', status: 'active',
    registeredAt: '2026-03-10T10:00:00Z', phone: '0821-2345-6789', gender: 'Laki-laki', birthDate: '1998-07-08',
    testsCompleted: 3, avgScore: 85, totalDuration: 130,
    testHistory: [
      { id: '1', testName: 'Tes Kepribadian MBTI', score: 89, resultType: 'ENTP - Debater', status: 'completed', completedAt: '2026-03-21T15:30:00Z', duration: 36 },
      { id: '2', testName: 'Tes Intelegensi IST', score: 82, resultType: 'Above Average', status: 'completed', completedAt: '2026-03-17T10:00:00Z', duration: 48 },
      { id: '3', testName: 'Tes Minat Bakat RIASEC', score: 84, resultType: 'Enterprising', status: 'completed', completedAt: '2026-03-10T14:00:00Z', duration: 46 },
    ],
  },
  '10': {
    id: '10', name: 'Putri Amelia', email: 'putri.amelia@email.com', status: 'active',
    registeredAt: '2026-03-18T07:45:00Z', phone: '0822-6789-0123', gender: 'Perempuan', birthDate: '2000-04-20',
    testsCompleted: 1, avgScore: 83, totalDuration: 48,
    testHistory: [
      { id: '1', testName: 'Tes Intelegensi IST', score: 83, resultType: 'Above Average', status: 'completed', completedAt: '2026-03-20T10:45:00Z', duration: 48 },
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
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '-' }
}

const historyColors = [
  { icon: 'bg-indigo-100 text-indigo-600', badge: 'bg-indigo-50 text-indigo-600' },
  { icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-50 text-teal-600' },
  { icon: 'bg-violet-100 text-violet-600', badge: 'bg-violet-50 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600', badge: 'bg-rose-50 text-rose-600' },
]

export default function ParticipantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const participant = dummyParticipants[params.participantId as string]

  if (!participant) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <User className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Peserta tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID peserta tidak valid atau sudah dihapus.</p>
          <Button onClick={() => router.push('/admin/participants')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isActive = participant.status === 'active'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/participants')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Peserta</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
                <User className="size-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">{participant.name}</h1>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                  <Mail className="size-3.5" />
                  <span>{participant.email}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-rose-500/20 text-rose-300'
                  )}>
                    {isActive ? 'Aktif' : 'Diblokir'}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-slate-300">
                    Peserta
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <FileBarChart className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{participant.testsCompleted}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tes Selesai</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <Award className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{participant.avgScore || '-'}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Clock className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{participant.totalDuration || '-'}<span className="text-sm font-bold text-slate-400">m</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Durasi</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Calendar className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatShortDate(participant.registeredAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Terdaftar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <User className="size-72" />
        </div>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT: Profile + Test History */}
        <div className="md:col-span-7 space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <User className="size-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Informasi Profil</h2>
                <p className="text-xs text-slate-400 font-medium">Data diri peserta</p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { label: 'Nama Lengkap', value: participant.name, icon: <User className="size-4" />, color: 'bg-indigo-100 text-indigo-600' },
                { label: 'Email', value: participant.email, icon: <Mail className="size-4" />, color: 'bg-teal-100 text-teal-600' },
                { label: 'No. Telepon', value: participant.phone, icon: <Shield className="size-4" />, color: 'bg-violet-100 text-violet-600' },
                { label: 'Jenis Kelamin', value: participant.gender, icon: <User className="size-4" />, color: 'bg-rose-100 text-rose-600' },
                { label: 'Tanggal Lahir', value: formatDate(participant.birthDate), icon: <Calendar className="size-4" />, color: 'bg-amber-100 text-amber-600' },
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

          {/* Test History */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <BarChart3 className="size-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Riwayat Tes</h2>
                <p className="text-xs text-slate-400 font-medium">{participant.testHistory.length} tes tercatat</p>
              </div>
            </div>
            {participant.testHistory.length === 0 ? (
              <div className="p-12 text-center">
                <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <FileBarChart className="size-6 text-slate-300" />
                </div>
                <p className="text-slate-400 font-bold text-sm">Belum ada riwayat tes.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {participant.testHistory.map((test, index) => {
                  const color = historyColors[index % historyColors.length]
                  return (
                    <div key={test.id} className="px-8 py-5 flex items-center gap-5 group hover:bg-slate-50/50 transition-all">
                      <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', color.icon)}>
                        <FileBarChart className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-slate-900 truncate">{test.testName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full', color.badge)}>
                            {test.resultType}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{formatShortDate(test.completedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-lg font-black text-slate-900">{test.score}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{test.duration}m</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Stats + Quick Actions */}
        <div className="md:col-span-5 space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <TrendingUp className="size-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Statistik</h2>
                <p className="text-xs text-slate-400 font-medium">Ringkasan performa peserta</p>
              </div>
            </div>
            <div className="p-8 space-y-5">
              {[
                { label: 'Tes Diselesaikan', value: `${participant.testsCompleted}`, sub: 'dari total tes', color: 'bg-indigo-500', pct: Math.min(participant.testsCompleted * 25, 100) },
                { label: 'Rata-rata Skor', value: `${participant.avgScore || 0}`, sub: 'dari 100', color: 'bg-teal-500', pct: participant.avgScore },
                { label: 'Total Waktu', value: `${participant.totalDuration}m`, sub: 'total pengerjaan', color: 'bg-violet-500', pct: Math.min(participant.totalDuration / 2, 100) },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-black text-slate-900">{stat.label}</p>
                    <p className="text-sm font-black text-slate-900">{stat.value}</p>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all duration-1000', stat.color)} style={{ width: `${stat.pct}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <Shield className="size-5 text-rose-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Aksi</h2>
                <p className="text-xs text-slate-400 font-medium">Kelola akun peserta</p>
              </div>
            </div>
            <div className="p-8 space-y-3">
              <Button
                variant="outline"
                className={cn(
                  'w-full h-12 rounded-xl font-black justify-start gap-3 transition-all',
                  isActive
                    ? 'border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300'
                    : 'border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300'
                )}
              >
                {isActive ? <ShieldBan className="size-5" /> : <ShieldCheck className="size-5" />}
                {isActive ? 'Blokir Peserta' : 'Aktifkan Peserta'}
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-black justify-start gap-3 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <KeyRound className="size-5" />
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
