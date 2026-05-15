'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Loader2,
  ChevronRight,
  ArrowRight,
  Inbox,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { useCatalogChildPackageById, useCatalogPackageTypes } from '@/features/psikotes/hooks/use-catalog'
import { parseDescription, type DescriptionBlock } from '@/features/psikotes/utils/parse-description'
import type { CatalogPackageType } from '@/features/psikotes/types/catalog.types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

function DescriptionContent({ blocks }: { blocks: DescriptionBlock[] }) {
  if (blocks.length === 0) {
    return (
      <p className="text-slate-500 leading-relaxed">
        Belum ada deskripsi untuk paket ini.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h3
              key={i}
              className="text-base md:text-lg font-bold text-slate-900 tracking-tight flex items-start gap-2 pt-2"
            >
              <span className="inline-block w-1 h-5 bg-primary-500 rounded-full mt-1 shrink-0" />
              <span>{block.text}</span>
            </h3>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2.5 pl-4">
              {block.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-slate-600 leading-relaxed text-sm md:text-base">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

function TierCard({
  tier,
  onSelect,
  highlighted,
}: {
  tier: CatalogPackageType
  onSelect: (id: string) => void
  highlighted?: boolean
}) {
  return (
    <div
      className={`relative rounded-2xl p-5 transition-all ${
        highlighted
          ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-xl shadow-primary-200/50'
          : 'bg-white border border-slate-200 hover:border-primary-200 hover:shadow-md'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-2.5 left-4 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest">
          Direkomendasikan
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className={`text-base font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
            {tier.name}
          </h3>
          {tier.description && (
            <p
              className={`text-xs mt-1 leading-relaxed line-clamp-2 ${
                highlighted ? 'text-primary-100' : 'text-slate-500'
              }`}
            >
              {tier.description}
            </p>
          )}
        </div>

        <div className={`pt-3 border-t ${highlighted ? 'border-white/20' : 'border-slate-100'}`}>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className={`text-2xl font-black ${highlighted ? 'text-white' : 'text-slate-900'}`}>
              {tier.price === 0 ? 'Gratis' : formatPrice(tier.price)}
            </span>
            {tier.price > 0 && (
              <span className={`text-xs ${highlighted ? 'text-primary-100' : 'text-slate-400'}`}>
                / paket
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect(tier.id)}
            className={`w-full h-11 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              highlighted
                ? 'bg-white text-primary-700 hover:bg-primary-50'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Ambil Paket
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProdukDetailPage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.id as string
  const { data, isLoading } = useCatalogChildPackageById(childId)
  const { data: packageTypes } = useCatalogPackageTypes(childId)

  const handleSelect = (packageTypeId: string) => {
    router.push(`/pembayaran?packageTypeId=${packageTypeId}`)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          <p className="text-sm font-medium text-slate-400">Memuat paket...</p>
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center py-24">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <Inbox className="w-10 h-10 text-slate-300" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Paket Tidak Ditemukan
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Paket tes yang kamu cari tidak tersedia atau sudah dihapus.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
          >
            Kembali ke Beranda
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  const { child, parentName } = data
  const tiers = packageTypes ?? []
  const blocks = parseDescription(child.description)

  const cheapestTier = tiers.length > 0
    ? tiers.reduce((min, t) => (t.price < min.price ? t : min), tiers[0])
    : null

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-10 md:pb-12 bg-gradient-to-br from-primary-50 via-primary-50/60 to-amber-50/40">
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(20 83 45 / 0.08) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] bg-primary-200/40 rounded-full pointer-events-none blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[360px] h-[360px] bg-amber-200/40 rounded-full pointer-events-none blur-3xl" />

        <svg className="absolute top-8 right-12 w-20 h-20 text-primary-400/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
        </svg>
        <svg className="absolute bottom-12 right-1/3 w-16 h-16 text-amber-400/50 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 L55 40 L85 40 L60 60 L70 90 L50 70 L30 90 L40 60 L15 40 L45 40 Z" />
        </svg>
        <svg className="hidden md:block absolute top-32 left-[55%] w-12 h-12 text-primary-500/30 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 50 Q 35 20, 50 50 T 80 50" strokeLinecap="round" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-5 flex-wrap">
            <Link href="/" className="hover:text-primary-700 transition-colors font-medium">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {parentName && (
              <>
                <span className="text-slate-600 font-medium">{parentName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="text-slate-900 font-semibold truncate max-w-[200px] md:max-w-none">
              {child.name}
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
              {child.name}
              <span className="inline-block ml-2 w-2.5 h-2.5 rounded-full bg-amber-400 align-middle translate-y-[-6px]" />
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              {tiers.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-600 text-white text-xs font-bold shadow-sm shadow-primary-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  {tiers.length} Paket Tersedia
                </span>
              )}
              {cheapestTier && cheapestTier.price > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-bold shadow-sm shadow-amber-200">
                  Mulai {formatPrice(cheapestTier.price)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-700 border border-slate-200 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-primary-600" />
                Tes Online
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-700 border border-slate-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                Hasil Privasi Terjaga
              </span>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-[-1px] left-0 right-0 w-full text-slate-50 pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 lg:gap-10">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="relative bg-white rounded-3xl border border-primary-100/60 p-6 md:p-8 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/40 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-200">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">Tentang Paket Ini</h2>
                  <p className="text-xs text-slate-500">Ringkasan layanan dan area yang dibahas</p>
                </div>
              </div>
              <div className="relative">
                <DescriptionContent blocks={blocks} />
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-amber-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-accent-400/30 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-amber-400 rounded-full" />
                  <h3 className="text-base md:text-lg font-bold text-white">
                    Yang Akan Kamu Dapatkan
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Asesmen Komprehensif', desc: 'Dirancang oleh psikolog berpengalaman' },
                    { title: 'Hasil Terstruktur', desc: 'Laporan detail dengan rekomendasi langkah' },
                    { title: 'Privasi Terjaga', desc: 'Data kamu aman dan hanya untuk kamu' },
                    { title: 'Akses Kapan Saja', desc: 'Kerjakan sesuai kenyamanan kamu' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                        <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-primary-100/80 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Pilih Paket
                </h2>
                {tiers.length > 0 && (
                  <span className="text-xs font-bold text-slate-400">
                    {tiers.length} opsi
                  </span>
                )}
              </div>

              {tiers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
                  <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-400">
                    Belum ada paket tersedia.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tiers.map((tier, i) => (
                    <TierCard
                      key={tier.id}
                      tier={tier}
                      onSelect={handleSelect}
                      highlighted={tiers.length > 1 && i === Math.floor(tiers.length / 2)}
                    />
                  ))}
                </div>
              )}

              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
                Butuh bantuan memilih paket?{' '}
                <Link href="/tentang" className="text-primary-600 font-bold hover:underline">
                  Hubungi kami
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
