import Link from 'next/link'
import { ArrowLeft, Clock, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamHeaderProps {
  currentIdx: number
  questionsLength: number
  progress: number
  backHref: string
  slug: string
}

export function ExamHeader({
  currentIdx,
  questionsLength,
  progress,
  backHref,
  slug,
}: ExamHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <Link
            href={backHref ?? `/psikotes/gratis/${slug}`}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold hidden md:inline">Keluar</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Brain className="size-4 text-indigo-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Soal {currentIdx + 1}/{questionsLength}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-teal-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  )
}
