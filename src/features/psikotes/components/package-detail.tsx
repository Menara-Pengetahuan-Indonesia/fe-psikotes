'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePublicChildPackage } from '../hooks/use-public-packages'
import type { PackageType } from '@/features/admin/types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function getTierColor(name: string) {
  const lower = name.toLowerCase()
  if (lower.includes('dasar')) return 'border-emerald-200 bg-emerald-50'
  if (lower.includes('lengkap')) return 'border-blue-200 bg-blue-50'
  return 'border-violet-200 bg-violet-50'
}

function getTierAccent(name: string) {
  const lower = name.toLowerCase()
  if (lower.includes('dasar')) return 'text-emerald-600'
  if (lower.includes('lengkap')) return 'text-blue-600'
  return 'text-violet-600'
}

function getTierBadge(name: string) {
  const lower = name.toLowerCase()
  if (lower.includes('dasar')) return 'bg-emerald-100 text-emerald-700'
  if (lower.includes('lengkap')) return 'bg-blue-100 text-blue-700'
  return 'bg-violet-100 text-violet-700'
}

interface PackageDetailClientProps {
  categorySlug: string
  categoryLabel: string
}

export function PackageDetailClient({ categorySlug, categoryLabel }: PackageDetailClientProps) {
  const params = useParams()
  const router = useRouter()
  const childId = params.slug as string
  const { data, isLoading } = usePublicChildPackage(childId)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Paket Tidak Ditemukan</h1>
        <p className="text-slate-500">Paket tes yang kamu cari tidak tersedia.</p>
        <Link href={`/${categorySlug}`} className="text-primary-600 font-semibold hover:underline">
          Kembali ke {categoryLabel}
        </Link>
      </main>
    )
  }

  const { child } = data
  const tiers = child.packageTypes?.filter(pt => pt.isActive) ?? []

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-linear-to-b from-primary-900 to-primary-700 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali</span>
          </button>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <BookOpen className="w-3.5 h-3.5 text-accent-300" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{categoryLabel}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {child.name}
            </h1>
            {child.description && (
              <p className="text-primary-100/80 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
                {child.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Pilih Paket
          </h2>
          <p className="text-slate-500 font-medium text-sm mb-10">
            Pilih paket yang sesuai dengan kebutuhanmu.
          </p>

          {tiers.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-medium">Belum ada paket tersedia untuk tes ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} childId={childId} categorySlug={categorySlug} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function TierCard({ tier, childId, categorySlug }: { tier: PackageType; childId: string; categorySlug: string }) {
  return (
    <div className={cn('rounded-2xl border-2 p-6 flex flex-col', getTierColor(tier.name))}>
      <div className="space-y-3 flex-1">
        <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', getTierBadge(tier.name))}>
          {tier.name}
        </span>
        <div className={cn('text-3xl font-black tracking-tight', getTierAccent(tier.name))}>
          {formatPrice(tier.price)}
        </div>
        {tier.description && (
          <p className="text-slate-600 text-sm leading-relaxed">{tier.description}</p>
        )}
        {tier.testTool && (
          <div className="pt-2 space-y-1.5">
            {tier.testTool.split(',').map((tool, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">{tool.trim()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          alert('Fitur pembayaran akan segera tersedia.')
        }}
        className={cn(
          'mt-6 w-full h-12 rounded-xl text-sm font-bold transition-colors',
          'bg-primary-600 text-white hover:bg-primary-700'
        )}
      >
        Pilih Paket Ini
      </button>
    </div>
  )
}
