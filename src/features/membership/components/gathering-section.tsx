import { CheckCircle2, Video, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const GATHERING_POINTS = [
  'Dipandu oleh Community Manager berpengalaman',
  'Topik diskusi yang relevan dengan kehidupan sehari-hari',
  'Sesi tanya jawab interaktif & ruang berbagi aman',
]

export function GatheringSection() {
  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Visual Content */}
        <div className="order-2 md:order-1 relative">
          <div className="absolute inset-0 bg-konseling-600/5 transform -rotate-3 rounded-[3rem]" />
          <div className="relative bg-white border border-slate-100 rounded-[3rem] p-3 shadow-2xl shadow-konseling-900/5">
            <div className="aspect-video bg-slate-950 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
              {/* Animated Background Grids */}
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-konseling-500/20 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              
              <div className="relative z-10 text-center space-y-4">
                <div className="w-20 h-20 bg-konseling-600/20 rounded-full mx-auto flex items-center justify-center backdrop-blur-md border border-white/10">
                   <Video className="w-10 h-10 text-konseling-400" />
                </div>
                <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                  Live Gathering Session
                </span>
              </div>
            </div>
          </div>
          
          {/* Floating Avatar Card */}
          <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-3xl shadow-2xl border border-slate-50 items-center gap-3 animate-float-medium hidden lg:flex">
             <div className="w-12 h-12 rounded-2xl bg-accent-100 flex items-center justify-center text-xl">👤</div>
             <div>
                <p className="font-black text-sm text-slate-900">Andi Pratama</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Community Host</p>
             </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="order-1 md:order-2 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
               <Sparkles className="w-3 h-3 text-accent-500" />
               Weekly Engagement
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Members Gathering</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Setiap minggu, kami mengadakan sesi kumpul online untuk berdiskusi, berbagi cerita, dan saling menguatkan. Ini adalah ruang amanmu untuk tumbuh bersama tanpa tekanan.
            </p>
          </div>

          <ul className="space-y-5">
            {GATHERING_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-4 text-slate-700 font-bold text-base">
                <div className="w-6 h-6 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100 shadow-inner mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-4">
             <button className="px-10 py-4 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-konseling-600 transition-all shadow-xl shadow-slate-950/10">
                Lihat Jadwal Gathering
             </button>
          </div>
        </div>
      </div>
    </section>
  )
}