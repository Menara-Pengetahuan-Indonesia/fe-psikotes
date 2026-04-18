import Link from 'next/link'
import { Clock, Users, Play, Share2, Info, AlertCircle, ChevronRight, Shield, Brain } from 'lucide-react'

import { GRATIS_TESTS } from '@/features/psikotes/constants'
import { GRATIS_INSTRUCTIONS } from '../constants'
import { cn } from '@/lib/utils'

interface TestDetailPageProps {
  slug: string
}

export function TestDetailPage({ slug }: TestDetailPageProps) {
  const test = GRATIS_TESTS.find((t) => t.slug === slug)
  const Icon = test?.icon

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-8 pb-10 md:pt-10 md:pb-12 text-white">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/gratis"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronRight className="size-4 rotate-180" />
            </div>
            <span className="text-sm font-bold">Kembali ke Daftar Tes</span>
          </Link>

          <div className="flex items-start gap-6">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
              {Icon ? <Icon className="size-7 text-white" /> : <Brain className="size-7 text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/20 text-teal-300">
                  Tes Gratis
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-slate-300">
                  Edisi 1.0
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                {test?.title ?? 'Tes Tidak Ditemukan'}
              </h1>
              <p className="text-slate-400 font-medium text-sm max-w-2xl leading-relaxed">
                {test?.description ?? 'Tes yang diminta tidak ditemukan. Silakan kembali ke halaman daftar tes.'}
              </p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Clock className="size-4 text-indigo-300" />
                <span className="text-sm font-bold">{test?.duration ?? '—'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Users className="size-4 text-teal-300" />
                <span className="text-sm font-bold">{test?.users ?? '—'} Peserta</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Shield className="size-4 text-violet-300" />
                <span className="text-sm font-bold">Gratis</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="size-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 className="size-5" />
              </button>
              <Link
                href={`/gratis/${slug}/exam`}
                className="h-14 px-8 bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl font-black text-base shadow-xl transition-colors active:scale-95 flex items-center gap-2"
              >
                <Play className="size-5 fill-current" />
                Mulai Tes
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Brain className="size-[400px]" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* PANDUAN */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Info className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Panduan Pengisian</h2>
              <p className="text-xs text-slate-400 font-medium">Baca sebelum memulai tes</p>
            </div>
          </div>
          <div className="p-8 space-y-4">
            {GRATIS_INSTRUCTIONS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className={cn(
                  'size-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-black transition-colors',
                  i === 0 ? 'bg-indigo-100 text-indigo-600' :
                  i === 1 ? 'bg-teal-100 text-teal-600' :
                  i === 2 ? 'bg-violet-100 text-violet-600' :
                  i === 3 ? 'bg-rose-100 text-rose-600' :
                  i === 4 ? 'bg-amber-100 text-amber-600' :
                  'bg-cyan-100 text-cyan-600'
                )}>
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed pt-2">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 flex items-start gap-4">
            <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="size-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 mb-1">Disclaimer</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Jika Anda sedang mengalami krisis psikologis yang mengancam hidup Anda (seperti keinginan menyakiti diri sendiri atau bunuh diri), layanan ini <strong className="text-slate-600">TIDAK</strong> direkomendasikan. Segera hubungi profesional kesehatan mental terdekat atau layanan darurat <strong className="text-slate-600">119</strong> / <strong className="text-slate-600">112</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href={`/gratis/${slug}/exam`}
            className="h-14 px-10 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-base shadow-xl transition-colors active:scale-95 flex items-center gap-2"
          >
            <Play className="size-5 fill-current" />
            Mulai Tes Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}
