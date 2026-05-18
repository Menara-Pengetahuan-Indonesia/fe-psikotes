'use client'

import Link from 'next/link'
import { BookOpen, Inbox, ArrowRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { CatalogChildPackage } from '../types/catalog.types'

interface ChildPackageCardProps {
  child: CatalogChildPackage
  categorySlug: string
  categoryLabel?: string
  lowestPrice?: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

export function ChildPackageCard({ child, categorySlug, categoryLabel, lowestPrice }: ChildPackageCardProps) {
  return (
    <Link
      href={`/${categorySlug}/${child.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          {categoryLabel && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
              {categoryLabel}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
            {child.name}
          </h3>
          {child.description && (
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {child.description}
            </p>
          )}
        </div>

        {lowestPrice !== undefined && (
          <div className="pt-1">
            <span className="text-xs text-slate-400 font-medium">Mulai dari</span>
            <p className="text-lg font-black text-slate-900">
              {lowestPrice === 0 ? (
                <span className="text-emerald-600">Gratis</span>
              ) : (
                formatPrice(lowestPrice)
              )}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold group-hover:bg-primary-700 transition-colors">
          Lihat Detail
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}

export function PackageGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse">
          <div className="flex justify-between">
            <div className="w-11 h-11 rounded-xl bg-slate-100" />
            <div className="w-24 h-5 rounded bg-slate-100" />
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-slate-100 rounded w-3/4" />
            <div className="h-4 bg-slate-50 rounded w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-10 bg-slate-50 rounded-xl" />
            <div className="h-10 bg-slate-50 rounded-xl" />
            <div className="h-10 bg-slate-50 rounded-xl" />
          </div>
          <div className="h-11 bg-slate-100 rounded-xl" />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 flex flex-col">
          <div className="p-6 flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <Skeleton className="w-11 h-11 rounded-xl" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-7 w-32 rounded-lg" />
            </div>
          </div>
          <div className="px-6 pb-6">
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
