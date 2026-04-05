'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  ChevronRight,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Eye,
  Calendar,
  User,
  FileBarChart,
  Download,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Dummy data - 10 peserta
const dummyResults = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 87,
    resultType: 'INTJ - Architect',
    status: 'completed' as const,
    completedAt: '2026-03-24T14:30:00Z',
    duration: 42,
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    testName: 'Tes Minat Bakat RIASEC',
    score: 92,
    resultType: 'Investigative',
    status: 'completed' as const,
    completedAt: '2026-03-24T10:15:00Z',
    duration: 35,
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 74,
    resultType: 'ENFP - Campaigner',
    status: 'completed' as const,
    completedAt: '2026-03-23T16:45:00Z',
    duration: 38,
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@email.com',
    testName: 'Tes Intelegensi IST',
    score: 95,
    resultType: 'Superior',
    status: 'completed' as const,
    completedAt: '2026-03-23T09:20:00Z',
    duration: 55,
  },
  {
    id: '5',
    name: 'Rizky Pratama',
    email: 'rizky.pratama@email.com',
    testName: 'Tes Minat Bakat RIASEC',
    score: 68,
    resultType: 'Artistic',
    status: 'in_progress' as const,
    completedAt: '',
    duration: 0,
  },
  {
    id: '6',
    name: 'Anisa Rahma',
    email: 'anisa.rahma@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 81,
    resultType: 'ISFJ - Defender',
    status: 'completed' as const,
    completedAt: '2026-03-22T13:10:00Z',
    duration: 40,
  },
  {
    id: '7',
    name: 'Fajar Nugroho',
    email: 'fajar.nugroho@email.com',
    testName: 'Tes Intelegensi IST',
    score: 78,
    resultType: 'Above Average',
    status: 'completed' as const,
    completedAt: '2026-03-22T11:00:00Z',
    duration: 50,
  },
  {
    id: '8',
    name: 'Maya Putri',
    email: 'maya.putri@email.com',
    testName: 'Tes Kepribadian MBTI',
    score: 89,
    resultType: 'ENTP - Debater',
    status: 'completed' as const,
    completedAt: '2026-03-21T15:30:00Z',
    duration: 36,
  },
  {
    id: '9',
    name: 'Hendra Wijaya',
    email: 'hendra.wijaya@email.com',
    testName: 'Tes Minat Bakat RIASEC',
    score: 0,
    resultType: '-',
    status: 'in_progress' as const,
    completedAt: '',
    duration: 0,
  },
  {
    id: '10',
    name: 'Putri Amelia',
    email: 'putri.amelia@email.com',
    testName: 'Tes Intelegensi IST',
    score: 83,
    resultType: 'Above Average',
    status: 'completed' as const,
    completedAt: '2026-03-20T10:45:00Z',
    duration: 48,
  },
]

type FilterType = 'all' | 'completed' | 'in_progress'

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '-'
  }
}

const accentColors = [
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-teal-400 to-teal-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-violet-400 to-violet-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-rose-400 to-rose-500', text: 'text-white' },
]

export default function AdminResultsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  const completedCount = dummyResults.filter((r) => r.status === 'completed').length
  const inProgressCount = dummyResults.filter((r) => r.status === 'in_progress').length
  const avgScore = Math.round(
    dummyResults.filter((r) => r.status === 'completed').reduce((sum, r) => sum + r.score, 0) /
      completedCount
  )

  const filteredResults = dummyResults.filter((result) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && result.status === 'completed') ||
      (filter === 'in_progress' && result.status === 'in_progress')
    const matchesSearch =
      !search ||
      result.name.toLowerCase().includes(search.toLowerCase()) ||
      result.email.toLowerCase().includes(search.toLowerCase()) ||
      result.testName.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-teal-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Laporan
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Hasil Peserta.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Pantau dan analisis hasil tes seluruh peserta.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-teal-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
          >
            <Download className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
            Export Data
          </Button>
        </div>

        {/* Stats inside banner */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <Users className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{dummyResults.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Total Peserta
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{completedCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Selesai
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{avgScore}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Rata-rata Skor
              </p>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <FileBarChart className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {(
            [
              { key: 'all', label: 'Semua', count: dummyResults.length },
              { key: 'completed', label: 'Selesai', count: completedCount },
              { key: 'in_progress', label: 'Berlangsung', count: inProgressCount },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {f.label}{' '}
              <span
                className={cn(
                  'ml-1',
                  filter === f.key ? 'text-slate-400' : 'text-slate-300'
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari peserta, email, atau nama tes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* RESULTS LIST */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <Users className="size-8 text-teal-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">
            Coba ubah filter atau kata kunci pencarian.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filteredResults.map((result, index) => {
            const accent = accentColors[index % accentColors.length]
            const isCompleted = result.status === 'completed'

            return (
              <div
                key={result.id}
                onClick={() => router.push(`/admin/results/${result.id}`)}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all"
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md',
                    accent.bg, accent.text
                  )}
                >
                  <User className="size-5" />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                      {result.name}
                    </h3>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                        isCompleted
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-amber-50 text-amber-600'
                      )}
                    >
                      {isCompleted ? 'Selesai' : 'Berlangsung'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">
                    {result.email}
                  </p>
                </div>

                {/* Test name pill */}
                <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full shrink-0">
                  <FileBarChart className="size-3.5" />
                  <span className="truncate max-w-[140px]">{result.testName}</span>
                </div>

                {/* Meta pills */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  {isCompleted && (
                    <>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                        <Award className="size-3.5" />
                        <span>{result.score}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full">
                        <TrendingUp className="size-3.5" />
                        <span className="truncate max-w-[100px]">{result.resultType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                        <Clock className="size-3.5" />
                        <span>{result.duration}m</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar className="size-3.5" />
                    <span>{isCompleted ? formatDate(result.completedAt) : 'Sedang mengerjakan'}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="size-9 rounded-xl bg-white text-teal-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-teal-50 hover:border-teal-200 hover:text-teal-500">
                    <Eye className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
