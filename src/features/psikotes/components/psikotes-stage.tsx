'use client'

import { useState } from 'react'
import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRANSFORMATION_STAGES } from '../constants'
import { TOPO_PRIMARY, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

export function PsikotesStage() {
  const [activeStageId, setActiveStageId] = useState(TRANSFORMATION_STAGES[0].id)
  
  const activeStage = TRANSFORMATION_STAGES.find(s => s.id === activeStageId) || TRANSFORMATION_STAGES[0]

  return (
    <section id="transformation-stages" className="py-24 bg-background relative overflow-hidden">
      
      {/* Background Topo Pattern (Same as Category Nav) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
           style={{
             backgroundImage: TOPO_PRIMARY,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 shadow-sm">
             <Target className="w-4 h-4 text-primary-600" />
             <span className="text-xs font-black text-primary-700 uppercase tracking-[0.2em]">Tahapan Transformasi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-secondary-900 tracking-tight leading-none">
            Pilih Fase <span className="text-primary-600 italic">Hidupmu Saat Ini.</span>
          </h2>
          <p className="text-secondary-700/70 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Setiap tahapan usia memiliki tantangan unik. Temukan bagaimana kami mendampingimu melangkah lebih jauh di setiap fasenya.
          </p>
        </div>

        {/* INTERACTIVE STAGE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: STAGE SELECTOR */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             {TRANSFORMATION_STAGES.map((stage) => {
               const isActive = activeStageId === stage.id
               return (
                 <button
                   key={stage.id}
                   onClick={() => setActiveStageId(stage.id)}
                   className={cn(
                     "w-full text-left p-8 rounded-[2.5rem] transition-all duration-500 border-2 flex flex-col gap-4 group",
                     isActive 
                       ? cn("bg-white border-primary-500 shadow-soft-xl scale-[1.02] z-10")
                       : "bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-slate-300 opacity-70 hover:opacity-100"
                   )}
                 >
                    <div className="flex items-center justify-between">
                       <span className={cn(
                         "text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm transition-colors",
                         isActive ? cn(stage.colors.accent, "text-white") : "bg-slate-100 text-slate-400"
                       )}>
                          {stage.ageRange}
                       </span>
                       <span className={cn(
                         "text-4xl font-black italic transition-colors",
                         isActive ? "text-primary-600/20" : "text-slate-200"
                       )}>
                          0{stage.id}
                       </span>
                    </div>
                    <div className="space-y-1">
                       <h3 className={cn(
                         "text-xl font-black tracking-tight transition-colors",
                         isActive ? "text-secondary-900" : "text-slate-500"
                       )}>
                          {stage.title}
                       </h3>
                       <p className={cn(
                         "text-xs font-medium leading-relaxed transition-colors",
                         isActive ? "text-secondary-700/60" : "text-slate-400"
                       )}>
                          {stage.description}
                       </p>
                    </div>
                 </button>
               )
             })}
          </div>

          {/* RIGHT SIDE: CONTENT DETAIL */}
          <div className="lg:col-span-8 relative">
             <div 
               className="bg-white rounded-[3.5rem] shadow-soft-xl border border-slate-100 overflow-hidden h-full min-h-[500px]"
             >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                   {activeStage.sections.map((section, idx) => (
                     <div 
                       key={`${activeStageId}-${idx}`} 
                       className={cn(
                         "p-10 flex flex-col gap-6 hover:bg-slate-50/50 transition-colors border-slate-100",
                         idx === 0 ? "border-b md:border-r" : "",
                         idx === 1 ? "border-b" : "",
                         idx === 2 ? "md:border-r" : ""
                       )}
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 shadow-inner">
                              <section.icon className={cn("w-5 h-5", section.color)} />
                           </div>
                           <span className="text-xs font-black uppercase tracking-widest text-slate-400">{section.label}</span>
                        </div>
                        
                        <ul className="space-y-3 flex-1">
                           {section.items.map((item, iIdx) => (
                             <li key={iIdx} className="flex items-start gap-3 group/item">
                                <span className={cn(
                                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 border",
                                  "bg-white border-slate-200 text-slate-400 group-hover/item:border-current transition-colors",
                                  section.color.replace('text-', 'text-opacity-100 ')
                                )}>
                                   {iIdx + 1}
                                </span>
                                <span className="text-[13px] font-bold text-slate-600 leading-tight">{item}</span>
                             </li>
                           ))}
                        </ul>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  )
}
