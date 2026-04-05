import Link from 'next/link'
import {
  Users,
  FileText,
  Shield,
  TrendingUp,
  BookOpen,
  Tag,
  CalendarClock,
  BarChart3,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  Server,
  Database,
  Cpu,
  Wifi,
  UserPlus,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const quickAccess = [
  { href: '/superadmin/users', label: 'Kelola User', desc: 'Manage semua akun pengguna', icon: Users, stat: '250', statLabel: 'Users', color: 'bg-gradient-to-br from-rose-400 to-rose-500' },
  { href: '/admin/tests', label: 'Kelola Tes', desc: 'Buat dan atur instrumen tes', icon: BookOpen, stat: '24', statLabel: 'Tes', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500' },
  { href: '/admin/categories', label: 'Kategori', desc: 'Kelompokkan tes berdasarkan jenis', icon: Tag, stat: '6', statLabel: 'Kategori', color: 'bg-gradient-to-br from-violet-400 to-violet-500' },
  { href: '/admin/participants', label: 'Peserta', desc: 'Kelola peserta terdaftar', icon: Users, stat: '1,240', statLabel: 'Peserta', color: 'bg-gradient-to-br from-teal-400 to-teal-500' },
  { href: '/admin/analytics', label: 'Analitik', desc: 'Insight dan statistik platform', icon: BarChart3, stat: '+18%', statLabel: 'Tren', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500' },
  { href: '/admin/settings', label: 'Pengaturan', desc: 'Konfigurasi sistem & aplikasi', icon: Settings, stat: '—', statLabel: 'Config', color: 'bg-gradient-to-br from-slate-400 to-slate-500' },
]

const systemStatus = [
  { name: 'API Server', status: 'online' as const, icon: Server },
  { name: 'Database', status: 'online' as const, icon: Database },
  { name: 'Redis Cache', status: 'online' as const, icon: Cpu },
  { name: 'WebSocket', status: 'online' as const, icon: Wifi },
]

const recentActivities = [
  { text: 'Admin baru ditambahkan: Rina Wati', time: '10 menit lalu', icon: UserPlus, color: 'bg-rose-100 text-rose-600' },
  { text: 'Ahmad Fauzi menyelesaikan Tes MBTI', time: '15 menit lalu', icon: CheckCircle2, color: 'bg-teal-100 text-teal-600' },
  { text: 'Tes Intelegensi IST diperbarui', time: '1 jam lalu', icon: BookOpen, color: 'bg-violet-100 text-violet-600' },
  { text: 'Jadwal Rekrutmen Batch 5 dibuat', time: '2 jam lalu', icon: CalendarClock, color: 'bg-indigo-100 text-indigo-600' },
  { text: '3 alert keamanan terdeteksi', time: '3 jam lalu', icon: AlertTriangle, color: 'bg-amber-100 text-amber-600' },
]

const statusColor = { online: 'bg-teal-500', offline: 'bg-rose-500', warning: 'bg-amber-500' }

export function SuperAdminDashboard() {
  const { user } = useAuthStoreHydrated()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-rose-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Super Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Halo, {user?.name?.split(' ')[0] || 'SuperAdmin'}.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Kontrol penuh atas sistem, pengguna, dan konfigurasi platform.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-rose-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/superadmin/users">
              <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Kelola User
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <Users className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">250</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total User</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Shield className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">5</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">99.8%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Uptime</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
              <AlertTriangle className="size-5 text-amber-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">3</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Alert</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Shield className="size-72" />
        </div>
      </div>

      {/* QUICK ACCESS + SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Quick Access */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccess.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn('size-12 rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-105 group-hover:shadow-md', item.color)}>
                      <Icon className="size-5" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">{item.stat}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-0.5 group-hover:text-rose-600 transition-colors">{item.label}</h3>
                  <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-rose-600 transition-colors">
                    <span>Buka</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* RIGHT: System Status */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-full flex flex-col">
            <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <Activity className="size-5 text-rose-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">System Status</h2>
                <p className="text-xs text-slate-400 font-medium">Monitoring real-time</p>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1">
              {systemStatus.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50">
                    <div className="size-9 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-900">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={cn('size-2 rounded-full animate-pulse', statusColor[item.status])} />
                      <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                )
              })}

              <div className="pt-3 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-indigo-50 text-center">
                  <p className="text-xl font-black text-indigo-600">42</p>
                  <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Active Now</p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 text-center">
                  <p className="text-xl font-black text-teal-600">99.8%</p>
                  <p className="text-[9px] font-bold text-teal-500 uppercase tracking-widest">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AKTIVITAS TERBARU */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Clock className="size-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Aktivitas Terbaru</h2>
            <p className="text-xs text-slate-400 font-medium">Log aktivitas sistem hari ini</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {recentActivities.map((activity, i) => {
            const Icon = activity.icon
            return (
              <div key={i} className="px-8 py-4 flex items-center gap-4">
                <div className={cn('size-9 rounded-xl flex items-center justify-center shrink-0', activity.color)}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{activity.text}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
