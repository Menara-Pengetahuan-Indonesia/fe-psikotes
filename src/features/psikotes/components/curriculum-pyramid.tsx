import { CURRICULUM_LEVELS } from '../constants'
import { Trophy, Shield, Zap, Heart, User, Plus, Circle, Triangle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const LEVEL_ICONS = [User, Shield, Zap, Heart, Trophy] // Level 1 to 5

export function CurriculumPyramid() {
  return (
    <div className="bg-[#fefce8]"> {/* This background will show behind the rounded corners */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-emerald-600 text-white rounded-t-[60px] md:rounded-t-[120px] rounded-b-[60px] md:rounded-b-[120px] shadow-2xl">
        
        {/* --- RICH ORNAMENTS --- */}
        {/* 1. Subtle Topographic Line Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
               backgroundSize: '400px 400px'
             }}
        />

        {/* 2. Technical Ornaments */}
        <Plus className="absolute top-[15%] left-[5%] text-emerald-400/40 w-8 h-8 animate-pulse" />
        <Plus className="absolute bottom-[10%] right-[10%] text-white/20 w-10 h-10 rotate-45" />
        <Circle className="absolute top-[40%] left-[8%] text-amber-400/20 w-16 h-16 animate-float-slow" />
        <Triangle className="absolute bottom-[20%] left-[12%] text-white/10 w-12 h-12 -rotate-12 animate-float-medium" />
        <Sparkles className="absolute top-[20%] right-[5%] text-amber-300/30 w-12 h-12 animate-bounce" />

        {/* 3. Ambient Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-amber-500/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">Kurikulum Pertumbuhan</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Lima tingkatan pengembangan diri yang dirancang sistematis dari fondasi internal hingga dampak eksternal.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 w-full max-w-2xl mx-auto">
            {CURRICULUM_LEVELS.slice().reverse().map((level) => {
               const Icon = LEVEL_ICONS[level.level - 1]
               
               const blockStyles = [
                 'bg-emerald-50 text-emerald-900 border-b-8 border-emerald-200 z-50', 
                 'bg-emerald-100 text-emerald-900 border-b-8 border-emerald-200 z-40', 
                 'bg-emerald-200 text-emerald-900 border-b-8 border-emerald-300 z-30', 
                 'bg-emerald-300 text-emerald-900 border-b-8 border-emerald-400 z-20', 
                 'bg-emerald-400 text-white border-b-8 border-emerald-600 z-10',       
               ]

               return (
                 <div 
                   key={level.level} 
                   className={cn(
                     "relative flex items-center justify-between px-8 py-5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full",
                     level.width,
                     blockStyles[5 - level.level]
                   )}
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-black text-sm opacity-80">0{level.level}</span>
                     </div>
                     <span className="font-bold text-lg tracking-tight">{level.label}</span>
                   </div>
                   
                   {Icon && <Icon className="w-6 h-6 opacity-80" />}
                 </div>
               )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
