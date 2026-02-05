'use client'

import { useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'

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

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-100">
      <h3 className="font-bold text-slate-900 mb-6 text-lg">Ringkasan Pesanan</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start text-sm">
          <span className="text-slate-500">{productName}</span>
          <span className="font-bold text-slate-900">Rp {productPrice.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between items-start text-sm">
          <span className="text-slate-500">Biaya Layanan</span>
          <span className="font-bold text-slate-900">Rp {SERVICE_FEE.toLocaleString('id-ID')}</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-900">Total Tagihan</span>
          <span className="font-black text-xl text-slate-900">Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-8 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Punya Kode Promo?</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Kode Promo"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-black transition-colors uppercase placeholder:normal-case placeholder:font-normal"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className="px-5 py-3 bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-500 transition-colors">
            Gunakan
          </button>
        </div>
        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline">
          Lihat promo yang bisa dipakai
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        disabled={!hasPaymentSelected || isProcessing}
        className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {isProcessing ? 'Memproses...' : <>Lanjut Pembayaran <ArrowRight className="w-4 h-4" /></>}
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400">
        <ShieldCheck className="w-3 h-3" />
        <span>Pembayaran 100% Aman &amp; Terenkripsi</span>
      </div>
    </div>
  )
}
