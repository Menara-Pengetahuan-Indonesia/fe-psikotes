'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  Award,
  Calendar,
  Printer,
  Share2,
  TrendingUp,
  Zap,
  Target,
  Brain,
  MessageCircle,
  Star,
  ArrowLeft,
  BarChart3,
  Clock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DUMMY_TEST_HISTORY, CATEGORY_STYLE } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

const dimensionColors = [
  { bar: 'bg-indigo-500', icon: 'bg-indigo-100 text-indigo-600', badge: 'bg-indigo-50 text-indigo-600' },
  { bar: 'bg-teal-500', icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-50 text-teal-600' },
  { bar: 'bg-violet-500', icon: 'bg-violet-100 text-violet-600', badge: 'bg-violet-50 text-violet-600' },
  { bar: 'bg-rose-500', icon: 'bg-rose-100 text-rose-600', badge: 'bg-rose-50 text-rose-600' },
]

const dimensions = [
  { label: 'Logika Verbal', score: 85, desc: 'Kemampuan memahami dan menganalisis informasi verbal' },
  { label: 'Penalaran Numerik', score: 72, desc: 'Kemampuan berpikir dengan angka dan data' },
  { label: 'Ketahanan Stress', score: 90, desc: 'Kemampuan mengelola tekanan dan situasi sulit' },
  { label: 'Kepemimpinan', score: 65, desc: 'Kemampuan memimpin dan mengarahkan tim' },
]

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const test = DUMMY_TEST_HISTORY.find(t => t.id === id) || DUMMY_TEST_HISTORY[0]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/pengguna/riwayat')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Riwayat</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg">
                <Award className="size-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{test.name}</h1>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border',
                    CATEGORY_STYLE[test.category].bg,
                    CATEGORY_STYLE[test.category].text,
                    CATEGORY_STYLE[test.category].border,
                  )}>
                    {test.categoryLabel}
                  </span>
                  <span className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" className="rounded-xl h-11 px-5 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Share2 className="size-4 mr-2" /> Share
              </Button>
              <Button className="rounded-xl h-11 px-5 font-black bg-white text-slate-900 hover:bg-teal-50 shadow-lg" asChild>
                <Link href={`/pengguna/riwayat/${id}/sertifikat`}>
                  <Printer className="size-4 mr-2" /> Sertifikat
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <Award className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-3xl font-black leading-none">{test.score}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Skor</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <TrendingUp className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-lg font-black leading-none truncate">{test.resultTitle}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Hasil</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Zap className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-lg font-black leading-none">Sangat Baik</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Performa</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Clock className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-lg font-black leading-none">42m</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Durasi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Award className="size-72" />
        </div>
      </div>

      {/* ANALISIS + DIMENSI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Analisis Psikolog */}
        <div className="lg:col-span-7">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                  <Brain className="size-5 text-indigo-300" />
                </div>
                <div>
                  <h2 className="text-lg font-black">Analisis Psikolog</h2>
                  <p className="text-xs text-slate-400 font-medium">Interpretasi hasil tes Anda</p>
                </div>
              </div>

              <p className="text-slate-300 font-medium leading-relaxed mb-8">
                Anda menunjukkan kecenderungan yang kuat dalam aspek <span className="text-white font-black">{test.resultTitle}</span>. Hal ini menunjukkan bahwa Anda memiliki potensi besar dalam lingkungan yang membutuhkan ketelitian tinggi dan pemikiran strategis.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="size-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <Zap className="size-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kekuatan</p>
                    <p className="text-sm font-bold">Problem Solving</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="size-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Target className="size-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pengembangan</p>
                    <p className="text-sm font-bold">Komunikasi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <Brain className="size-64" />
            </div>
          </div>
        </div>

        {/* Dimensi */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-full">
            <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <BarChart3 className="size-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Dimensi Psikologis</h2>
                <p className="text-xs text-slate-400 font-medium">Breakdown skor per dimensi</p>
              </div>
            </div>
            <div className="p-7 space-y-5">
              {dimensions.map((dim, i) => {
                const color = dimensionColors[i % dimensionColors.length]
                return (
                  <div key={dim.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-black text-slate-900">{dim.label}</p>
                      <span className={cn('text-xs font-black px-2 py-0.5 rounded-full', color.badge)}>{dim.score}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn('h-full rounded-full transition-all duration-1000', color.bar)} style={{ width: `${dim.score}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{dim.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* REKOMENDASI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <MessageCircle className="size-6" />
            </div>
            <h3 className="text-xl font-black mb-2">Konsultasi Hasil</h3>
            <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
              Bicarakan hasil ini dengan psikolog profesional untuk panduan karir yang lebih spesifik.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-slate-50 rounded-xl font-black h-11 px-6 shadow-lg transition-all active:scale-95">
              Jadwalkan
            </Button>
          </div>
          <MessageCircle className="absolute -right-8 -bottom-8 size-48 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700" />
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="size-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Star className="size-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Pelatihan Relevan</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">
              Workshop Decision Making & Leadership untuk mengoptimalkan potensi kepemimpinan Anda.
            </p>
            <Button variant="outline" className="rounded-xl font-black h-11 px-6 border-slate-200 hover:bg-slate-50 transition-all">
              Eksplorasi
            </Button>
          </div>
          <Star className="absolute -right-8 -bottom-8 size-48 opacity-[0.03] text-amber-500 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  )
}
