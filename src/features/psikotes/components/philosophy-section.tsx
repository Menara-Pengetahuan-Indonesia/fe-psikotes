import { PHILOSOPHY_ITEMS } from '../constants'
import { Leaf, Target, Zap, Heart, Plus, Hexagon, Diamond } from 'lucide-react'
import { cn } from '@/lib/utils'

const ICONS = [Leaf, Target, Zap, Heart]

export function PhilosophySection() {
  return (
    <section className="relative z-10 py-24 md:py-36 bg-[#fefce8] overflow-hidden text-stone-800">
      
      {/* --- RICH BACKGROUND ORNAMENTS (Matching Hero) --- */}
      {/* 1. Subtle Topographic Line Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%2315803d' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />

      {/* 2. Technical Ornaments */}
      <Plus className="absolute top-[15%] right-[10%] text-emerald-600/20 w-8 h-8 animate-pulse" />
      <Plus className="absolute bottom-[10%] left-[5%] text-stone-400/20 w-10 h-10 rotate-45" />
      <Hexagon className="absolute top-[10%] left-[20%] text-emerald-600/10 w-20 h-20 -rotate-12 animate-float-slow" />
      <Diamond className="absolute bottom-[20%] right-[5%] text-amber-600/10 w-16 h-16 rotate-12 animate-float-medium" />

      {/* 3. Floating 3D-like Spheres (Pastel) */}
      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-[radial-gradient(circle_at_30%_30%,#d1fae5_0%,#a7f3d0_100%)] opacity-40 rounded-full blur-3xl animate-float-slow mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-[radial-gradient(circle_at_30%_30%,#ffedd5_0%,#fed7aa_100%)] opacity-30 rounded-full blur-3xl animate-float-medium mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content & Grid */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-emerald-600 text-xs font-bold uppercase tracking-wide shadow-sm">
                <Leaf className="h-3 w-3" />
                Filosofi Kami
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-stone-800 leading-[1.1]">
                Tumbuh Bahagia,<br />
                <span className="text-emerald-600">Hidup Bermakna</span>
              </h2>
              <p className="text-lg text-stone-600 max-w-md leading-relaxed font-medium">
                Kami percaya bahwa setiap individu memiliki potensi unik yang perlu dikenali dan dikembangkan.
              </p>
            </div>

            {/* 3D Tiles Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PHILOSOPHY_ITEMS.map((item, idx) => {
                const Icon = ICONS[idx % ICONS.length]
                
                return (
                  <div 
                    key={item.title} 
                    className={cn(
                      "p-5 rounded-2xl border-2 border-b-[6px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      "border-stone-100 border-b-emerald-500"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-inner", "bg-emerald-50 text-emerald-700")}>
                      <Icon className="h-5 w-5" />
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
                <div className="absolute inset-0 bg-white rounded-[3rem] border-2 border-stone-100 shadow-2xl transform rotate-6 z-0"></div>
                
                {/* Front Plate */}
                <div className="absolute inset-4 bg-white rounded-[2.5rem] border-2 border-stone-100 shadow-2xl flex items-center justify-center overflow-hidden z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fefce8_0%,transparent_40%)]" />
                    
                    {/* Stacked 3D Blocks */}
                    <div className="relative flex flex-col items-center gap-4 transform translate-y-8">
                       <div className="w-32 h-32 bg-emerald-500 rounded-3xl shadow-[0_10px_0_#059669] transform -rotate-12 z-30 flex items-center justify-center text-4xl border-2 border-emerald-400 text-white font-bold">🌱</div>
                       <div className="w-40 h-16 bg-amber-400 rounded-2xl shadow-[0_8px_0_#d97706] transform rotate-3 z-20 border-2 border-amber-300"></div>
                       <div className="w-48 h-16 bg-secondary-900 rounded-2xl shadow-[0_8px_0_#020617] transform -rotate-2 z-10 border-2 border-secondary-800"></div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-200 rounded-full blur-xl opacity-60 animate-pulse z-0" />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}