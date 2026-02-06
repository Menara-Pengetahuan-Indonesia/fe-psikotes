import { MessageSquare, ArrowRight, Sparkles, Plus, Hexagon, Diamond } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function KonselingHero() {
  return (
    <header className="relative overflow-hidden bg-indigo-600 text-white pt-32 pb-20 md:pt-40 md:pb-32">
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />
      
      <Plus className="absolute top-[15%] left-[10%] text-indigo-400/40 w-8 h-8 animate-pulse" />
      <Hexagon className="absolute top-[40%] right-[10%] text-white/10 w-24 h-24 -rotate-12 animate-float-slow" />
      <Diamond className="absolute bottom-[10%] left-[20%] text-amber-400/30 w-16 h-16 rotate-12 animate-float-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-700/50 border border-indigo-400 shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-black tracking-[0.2em] text-indigo-50 uppercase">
                Heal & Grow Together
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
                LIFE<br />
                <span className="text-amber-300 relative inline-block">
                  CONSULTATION
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-indigo-50 max-w-xl leading-relaxed font-medium opacity-90">
                Konsultasi profesional bersama pakar berpengalaman untuk membantu Anda menavigasi tantangan kehidupan dengan lebih baik.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link
                href="#services"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-slate-950/20"
              >
                Jelajahi Layanan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-100 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-indigo-200 font-black uppercase tracking-widest leading-none">Didukung oleh</span>
                  <span className="text-sm font-black text-white tracking-tight">Psikolog Berlisensi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-float-slow">
             {/* 3D-like Floating Illustration Placeholder */}
             <div className="w-full aspect-square max-w-md mx-auto relative transform-style-3d">
                <div className="absolute inset-0 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm -rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center border-4 border-indigo-500/20 translate-x-4 translate-y-4">
                   <div className="relative text-center space-y-6 p-12">
                      <div className="w-24 h-24 bg-indigo-50 rounded-3xl mx-auto flex items-center justify-center text-5xl border border-indigo-100 shadow-inner">
                        💬
                      </div>
                      <div className="space-y-2">
                        <div className="w-32 h-3 bg-indigo-100 rounded-full mx-auto" />
                        <div className="w-48 h-5 bg-indigo-600 rounded-full mx-auto" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                         <div className="h-12 bg-slate-50 rounded-xl border border-slate-100"></div>
                         <div className="h-12 bg-amber-50 rounded-xl border border-amber-100"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}