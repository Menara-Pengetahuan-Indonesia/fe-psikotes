'use client'

import {
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRANSFORMATION_STEPS } from '../constants'

export function PsikotesTransformationMap() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-primary-600 to-background relative">
      {/* Extension of the Topo Pattern from Hero to make the blend completely seamless */}
      <div className="absolute top-0 left-0 w-full h-1/2 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'white\' stroke-width=\'0.8\' stroke-opacity=\'0.6\'%3E%3Cpath d=\'M0 200 C 40 160, 80 240, 120 200 S 200 160, 240 200 S 320 240, 400 200 M0 150 C 40 110, 80 190, 120 150 S 200 110, 240 150 S 320 190, 400 150 M0 250 C 40 210, 80 290, 120 250 S 200 210, 240 250 S 320 290, 400 250 M0 100 C 50 50, 100 150, 150 100 S 250 50, 300 100 S 400 150, 450 100 M0 300 C 50 250, 100 350, 150 300 S 250 250, 300 300 S 400 350, 450 300\'/%3E%3Cpath d=\'M-50 175 C 0 125, 50 225, 100 175 S 200 125, 250 175 S 350 225, 400 175 M-50 225 C 0 175, 50 275, 100 225 S 200 175, 250 225 S 350 275, 400 225\'/%3E%3C/g%3E%3C/svg%3E")',
             backgroundSize: '400px 400px',
             maskImage: 'linear-gradient(to bottom, black, transparent)',
             WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="bg-primary-950 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Background Visuals (Subtle Glows) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Summary Header */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-3 h-3 text-accent-400 fill-accent-400" />
                <span className="text-[10px] font-black text-primary-100 uppercase tracking-widest">Transformation Journey</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                Peta Perjalanan <br />
                <span className="text-accent-400 italic">&quot;The New You&quot;</span>
              </h2>
              <p className="text-primary-100/60 text-sm font-medium leading-relaxed">
                Empat langkah kunci untuk melepaskan kendala masa lalu dan meraih masa depan yang indah. Semua bermula dari sini.
              </p>
              <div className="flex items-center gap-4 pt-4">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-900 bg-primary-800" />
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-primary-300/60 uppercase tracking-widest">+10k Wanita Berdaya</span>
              </div>
            </div>

            {/* Right: The Map (Kolam Kanan) */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {TRANSFORMATION_STEPS.map((step, idx) => (
                <div 
                  key={step.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 transition-all duration-500 group/item relative overflow-hidden"
                >
                  <div className="flex gap-4 relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover/item:scale-110 shadow-lg",
                      step.color
                    )}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-white text-sm tracking-tight">{step.title}</h4>
                      <p className="text-[10px] text-primary-100/50 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Visual Indicator (Number) */}
                  <span className="absolute -right-2 -bottom-4 text-7xl font-black text-white/5 select-none transition-all group-hover/item:text-white/10">
                    0{idx + 1}
                  </span>

                  <button 
                    onClick={() => scrollToSection(step.id)}
                    className="mt-4 flex items-center gap-2 text-[9px] font-black text-accent-400 uppercase tracking-widest transition-all hover:text-accent-300 group/btn"
                  >
                    Eksplorasi <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
