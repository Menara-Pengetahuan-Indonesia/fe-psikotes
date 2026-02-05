'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div className="bg-yellow-400 text-slate-900 text-center py-2 px-4 text-sm font-semibold">
      <span>Diskon s/d 50% Psikotes Online Premium — </span>
      <span className="font-black">Berakhir dalam {pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>
      <span> — </span>
      <Link href="/psikotes/premium" className="underline hover:no-underline ml-1">Klaim Sekarang</Link>
    </div>
  )
}
