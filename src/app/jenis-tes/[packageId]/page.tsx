'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  FileText,
  Clock,
  Play,
  Brain,
  Shield,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { publicPackageService } from '@/features/admin/services'
import type { Package as PackageType } from '@/features/admin/types'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const testRowColors = [
  { icon: 'bg-indigo-100 text-indigo-600', num: 'bg-indigo-50 text-indigo-600' },
  { icon: 'bg-teal-100 text-teal-600', num: 'bg-teal-50 text-teal-600' },
  { icon: 'bg-violet-100 text-violet-600', num: 'bg-violet-50 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600', num: 'bg-rose-50 text-rose-600' },
  { icon: 'bg-amber-100 text-amber-600', num: 'bg-amber-50 text-amber-600' },
]

const popularityLabel: Record<string, string> = {
  COMMON: 'Umum',
  LESS_COMMON: 'Kurang Umum',
  UNCOMMON: 'Tidak Umum',
}

export default function PackageDetailPublicPage() {
  const params = useParams()
  const router = useRouter()
  const [pkg, setPkg] = useState<PackageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const id = params.packageId as string
    publicPackageService.getById(id).then((data) => {
      setPkg(data)
      setLoading(false)
    }).catch(() => { setNotFound(true); setLoading(false) })
  }, [params.packageId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7]">
        <Skeleton className="h-64" />
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          <Skeleton className="h-96 rounded-[2.5rem]" />
        </div>
      </div>
    )
  }

  if (notFound || !pkg) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Paket tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID paket tidak valid.</p>
          <Button onClick={() => router.push('/jenis-tes')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isFree = pkg.price === 0
  const tests = pkg.tests ?? []

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-8 pb-10 md:pt-10 md:pb-12 text-white">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/jenis-tes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Jenis Tes</span>
          </Link>

          <div className="flex items-start gap-6">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg">
              <Package className="size-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={cn(
                  'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                  isFree ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
                )}>
                  {formatPrice(pkg.price)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{pkg.name}</h1>
              <p className="text-slate-400 font-medium text-sm max-w-2xl leading-relaxed">{pkg.description}</p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <FileText className="size-4 text-violet-300" />
                <span className="text-sm font-bold">{tests.length} Tes</span>
              </div>
              {pkg.estimatedDuration && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                  <Clock className="size-4 text-indigo-300" />
                  <span className="text-sm font-bold">{pkg.estimatedDuration} Menit</span>
                </div>
              )}
            </div>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95"
              onClick={() => {
                const firstTest = tests.sort((a, b) => a.order - b.order)[0]
                if (firstTest?.test) router.push(`/tes/${(firstTest.test as { id: string }).id}`)
              }}
              disabled={tests.length === 0}
            >
              <Play className="size-5 mr-2 fill-current" />
              Mulai Tes
            </Button>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Brain className="size-[400px]" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* DAFTAR TES */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <FileText className="size-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Daftar Tes dalam Paket</h2>
              <p className="text-xs text-slate-400 font-medium">{tests.length} tes, dikerjakan berurutan</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {tests.sort((a, b) => a.order - b.order).map((pt, index) => {
              const test = pt.test as { id: string; name: string; description?: string; duration?: number; originalYear?: number; adaptationYear?: number; precisionLevel?: number; popularity?: string; questions?: unknown[] } | undefined
              if (!test) return null
              const color = testRowColors[index % testRowColors.length]
              return (
                <div key={pt.id} className="px-8 py-6 group hover:bg-slate-50/50 transition-all">
                  <div className="flex items-start gap-5">
                    <span className={cn('size-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 mt-0.5', color.num)}>
                      {pt.order}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-black text-slate-900 mb-1">{test.name}</h4>
                      <p className="text-sm text-slate-400 font-medium mb-3">{test.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                          <Clock className="size-3" />
                          <span>{test.duration}m</span>
                        </div>
                        {test.originalYear && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                            <span>Original {test.originalYear}</span>
                          </div>
                        )}
                        {test.adaptationYear && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-teal-500 bg-teal-50 px-2.5 py-1 rounded-full">
                            <span>Adaptasi {test.adaptationYear}</span>
                          </div>
                        )}
                        {test.precisionLevel && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full">
                            <Shield className="size-3" />
                            <span>Presisi {test.precisionLevel}%</span>
                          </div>
                        )}
                        {test.popularity && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                            <Award className="size-3" />
                            <span>{popularityLabel[test.popularity] ?? test.popularity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="h-14 px-10 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-base shadow-xl transition-all active:scale-95"
            onClick={() => {
              const firstTest = tests.sort((a, b) => a.order - b.order)[0]
              if (firstTest?.test) router.push(`/tes/${(firstTest.test as { id: string }).id}`)
            }}
            disabled={tests.length === 0}
          >
            <Play className="size-5 mr-2 fill-current" />
            Mulai Tes Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
