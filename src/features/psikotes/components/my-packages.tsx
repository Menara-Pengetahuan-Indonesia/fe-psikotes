'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  Loader2,
  Inbox,
  PlayCircle,
  Clock,
  FileText,
  Sparkles,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import { useMyPackages } from '../hooks/use-catalog'

const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  CHECKBOX: 'Checkbox',
  SCALE_RATING: 'Skala Rating',
  ESSAY: 'Essay',
  TRUE_FALSE: 'Benar/Salah',
}

const ACCENT_RING = [
  'from-primary-500 to-primary-600 shadow-primary-200',
  'from-amber-400 to-amber-500 shadow-amber-200',
  'from-rose-400 to-rose-500 shadow-rose-200',
  'from-violet-400 to-violet-500 shadow-violet-200',
]

export function MyPackages() {
  const router = useRouter()
  const { data: packages, isLoading } = useMyPackages()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="relative bg-white rounded-3xl border border-primary-100/60 shadow-sm overflow-hidden p-10 md:p-14 text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-primary-200">
            <Inbox className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Belum Ada Paket</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Kamu belum memiliki paket tes. Jelajahi katalog kami untuk menemukan paket yang sesuai.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Jelajahi Katalog
          </Link>
        </div>
      </div>
    )
  }

  const handleStartTest = (pkg: (typeof packages)[0]) => {
    if (!pkg.tests || pkg.tests.length === 0) return
    router.push(`/tes/${pkg.tests[0].id}`)
  }

  const totalTests = packages.reduce((acc, pkg) => acc + (pkg.tests?.length ?? 0), 0)

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
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 bg-amber-400/25 rounded-full blur-2xl" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-accent-400/30 rounded-full blur-2xl" />
        <svg
          className="absolute top-6 right-8 w-24 h-24 text-white/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="9" />
        </svg>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Koleksi Kamu
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Paket Saya
            </h1>
            <p className="text-sm text-primary-100/90 mt-1">
              {packages.length} paket dimiliki · {totalTests} tes siap dikerjakan
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-bold border border-white/20 hover:bg-white/25 transition-colors self-start md:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            Jelajahi Paket Lain
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {packages.map((pkg, idx) => {
          const allTypes = new Set<string>()
          let totalDuration = 0
          let totalQuestions = 0
          for (const t of pkg.tests ?? []) {
            t.questionTypes.forEach((qt) => allTypes.add(qt))
            totalDuration += t.totalDuration
            totalQuestions += t.totalQuestions
          }

          const hasTests = pkg.tests && pkg.tests.length > 0
          const accent = ACCENT_RING[idx % ACCENT_RING.length]

          return (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full pointer-events-none opacity-60" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-50 to-transparent rounded-tr-full pointer-events-none opacity-60" />

              <div className="relative p-5 md:p-6 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-sm shrink-0`}
                  >
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 leading-tight truncate">{pkg.name}</h3>
                    {pkg.packageName && (
                      <p className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
                        {pkg.packageName}
                        {pkg.childPackageName ? ` · ${pkg.childPackageName}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                {pkg.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {pkg.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {totalQuestions > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <FileText className="w-3 h-3 text-primary-600" />
                      {totalQuestions} soal
                    </span>
                  )}
                  {totalDuration > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-primary-600" />
                      {totalDuration} menit
                    </span>
                  )}
                  {Array.from(allTypes)
                    .slice(0, 2)
                    .map((qt) => (
                      <span
                        key={qt}
                        className="text-[11px] font-bold text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-lg"
                      >
                        {TYPE_LABELS[qt] ?? qt}
                      </span>
                    ))}
                  {allTypes.size > 2 && (
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      +{allTypes.size - 2}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Dibeli{' '}
                    {new Date(pkg.purchasedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {hasTests ? (
                    <button
                      onClick={() => handleStartTest(pkg)}
                      className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm shadow-primary-200 hover:shadow-md"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Mulai Tes
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
                      Segera hadir
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
