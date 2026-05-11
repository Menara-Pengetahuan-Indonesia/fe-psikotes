'use client'

import { useRouter } from 'next/navigation'
import { Package, Loader2, Inbox, PlayCircle, Clock, FileText } from 'lucide-react'
import { useMyPackages } from '../hooks/use-catalog'

const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  CHECKBOX: 'Checkbox',
  SCALE_RATING: 'Skala Rating',
  ESSAY: 'Essay',
  TRUE_FALSE: 'Benar/Salah',
}

export function MyPackages() {
  const router = useRouter()
  const { data: packages, isLoading } = useMyPackages()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Paket</h2>
        <p className="text-sm text-slate-500">Kamu belum memiliki paket tes. Jelajahi katalog untuk membeli.</p>
      </div>
    )
  }

  const handleStartTest = (pkg: (typeof packages)[0]) => {
    if (!pkg.tests || pkg.tests.length === 0) return
    router.push(`/tes/${pkg.tests[0].id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Paket Saya</h1>
          <p className="text-sm text-slate-500">{packages.length} paket dimiliki</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => {
          const allTypes = new Set<string>()
          let totalDuration = 0
          let totalQuestions = 0
          for (const t of pkg.tests ?? []) {
            t.questionTypes.forEach((qt) => allTypes.add(qt))
            totalDuration += t.totalDuration
            totalQuestions += t.totalQuestions
          }

          return (
            <div
              key={pkg.id}
              className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col"
            >
              <h3 className="font-bold text-slate-900 mb-1">{pkg.name}</h3>
              {pkg.packageName && (
                <p className="text-xs text-slate-400 mb-2">{pkg.packageName} — {pkg.childPackageName}</p>
              )}
              {pkg.description && (
                <p className="text-sm text-slate-500 mb-3">{pkg.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {totalQuestions > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <FileText className="w-3 h-3" />
                    {totalQuestions} soal
                  </span>
                )}
                {totalDuration > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3" />
                    {totalDuration} menit
                  </span>
                )}
                {Array.from(allTypes).map((qt) => (
                  <span key={qt} className="text-[11px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
                    {TYPE_LABELS[qt] ?? qt}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Dibeli: {new Date(pkg.purchasedAt).toLocaleDateString('id-ID')}
                </span>
                {pkg.tests && pkg.tests.length > 0 && (
                  <button
                    onClick={() => handleStartTest(pkg)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Mulai Tes
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
