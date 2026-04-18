'use client'

import { ArrowRight } from 'lucide-react'

export function ScrollButton({ targetId }: { targetId: string }) {
  return (
    <button
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
      className="mt-4 flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-amber-500 transition-colors group/btn"
    >
      Eksplorasi <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
    </button>
  )
}
