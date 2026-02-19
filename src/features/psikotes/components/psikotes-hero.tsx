import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  Brain,
  Target,
  Zap,
  ShieldCheck,
  Plus,
  Hexagon,
  Diamond,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const HERO_BENEFITS = [
  {
    label: 'Self-Awareness',
    desc: 'Kenali kekuatan dan kelemahan'
      + ' diri secara objektif.',
    icon: Brain,
  },
  {
    label: 'Good Pragmatism',
    desc: 'Fokus pada langkah yang benar-'
      + 'benar berhasil dalam hidup.',
    icon: Target,
  },
  {
    label: 'Continuous Growth',
    desc: 'Tumbuh satu persen lebih baik'
      + ' setiap harinya.',
    icon: Zap,
  },
  {
    label: 'Mental Resilience',
    desc: 'Bangun ketahanan mental'
      + ' menghadapi tantangan.',
    icon: ShieldCheck,
  },
]

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-800 via-primary-700 to-primary-500 py-20 md:py-36">
      
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      {/* 1. Subtle Topographic Line Pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />

      {/* 2. Ambient Glows (Smooth Transition) */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary-300/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 3. Technical Ornaments (Non-Wave) */}
      {/* Plus Signs */}
      <Plus className="absolute top-[10%] left-[15%] text-primary-300/30 w-8 h-8 animate-pulse" />
      <Plus className="absolute bottom-[15%] left-[5%] text-white/20 w-6 h-6 rotate-45" />
      <Plus className="absolute top-[40%] right-[10%] text-accent-300/20 w-10 h-10 animate-spin-slow" />
      
      {/* Floating Outlines */}
      <Hexagon className="absolute top-[20%] right-[30%] text-white/10 w-24 h-24 -rotate-12 animate-float-medium" />
      <Diamond className="absolute bottom-[20%] right-[40%] text-accent-200/10 w-16 h-16 rotate-12 animate-float-slow" />

      {/* 4. Floating 3D-like Spheres & Polygons */}
      <div className="absolute top-10 left-[10%] w-32 h-32 bg-linear-to-br from-primary-500/20 to-primary-800/20 rounded-full blur-2xl opacity-40 animate-float-slow" />
      <div className="absolute bottom-20 right-[5%] w-48 h-48 bg-linear-to-tr from-accent-300/10 to-accent-600/10 rounded-full blur-3xl opacity-20 animate-float-medium" />
      
      {/* Glass Polygon shard */}
      <div className="absolute top-[15%] left-[45%] w-20 h-20 bg-white/10 backdrop-blur-sm rounded-tr-[3rem] rounded-bl-[2rem] rotate-30 border border-white/20" />


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-700/50 border border-primary-400 shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-accent-400 fill-accent-400" />
              <span className="text-[11px] font-black tracking-[0.2em] text-primary-50 uppercase">
                Expertise in Psychology
              </span>
            </div>
            
            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
                Kenali Dirimu,<br />
                <span className="text-accent-300 relative">
                  Potensimu
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span> Menanti.
              </h1>
              <p className="text-xl text-primary-50 max-w-lg leading-relaxed font-medium opacity-90 text-pretty">
                Buka wawasan baru tentang kepribadian dan bakatmu dengan metode asesmen yang ilmiah dan akurat.
              </p>
            </div>

            {/* Benefits Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {HERO_BENEFITS.map((b, idx) => (
                <div key={b.label} 
                     className={cn(
                       "flex items-start gap-4 p-5 rounded-3xl border transition-all duration-500 hover:-translate-y-1",
                       "bg-primary-700/40 border-primary-500/30 backdrop-blur-md hover:bg-primary-700/60 hover:shadow-2xl hover:shadow-primary-900/20"
                     )}
                     style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-white/10 p-2.5 rounded-2xl shrink-0 text-accent-300 border border-white/10 shadow-inner">
                    <b.icon className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm mb-1 uppercase tracking-wide">{b.label}</p>
                    <p className="text-primary-100/70 text-xs leading-relaxed font-medium">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl bg-accent-500 hover:bg-accent-600 text-white font-black shadow-[0_8px_0_#b45309] hover:shadow-[0_4px_0_#b45309] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all border-none group">
                <Link href="/psikotes/premium" className="flex items-center gap-2">
                  Mulai Tes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <div className="h-12 w-px bg-primary-500/50 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-primary-200 font-black uppercase tracking-widest">Harga Mulai</span>
                  <span className="text-3xl font-black text-white tracking-tight">Rp25.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration (Advanced 3D Graphic) */}
          <div className="hidden lg:block relative perspective-2000">
            {/* Radar/Ripple Effect behind illustration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full animate-ping duration-3000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full animate-ping duration-4000" />
            
            <div className="relative w-full aspect-square max-w-137.5 mx-auto transform-style-3d animate-float-slow">
              
              {/* Main "Dashboard" Card */}
              <div className="absolute inset-10 bg-white rounded-[3rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] border-[6px] border-primary-500/20 flex flex-col overflow-hidden z-20 transform-style-3d">
                 <div className="h-32 bg-primary-50 p-8 flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="w-20 h-3 bg-primary-200 rounded-full animate-pulse" />
                        <div className="w-32 h-5 bg-primary-600 rounded-full" />
                    </div>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">📊</div>
                 </div>
                 
                 <div className="flex-1 p-10 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-black text-primary-600">98%</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Akurasi</p>
                            </div>
                        </div>
                        <div className="h-24 bg-accent-50 rounded-3xl border-2 border-dashed border-accent-200 flex items-center justify-center">
                             <div className="text-center">
                                <p className="text-2xl font-black text-accent-600">AI</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Powered</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-primary-500 animate-in slide-in-from-left duration-1000" />
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-accent-400 animate-in slide-in-from-left duration-1000 delay-300" />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Floating Floating Assets */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400 rounded-[2rem] rotate-12 z-30 animate-float-medium shadow-2xl border-4 border-white flex items-center justify-center text-4xl">
                  🧠
              </div>
              <div className="absolute bottom-4 left-0 w-28 h-28 bg-accent-400 rounded-full z-30 animate-float-fast shadow-2xl border-4 border-white flex items-center justify-center text-4xl">
                  🚀
              </div>
              <div className="absolute top-1/2 -right-4 w-20 h-20 bg-sky-400 rounded-2xl -rotate-12 z-10 animate-float-slow shadow-xl border-4 border-white flex items-center justify-center text-3xl">
                  ⭐
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}