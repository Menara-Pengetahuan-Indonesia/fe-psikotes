'use client'

import {
  User,
  Mail,
  Shield,
  Lock,
  Settings,
  ChevronRight,
  Bell,
  Palette,
  Globe,
  Monitor,
  KeyRound,
  Info,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const ROLE_CONFIG = {
  SUPERADMIN: {
    label: 'Super Admin',
    bg: 'bg-violet-500/20 text-violet-300',
    desc: 'Akses penuh ke semua fitur sistem',
  },
  ADMIN: {
    label: 'Admin',
    bg: 'bg-indigo-500/20 text-indigo-300',
    desc: 'Kelola tes, indikator, dan hasil peserta',
  },
  USER: {
    label: 'Pengguna',
    bg: 'bg-slate-500/20 text-slate-300',
    desc: 'Akses terbatas sebagai peserta tes',
  },
}

export default function AdminSettingsPage() {
  const { user } = useAuthStoreHydrated()

  const roleConfig = ROLE_CONFIG[user?.role ?? 'ADMIN']
  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'AD'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="size-16 rounded-2xl shadow-xl border-2 border-white/10">
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xl font-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-violet-300 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                Pengaturan
              </p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                {user?.name ?? 'Admin'}
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

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Settings className="size-72" />
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
              <p className="text-xs text-slate-400 font-medium">Detail profil dan identitas</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            <SettingRow
              icon={<User className="size-4" />}
              iconColor="bg-indigo-100 text-indigo-600"
              label="Nama Lengkap"
              value={user?.name ?? '—'}
            />
            <SettingRow
              icon={<Mail className="size-4" />}
              iconColor="bg-indigo-100 text-indigo-600"
              label="Email"
              value={user?.email ?? '—'}
            />
            <SettingRow
              icon={<Shield className="size-4" />}
              iconColor="bg-violet-100 text-violet-600"
              label="Role"
              value={roleConfig.label}
              description={roleConfig.desc}
            />
          </div>
        </div>

        {/* KEAMANAN */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <Lock className="size-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Keamanan</h2>
              <p className="text-xs text-slate-400 font-medium">Password dan keamanan akun</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-all">
              <div className="size-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <KeyRound className="size-4 text-rose-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">Ubah Password</p>
                <p className="text-xs text-slate-400 font-medium">Terakhir diperbarui baru-baru ini</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-bold border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                disabled
              >
                Ubah
                <ChevronRight className="size-3.5 ml-1" />
              </Button>
            </div>
            <div className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-all">
              <div className="size-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Smartphone className="size-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">Autentikasi 2FA</p>
                <p className="text-xs text-slate-400 font-medium">Belum diaktifkan</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-400">
                Segera
              </span>
            </div>
          </div>
        </div>

        {/* PREFERENSI */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Palette className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Preferensi</h2>
              <p className="text-xs text-slate-400 font-medium">Tampilan dan notifikasi</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-all">
              <div className="size-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Bell className="size-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">Notifikasi</p>
                <p className="text-xs text-slate-400 font-medium">Email & push notification</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                Aktif
              </span>
            </div>
            <div className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-all">
              <div className="size-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <Monitor className="size-4 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">Tema</p>
                <p className="text-xs text-slate-400 font-medium">Tampilan antarmuka</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                Light
              </span>
            </div>
            <div className="px-7 py-4 flex items-center gap-4 group hover:bg-slate-50/50 transition-all">
              <div className="size-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Globe className="size-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">Bahasa</p>
                <p className="text-xs text-slate-400 font-medium">Bahasa tampilan</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* TENTANG APLIKASI */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Info className="size-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Tentang Aplikasi</h2>
              <p className="text-xs text-slate-400 font-medium">Informasi versi dan sistem</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            <SettingRow
              icon={<Info className="size-4" />}
              iconColor="bg-slate-100 text-slate-600"
              label="Aplikasi"
              value="Bermoela Psikotes"
            />
            <SettingRow
              icon={<Settings className="size-4" />}
              iconColor="bg-slate-100 text-slate-600"
              label="Versi"
              value="1.0.0"
            />
            <SettingRow
              icon={<Monitor className="size-4" />}
              iconColor="bg-slate-100 text-slate-600"
              label="Environment"
              value="Development"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingRow({
  icon,
  iconColor,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  iconColor: string
  label: string
  value: string
  description?: string
}) {
  return (
    <div className="px-7 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-all">
      <div className={cn('size-9 rounded-xl flex items-center justify-center shrink-0', iconColor)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-black text-slate-900">{value}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
    </div>
  )
}
