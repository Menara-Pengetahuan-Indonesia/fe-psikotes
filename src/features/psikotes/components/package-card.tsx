'use client'

import Link from 'next/link'
import { Package as PackageIcon, Loader2, Inbox } from 'lucide-react'
import type { Package } from '@/features/admin/types'

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Link
      href={`/admin/packages/${pkg.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col p-6 gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
          <PackageIcon className="w-5 h-5" />
        </div>
        {pkg.isActive ? (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-wider border border-emerald-100">
            Aktif
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100">
            Nonaktif
          </span>
        )}
      </div>

      <div className="flex-1 space-y-1.5">
        <h3 className="font-bold text-base text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
          {pkg.name}
        </h3>
        {pkg.description && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {pkg.description}
          </p>
        )}
      </div>

      {pkg.childPackages && pkg.childPackages.length > 0 && (
        <div className="text-xs text-slate-400 font-medium">
          {pkg.childPackages.length} sub-paket
        </div>
      )}
    </Link>
  )
}

export function PackageGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse">
          <div className="flex justify-between">
            <div className="w-11 h-11 rounded-xl bg-slate-100" />
            <div className="w-14 h-6 rounded-full bg-slate-100" />
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-slate-100 rounded w-3/4" />
            <div className="h-4 bg-slate-50 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PackageEmptyState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Paket Tes</h3>
      <p className="text-sm text-slate-500 max-w-sm">
        {message || 'Paket tes sedang dalam proses penyusunan. Silakan cek kembali nanti.'}
      </p>
    </div>
  )
}

export function PackageLoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
    </div>
  )
}
