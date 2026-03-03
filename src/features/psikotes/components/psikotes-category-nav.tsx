'use client'

import { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  CheckCircle2,
  Flower2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BermoelaText } from './bermoela-text'
import { TOPO_PRIMARY, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'
import { NAV_CATEGORIES } from '../constants'

export function PsikotesCategoryNav() {
  const [activeTab, setActiveTab] = useState(NAV_CATEGORIES[0].id)
  const activeData = NAV_CATEGORIES.find(c => c.id === activeTab) || NAV_CATEGORIES[0]

  return (
    <section id="pemetaan" className="py-12 md:py-16 relative overflow-hidden bg-background">
      
      {/* Background Topo Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
           style={{
             backgroundImage: TOPO_PRIMARY,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary-200 shadow-sm">
             <Target className="w-3 h-3 text-primary-600" />
             <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Hadapi Titik Mulamu</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight leading-none">
            Berhenti Berlari dari <span className="text-primary-600 italic">Masalahmu.</span>
          </h2>
          <p className="text-secondary-700/70 font-medium max-w-xl mx-auto text-sm md:text-base">
            Semua perubahan besar berawal dari keberanian mengakui apa yang benar-benar menahanmu hari ini.
          </p>
        </div>

        {/* Category Selection Tabs - PREMIUM FLOATING ISLAND NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-col md:flex-row items-center p-2 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-[2.5rem] shadow-soft-xl">
            {NAV_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              
              // Dynamic colors based on active category
              const activeBg = 
                cat.id === 'personal' ? 'bg-indigo-50 border-indigo-100 shadow-indigo-500/10' :
                cat.id === 'relationship' ? 'bg-rose-50 border-rose-100 shadow-rose-500/10' :
                'bg-amber-50 border-amber-100 shadow-amber-500/10';
              
              const activeText = 
                cat.id === 'personal' ? 'text-indigo-700' :
                cat.id === 'relationship' ? 'text-rose-700' :
                'text-amber-700';

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "relative flex items-center gap-4 px-6 py-4 rounded-[2rem] transition-all duration-500 border border-transparent w-full md:w-auto",
                    isActive 
                      ? cn("shadow-lg scale-[1.02]", activeBg)
                      : "hover:bg-slate-50/80 text-slate-500"
                  )}
                >
                  {/* Category Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm",
                    isActive ? cat.theme : "bg-slate-100 text-slate-400 border border-slate-200"
                  )}>
                    <cat.icon className={cn("w-6 h-6 transition-transform", isActive ? "scale-110" : "")} />
                  </div>
                  
                  {/* Text Info */}
                  <div className="text-left">
                    <h3 className={cn(
                      "font-black text-lg tracking-tight transition-colors leading-none mb-1",
                      isActive ? activeText : "text-slate-500"
                    )}>
                      {cat.title}
                    </h3>
                    <p className={cn(
                      "text-xs font-black uppercase tracking-widest transition-colors",
                      isActive ? activeText.replace('700', '500') : "text-slate-400"
                    )}>
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* INTERACTIVE BOX: Clean 50/50 Split Layout */}
        <div className="relative animate-in fade-in zoom-in-95 duration-1000">
           <div className="w-full bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row relative min-h-[550px]">
              
              {/* LEFT SIDE: CHALLENGE (Kondisi Saat Ini) - 1/2 width */}
              <div className="lg:w-1/2 bg-slate-50 p-10 md:p-16 flex flex-col justify-center relative group">
                 {/* Topo Pattern */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                      style={{
                        backgroundImage: TOPO_PRIMARY,
                        backgroundSize: '300px 300px',
                      }}
                 />
                 
                 <div className="relative z-10 space-y-10">
                    <div className="space-y-6">
                       <div className="flex items-center gap-3 text-slate-400">
                          <Zap className="w-5 h-5 fill-current" />
                          <span className="text-xs font-black uppercase tracking-[0.2em]">Kondisi Saat Ini</span>
                       </div>
                       <h4 className="text-3xl md:text-4xl font-black leading-tight italic tracking-tight text-slate-400 group-hover:text-slate-600 transition-colors duration-700">
                          &quot;{activeData.content.problem}&quot;
                       </h4>
                    </div>
                    
                    <div className="space-y-5">
                       <div className="h-1.5 w-16 bg-primary-200 rounded-full" />
                       <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                          Semua perubahan besar bermula dari keberanian mengakui titik mulamu hari ini.
                       </p>
                    </div>
                 </div>
              </div>

              {/* RIGHT SIDE: SOLUTION (The New You) - 1/2 width */}
              <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                 {/* Subtle Radial Glow */}
                 <div className={cn(
                    "absolute inset-0 opacity-[0.4] transition-all duration-1000 bg-linear-to-br",
                    activeData.gradient
                 )} />
                 
                 <div className="space-y-10 relative z-10 w-full">
                    {/* Header Solution */}
                    <div className="space-y-5">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow-md",
                            activeData.theme
                          )}>
                             <Sparkles className="w-5 h-5 fill-current" />
                          </div>
                          <span className="text-xs font-black text-primary-600 uppercase tracking-[0.2em]">The New You Transformation</span>
                       </div>
                       
                       <div className="space-y-2">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Solusi Terpadu:</p>
                          <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter">
                             {activeData.content.product}
                          </h3>
                       </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col xl:flex-row xl:items-center gap-6 pt-2">
                       <button className="h-14 px-8 rounded-2xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-200 group/btn shrink-0">
                          Mulai Transformasi <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                       
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center shrink-0">
                             <Flower2 className="w-5 h-5 text-accent-600 animate-pulse" />
                          </div>
                          <div className="space-y-0.5">
                             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Akhir:</p>
                             <p className="text-sm md:text-base font-black text-primary-600 leading-tight">{activeData.content.benefit}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Decorative background flowers */}
                 <Flower2 className="absolute -right-10 -bottom-10 w-48 h-48 text-primary-50 opacity-50 animate-spin-slow" />
              </div>

              {/* Center Connection Arrow */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-slate-50 shadow-xl items-center justify-center z-30">
                 <ArrowRight className="w-6 h-6 text-primary-600" />
              </div>
           </div>
        </div>

        <div className="mt-20 text-center">
           <p className="text-slate-400 text-xs font-black uppercase tracking-[0.4em]">
              Setiap langkah besar dimulai dengan satu keputusan kecil. <BermoelaText className="text-primary-600" />
           </p>
        </div>

      </div>
    </section>
  )
}
