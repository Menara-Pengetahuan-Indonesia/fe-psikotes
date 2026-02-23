'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Award, 
  Calendar, 
  ChevronRight, 
  FileText, 
  Printer, 
  Share2, 
  Star, 
  TrendingUp, 
  Zap,
  Target,
  Brain,
  MessageCircle,
  Clock,
  Activity
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/shared/components/layout/breadcrumb'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { cn } from '@/lib/utils'

export default function ResultDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  const test = DUMMY_TEST_HISTORY.find(t => t.id === id) || DUMMY_TEST_HISTORY[0]

  const breadcrumbItems = [
    { label: 'Riwayat', href: '/pengguna/riwayat' },
    { label: test.name }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="size-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/10">
            <Award className="size-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{test.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">{test.categoryLabel}</span>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(test.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2 h-12 px-6">
            <Share2 className="size-4" /> Share
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-black gap-2 h-12 px-6 shadow-lg shadow-primary-500/20" asChild>
            <Link href={`/pengguna/riwayat/${id}/sertifikat`}>
              <Printer className="size-4" /> CETAK SERTIFIKAT
            </Link>
          </Button>
        </div>
      </div>

      {/* BENTO GRID ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SCORE CARD (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6 h-full">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Skor Akhir</p>
           <div className="relative flex items-center justify-center">
              <span className="text-[120px] font-black text-slate-900 leading-none tracking-tighter">{test.score}</span>
              <span className="absolute -right-10 bottom-4 text-2xl font-black text-primary-500">/ 100</span>
           </div>
           <div className="flex items-center gap-2 text-primary-600 font-bold bg-primary-50 px-4 py-2 rounded-xl text-xs">
              <TrendingUp className="size-4" /> Performa Sangat Baik
           </div>
        </div>

        {/* ANALYSIS CARD (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group flex flex-col justify-between h-full">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                 <Brain className="size-6 text-primary-400" />
                 <h3 className="text-2xl font-black tracking-tight uppercase">Analisis Psikolog</h3>
              </div>
              <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
                Anda menunjukkan kecenderungan yang kuat dalam aspek **{test.resultTitle}**. Hal ini menunjukkan bahwa Anda memiliki potensi besar dalam lingkungan yang membutuhkan ketelitian tinggi dan pemikiran strategis.
              </p>
           </div>
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                 <div className="size-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                    <Zap className="size-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kekuatan Utama</p>
                    <p className="text-sm font-bold">Problem Solving</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                 <div className="size-10 rounded-xl bg-accent-500/20 flex items-center justify-center text-accent-400">
                    <Target className="size-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fokus Pengembangan</p>
                    <p className="text-sm font-bold">Komunikasi Interpersonal</p>
                 </div>
              </div>
           </div>

           <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Activity className="size-[400px]" />
           </div>
        </div>

        {/* DIMENSION BREAKDOWN (12 Cols) */}
        <div className="lg:col-span-12 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Detail Dimensi Psikologis</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                 <div className="size-2 rounded-full bg-primary-500" /> Skor Dimensi
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { label: 'Logika Verbal', score: 85, color: 'primary' },
                { label: 'Penalaran Numerik', score: 72, color: 'indigo' },
                { label: 'Ketahanan Stress', score: 90, color: 'accent' },
                { label: 'Kepemimpinan', score: 65, color: 'primary' },
              ].map((dim) => (
                <div key={dim.label} className="space-y-4">
                   <div className="flex items-end justify-between">
                      <p className="text-sm font-black text-slate-900 leading-none">{dim.label}</p>
                      <p className="text-xl font-black text-slate-900 leading-none">{dim.score}</p>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 delay-500",
                          dim.color === 'primary' ? 'bg-primary-500' : dim.color === 'indigo' ? 'bg-indigo-500' : 'bg-accent-500'
                        )} 
                        style={{ width: `${dim.score}%` }} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* REKOMENDASI LANJUTAN (Equal Height Cards) */}
        <div className="lg:col-span-6 flex">
           <div className="w-full bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between group overflow-hidden relative min-h-[320px]">
              <div className="relative z-10">
                 <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <MessageCircle className="size-7 text-white" />
                 </div>
                 <h4 className="text-2xl font-black tracking-tight">Konsultasi Hasil Tes</h4>
                 <p className="text-indigo-100 font-medium mt-3 opacity-80 leading-relaxed max-w-md">
                    Bicarakan hasil ini dengan psikolog profesional kami untuk mendapatkan panduan karir yang lebih spesifik.
                 </p>
              </div>
              <Button className="relative z-10 w-fit bg-white text-indigo-600 hover:bg-slate-50 rounded-xl mt-8 font-black h-12 px-8 transition-transform active:scale-95 shadow-lg">
                 JADWALKAN SEKARANG
              </Button>
              <MessageCircle className="absolute -right-10 -bottom-10 size-64 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000" />
           </div>
        </div>

        <div className="lg:col-span-6 flex">
           <div className="w-full bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative min-h-[320px]">
              <div className="relative z-10">
                 <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Star className="size-7 text-orange-500" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 tracking-tight">Pelatihan Relevan</h4>
                 <p className="text-slate-500 font-medium mt-3 leading-relaxed max-w-md">
                    Kami merekomendasikan workshop **Decision Making** & **Leadership** untuk mengoptimalkan potensi kepemimpinan Anda.
                 </p>
              </div>
              <Button variant="outline" className="relative z-10 w-fit border-2 border-slate-100 text-slate-900 hover:border-slate-200 hover:bg-slate-50 rounded-xl mt-8 font-black h-12 px-8 transition-all">
                 EKSPLORASI PELATIHAN
              </Button>
              <Zap className="absolute -right-10 -bottom-10 size-64 opacity-[0.03] text-orange-500 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
           </div>
        </div>

      </div>
    </div>
  )
}
