'use client'

import Link from 'next/link'
import {
  BookOpen,
  BarChart3,
  Users,
  Plus,
  ArrowRight,
  Package,
  CalendarClock,
  FileBarChart,
  CheckCircle2,
  Clock,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const quickAccess = [
  { href: '/admin/kelola-tes', label: 'Kelola Tes', desc: 'Buat dan atur instrumen tes', icon: BookOpen, stat: '24', statLabel: 'Tes', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' },
  { href: '/admin/packages', label: 'Paket', desc: 'Kelola bundel paket tes', icon: Package, stat: '6', statLabel: 'Paket', color: 'bg-gradient-to-br from-violet-400 to-violet-500', iconBg: 'bg-violet-100 text-violet-600' },
  { href: '/admin/schedules', label: 'Jadwal', desc: 'Atur jadwal akses tes', icon: CalendarClock, stat: '2', statLabel: 'Aktif', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' },
  { href: '/admin/participants', label: 'Peserta', desc: 'Kelola peserta terdaftar', icon: Users, stat: '1,240', statLabel: 'Peserta', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' },
  { href: '/admin/results', label: 'Hasil', desc: 'Lihat hasil tes peserta', icon: FileBarChart, stat: '840', statLabel: 'Selesai', color: 'bg-gradient-to-br from-indigo-400 to-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' },
  { href: '/admin/analytics', label: 'Analitik', desc: 'Insight dan statistik platform', icon: BarChart3, stat: '+18%', statLabel: 'Tren', color: 'bg-gradient-to-br from-violet-400 to-violet-500', iconBg: 'bg-violet-100 text-violet-600' },
]

const recentActivities = [
  { text: 'Ahmad Fauzi menyelesaikan Tes Kepribadian MBTI', time: '5 menit lalu', icon: CheckCircle2, color: 'bg-indigo-100 text-indigo-600' },
  { text: 'Siti Nurhaliza mendaftar sebagai peserta baru', time: '12 menit lalu', icon: User, color: 'bg-indigo-100 text-indigo-600' },
  { text: 'Tes Intelegensi IST diperbarui', time: '1 jam lalu', icon: BookOpen, color: 'bg-violet-100 text-violet-600' },
  { text: 'Dewi Lestari menyelesaikan Tes Minat Bakat RIASEC', time: '2 jam lalu', icon: CheckCircle2, color: 'bg-indigo-100 text-indigo-600' },
  { text: 'Jadwal Rekrutmen Batch 5 dibuat', time: '3 jam lalu', icon: CalendarClock, color: 'bg-rose-100 text-rose-600' },
]

export default function AdminDashboardPage() {
  const { user, _hasHydrated } = useAuthStoreHydrated()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Selamat Datang, {_hasHydrated && user?.name ? user.name.split(' ')[0] : 'Admin'}.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Kelola instrumen psikotes, pantau hasil, dan atur konfigurasi.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            asChild
          >
            <Link href="/admin/kelola-tes">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Buat Tes Baru
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <BookOpen className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">24</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Users className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">1,240</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Peserta</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Package className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">6</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Paket</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <CalendarClock className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">2</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Jadwal Aktif</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <BarChart3 className="size-72" />
        </div>
      </div>

      {/* QUICK ACCESS 3x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickAccess.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
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
              <h3 className="text-base font-black text-slate-900 mb-0.5 group-hover:text-indigo-600 transition-colors">{item.label}</h3>
              <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                <span>Buka</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* AKTIVITAS TERBARU */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Clock className="size-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Aktivitas Terbaru</h2>
            <p className="text-xs text-slate-400 font-medium">Log aktivitas platform hari ini</p>
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
