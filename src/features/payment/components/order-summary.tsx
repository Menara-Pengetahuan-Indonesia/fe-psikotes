'use client'

import { useState } from 'react'
import { ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react'

import { SERVICE_FEE } from '../constants'

interface OrderSummaryProps {
  productName: string
  productPrice: number
  onContinue: () => void
  isProcessing: boolean
  hasPaymentSelected: boolean
}

export function OrderSummary({
  productName,
  productPrice,
  onContinue,
  isProcessing,
  hasPaymentSelected,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState('')
  const total = productPrice + SERVICE_FEE
  const isFree = productPrice === 0

  return (
    <div className="relative bg-white rounded-3xl border border-primary-100/60 shadow-lg shadow-primary-100/40 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-tr-full pointer-events-none" />

      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">Ringkasan Pesanan</h3>
            <p className="text-xs text-slate-500">Review sebelum bayar</p>
          </div>
        </div>

        <div className="space-y-3 mb-5 pb-5 border-b border-dashed border-slate-200">
          <div className="flex justify-between items-start gap-3 text-sm">
            <span className="text-slate-600 leading-relaxed">{productName}</span>
            <span className="font-bold text-slate-900 shrink-0">
              Rp {productPrice.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between items-start text-sm">
            <span className="text-slate-500">Biaya Layanan</span>
            <span className="font-semibold text-slate-700">
              Rp {SERVICE_FEE.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-5">
          <span className="font-bold text-slate-900 text-sm">Total Tagihan</span>
          <span className="font-black text-2xl text-primary-700">
            {isFree ? 'Gratis' : `Rp ${total.toLocaleString('id-ID')}`}
          </span>
        </div>

        {!isFree && (
          <div className="mb-5 p-3 bg-amber-50/80 border border-amber-100 rounded-2xl space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              Kode Promo
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan kode"
                className="flex-1 px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500 transition-colors uppercase placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="px-4 py-2.5 bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-500 transition-colors">
                Pakai
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onContinue}
          disabled={!hasPaymentSelected || isProcessing}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold text-sm hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-2 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg shadow-primary-200 hover:shadow-xl disabled:shadow-none"
        >
          {isProcessing ? (
            'Memproses...'
          ) : (
            <>
              {isFree ? 'Aktifkan Paket' : 'Lanjut Bayar'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
          <span>Pembayaran aman & terenkripsi</span>
        </div>
      </div>
    </div>
  )
}
