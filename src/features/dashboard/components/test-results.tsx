'use client'

import { Clock, Award, ChevronRight, BarChart3, Target, Calendar, Brain } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DUMMY_TEST_HISTORY,
  type TestCategory,
} from '@/features/dashboard/constants'

const CATEGORY_CONFIG: Record<
  TestCategory, { bg: string, text: string, border: string, iconColor: string }
> = {
  gratis: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100', iconColor: 'text-primary-500' },
  premium: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', iconColor: 'text-violet-500' },
  mahasiswa: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', iconColor: 'text-sky-500' },
  perusahaan: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', iconColor: 'text-orange-500' },
  'kesehatan-mental': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', iconColor: 'text-rose-500' },
}

const completedTests = DUMMY_TEST_HISTORY.filter(
  (t) => t.status === 'selesai'
)

export function TestResults() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Riwayat Hasil Tes
        </h1>
        <p className="text-lg text-slate-500 font-medium mt-2">
          Analisis mendalam dari setiap perjalanan pengembangan dirimu.
        </p>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {completedTests.map((test) => {
          const config = CATEGORY_CONFIG[test.category]
          return (
            <div
              key={test.id}
              className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              {/* Header: Icon + Category */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={cn(
                  "size-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500",
                  config.bg, config.iconColor
                )}>
                  <Brain className="size-8" />
                </div>
                <span
                  className={cn(
                    'text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider border',
                    config.bg, config.text, config.border
                  )}
                >
                  {test.categoryLabel}
                </span>
              </div>

              {/* Title + Date */}
              <div className="space-y-2 mb-8 relative z-10 flex-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                  {test.name}
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                  <Calendar className="size-4" />
                  {new Date(test.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>

              {/* Result Area */}
              {test.resultCode && (
                <div className="relative mb-8 p-6 rounded-3xl bg-slate-50 border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors duration-500">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-primary-400 transition-colors">Diagnosis Utama</p>
                  <div className="flex items-center gap-3">
                    <Award className="size-6 text-primary-500" />
                    <span className="text-lg font-black text-slate-800 leading-none">
                      {test.resultTitle}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-slate-200 group-hover:text-primary-200 transition-colors">
                    <Target className="size-8 opacity-20" />
                  </div>
                </div>
              )}

              {/* Bottom: Score + Action */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 relative z-10">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skor Akhir</p>
                   <div className="flex items-end gap-1">
                     <span className="text-3xl font-black text-slate-900 leading-none">
                       {test.score}
                     </span>
                     <span className="text-xs font-bold text-slate-400 pb-0.5">/ 100</span>
                   </div>
                </div>
                
                <Button 
                  className="bg-slate-900 hover:bg-primary-500 text-white rounded-2xl h-14 px-6 font-bold shadow-lg shadow-black/10 hover:shadow-primary-500/30 transition-all duration-300 group/btn"
                  asChild
                >
                  <Link href={`/pengguna/riwayat/${test.id}`}>
                    <span className="mr-2">Sertifikat</span>
                    <ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 size-40 bg-primary-500/5 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
            </div>
          )
        })}
      </div>

      {completedTests.length === 0 && (
        <div className="bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 p-24 text-center">
          <div className="size-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <BarChart3 className="size-12 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3">Belum ada hasil yang tercatat</h3>
          <p className="text-lg text-slate-500 font-medium mb-10 max-w-md mx-auto">Selesaikan tes pertamamu untuk melihat analisis mendalam tentang dirimu di sini.</p>
          <Button className="bg-primary-500 hover:bg-primary-600 rounded-2xl h-14 px-10 font-bold text-lg shadow-xl shadow-primary-500/30" asChild>
            <Link href="/psikotes">Mulai Tes Sekarang</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
