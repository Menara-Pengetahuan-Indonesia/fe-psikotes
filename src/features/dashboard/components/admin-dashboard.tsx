'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  BarChart3,
  FileText,
  Users,
  BookOpen,
  Package,
  Layers,
  HelpCircle,
} from 'lucide-react'

import { useAuthStoreHydrated } from '@/store/auth.store'
import {
  usePackages, useChildPackages, usePackageTypes,
  useTests, useSubTests, useQuestions, useUsers,
} from '@/features/admin/hooks'

export function AdminDashboard() {
  const { user } = useAuthStoreHydrated()
  const [dateStr, setDateStr] = React.useState('')

  React.useEffect(() => {
    setDateStr(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  const { data: packages, isLoading: loadPkg } = usePackages()
  const { data: childPackages, isLoading: loadCp } = useChildPackages()
  const { data: packageTypes, isLoading: loadPt } = usePackageTypes()
  const { data: tests, isLoading: loadTest } = useTests()
  const { data: subTests, isLoading: loadSt } = useSubTests()
  const { data: questions, isLoading: loadQ } = useQuestions()
  const { data: users, isLoading: loadU } = useUsers()

  const isLoading = loadPkg || loadCp || loadPt || loadTest || loadSt || loadQ || loadU

  const stats = [
    { label: 'Paket', value: packages?.length ?? 0, icon: Package, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Paket Kecil', value: childPackages?.length ?? 0, icon: Layers, color: 'bg-violet-50 text-violet-600' },
    { label: 'Tipe Paket', value: packageTypes?.length ?? 0, icon: Layers, color: 'bg-purple-50 text-purple-600' },
    { label: 'Tes', value: tests?.length ?? 0, icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Sub Tes', value: subTests?.length ?? 0, icon: BookOpen, color: 'bg-sky-50 text-sky-600' },
    { label: 'Soal', value: questions?.length ?? 0, icon: HelpCircle, color: 'bg-amber-50 text-amber-600' },
    { label: 'User', value: users?.length ?? 0, icon: Users, color: 'bg-teal-50 text-teal-600' },
  ]

  const activeTests = (tests ?? []).filter(t => t.isActive).length
  const activePackages = (packages ?? []).filter(p => p.isActive).length

  const recentTests = [...(tests ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const recentUsers = [...(users ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto">

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* Hero */}
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

        {/* Quick Actions */}
        <div className="md:col-span-2 lg:col-span-4 rounded-[2.5rem] bg-slate-900 p-8 shadow-sm flex flex-col justify-center gap-3">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Quick Actions</h3>
          <Link href="/admin/kelola-tes"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-11 font-black text-sm flex items-center justify-center gap-2 transition-colors">
            <BookOpen className="size-4" /> Kelola Tes
          </Link>
          <Link href="/superadmin/users"
            className="w-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-600 rounded-xl h-11 font-black text-sm flex items-center justify-center gap-2 transition-colors">
            <Users className="size-4" /> Kelola User
          </Link>
        </div>

        {/* Stats Grid */}
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="lg:col-span-3 rounded-[2rem] bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              {isLoading ? (
                <div className="h-9 w-16 bg-slate-100 rounded-lg animate-pulse" />
              ) : (
                <p className="text-3xl font-black tracking-tighter leading-none text-slate-900">{stat.value}</p>
              )}
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          )
        })}

        {/* Summary Card */}
        <div className="lg:col-span-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-600 p-8 shadow-sm text-white">
          <h3 className="text-sm font-black text-indigo-200 uppercase tracking-widest mb-6">Ringkasan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Paket Aktif</p>
              {isLoading ? (
                <div className="h-8 w-10 bg-white/20 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-black mt-1">{activePackages}</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Tes Aktif</p>
              {isLoading ? (
                <div className="h-8 w-10 bg-white/20 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-black mt-1">{activeTests}</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Total Soal</p>
              {isLoading ? (
                <div className="h-8 w-10 bg-white/20 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-black mt-1">{questions?.length ?? 0}</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Total User</p>
              {isLoading ? (
                <div className="h-8 w-10 bg-white/20 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-black mt-1">{users?.length ?? 0}</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="lg:col-span-4 rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="size-5 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tes Terbaru</h3>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentTests.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Belum ada tes</p>
          ) : (
            <div className="space-y-2">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{test.name}</p>
                    <p className="text-xs text-slate-400 font-medium">
                      {new Date(test.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    test.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {test.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="lg:col-span-3 rounded-[2.5rem] bg-gradient-to-b from-teal-50 to-white border border-teal-100/50 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Users className="size-5 text-teal-500" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">User Terbaru</h3>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-teal-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Belum ada user</p>
          ) : (
            <div className="space-y-2">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="size-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-black shrink-0">
                    {u.firstName?.[0]}{u.lastName?.[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-700 truncate">{u.firstName} {u.lastName}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{u.email}</p>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 ${
                    u.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : u.role === 'SUPERADMIN' ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
