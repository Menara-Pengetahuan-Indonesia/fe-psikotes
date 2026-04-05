import {
  BarChart3,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  FileBarChart,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Dummy data
const popularTests = [
  { name: 'Tes Kepribadian MBTI', participants: 890, color: 'bg-indigo-500' },
  { name: 'Tes Intelegensi IST', participants: 654, color: 'bg-teal-500' },
  { name: 'Tes Minat Bakat RIASEC', participants: 523, color: 'bg-violet-500' },
  { name: 'Tes Kecerdasan Emosional', participants: 412, color: 'bg-rose-500' },
  { name: 'Tes Tingkat Stres', participants: 387, color: 'bg-amber-500' },
]

const scoreDistribution = [
  { range: '0-20', count: 12, color: 'bg-rose-500' },
  { range: '21-40', count: 45, color: 'bg-amber-500' },
  { range: '41-60', count: 156, color: 'bg-indigo-500' },
  { range: '61-80', count: 342, color: 'bg-teal-500' },
  { range: '81-100', count: 285, color: 'bg-violet-500' },
]

const monthlyTrend = [
  { month: 'Okt', count: 120 },
  { month: 'Nov', count: 185 },
  { month: 'Des', count: 145 },
  { month: 'Jan', count: 230 },
  { month: 'Feb', count: 310 },
  { month: 'Mar', count: 278 },
]

const maxParticipants = Math.max(...popularTests.map((t) => t.participants))
const maxScore = Math.max(...scoreDistribution.map((s) => s.count))
const maxMonthly = Math.max(...monthlyTrend.map((m) => m.count))

export default function AdminAnalyticsPage() {
  const totalCompleted = 840
  const totalInProgress = 160
  const completionRate = Math.round((totalCompleted / (totalCompleted + totalInProgress)) * 100)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
            Laporan
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
            Analitik.
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Insight dan statistik performa platform tes.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Users className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">1,240</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Peserta</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">278</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Bulan Ini</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Award className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">76.4</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Rata-rata Skor</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <TrendingUp className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">+18%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">vs Bulan Lalu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <BarChart3 className="size-72" />
        </div>
      </div>

      {/* 2x2 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TES POPULER */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FileBarChart className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Tes Populer</h2>
              <p className="text-xs text-slate-400 font-medium">5 tes dengan peserta terbanyak</p>
            </div>
          </div>
          <div className="p-8 space-y-5">
            {popularTests.map((test, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-slate-900 truncate pr-4">{test.name}</p>
                  <span className="text-sm font-black text-slate-900 shrink-0">{test.participants}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000', test.color)}
                    style={{ width: `${(test.participants / maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISTRIBUSI SKOR */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <Target className="size-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Distribusi Skor</h2>
              <p className="text-xs text-slate-400 font-medium">Sebaran skor seluruh peserta</p>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-end gap-3 h-48">
              {scoreDistribution.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{item.count}</span>
                  <div className="w-full bg-slate-100 rounded-xl overflow-hidden relative" style={{ height: '100%' }}>
                    <div
                      className={cn('absolute bottom-0 w-full rounded-xl transition-all duration-1000', item.color)}
                      style={{ height: `${(item.count / maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{item.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TREN PESERTA */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <TrendingUp className="size-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Tren Peserta</h2>
              <p className="text-xs text-slate-400 font-medium">Jumlah peserta per bulan (6 bulan terakhir)</p>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-end gap-4 h-48">
              {monthlyTrend.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{item.count}</span>
                  <div className="w-full bg-slate-100 rounded-xl overflow-hidden relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-violet-500 to-violet-400 transition-all duration-1000"
                      style={{ height: `${(item.count / maxMonthly) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPLETION RATE */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Completion Rate</h2>
              <p className="text-xs text-slate-400 font-medium">Rasio penyelesaian tes</p>
            </div>
          </div>
          <div className="p-8 flex flex-col items-center">
            {/* Circular progress */}
            <div className="relative size-40 mb-6">
              <svg className="size-40 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                <circle
                  cx="80" cy="80" r="70" fill="none" stroke="url(#gradient)" strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${completionRate * 4.4} ${440 - completionRate * 4.4}`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900">{completionRate}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selesai</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 rounded-2xl bg-teal-50 text-center">
                <p className="text-xl font-black text-teal-600">{totalCompleted}</p>
                <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">Selesai</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 text-center">
                <p className="text-xl font-black text-amber-600">{totalInProgress}</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Belum Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
