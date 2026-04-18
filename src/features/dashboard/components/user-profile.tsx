'use client'

import {
  User,
  Mail,
  Shield,
  Crown,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Award,
  CheckCircle2,
  Settings,
  ChevronRight,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

const ROLE_CONFIG: Record<string, { label: string; bg: string }> = {
  USER: { label: 'Pengguna', bg: 'bg-indigo-500/20 text-indigo-300' },
  ADMIN: { label: 'Admin', bg: 'bg-violet-500/20 text-violet-300' },
  SUPERADMIN: { label: 'Super Admin', bg: 'bg-rose-500/20 text-rose-300' },
}

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export function UserProfile() {
  const { user } = useAuthStoreHydrated()

  const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')
  const avgScore = completedTests.length
    ? Math.round(completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length)
    : 0
  const roleConfig = ROLE_CONFIG[user?.role ?? 'USER']
  const initials = user?.name ? getInitials(user.name) : 'U'

  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="size-16 rounded-2xl shadow-xl border-2 border-white/10">
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xl font-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                Profil
              </p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                {user?.name ?? 'Pengguna'}
              </h1>
              <div className="flex items-center gap-3">
                <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', roleConfig.bg)}>
                  {roleConfig.label}
                </span>
                <span className="text-sm text-slate-400 font-medium">{user?.email ?? '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <FileText className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{DUMMY_TEST_HISTORY.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{completedTests.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Selesai</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Award className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{avgScore}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <User className="size-72" />
        </div>
      </div>

      {/* 2x2 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INFORMASI AKUN */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <User className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Informasi Akun</h2>
              <p className="text-xs text-slate-400 font-medium">Data diri Anda</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { label: 'Nama Lengkap', value: user?.name ?? '—', icon: <User className="size-4" />, color: 'bg-indigo-100 text-indigo-600' },
              { label: 'Email', value: user?.email ?? '—', icon: <Mail className="size-4" />, color: 'bg-teal-100 text-teal-600' },
              { label: 'Role', value: roleConfig.label, icon: <Shield className="size-4" />, color: 'bg-violet-100 text-violet-600' },
              { label: 'Bergabung', value: 'Januari 2026', icon: <Calendar className="size-4" />, color: 'bg-rose-100 text-rose-600' },
            ].map((item, i) => (
              <div key={i} className="px-7 py-4 flex items-center gap-4">
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

        {/* MEMBERSHIP */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Crown className="size-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Membership</h2>
              <p className="text-xs text-slate-400 font-medium">Status langganan Anda</p>
            </div>
          </div>
          <div className="p-7">
            <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white mb-5">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="size-6" />
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Premium</span>
              </div>
              <h3 className="text-xl font-black mb-1">Paid Member</h3>
              <p className="text-sm text-violet-100 font-medium">Akses penuh ke semua tes premium & laporan detail.</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Tes Premium', value: 'Unlimited', icon: <FileText className="size-4" />, color: 'bg-indigo-100 text-indigo-600' },
                { label: 'Sertifikat', value: 'Tersedia', icon: <Award className="size-4" />, color: 'bg-teal-100 text-teal-600' },
                { label: 'Konsultasi', value: 'Tersedia', icon: <CheckCircle2 className="size-4" />, color: 'bg-violet-100 text-violet-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50">
                  <div className={cn('size-8 rounded-lg flex items-center justify-center shrink-0', item.color)}>
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold text-slate-900 flex-1">{item.label}</p>
                  <span className="text-xs font-black text-teal-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KONTAK */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <Phone className="size-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Kontak</h2>
              <p className="text-xs text-slate-400 font-medium">Informasi kontak Anda</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { label: 'Telepon', value: '083333333333', icon: <Phone className="size-4" />, color: 'bg-teal-100 text-teal-600' },
              { label: 'Alamat', value: 'Jakarta, Indonesia', icon: <MapPin className="size-4" />, color: 'bg-amber-100 text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="px-7 py-4 flex items-center gap-4">
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

        {/* PENGATURAN */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <Settings className="size-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Pengaturan</h2>
              <p className="text-xs text-slate-400 font-medium">Kelola akun Anda</p>
            </div>
          </div>
          <div className="p-7 space-y-3">
            <Button variant="outline" className="w-full h-12 rounded-xl font-bold justify-between border-slate-200 hover:bg-slate-50" disabled>
              Ubah Password
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl font-bold justify-between border-slate-200 hover:bg-slate-50" disabled>
              Edit Profil
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl font-bold justify-between border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600" disabled>
              Hapus Akun
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
