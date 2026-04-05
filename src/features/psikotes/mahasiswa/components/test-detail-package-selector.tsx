'use client'

import { useState } from 'react'
import { Check, ArrowRight, Package, ChevronDown, ChevronUp, FileText, ShoppingCart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { TestDetailProps } from './test-detail'

const cardThemes = [
  { iconBg: 'bg-primary-50', iconColor: 'text-primary-600', selectedBg: 'bg-primary-50/60', checkBg: 'bg-primary-600' },
  { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', selectedBg: 'bg-indigo-50/60', checkBg: 'bg-indigo-600' },
  { iconBg: 'bg-violet-50', iconColor: 'text-violet-600', selectedBg: 'bg-violet-50/60', checkBg: 'bg-violet-600' },
  { iconBg: 'bg-rose-50', iconColor: 'text-rose-600', selectedBg: 'bg-rose-50/60', checkBg: 'bg-rose-600' },
  { iconBg: 'bg-accent-50', iconColor: 'text-accent-600', selectedBg: 'bg-accent-50/60', checkBg: 'bg-accent-600' },
  { iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', selectedBg: 'bg-cyan-50/60', checkBg: 'bg-cyan-600' },
  { iconBg: 'bg-teal-50', iconColor: 'text-teal-600', selectedBg: 'bg-teal-50/60', checkBg: 'bg-teal-600' },
]

// Dummy price per aspect (in IDR)
const ASPECT_PRICE = 45000

interface PackageSelectorProps {
  aspects: NonNullable<TestDetailProps['aspects']>
  price: string
  originalPrice?: string
  formHref: string
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export function PackageSelector({ aspects, formHref }: PackageSelectorProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set(aspects.map((_, i) => i)))
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]))
  const [confirmOpen, setConfirmOpen] = useState(false)

  const allSelected = selected.size === aspects.length
  const noneSelected = selected.size === 0

  const totalPrice = selected.size * ASPECT_PRICE
  const fullPrice = aspects.length * ASPECT_PRICE
  const discount = allSelected ? Math.round(fullPrice * 0.1) : 0
  const finalPrice = totalPrice - discount

  function toggleAll() {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(aspects.map((_, i) => i)))
  }

  function toggleOne(i: number) {
    const next = new Set(selected)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setSelected(next)
  }

  function toggleExpand(i: number) {
    const next = new Set(expanded)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setExpanded(next)
  }

  const selectedAspects = aspects.filter((_, i) => selected.has(i))

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Paket Kecil Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 mb-1">Paket Kecil</p>
              <h2 className="text-2xl font-black text-slate-900">Pilih Aspek yang Diinginkan</h2>
            </div>
            <button
              onClick={toggleAll}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border',
                allSelected
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary-400'
              )}
            >
              {allSelected ? 'Batal Semua' : 'Pilih Semua'}
            </button>
          </div>

          <div className="space-y-4">
            {aspects.map((aspect, i) => {
              const theme = cardThemes[i % cardThemes.length]
              const isSelected = selected.has(i)
              const isExpanded = expanded.has(i)
              const badge = String(i + 1).padStart(2, '0')

              return (
                <div
                  key={aspect.heading}
                  className={cn(
                    'rounded-[2rem] border-2 transition-all duration-300 overflow-hidden',
                    isSelected
                      ? cn('border-primary-400 shadow-lg shadow-primary-100', theme.selectedBg)
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
                  )}
                >
                  <div className="flex items-center gap-4 px-6 py-5">
                    <button
                      onClick={() => toggleOne(i)}
                      className={cn(
                        'size-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all',
                        isSelected
                          ? cn('border-transparent', theme.checkBg)
                          : 'border-slate-300 bg-white hover:border-primary-400'
                      )}
                    >
                      {isSelected && <Check className="size-3.5 text-white stroke-[3]" />}
                    </button>

                    <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', theme.iconBg)}>
                      <Package className={cn('size-5', theme.iconColor)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{badge}</span>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">{aspect.heading}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-slate-400 font-medium">{aspect.items.length} alat tes</p>
                        <span className="text-[10px] font-black text-primary-600">{formatRupiah(ASPECT_PRICE)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(i)}
                      className="size-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
                    >
                      {isExpanded
                        ? <ChevronUp className="size-4 text-slate-500" />
                        : <ChevronDown className="size-4 text-slate-500" />
                      }
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-5 border-t border-slate-100/80">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        {aspect.items.map((item) => (
                          <div key={item.title} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-sm font-black text-slate-800 mb-1">{item.title}</p>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Pricing Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 overflow-hidden">
            <div className="bg-primary-950 text-white px-8 py-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800/30 rounded-full blur-3xl" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-300 mb-2 relative z-10">
                Total Harga
              </p>
              <div className="flex items-baseline gap-3 relative z-10">
                <span className="text-4xl font-black tracking-tight transition-all">
                  {noneSelected ? 'Rp 0' : formatRupiah(finalPrice)}
                </span>
                {allSelected && discount > 0 && (
                  <span className="text-primary-400/60 line-through text-sm font-bold">{formatRupiah(totalPrice)}</span>
                )}
              </div>
              {allSelected && discount > 0 && (
                <p className="text-[10px] font-black text-accent-300 mt-1 relative z-10">
                  Hemat {formatRupiah(discount)} (paket lengkap)
                </p>
              )}
            </div>

            <div className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Paket Dipilih ({selected.size}/{aspects.length})
                </p>
                {noneSelected ? (
                  <p className="text-sm text-slate-400 font-medium italic">Belum ada paket dipilih.</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedAspects.map((a) => (
                      <li key={a.heading} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                        <div className="mt-0.5 w-5 h-5 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="flex-1">{a.heading}</span>
                        <span className="text-[10px] font-black text-slate-400 shrink-0">{formatRupiah(ASPECT_PRICE)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <button
                  disabled={noneSelected}
                  onClick={() => setConfirmOpen(true)}
                  className={cn(
                    'w-full rounded-2xl h-14 text-sm font-black uppercase tracking-widest',
                    'flex items-center justify-center gap-2 transition-all',
                    noneSelected
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20'
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Lihat Detail & Bayar
                </button>
                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tight">
                  *Hasil tes tersedia dalam format PDF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden gap-0">
          <DialogHeader className="bg-primary-950 text-white px-8 py-7 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-300 mb-1">Konfirmasi Pesanan</p>
                <DialogTitle className="text-xl font-black text-white">Ringkasan Tes</DialogTitle>
              </div>
              <button
                onClick={() => setConfirmOpen(false)}
                className="size-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </DialogHeader>

          <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {selectedAspects.map((aspect, i) => (
              <div key={aspect.heading} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{aspect.heading}</h4>
                  </div>
                  <span className="text-xs font-black text-primary-600">{formatRupiah(ASPECT_PRICE)}</span>
                </div>
                <div className="space-y-2 pl-6">
                  {aspect.items.map((item) => (
                    <div key={item.title} className="flex items-start gap-2">
                      <FileText className="size-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-black text-slate-700">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {i < selectedAspects.length - 1 && <div className="border-t border-slate-100" />}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">{selected.size} paket × {formatRupiah(ASPECT_PRICE)}</p>
                {allSelected && discount > 0 && (
                  <p className="text-[10px] font-black text-teal-600">Diskon paket lengkap -{formatRupiah(discount)}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total</p>
                <p className="text-2xl font-black text-slate-900">{formatRupiah(finalPrice)}</p>
              </div>
            </div>

            <a
              href={formHref}
              className="w-full rounded-2xl h-14 bg-primary-600 hover:bg-primary-700 text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 transition-all"
            >
              Bayar & Mulai Tes
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
