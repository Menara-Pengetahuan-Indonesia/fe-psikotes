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
  Sparkles,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

const ROLE_CONFIG: Record<string, { label: string; bg: string }> = {
  USER: { label: 'Pengguna', bg: 'bg-white/20 text-white border border-white/20' },
  ADMIN: { label: 'Admin', bg: 'bg-amber-400 text-amber-950 border border-amber-400' },
  SUPERADMIN: {
    label: 'Super Admin',
    bg: 'bg-rose-400 text-rose-950 border border-rose-400',
  },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserProfile() {
  const { user } = useAuthStoreHydrated()

  const completedTests = DUMMY_TEST_HISTORY.filter((t) => t.status === 'selesai')
  const avgScore = completedTests.length
    ? Math.round(
        completedTests.reduce((sum, t) => sum + (t.score ?? 0), 0) / completedTests.length,
      )
    : 0
  const roleConfig = ROLE_CONFIG[user?.role ?? 'USER']
  const initials = user?.name ? getInitials(user.name) : 'U'

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary-200/40">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-[-70px] right-[-50px] w-56 h-56 bg-amber-400/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-accent-400/30 rounded-full blur-2xl" />

        <svg
          className="absolute top-6 right-10 w-24 h-24 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="23" />
          <circle cx="50" cy="50" r="10" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-5">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-xl border-2 border-white/15">
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 text-xl md:text-2xl font-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                Profil
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                {user?.name ?? 'Pengguna'}
              </h1>
              <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                <span
                  className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                    roleConfig.bg,
                  )}
                >
                  {roleConfig.label}
                </span>
                <span className="text-sm text-primary-100/90 font-medium">
                  {user?.email ?? '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {DUMMY_TEST_HISTORY.length}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Total Tes
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-accent-400/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent-200" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">
                {completedTests.length}
              </p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Selesai
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">{avgScore}</p>
              <p className="text-[10px] font-bold text-primary-100/80 uppercase tracking-widest mt-1">
                Rata-rata
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProfileCard
          icon={<User className="w-5 h-5 text-white" />}
          title="Informasi Akun"
          subtitle="Data diri kamu"
        >
          <div className="divide-y divide-slate-100">
            {[
              {
                label: 'Nama Lengkap',
                value: user?.name ?? '—',
                icon: <User className="w-4 h-4" />,
                color: 'bg-primary-50 text-primary-700 border-primary-100',
              },
              {
                label: 'Email',
                value: user?.email ?? '—',
                icon: <Mail className="w-4 h-4" />,
                color: 'bg-amber-50 text-amber-700 border-amber-100',
              },
              {
                label: 'Role',
                value: ROLE_CONFIG[user?.role ?? 'USER'].label,
                icon: <Shield className="w-4 h-4" />,
                color: 'bg-violet-50 text-violet-700 border-violet-100',
              },
              {
                label: 'Bergabung',
                value: 'Januari 2026',
                icon: <Calendar className="w-4 h-4" />,
                color: 'bg-rose-50 text-rose-700 border-rose-100',
              },
            ].map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0',
                    item.color,
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-500 font-medium">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </ProfileCard>

        <ProfileCard
          icon={<Crown className="w-5 h-5 text-white" />}
          title="Membership"
          subtitle="Status langganan kamu"
        >
          <div className="p-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-5 text-white mb-4 overflow-hidden">
              <div className="absolute top-[-30px] right-[-30px] w-28 h-28 bg-amber-400/25 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-amber-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full">
                    Premium
                  </span>
                </div>
                <h3 className="text-lg font-black mb-1">Paid Member</h3>
                <p className="text-xs text-primary-100/90 font-medium leading-relaxed">
                  Akses penuh ke semua tes premium & laporan detail.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: 'Tes Premium',
                  value: 'Unlimited',
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  label: 'Sertifikat',
                  value: 'Tersedia',
                  icon: <Award className="w-4 h-4" />,
                },
                {
                  label: 'Konsultasi',
                  value: 'Tersedia',
                  icon: <CheckCircle2 className="w-4 h-4" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/40"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold text-slate-900 flex-1">{item.label}</p>
                  <span className="text-[11px] font-black text-primary-700 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ProfileCard>

        <ProfileCard
          icon={<Phone className="w-5 h-5 text-white" />}
          title="Kontak"
          subtitle="Informasi kontak kamu"
        >
          <div className="divide-y divide-slate-100">
            {[
              {
                label: 'Telepon',
                value: '083333333333',
                icon: <Phone className="w-4 h-4" />,
                color: 'bg-primary-50 text-primary-700 border-primary-100',
              },
              {
                label: 'Alamat',
                value: 'Jakarta, Indonesia',
                icon: <MapPin className="w-4 h-4" />,
                color: 'bg-amber-50 text-amber-700 border-amber-100',
              },
            ].map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0',
                    item.color,
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-500 font-medium">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </ProfileCard>

        <ProfileCard
          icon={<Settings className="w-5 h-5 text-white" />}
          title="Pengaturan"
          subtitle="Kelola akun kamu"
        >
          <div className="p-5 space-y-2">
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl font-bold justify-between border-slate-200 hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700"
              disabled
            >
              Ubah Password
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl font-bold justify-between border-slate-200 hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700"
              disabled
            >
              Edit Profil
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl font-bold justify-between border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              disabled
            >
              Hapus Akun
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </ProfileCard>
      </div>
    </div>
  )
}

function ProfileCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="relative bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />
      <div className="relative px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-sm shadow-primary-200">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-900">{title}</h2>
          <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
