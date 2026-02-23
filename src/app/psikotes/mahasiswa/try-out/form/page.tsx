'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Brain, 
  ShieldCheck,
  Zap,
  Activity,
  CameraOff,
  Trophy,
  CheckCircle2,
  LayoutDashboard,
  Target
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStoreHydrated } from '@/store/auth.store'

// --- DUMMY TEST DATA ---
const QUESTIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `Pertanyaan psikotes simulasi nomor ${i + 1}. Bagaimana Anda biasanya merespons tantangan mendadak yang mengganggu rencana kerja Anda yang sudah tersusun rapi?`,
  options: [
    "Segera menyesuaikan rencana dengan fleksibel", 
    "Mengevaluasi dampak sebelum mengambil tindakan", 
    "Merasa sedikit terganggu namun tetap profesional", 
    "Meminta bantuan rekan untuk solusi cepat"
  ]
}))

export function ExamPageContent() {
  const { user } = useAuthStoreHydrated()
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, { choice: string, timestamp: string }>>({})
  const [timeLeft, setTimeLeft] = React.useState(1800)
  const [examStarted, setExamStarted] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [logs, setLogs] = React.useState<string[]>([])
  const [cameraError, setCameraError] = React.useState(false)
  const [finalScore, setFinalScore] = React.useState(0)

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString('id-ID', { hour12: false }) + '.' + new Date().getMilliseconds()
    setLogs(prev => [`[${ts}] ${msg}`, ...prev].slice(0, 30))
  }

  const startCamera = async () => {
    if (!navigator.mediaDevices) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(() => {})
        setCameraError(false)
      }
    } catch {
      setCameraError(true)
    }
  }

  React.useEffect(() => {
    if (examStarted && !isFinished) {
      startCamera()
    }
  }, [examStarted, isFinished])

  React.useEffect(() => {
    if (!examStarted || isFinished) return
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [examStarted, isFinished])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (choice: string) => {
    const ts = new Date().toLocaleTimeString('id-ID', { hour12: false }) + '.' + new Date().getMilliseconds()
    setAnswers(prev => ({ ...prev, [currentIdx]: { choice, timestamp: ts } }))
    addLog(`User: Menjawab Soal ${currentIdx + 1}`)
  }

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length
    const score = Math.round((answeredCount / 20) * 85 + Math.random() * 15)
    setFinalScore(score)
    setIsFinished(true)
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
    }
  }

  // --- START SCREEN ---
  if (!examStarted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#F2F2F7] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="size-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto text-primary-600 shadow-lg">
            <Brain className="size-10" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Try Out Mahasiswa</h1>
            <p className="text-slate-500 font-bold">Tekan tombol di bawah untuk memulai ujian.</p>
          </div>
          <Button size="lg" className="w-full bg-primary-600 h-16 rounded-2xl text-xl font-black shadow-xl" onClick={() => setExamStarted(true)}>
            MULAI SEKARANG
          </Button>
        </div>
      </div>
    )
  }

  // --- RESULT SCREEN ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-start p-6 md:p-12 relative z-[9999] overflow-y-auto no-scrollbar">
        <div className="max-w-5xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="flex items-center gap-6">
                <div className="size-20 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/20 text-white shrink-0">
                   <Trophy className="size-10" />
                </div>
                <div className="text-left">
                   <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Ujian Selesai!</h1>
                   <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Hasil simulasi Try Out Mahasiswa</p>
                </div>
             </div>
             <div className="flex items-center gap-3 bg-primary-50 px-5 py-3 rounded-2xl border border-primary-100 text-primary-700 font-black text-xs tracking-widest">
                <CheckCircle2 className="size-4" /> TERVERIFIKASI
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group transition-all hover:shadow-md">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Skor Akhir</p>
                <div className="relative flex items-center justify-center mb-6">
                   <span className="text-[100px] font-black text-slate-900 leading-none tracking-tighter">{finalScore}</span>
                   <span className="absolute -right-10 bottom-3 text-xl font-black text-primary-500">/ 100</span>
                </div>
                <div className="w-full max-w-sm h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                   <div className="h-full bg-primary-500 transition-all duration-1000 delay-300 shadow-[0_0_15px_rgba(20,184,166,0.5)]" style={{ width: `${finalScore}%` }} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Perfoma di atas rata-rata</p>
             </div>

             <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-indigo-100 transition-all">
                   <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Clock className="size-5" />
                   </div>
                   <div>
                      <p className="text-2xl font-black text-slate-900">{formatTime(1800 - timeLeft)}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Durasi Pengerjaan</p>
                   </div>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-primary-100 transition-all">
                   <div className="size-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                      <Target className="size-5" />
                   </div>
                   <div>
                      <p className="text-2xl font-black text-slate-900">{Object.keys(answers).length} / 20</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Terjawab</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                   <div className="flex items-center gap-2">
                      <Activity className="size-5 text-primary-400" />
                      <h3 className="text-xl font-black uppercase tracking-tight">Analisis Kompetensi</h3>
                   </div>
                   <p className="text-slate-400 font-medium leading-relaxed">
                      Berdasarkan pola jawaban Anda, sistem mendeteksi kekuatan utama pada **Logika Verbal**. Anda memiliki ketelitian yang baik namun disarankan untuk meningkatkan kecepatan pengerjaan pada bagian **Penalaran Numerik**.
                   </p>
                </div>
                <div className="flex flex-col gap-3">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Logika Verbal</span>
                      <span className="text-xs font-black text-primary-400">EXCELLENT</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Penalaran Numerik</span>
                      <span className="text-xs font-black text-accent-400">STABLE</span>
                   </div>
                </div>
             </div>
             <Zap className="absolute right-0 bottom-0 size-64 opacity-5 translate-x-20 translate-y-20 rotate-12" />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-4">
             <Button size="lg" className="w-full max-w-md bg-slate-900 hover:bg-primary-600 text-white h-16 rounded-2xl font-black gap-3 transition-all" asChild>
                <Link href="/pengguna">
                   <LayoutDashboard className="size-5" /> KEMBALI KE DASHBOARD
                </Link>
             </Button>
          </div>

        </div>
      </div>
    )
  }

  // --- EXAM SCREEN ---
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans select-none relative z-[9999] overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between shadow-sm sticky top-0 z-[10000]">
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black italic shadow-lg">B</div>
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest hidden sm:block">Examination Mode</h2>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
              <Clock className={cn("size-4", timeLeft < 300 ? "text-red-500" : "text-slate-400")} />
              <span className={cn("text-lg font-black tabular-nums tracking-tighter text-slate-900", timeLeft < 300 && "text-red-500 animate-pulse")}>
                {formatTime(timeLeft)}
              </span>
           </div>
           <Button size="sm" onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-black text-[10px] h-9 px-4 uppercase tracking-widest">
              Selesai
           </Button>
        </div>
      </header>

      <div className="flex-1 flex w-full max-w-7xl mx-auto items-start p-4 md:p-6 lg:p-8 gap-6 overflow-y-auto no-scrollbar">
        <aside className="hidden lg:flex w-48 flex-col shrink-0 gap-4 sticky top-0">
           <div className="space-y-3 text-center">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Proctor</h4>
              <div className="bg-slate-900 rounded-[1.5rem] p-1 shadow-2xl relative overflow-hidden aspect-[3/4] border-2 border-white group">
                 <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest animate-pulse"><div className="size-1 bg-white rounded-full" /> LIVE</div>
                 {cameraError ? (
                   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 gap-2 p-4 text-center"><CameraOff className="size-6" /><span className="text-[8px] font-bold uppercase">OFF</span></div>
                 ) : (
                   <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-2xl opacity-90 scale-x-[-1]" />
                 )}
              </div>
              <div className="px-3 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center gap-2"><ShieldCheck className="size-4 text-green-500" /><span className="text-[9px] font-black text-slate-900 uppercase">Protected</span></div>
           </div>
        </aside>

        <main className="flex-1 space-y-4">
           <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6"><span className="px-4 py-1 rounded-full bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest">Soal {currentIdx + 1} / 20</span><Activity className="size-4 text-primary-500 opacity-20" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-8">{QUESTIONS[currentIdx].text}</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {QUESTIONS[currentIdx].options.map((opt, i) => {
                  const label = String.fromCharCode(65 + i)
                  const isSelected = answers[currentIdx]?.choice === opt
                  return (
                    <button key={opt} onClick={() => handleAnswer(opt)} className={cn("flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 group", isSelected ? "border-primary-500 bg-primary-50 shadow-md" : "border-slate-50 bg-slate-50/30 hover:border-slate-200")}>
                      <div className={cn("size-8 shrink-0 rounded-lg flex items-center justify-center font-black text-[10px] transition-colors shadow-sm", isSelected ? "bg-primary-500 text-white" : "bg-white border border-slate-100 text-slate-400")}>{label}</div>
                      <span className={cn("font-bold text-sm md:text-base", isSelected ? "text-primary-700" : "text-slate-600")}>{opt}</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                 <Button variant="ghost" className="rounded-xl h-10 px-6 font-bold text-slate-400 hover:text-slate-900 disabled:opacity-0" onClick={() => setCurrentIdx(prev => prev - 1)} disabled={currentIdx === 0}><ChevronLeft className="mr-2 size-4" /> Sebelumnya</Button>
                 <Button className="bg-slate-900 hover:bg-primary-600 text-white rounded-xl h-10 px-8 font-bold shadow-lg transition-all" onClick={() => { if (currentIdx < QUESTIONS.length - 1) setCurrentIdx(prev => prev + 1); else handleSubmit(); }}>{currentIdx === 19 ? 'Submit & Selesai' : 'Selanjutnya'}<ChevronRight className="ml-2 size-4" /></Button>
              </div>
           </div>
           <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                 <div className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-primary-500 animate-pulse" /><h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900">Aktivitas Deteksi</h4></div>
                 <span className="text-[8px] font-bold text-slate-400 uppercase">Live Tracking</span>
              </div>
              <div className="h-24 overflow-y-auto no-scrollbar font-mono text-[8px] space-y-1">
                 {logs.map((log, i) => (<div key={i} className={cn("p-1.5 rounded-md border-l-2", i === 0 ? "bg-primary-50 border-primary-500 text-primary-700 font-bold" : "bg-slate-50 border-slate-200 text-slate-400")}>{log}</div>))}
              </div>
           </div>
        </main>

        <aside className="hidden lg:flex w-52 flex-col shrink-0 sticky top-0">
           <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm flex flex-col h-fit">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Navigasi</h4>
              <div className="grid grid-cols-4 gap-1.5 max-h-[300px] overflow-y-auto no-scrollbar">
                 {QUESTIONS.map((_, i) => (<button key={i} onClick={() => setCurrentIdx(i)} className={cn("aspect-square rounded-lg text-[9px] font-black transition-all border flex items-center justify-center", currentIdx === i ? "border-primary-500 bg-primary-50 text-primary-600 shadow-sm scale-105" : answers[i] ? "border-primary-500 bg-primary-500 text-white shadow-sm" : "border-slate-100 bg-white text-slate-300 hover:border-slate-300")}>{i + 1}</button>))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100"><div className="flex justify-between text-[8px] font-black uppercase text-slate-400 mb-2"><span>Progres</span><span>{Math.round((Object.keys(answers).length / 20) * 100)}%</span></div><div className="h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary-500 transition-all duration-700 shadow-lg" style={{ width: `${(Object.keys(answers).length / 20) * 100}%` }} /></div></div>
           </div>
        </aside>
      </div>
    </div>
  )
}

export default function ExamPage() {
  return <ExamPageContent />
}
