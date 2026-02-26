'use client'

import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Clock,
  Award,
  Settings,
  Plus,
  ArrowRight,
  Activity,
  ShieldCheck,
  BarChart3,
  BookOpen,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useAuthStoreHydrated } from '@/store/auth.store'
import type { UserRole } from '@/store/auth.store'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { user, _hasHydrated } = useAuthStoreHydrated()

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  const role = user?.role || 'USER'

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Halo, {user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-1">
          {role === 'SUPERADMIN' && 'Superadmin Panel — Kelola seluruh sistem'}
          {role === 'ADMIN' && 'Admin Panel — Kelola tes dan konten'}
          {role === 'USER' && 'Selamat datang kembali di dashboard Anda'}
        </p>
      </div>

      {role === 'USER' && <UserDashboard />}
      {role === 'ADMIN' && <AdminDashboard />}
      {role === 'SUPERADMIN' && <SuperadminDashboard />}
    </div>
  )
}

// ─── USER DASHBOARD ──────────────────────────────────
function UserDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Tes Aktif — Large Card */}
      <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="size-6 text-primary-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Tes Aktif</p>
          </div>
          <h3 className="text-2xl font-black tracking-tight">Tes Try Out CPNS</h3>
          <p className="text-slate-400 font-medium max-w-md">
            Kamu masih punya tes yang belum selesai. Lanjutkan sekarang sebelum waktu habis.
          </p>
          <Button className="bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-black h-12 px-8 shadow-lg shadow-primary-500/20 mt-4">
            LANJUTKAN TES <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
        <Activity className="absolute -right-16 -bottom-16 size-64 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
      </div>

      {/* Skor Terakhir */}
      <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Skor Terakhir</p>
        <div className="relative">
          <span className="text-[80px] font-black text-slate-900 leading-none tracking-tighter">85</span>
          <span className="absolute -right-8 bottom-2 text-xl font-black text-primary-500">/ 100</span>
        </div>
        <div className="flex items-center gap-2 text-primary-600 font-bold bg-primary-50 px-4 py-2 rounded-xl text-xs">
          <TrendingUp className="size-4" /> Sangat Baik
        </div>
      </div>

      {/* Stats Row */}
      <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <FileText className="size-7 text-indigo-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">7</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total Tes Selesai</p>
        </div>
        <Link href="/pengguna/riwayat" className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
          Lihat Riwayat <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-amber-50 flex items-center justify-center">
          <Award className="size-7 text-amber-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">3</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Sertifikat Diperoleh</p>
        </div>
        <Link href="/pengguna/riwayat" className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
          Lihat Sertifikat <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <Clock className="size-7 text-emerald-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">1</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Tes Berlangsung</p>
        </div>
        <Link href="/pengguna/tes" className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
          Lihat Tes <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Explore CTA */}
      <div className="lg:col-span-12 bg-gradient-to-r from-primary-600 to-primary-500 rounded-[2.5rem] p-10 text-white shadow-xl shadow-primary-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight">Jelajahi Tes Lainnya</h3>
          <p className="text-primary-100 font-medium max-w-md">
            Temukan berbagai tes psikologi untuk mengenal diri lebih baik.
          </p>
        </div>
        <Button className="bg-white text-primary-600 hover:bg-slate-50 rounded-xl font-black h-12 px-8 shadow-lg shrink-0" asChild>
          <Link href="/psikotes">
            EKSPLORASI TES <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// ─── ADMIN DASHBOARD ─────────────────────────────────
function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Quick Action */}
      <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-6 text-primary-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Admin Panel</p>
          </div>
          <h3 className="text-2xl font-black tracking-tight">Kelola Tes Psikotes</h3>
          <p className="text-slate-400 font-medium max-w-md">
            Buat, edit, dan publish tes psikotes. Kelola soal, indikator, dan scoring rules.
          </p>
          <div className="flex gap-3 mt-4">
            <Button className="bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-black h-12 px-8 shadow-lg shadow-primary-500/20" asChild>
              <Link href="/admin/tests">
                <Plus className="size-4 mr-2" /> BUAT TES BARU
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-black h-12 px-6" asChild>
              <Link href="/admin/tests">
                KELOLA TES
              </Link>
            </Button>
          </div>
        </div>
        <Settings className="absolute -right-16 -bottom-16 size-64 opacity-5 pointer-events-none group-hover:rotate-90 transition-transform duration-1000" />
      </div>

      {/* Total Tes */}
      <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Total Tes</p>
        <span className="text-[80px] font-black text-slate-900 leading-none tracking-tighter">12</span>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg">8 Published</span>
          <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg">4 Draft</span>
        </div>
      </div>

      {/* Stats */}
      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Users className="size-7 text-blue-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">156</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total Peserta</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center">
          <BookOpen className="size-7 text-violet-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">248</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total Soal</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-amber-50 flex items-center justify-center">
          <BarChart3 className="size-7 text-amber-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">89</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Tes Dikerjakan</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <TrendingUp className="size-7 text-emerald-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">94%</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Completion Rate</p>
        </div>
      </div>
    </div>
  )
}

// ─── SUPERADMIN DASHBOARD ────────────────────────────
function SuperadminDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* System Overview */}
      <div className="lg:col-span-12 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-6 text-primary-400" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Superadmin Panel</p>
            </div>
            <h3 className="text-2xl font-black tracking-tight">System Overview</h3>
            <p className="text-slate-400 font-medium max-w-lg">
              Kelola seluruh sistem — user management, admin management, dan konfigurasi platform.
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-black h-12 px-8 shadow-lg shadow-primary-500/20" asChild>
              <Link href="/admin/tests">
                KELOLA TES
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-black h-12 px-6">
              SETTINGS
            </Button>
          </div>
        </div>
        <ShieldCheck className="absolute -right-16 -bottom-16 size-64 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
      </div>

      {/* Stats */}
      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Users className="size-7 text-blue-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">1,234</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total User</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center">
          <ShieldCheck className="size-7 text-violet-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">5</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total Admin</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-amber-50 flex items-center justify-center">
          <FileText className="size-7 text-amber-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">12</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Total Tes</p>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <Activity className="size-7 text-emerald-600" />
        </div>
        <div>
          <p className="text-4xl font-black text-slate-900">99.9%</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Uptime</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="lg:col-span-6 bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group min-h-[280px] flex flex-col justify-between">
        <div className="relative z-10">
          <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
            <Users className="size-7 text-white" />
          </div>
          <h4 className="text-2xl font-black tracking-tight">User Management</h4>
          <p className="text-indigo-100 font-medium mt-3 opacity-80 leading-relaxed max-w-md">
            Kelola user, ubah role, dan monitor aktivitas pengguna platform.
          </p>
        </div>
        <Button className="relative z-10 w-fit bg-white text-indigo-600 hover:bg-slate-50 rounded-xl font-black h-12 px-8 shadow-lg mt-6">
          KELOLA USER
        </Button>
        <Users className="absolute -right-10 -bottom-10 size-64 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000" />
      </div>

      <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group min-h-[280px] flex flex-col justify-between">
        <div className="relative z-10">
          <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Settings className="size-7 text-orange-500" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Platform Settings</h4>
          <p className="text-slate-500 font-medium mt-3 leading-relaxed max-w-md">
            Konfigurasi platform, email templates, dan pengaturan sistem lainnya.
          </p>
        </div>
        <Button variant="outline" className="relative z-10 w-fit border-2 border-slate-100 text-slate-900 hover:border-slate-200 hover:bg-slate-50 rounded-xl font-black h-12 px-8 mt-6">
          BUKA SETTINGS
        </Button>
        <Settings className="absolute -right-10 -bottom-10 size-64 opacity-[0.03] text-orange-500 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
      </div>
    </div>
  )
}
