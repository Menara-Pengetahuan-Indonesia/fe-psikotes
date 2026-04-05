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
    <section className="py-12 md:py-16 bg-linear-to-b from-primary-600 to-background relative">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="bg-primary-950 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Summary Header */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-3 h-3 text-accent-400 fill-accent-400" />
                <span className="text-xs font-black text-primary-100 uppercase tracking-widest">Transformation Journey</span>
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
                 <span className="text-xs font-black text-primary-300/60 uppercase tracking-widest">+10k Jiwa yang Tumbuh</span>
              </div>
            </div>

            {/* Right: The Map (Kolam Kanan) */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {TRANSFORMATION_STEPS.map((step, idx) => (
                <div 
                  key={step.id}
                  className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 transition-colors duration-300 group/item relative overflow-hidden"
                >
                  <div className="flex gap-4 relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover/item:scale-110 shadow-lg",
                      step.color
                    )}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-white text-base tracking-tight">{step.title}</h4>
                      <p className="text-sm text-primary-100/50 font-medium leading-relaxed">
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
                    className="mt-4 flex items-center gap-2 text-xs font-black text-accent-400 uppercase tracking-widest transition-all hover:text-accent-300 group/btn"
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
