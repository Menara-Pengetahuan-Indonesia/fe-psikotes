'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, QrCode, Copy } from 'lucide-react'

import { PAYMENT_INSTRUCTIONS } from '../constants'

interface PaymentStatusProps {
  method: string
  nextUrl: string
  orderId: string
  productName: string
  price: number
}

export function PaymentStatus({ method, nextUrl, orderId, productName, price }: PaymentStatusProps) {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number }>({ h: 23, m: 59, s: 59 })
  const [isChecking, setIsChecking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const instructions = PAYMENT_INSTRUCTIONS[method] ?? PAYMENT_INSTRUCTIONS['gopay']

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-redirect after success
  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        window.location.href = nextUrl
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [isSuccess, nextUrl])

  const handleCheckStatus = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Success modal overlay
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Pembayaran Berhasil!</h2>
          <p className="text-slate-500 mb-8 text-sm">
            Terima kasih. Anda akan dialihkan ke halaman pengisian data peserta dalam beberapa detik...
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Order Details sidebar (sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-32">
            <h3 className="font-black text-slate-900 mb-4">Detail Pesanan</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Kode Order</p>
                <p className="font-bold text-slate-900">{orderId}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Paket yang dibeli</p>
                <p className="font-bold text-slate-900">{productName}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Total Harga</p>
                <p className="font-bold text-slate-900">Rp {price.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Metode Pembayaran</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded border border-slate-100 bg-slate-50 flex items-center justify-center text-[10px] font-bold">
                    {method.toUpperCase().substring(0, 3)}
                  </div>
                  <span className="font-medium text-slate-700 capitalize">{method}</span>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Status</p>
                <span className="text-yellow-600 font-bold bg-yellow-50 px-2 py-1 rounded text-xs">
                  Menunggu Pembayaran
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/psikotes/pembayaran"
                className="block w-full py-3 bg-yellow-400 text-black font-bold text-center text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-500 transition-colors"
              >
                Ganti Metode Lain
              </Link>
              <p className="text-[10px] text-slate-400 text-center mt-3">
                Mengganti metode akan membuat nomor order baru.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Payment details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-bold text-slate-900">Batas Pembayaran</h3>
              <p className="text-sm text-slate-500">Selesaikan pembayaran sebelum waktu habis.</p>
            </div>
            <div className="flex gap-2 font-mono font-black text-2xl text-slate-900">
              <div className="bg-slate-100 rounded-lg p-3 min-w-15 text-center">
                {timeLeft.h.toString().padStart(2, '0')}
              </div>
              <span className="self-center">:</span>
              <div className="bg-slate-100 rounded-lg p-3 min-w-15 text-center">
                {timeLeft.m.toString().padStart(2, '0')}
              </div>
              <span className="self-center">:</span>
              <div className="bg-yellow-100 text-yellow-700 rounded-lg p-3 min-w-15 text-center">
                {timeLeft.s.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* QR / VA Display Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">
              {instructions.type === 'qr' ? 'Scan QR Code' : 'Nomor Virtual Account'}
            </h3>

            <div className="flex flex-col items-center justify-center space-y-6">
              {instructions.type === 'qr' ? (
                <div className="p-4 bg-white border-2 border-slate-900 rounded-2xl inline-block shadow-xl">
                  <QrCode className="w-48 h-48 text-slate-900" strokeWidth={1} />
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Scan to Pay</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-4xl font-black text-slate-900 tracking-widest">{instructions.content}</p>
                  <button
                    onClick={() => handleCopy(instructions.content)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Copy className="w-4 h-4" /> Salin Nomor
                  </button>
                </div>
              )}

              <div className="w-full max-w-sm border-t border-slate-100 pt-6">
                <button
                  onClick={handleCheckStatus}
                  disabled={isChecking}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  {isChecking ? 'Memeriksa...' : 'Saya Sudah Membayar'}
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 pb-4">
              <h3 className="font-bold text-slate-900 text-lg">Cara Pembayaran</h3>
            </div>
            <div className="px-8 pb-8">
              <div className="space-y-4">
                {instructions.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
