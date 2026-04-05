import {
  Clock,
  ShieldCheck,
  CameraOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExamHeaderProps {
  timeLeft: number
  formatTime: (s: number) => string
  onSubmit: () => void
}

export function ExamHeader({
  timeLeft,
  formatTime,
  onSubmit,
}: ExamHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between shadow-sm sticky top-0 z-[10000]">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black italic shadow-lg">
          B
        </div>
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest hidden sm:block">
          Examination Mode
        </h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
          <Clock className={cn("size-4", timeLeft < 300 ? "text-red-500" : "text-slate-400")} />
          <span className={cn("text-lg font-black tabular-nums tracking-tighter text-slate-900", timeLeft < 300 && "text-red-500 animate-pulse")}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <Button
          size="sm"
          onClick={onSubmit}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-black text-[10px] h-9 px-4 uppercase tracking-widest"
        >
          Selesai
        </Button>
      </div>
    </header>
  )
}

interface ExamProctorProps {
  cameraError: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
}

export function ExamProctor({
  cameraError,
  videoRef,
}: ExamProctorProps) {
  return (
    <aside className="hidden lg:flex w-48 flex-col shrink-0 gap-4 sticky top-0">
      <div className="space-y-3 text-center">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Live Proctor
        </h4>
        <div className="bg-slate-900 rounded-[1.5rem] p-1 shadow-2xl relative overflow-hidden aspect-[3/4] border-2 border-white group">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest animate-pulse">
            <div className="size-1 bg-white rounded-full" /> LIVE
          </div>
          {cameraError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 gap-2 p-4 text-center">
              <CameraOff className="size-6" />
              <span className="text-[8px] font-bold uppercase">
                OFF
              </span>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-2xl opacity-90 scale-x-[-1]"
            />
          )}
        </div>
        <div className="px-3 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center gap-2">
          <ShieldCheck className="size-4 text-green-500" />
          <span className="text-[9px] font-black text-slate-900 uppercase">
            Protected
          </span>
        </div>
      </div>
    </aside>
  )
}

interface ExamNavSidebarProps {
  total: number
  currentIdx: number
  answers: Record<number, unknown>
  onNavigate: (idx: number) => void
}

export function ExamNavSidebar({
  total,
  currentIdx,
  answers,
  onNavigate,
}: ExamNavSidebarProps) {
  const progress = Math.round(
    (Object.keys(answers).length / total) * 100,
  )
  return (
    <aside className="hidden lg:flex w-52 flex-col shrink-0 sticky top-0">
      <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm flex flex-col h-fit">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
          Navigasi
        </h4>
        <div className="grid grid-cols-4 gap-1.5 max-h-[300px] overflow-y-auto no-scrollbar">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={cn(
                "aspect-square rounded-lg text-[9px] font-black transition-all border flex items-center justify-center",
                currentIdx === i
                  ? "border-primary-500 bg-primary-50 text-primary-600 shadow-sm scale-105"
                  : answers[i]
                    ? "border-primary-500 bg-primary-500 text-white shadow-sm"
                    : "border-slate-100 bg-white text-slate-300 hover:border-slate-300",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 mb-2">
            <span>Progres</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-700 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
