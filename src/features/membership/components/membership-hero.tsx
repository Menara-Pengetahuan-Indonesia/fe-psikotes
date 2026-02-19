import { Users, Video, MessageSquare, ArrowRight, Sparkles, Plus, Hexagon, Diamond } from 'lucide-react'
import Link from 'next/link'

export function MembershipHero() {
  return (
    <header className="relative overflow-hidden bg-konseling-600 text-white pt-32 pb-20 md:pt-40 md:pb-32">
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />
      
      <Plus className="absolute top-[15%] left-[10%] text-konseling-400/40 w-8 h-8 animate-pulse" />
      <Hexagon className="absolute top-[40%] right-[10%] text-white/10 w-24 h-24 -rotate-12 animate-float-slow" />
      <Diamond className="absolute bottom-[10%] left-[20%] text-accent-400/30 w-16 h-16 rotate-12 animate-float-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-konseling-700/50 border border-konseling-400 shadow-lg backdrop-blur-md mb-2 mx-auto lg:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
              <span className="text-[10px] font-black tracking-[0.2em] text-konseling-50 uppercase">
                Exclusive Growth Community
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-lg">
                The Good Life <br />
                <span className="text-accent-300 relative inline-block">
                  Community
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>.
              </h1>
              <p className="text-lg md:text-xl text-konseling-50 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0 opacity-90">
                Bergabung dengan ekosistem pertumbuhan diri terbesar di Indonesia. Akses materi premium, webinar eksklusif, dan komunitas yang suportif.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
              <Link
                href="#pricing"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-konseling-700 transition-all shadow-xl shadow-slate-950/20"
              >
                Gabung Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="h-12 w-px bg-konseling-500/50 hidden sm:block" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-konseling-200 font-black uppercase tracking-widest leading-none">Lifetime</span>
                  <span className="text-sm font-black text-white tracking-tight">Standard Professional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual card mockup */}
          <div className="hidden lg:block relative perspective-2000">
            <div className="absolute inset-0 bg-konseling-400/20 blur-3xl opacity-50 rounded-full" />
            <div className="relative animate-float-slow transform-style-3d">
              <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-konseling-950/20 space-y-8 transform rotate-3 hover:rotate-0 transition-all duration-700">
                <div className="flex items-center gap-6 border-b border-slate-50 pb-8">
                  <div className="w-16 h-16 bg-konseling-600 rounded-3xl flex items-center justify-center text-white shadow-lg border-4 border-konseling-50">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-black text-2xl text-slate-900 leading-tight">Community Hub</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">12.5k+ Active Members</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner group/item hover:bg-white hover:shadow-xl transition-all duration-500">
                    <Video className="w-10 h-10 mb-4 text-konseling-600 transition-transform group-hover/item:scale-110" />
                    <p className="font-black text-slate-900 text-base leading-tight">Weekly Webinar</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tight">Live Experts</p>
                  </div>
                  <div className="bg-accent-50 p-6 rounded-[2rem] border border-accent-100 shadow-inner group/item hover:bg-white hover:shadow-xl transition-all duration-500">
                    <MessageSquare className="w-10 h-10 mb-4 text-accent-500 transition-transform group-hover/item:scale-110" />
                    <p className="font-black text-slate-900 text-base leading-tight">Privat Group</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tight">Supportive Peers</p>
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