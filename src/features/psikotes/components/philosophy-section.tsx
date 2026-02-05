import { PHILOSOPHY_ITEMS } from '../constants'
import { Leaf, Target, Zap, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const ICONS = [Leaf, Target, Zap, Heart]
const COLORS = [
  { bg: 'bg-emerald-50', border: 'border-emerald-200', borderB: 'border-b-emerald-400', icon: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  { bg: 'bg-sky-50', border: 'border-sky-200', borderB: 'border-b-sky-400', icon: 'text-sky-600', iconBg: 'bg-sky-100' },
  { bg: 'bg-amber-50', border: 'border-amber-200', borderB: 'border-b-amber-400', icon: 'text-amber-600', iconBg: 'bg-amber-100' },
  { bg: 'bg-rose-50', border: 'border-rose-200', borderB: 'border-b-rose-400', icon: 'text-rose-600', iconBg: 'bg-rose-100' },
]

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
       {/* Simple decorative circle instead of batik */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content & Grid */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wide">
                <Leaf className="h-3 w-3" />
                Filosofi Kami
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-stone-800 leading-[1.1]">
                Tumbuh Bahagia,<br />
                <span className="text-emerald-500 drop-shadow-sm">Hidup Bermakna</span>
              </h2>
              <p className="text-lg text-stone-500 max-w-md leading-relaxed">
                Kami percaya bahwa setiap individu memiliki potensi unik yang perlu dikenali dan dikembangkan.
              </p>
            </div>

            {/* 3D Pastel Tiles Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PHILOSOPHY_ITEMS.map((item, idx) => {
                const Icon = ICONS[idx % ICONS.length]
                const color = COLORS[idx % COLORS.length]
                
                return (
                  <div 
                    key={item.title} 
                    className={cn(
                      "p-5 rounded-2xl border-2 border-b-[6px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                      color.bg,
                      color.border,
                      color.borderB
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm", color.iconBg)}>
                      <Icon className={cn("h-5 w-5", color.icon)} />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800 mb-1">{item.title}</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-medium">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Right: 3D Block Illustration */}
          <div className="hidden lg:block relative perspective-1000">
             <div className="aspect-square relative max-w-md mx-auto transform-style-3d animate-float-medium">
                {/* Back Plate */}
                <div className="absolute inset-0 bg-[#fefce8] rounded-[3rem] border-[3px] border-stone-100 shadow-xl transform rotate-6 z-0"></div>
                
                {/* Front Plate */}
                <div className="absolute inset-4 bg-white rounded-[2.5rem] border-[3px] border-stone-100 shadow-2xl flex items-center justify-center overflow-hidden z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f0fdf4_0%,_transparent_40%)]" />
                    
                    {/* Stacked 3D Blocks */}
                    <div className="relative flex flex-col items-center gap-4 transform translate-y-8">
                       <div className="w-32 h-32 bg-emerald-400 rounded-3xl shadow-[0_10px_0_#047857] transform -rotate-12 z-30 flex items-center justify-center text-4xl border-2 border-emerald-300">🌱</div>
                       <div className="w-40 h-16 bg-amber-300 rounded-2xl shadow-[0_8px_0_#d97706] transform rotate-3 z-20 border-2 border-amber-200"></div>
                       <div className="w-48 h-16 bg-sky-300 rounded-2xl shadow-[0_8px_0_#0284c7] transform -rotate-2 z-10 border-2 border-sky-200"></div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-rose-200 rounded-full blur-xl opacity-60 animate-pulse z-0" />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
