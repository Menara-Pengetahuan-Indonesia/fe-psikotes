'use client'

import * as React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CalendarDays,
  BarChart3,
  Plus,
  ClipboardList,
  Settings,
  Trophy,
  Clock,
  CheckCircle2,
  Trash2,
  Upload,
  UserPlus,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'

import { ADMIN_STATS } from '../constants/admin-stats.constants'
import { WEEKLY_PARTICIPANTS_DATA } from '../constants/admin-chart.constants'
import { POPULAR_TESTS } from '../constants/admin-popular-tests.constants'
import { RECENT_TESTS } from '../constants/admin-recent-tests.constants'
import { RECENT_ACTIVITIES } from '../constants/admin-activity.constants'

// Lazy load recharts (SSR-incompatible)
const AreaChart = dynamic(() => import('recharts').then((m) => m.AreaChart), { ssr: false })
const Area = dynamic(() => import('recharts').then((m) => m.Area), { ssr: false })
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false })

const ACTIVITY_ICONS = {
  publish: Upload,
  create: Plus,
  submit: CheckCircle2,
  delete: Trash2,
} as const

const ACTIVITY_COLORS = {
  publish: 'text-indigo-500 bg-indigo-50',
  create: 'text-teal-500 bg-teal-50',
  submit: 'text-violet-500 bg-violet-50',
  delete: 'text-rose-400 bg-rose-50',
} as const

// Chart data for recharts
const chartData = WEEKLY_PARTICIPANTS_DATA.map((d) => ({ name: d.week, peserta: d.count }))

export function AdminDashboard() {
  const { user } = useAuthStoreHydrated()
  const [dateStr, setDateStr] = React.useState('')

  React.useEffect(() => {
    setDateStr(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <p className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Admin Panel</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Halo, {user?.name?.split(' ')[0] || 'Admin'}.</h1>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <CalendarDays className="size-4" />
          <span className="text-xs font-bold">{dateStr}</span>
        </div>
      </div>

      {/* FULL-WIDTH BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* ROW 1: Hero + Quick Actions */}
        <div className="md:col-span-2 lg:col-span-8 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-700 p-10 text-white shadow-2xl group">
          <div className="relative z-10 space-y-4">
            <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <BarChart3 className="size-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              Selamat Datang, {user?.name?.split(' ')[0] || 'Admin'}.
            </h2>
            <p className="max-w-md text-indigo-100 font-medium leading-relaxed">
              Kelola tes psikotes dan pantau perkembangan peserta Anda.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <BarChart3 className="size-64" />
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4 rounded-[2.5rem] bg-slate-900 p-8 shadow-sm flex flex-col justify-center gap-3">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Quick Actions</h3>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-11 font-black text-sm" asChild>
            <Link href="/admin/tests">
              <Plus className="size-4 mr-2" />
              Buat Tes Baru
            </Link>
          </Button>
          <Button className="w-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-600 rounded-xl h-11 font-black text-sm transition-colors" asChild>
            <Link href="/admin/results">
              <ClipboardList className="size-4 mr-2" />
              Lihat Hasil Peserta
            </Link>
          </Button>
          <Button className="w-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-600 rounded-xl h-11 font-black text-sm transition-colors" asChild>
            <Link href="/admin/settings">
              <Settings className="size-4 mr-2" />
              Pengaturan
            </Link>
          </Button>
        </div>

        {/* ROW 2: 4x Stat Cards + Tes Populer (row-span-2) */}
        {ADMIN_STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`lg:col-span-2 rounded-[2rem] p-6 shadow-sm group hover:shadow-md transition-all ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 rounded-xl bg-white/80 ${stat.textColor} flex items-center justify-center`}>
                  <Icon className="size-5" />
                </div>
                {'badge' in stat && stat.badge && (
                  <span className={`text-[10px] font-black ${stat.textColor} bg-white/60 px-2 py-0.5 rounded-full`}>
                    {stat.badge}
                  </span>
                )}
              </div>
              <p className={`text-3xl font-black tracking-tighter leading-none ${stat.textColor}`}>
                {stat.value}{'suffix' in stat ? stat.suffix : ''}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          )
        })}

        <div className="md:col-span-2 lg:col-span-4 lg:row-span-2 rounded-[2.5rem] bg-gradient-to-b from-violet-50 to-white border border-violet-100/50 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="size-5 text-violet-500" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tes Populer</h3>
          </div>
          <div className="space-y-3">
            {POPULAR_TESTS.map((test, i) => (
              <div key={test.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-colors">
                <span className={`text-lg font-black w-6 text-center ${i === 0 ? 'text-violet-500' : i === 1 ? 'text-violet-400' : 'text-slate-300'}`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{test.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{test.participants} peserta</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  test.status === 'published'
                    ? 'bg-teal-50 text-teal-600'
                    : 'bg-indigo-50 text-indigo-500'
                }`}>
                  {test.status === 'published' ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: Chart Tren Peserta */}
        <div className="md:col-span-2 lg:col-span-8 rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tren Peserta</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">8 minggu terakhir</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <div className="size-2 rounded-full bg-indigo-500" />
              Peserta
            </div>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPeserta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,.08)', fontWeight: 700, fontSize: 12 }}
                  labelStyle={{ fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="peserta" stroke="#6366F1" strokeWidth={3} fill="url(#colorPeserta)" dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#6366F1', strokeWidth: 3, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 4: Tes Terbaru + Aktivitas Terbaru + Avg Score */}
        <div className="lg:col-span-4 rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="size-5 text-indigo-500" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tes Terbaru</h3>
          </div>
          <div className="space-y-3">
            {RECENT_TESTS.map((test) => (
              <div key={test.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">{test.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{test.date}</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                  test.status === 'published'
                    ? 'bg-teal-50 text-teal-600'
                    : 'bg-indigo-50 text-indigo-500'
                }`}>
                  {test.status === 'published' ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-[2.5rem] bg-gradient-to-b from-teal-50 to-white border border-teal-100/50 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="size-5 text-teal-500" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Aktivitas</h3>
          </div>
          <div className="space-y-2">
            {RECENT_ACTIVITIES.slice(0, 5).map((activity, i) => {
              const Icon = ACTIVITY_ICONS[activity.type]
              const colorClass = ACTIVITY_COLORS[activity.type]
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/80 transition-colors">
                  <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-700 truncate">{activity.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-600 p-8 shadow-sm flex flex-col justify-between text-white">
          <div>
            <h3 className="text-sm font-black text-indigo-200 uppercase tracking-widest mb-1">Skor Rata-Rata</h3>
            <p className="text-xs text-indigo-200/70 font-medium">Dari semua hasil tes</p>
          </div>
          <div className="my-6">
            <p className="text-6xl font-black tracking-tighter leading-none">78</p>
            <p className="text-sm font-bold text-indigo-200 mt-2">+3.2 dari bulan lalu</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Hasil Minggu Ini</p>
              <p className="text-xl font-black mt-1">42</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Peserta Baru</p>
              <p className="text-xl font-black mt-1">
                <UserPlus className="size-4 inline mr-1" />
                12
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
