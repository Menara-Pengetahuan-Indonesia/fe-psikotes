'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  FileBarChart,
  CheckCircle2,
  BarChart3,
  Download,
  Target,
  Brain,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Same dummy data as list page
const dummyResults: Record<string, {
  id: string
  name: string
  email: string
  testName: string
  score: number
  resultType: string
  status: 'completed' | 'in_progress'
  completedAt: string
  duration: number
  indicators: { name: string; score: number; maxScore: number; resultType: string }[]
  answers: { question: string; answer: string; isCorrect: boolean }[]
}> = {
  '1': {
    id: '1',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 87,
    resultType: 'INTJ - Architect',
    status: 'completed',
    completedAt: '2026-03-24T14:30:00Z',
    duration: 42,
    indicators: [
      { name: 'Introversion (I)', score: 78, maxScore: 100, resultType: 'Dominan' },
      { name: 'Intuition (N)', score: 85, maxScore: 100, resultType: 'Dominan' },
      { name: 'Thinking (T)', score: 92, maxScore: 100, resultType: 'Sangat Dominan' },
      { name: 'Judging (J)', score: 88, maxScore: 100, resultType: 'Dominan' },
    ],
    answers: [
      { question: 'Saya lebih suka menghabiskan waktu sendiri', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya sering memikirkan masa depan', answer: 'Setuju', isCorrect: true },
      { question: 'Keputusan saya berdasarkan logika', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya suka membuat rencana terlebih dahulu', answer: 'Setuju', isCorrect: true },
      { question: 'Saya mudah bergaul dengan orang baru', answer: 'Tidak Setuju', isCorrect: true },
    ],
  },
  '2': {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    testName: 'Tes Minat Bakat RIASEC',
    score: 92,
    resultType: 'Investigative',
    status: 'completed',
    completedAt: '2026-03-24T10:15:00Z',
    duration: 35,
    indicators: [
      { name: 'Realistic', score: 45, maxScore: 100, resultType: 'Rendah' },
      { name: 'Investigative', score: 92, maxScore: 100, resultType: 'Sangat Tinggi' },
      { name: 'Artistic', score: 78, maxScore: 100, resultType: 'Tinggi' },
      { name: 'Social', score: 65, maxScore: 100, resultType: 'Sedang' },
      { name: 'Enterprising', score: 55, maxScore: 100, resultType: 'Sedang' },
      { name: 'Conventional', score: 40, maxScore: 100, resultType: 'Rendah' },
    ],
    answers: [
      { question: 'Saya suka memecahkan masalah kompleks', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya tertarik dengan penelitian ilmiah', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya suka bekerja dengan tangan', answer: 'Tidak Setuju', isCorrect: true },
      { question: 'Saya suka memimpin kelompok', answer: 'Netral', isCorrect: true },
      { question: 'Saya suka kegiatan seni dan kreatif', answer: 'Setuju', isCorrect: true },
    ],
  },
  '3': {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 74,
    resultType: 'ENFP - Campaigner',
    status: 'completed',
    completedAt: '2026-03-23T16:45:00Z',
    duration: 38,
    indicators: [
      { name: 'Extraversion (E)', score: 82, maxScore: 100, resultType: 'Dominan' },
      { name: 'Intuition (N)', score: 75, maxScore: 100, resultType: 'Dominan' },
      { name: 'Feeling (F)', score: 70, maxScore: 100, resultType: 'Moderat' },
      { name: 'Perceiving (P)', score: 68, maxScore: 100, resultType: 'Moderat' },
    ],
    answers: [
      { question: 'Saya lebih suka menghabiskan waktu sendiri', answer: 'Tidak Setuju', isCorrect: true },
      { question: 'Saya sering memikirkan masa depan', answer: 'Setuju', isCorrect: true },
      { question: 'Keputusan saya berdasarkan perasaan', answer: 'Setuju', isCorrect: true },
      { question: 'Saya fleksibel dan spontan', answer: 'Setuju', isCorrect: true },
      { question: 'Saya mudah bergaul dengan orang baru', answer: 'Sangat Setuju', isCorrect: true },
    ],
  },
  '4': {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@email.com',
    testName: 'Tes Intelegensi IST',
    score: 95,
    resultType: 'Superior',
    status: 'completed',
    completedAt: '2026-03-23T09:20:00Z',
    duration: 55,
    indicators: [
      { name: 'Verbal Comprehension', score: 96, maxScore: 100, resultType: 'Superior' },
      { name: 'Numerical Ability', score: 90, maxScore: 100, resultType: 'Above Average' },
      { name: 'Spatial Reasoning', score: 94, maxScore: 100, resultType: 'Superior' },
      { name: 'Logical Thinking', score: 98, maxScore: 100, resultType: 'Superior' },
    ],
    answers: [
      { question: 'Apel : Buah = Mawar : ?', answer: 'Bunga', isCorrect: true },
      { question: '12, 15, 19, 24, ?', answer: '30', isCorrect: true },
      { question: 'Sinonim dari "Ambiguitas"', answer: 'Ketidakjelasan', isCorrect: true },
      { question: 'Jika A > B dan B > C, maka...', answer: 'A > C', isCorrect: true },
      { question: 'Lawan kata dari "Abstrak"', answer: 'Konkret', isCorrect: true },
    ],
  },
  '6': {
    id: '6',
    name: 'Anisa Rahma',
    email: 'anisa.rahma@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 81,
    resultType: 'ISFJ - Defender',
    status: 'completed',
    completedAt: '2026-03-22T13:10:00Z',
    duration: 40,
    indicators: [
      { name: 'Introversion (I)', score: 72, maxScore: 100, resultType: 'Dominan' },
      { name: 'Sensing (S)', score: 80, maxScore: 100, resultType: 'Dominan' },
      { name: 'Feeling (F)', score: 85, maxScore: 100, resultType: 'Dominan' },
      { name: 'Judging (J)', score: 78, maxScore: 100, resultType: 'Dominan' },
    ],
    answers: [
      { question: 'Saya lebih suka menghabiskan waktu sendiri', answer: 'Setuju', isCorrect: true },
      { question: 'Saya fokus pada detail dan fakta', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Keputusan saya berdasarkan perasaan', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya suka membuat rencana terlebih dahulu', answer: 'Setuju', isCorrect: true },
      { question: 'Saya peduli dengan perasaan orang lain', answer: 'Sangat Setuju', isCorrect: true },
    ],
  },
  '7': {
    id: '7',
    name: 'Fajar Nugroho',
    email: 'fajar.nugroho@email.com',
    testName: 'Tes Intelegensi IST',
    score: 78,
    resultType: 'Above Average',
    status: 'completed',
    completedAt: '2026-03-22T11:00:00Z',
    duration: 50,
    indicators: [
      { name: 'Verbal Comprehension', score: 75, maxScore: 100, resultType: 'Above Average' },
      { name: 'Numerical Ability', score: 82, maxScore: 100, resultType: 'Above Average' },
      { name: 'Spatial Reasoning', score: 70, maxScore: 100, resultType: 'Average' },
      { name: 'Logical Thinking', score: 84, maxScore: 100, resultType: 'Above Average' },
    ],
    answers: [
      { question: 'Apel : Buah = Mawar : ?', answer: 'Bunga', isCorrect: true },
      { question: '12, 15, 19, 24, ?', answer: '30', isCorrect: true },
      { question: 'Sinonim dari "Ambiguitas"', answer: 'Ketidakjelasan', isCorrect: true },
      { question: 'Jika A > B dan B > C, maka...', answer: 'A > C', isCorrect: true },
      { question: 'Lawan kata dari "Abstrak"', answer: 'Konkret', isCorrect: true },
    ],
  },
  '8': {
    id: '8',
    name: 'Maya Putri',
    email: 'maya.putri@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 89,
    resultType: 'ENTP - Debater',
    status: 'completed',
    completedAt: '2026-03-21T15:30:00Z',
    duration: 36,
    indicators: [
      { name: 'Extraversion (E)', score: 88, maxScore: 100, resultType: 'Dominan' },
      { name: 'Intuition (N)', score: 90, maxScore: 100, resultType: 'Sangat Dominan' },
      { name: 'Thinking (T)', score: 85, maxScore: 100, resultType: 'Dominan' },
      { name: 'Perceiving (P)', score: 82, maxScore: 100, resultType: 'Dominan' },
    ],
    answers: [
      { question: 'Saya lebih suka menghabiskan waktu sendiri', answer: 'Tidak Setuju', isCorrect: true },
      { question: 'Saya sering memikirkan masa depan', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Keputusan saya berdasarkan logika', answer: 'Setuju', isCorrect: true },
      { question: 'Saya fleksibel dan spontan', answer: 'Sangat Setuju', isCorrect: true },
      { question: 'Saya suka berdebat dan diskusi', answer: 'Sangat Setuju', isCorrect: true },
    ],
  },
  '10': {
    id: '10',
    name: 'Putri Amelia',
    email: 'putri.amelia@email.com',
    testName: 'Tes Intelegensi IST',
    score: 83,
    resultType: 'Above Average',
    status: 'completed',
    completedAt: '2026-03-20T10:45:00Z',
    duration: 48,
    indicators: [
      { name: 'Verbal Comprehension', score: 80, maxScore: 100, resultType: 'Above Average' },
      { name: 'Numerical Ability', score: 85, maxScore: 100, resultType: 'Above Average' },
      { name: 'Spatial Reasoning', score: 78, maxScore: 100, resultType: 'Above Average' },
      { name: 'Logical Thinking', score: 88, maxScore: 100, resultType: 'Above Average' },
    ],
    answers: [
      { question: 'Apel : Buah = Mawar : ?', answer: 'Bunga', isCorrect: true },
      { question: '12, 15, 19, 24, ?', answer: '30', isCorrect: true },
      { question: 'Sinonim dari "Ambiguitas"', answer: 'Ketidakjelasan', isCorrect: true },
      { question: 'Jika A > B dan B > C, maka...', answer: 'A > C', isCorrect: true },
      { question: 'Lawan kata dari "Abstrak"', answer: 'Konkret', isCorrect: true },
    ],
  },
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return '-'
  }
}

function formatTime(dateStr: string) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

const indicatorColors = [
  { bar: 'bg-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-600', icon: 'bg-indigo-100' },
  { bar: 'bg-teal-500', bg: 'bg-teal-50', text: 'text-teal-600', icon: 'bg-teal-100' },
  { bar: 'bg-violet-500', bg: 'bg-violet-50', text: 'text-violet-600', icon: 'bg-violet-100' },
  { bar: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600', icon: 'bg-rose-100' },
  { bar: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-600', icon: 'bg-amber-100' },
  { bar: 'bg-cyan-500', bg: 'bg-cyan-50', text: 'text-cyan-600', icon: 'bg-cyan-100' },
]

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const resultId = params.resultId as string
  const result = dummyResults[resultId]

  if (!result) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <FileBarChart className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Data tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">
            Hasil peserta dengan ID ini tidak tersedia.
          </p>
          <Button
            onClick={() => router.push('/admin/results')}
            className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800"
          >
            <ArrowLeft className="size-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isCompleted = result.status === 'completed'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          {/* Back button */}
          <button
            onClick={() => router.push('/admin/results')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Hasil Peserta</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="size-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg">
                <User className="size-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                  {result.name}
                </h1>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    <span>{result.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className={cn(
                    'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    isCompleted ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
                  )}>
                    {isCompleted ? 'Selesai' : 'Berlangsung'}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-slate-300">
                    {result.testName}
                  </span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-teal-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
            >
              <Download className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
              Export PDF
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <Award className="size-5 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{result.score}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Skor</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <TrendingUp className="size-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-lg font-black leading-none truncate">{result.resultType}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Hasil</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
                <Clock className="size-5 text-violet-300" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{result.duration}<span className="text-sm font-bold text-slate-400">m</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Durasi</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
                <Calendar className="size-5 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{formatDate(result.completedAt)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{formatTime(result.completedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <FileBarChart className="size-72" />
        </div>
      </div>

      {/* INDICATOR SCORES */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <BarChart3 className="size-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Skor per Indikator</h2>
            <p className="text-xs text-slate-400 font-medium">Breakdown skor berdasarkan indikator tes</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {result.indicators.map((indicator, index) => {
            const color = indicatorColors[index % indicatorColors.length]
            const percentage = Math.round((indicator.score / indicator.maxScore) * 100)

            return (
              <div key={index} className="px-8 py-5 flex items-center gap-5">
                <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', color.icon)}>
                  <Target className={cn('size-5', color.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-black text-slate-900">{indicator.name}</h4>
                    <div className="flex items-center gap-3">
                      <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full', color.bg, color.text)}>
                        {indicator.resultType}
                      </span>
                      <span className="text-sm font-black text-slate-900">{indicator.score}<span className="text-slate-400 font-bold">/{indicator.maxScore}</span></span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-1000', color.bar)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ANSWER HISTORY */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Brain className="size-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Riwayat Jawaban</h2>
            <p className="text-xs text-slate-400 font-medium">Sampel jawaban peserta ({result.answers.length} dari total soal)</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {result.answers.map((answer, index) => (
            <div key={index} className="px-8 py-4 flex items-center gap-5">
              <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-black text-slate-500">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{answer.question}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {answer.answer}
                </span>
                <div className="size-7 rounded-lg bg-teal-50 flex items-center justify-center">
                  <CheckCircle2 className="size-4 text-teal-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
