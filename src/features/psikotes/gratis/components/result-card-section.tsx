import { Download, Share2, Brain, Award } from 'lucide-react'

import type { ResultData } from '@/features/psikotes/constants'

interface ResultCardSectionProps {
  result: ResultData
}

export function ResultCardSection({
  result,
}: ResultCardSectionProps) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
      {/* Result Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden flex flex-col items-center justify-center text-center py-12 px-8 text-white">
        <div className="relative z-10 space-y-5">
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
            Personality Type
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              {result.code}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-slate-400 tracking-tight">
              {result.title}
            </h3>
          </div>

          {/* Icon */}
          <div className="size-20 mx-auto relative">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-3 border border-white/5 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="size-9 text-white opacity-80" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <Award className="size-64" />
        </div>
      </div>

      {/* Description + Actions */}
      <div className="p-8 space-y-5">
        <p className="text-sm text-slate-500 text-center max-w-md mx-auto leading-relaxed">
          {result.description}
        </p>

        <div className="flex flex-col gap-3">
          <button className="w-full h-12 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
            <Download className="size-4" />
            Download Laporan Lengkap (PDF)
          </button>
          <button className="w-full h-12 bg-white border border-slate-200 text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
            <Share2 className="size-4" />
            Bagikan Hasil
          </button>
        </div>
      </div>
    </div>
  )
}
