'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export function PromoBanner() {
  const [time, setTime] = useState({ h: 8, m: 40, s: 48 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s -= 1
        if (s < 0) { s = 59; m -= 1 }
        if (m < 0) { m = 59; h -= 1 }
        if (h < 0) return prev // expired
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="relative overflow-hidden bg-amber-400 text-slate-950 py-3 px-6 shadow-md border-b border-amber-500/20">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 40, 50 50 T 100 50' stroke='black' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '200px 200px'
           }}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 relative z-10 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse fill-slate-900" />
          <span className="text-xs md:text-sm font-black uppercase tracking-wider">Promo Khusus Member Baru</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-medium">Hemat s/d 50% Berakhir dalam:</span>
          <div className="flex items-center gap-1.5">
             <div className="bg-slate-950 text-white px-2 py-1 rounded-lg font-black text-xs min-w-10">{pad(time.h)}h</div>
             <span className="font-black">:</span>
             <div className="bg-slate-950 text-white px-2 py-1 rounded-lg font-black text-xs min-w-10">{pad(time.m)}m</div>
             <span className="font-black">:</span>
             <div className="bg-slate-950 text-white px-2 py-1 rounded-lg font-black text-xs min-w-10">{pad(time.s)}s</div>
          </div>
        </div>

        <Link 
          href="/psikotes/premium" 
          className="group inline-flex items-center gap-2 px-6 py-2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-slate-950/20"
        >
          Klaim Sekarang
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}