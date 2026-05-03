'use client'

import { Package, Loader2, Inbox } from 'lucide-react'
import { useMyPackages } from '../hooks/use-catalog'

export function MyPackages() {
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
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <h3 className="font-bold text-slate-900 mb-1">{pkg.name}</h3>
            {pkg.packageName && (
              <p className="text-xs text-slate-400 mb-2">{pkg.packageName} — {pkg.childPackageName}</p>
            )}
            {pkg.description && (
              <p className="text-sm text-slate-500 mb-3">{pkg.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Dibeli: {new Date(pkg.purchasedAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
