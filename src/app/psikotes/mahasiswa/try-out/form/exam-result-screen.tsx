import Link from 'next/link'
import {
  Clock,
  Trophy,
  CheckCircle2,
  Zap,
  Activity,
  LayoutDashboard,
  Target,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ExamResultScreenProps {
  finalScore: number
  answeredCount: number
  timeSpent: string
}

export function ExamResultScreen({
  finalScore,
  answeredCount,
  timeSpent,
}: ExamResultScreenProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-start p-6 md:p-12 relative z-[9999] overflow-y-auto no-scrollbar">
      <div className="max-w-5xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        <ResultHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScoreCard finalScore={finalScore} />
          <div className="grid grid-cols-1 gap-6">
            <StatCard
              icon={<Clock className="size-5" />}
              iconBg="bg-indigo-50 text-indigo-600"
              hoverBorder="hover:border-indigo-100"
              value={timeSpent}
              label="Durasi Pengerjaan"
            />
            <StatCard
              icon={<Target className="size-5" />}
              iconBg="bg-primary-50 text-primary-600"
              hoverBorder="hover:border-primary-100"
              value={`${answeredCount} / 20`}
              label="Total Terjawab"
            />
          </div>
        </div>

        <AnalysisCard />

        <div className="flex flex-col items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="w-full max-w-md bg-slate-900 hover:bg-primary-600 text-white h-16 rounded-2xl font-black gap-3 transition-all"
            asChild
          >
            <Link href="/pengguna">
              <LayoutDashboard className="size-5" />
              KEMBALI KE DASHBOARD
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ResultHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="size-20 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/20 text-white shrink-0">
          <Trophy className="size-10" />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
            Ujian Selesai!
          </h1>
          <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">
            Hasil simulasi Try Out Mahasiswa
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-primary-50 px-5 py-3 rounded-2xl border border-primary-100 text-primary-700 font-black text-xs tracking-widest">
        <CheckCircle2 className="size-4" /> TERVERIFIKASI
      </div>
    </div>
  )
}

function ScoreCard({ finalScore }: { finalScore: number }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group transition-all hover:shadow-md">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
        Skor Akhir
      </p>
      <div className="relative flex items-center justify-center mb-6">
        <span className="text-[100px] font-black text-slate-900 leading-none tracking-tighter">
          {finalScore}
        </span>
        <span className="absolute -right-10 bottom-3 text-xl font-black text-primary-500">
          / 100
        </span>
      </div>
      <div className="w-full max-w-sm h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-primary-500 transition-all duration-1000 delay-300 shadow-[0_0_15px_rgba(20,184,166,0.5)]"
          style={{ width: `${finalScore}%` }}
        />
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
        Perfoma di atas rata-rata
      </p>
    </div>
  )
}

function StatCard({
  icon,
  iconBg,
  hoverBorder,
  value,
  label,
}: {
  icon: React.ReactNode
  iconBg: string
  hoverBorder: string
  value: string
  label: string
}) {
  return (
    <div className={`bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group ${hoverBorder} transition-all`}>
      <div className={`size-10 rounded-xl ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900">
          {value}
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          {label}
        </p>
      </div>
    </div>
  )
}

function AnalysisCard() {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-primary-400" />
            <h3 className="text-xl font-black uppercase tracking-tight">
              Analisis Kompetensi
            </h3>
          </div>
          <p className="text-slate-400 font-medium leading-relaxed">
            Berdasarkan pola jawaban Anda, sistem mendeteksi
            kekuatan utama pada <strong>Logika Verbal</strong>.
            Anda memiliki ketelitian yang baik namun disarankan
            untuk meningkatkan kecepatan pengerjaan pada
            bagian <strong>Penalaran Numerik</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Logika Verbal
            </span>
            <span className="text-xs font-black text-primary-400">
              EXCELLENT
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Penalaran Numerik
            </span>
            <span className="text-xs font-black text-accent-400">
              STABLE
            </span>
          </div>
        </div>
      </div>
      <Zap className="absolute right-0 bottom-0 size-64 opacity-5 translate-x-20 translate-y-20 rotate-12" />
    </div>
  )
}
