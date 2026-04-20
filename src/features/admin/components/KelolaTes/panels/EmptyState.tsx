'use client'

import {
  Package, Layers, FileText, BookOpen, HelpCircle,
  CheckCircle2, XCircle, MousePointerClick,
} from 'lucide-react'
import {
  usePackages, useChildPackages, usePackageTypes,
  useTests, useSubTests, useQuestions,
} from '@/features/admin/hooks'

export function EmptyState() {
  const { data: packages, isLoading: lp } = usePackages()
  const { data: childPackages, isLoading: lcp } = useChildPackages()
  const { data: packageTypes, isLoading: lpt } = usePackageTypes()
  const { data: tests, isLoading: lt } = useTests()
  const { data: subTests, isLoading: lst } = useSubTests()
  const { data: questions, isLoading: lq } = useQuestions()

  const loading = lp || lcp || lpt || lt || lst || lq

  const stats = [
    { label: 'Paket', value: packages?.length ?? 0, icon: Package, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Paket Kecil', value: childPackages?.length ?? 0, icon: Layers, color: 'bg-violet-50 text-violet-600' },
    { label: 'Tipe Paket', value: packageTypes?.length ?? 0, icon: Layers, color: 'bg-purple-50 text-purple-600' },
    { label: 'Tes', value: tests?.length ?? 0, icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Sub Tes', value: subTests?.length ?? 0, icon: BookOpen, color: 'bg-sky-50 text-sky-600' },
    { label: 'Soal', value: questions?.length ?? 0, icon: HelpCircle, color: 'bg-amber-50 text-amber-600' },
  ]

  const activeTests = (tests ?? []).filter(t => t.isActive).length
  const inactiveTests = (tests ?? []).filter(t => !t.isActive).length

  const recentTests = [...(tests ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 max-w-4xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard Kelola Tes</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Ringkasan data tes dan paket dari sistem.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
              <div className={`size-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                {loading ? (
                  <div className="h-7 w-10 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                )}
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active / Inactive */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tes Aktif</span>
          </div>
          {loading ? (
            <div className="h-9 w-12 bg-slate-100 rounded-lg animate-pulse" />
          ) : (
            <p className="text-3xl font-black text-emerald-600">{activeTests}</p>
          )}
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-xl bg-rose-50 flex items-center justify-center">
              <XCircle className="size-5 text-rose-500" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tes Nonaktif</span>
          </div>
          {loading ? (
            <div className="h-9 w-12 bg-slate-100 rounded-lg animate-pulse" />
          ) : (
            <p className="text-3xl font-black text-rose-500">{inactiveTests}</p>
          )}
        </div>
      </div>

      {/* Recent Tests */}
      {recentTests.length > 0 && (
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight mb-3">Tes Terbaru</h3>
          <div className="space-y-2">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <FileText className="size-4 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{test.name}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(test.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                  test.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {test.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 pt-2">
        <MousePointerClick className="size-4 text-indigo-400" />
        Pilih item dari pohon navigasi untuk mengelola detail
      </div>
    </div>
  )
}
