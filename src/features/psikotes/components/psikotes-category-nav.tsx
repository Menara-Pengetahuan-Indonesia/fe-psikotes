'use client'

import { useState } from 'react'
import {
  Target,
  Zap,
  CheckCircle2,
  Box,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_CATEGORIES } from '../constants'

export function PsikotesCategoryNav() {
  const [activeTab, setActiveTab] = useState(NAV_CATEGORIES[0].id)
  const [activeProblemIndex, setActiveProblemIndex] = useState(0)
  
  const activeCategory = NAV_CATEGORIES.find(c => c.id === activeTab) || NAV_CATEGORIES[0]
  const activeItem = activeCategory.items[activeProblemIndex] || activeCategory.items[0]

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    setActiveProblemIndex(0)
  }

  return (
    <section id="pemetaan" className="py-16 pb-12 relative overflow-hidden bg-background">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 shadow-sm">
             <Target className="w-4 h-4 text-primary-600" />
             <span className="text-xs font-black text-primary-700 uppercase tracking-[0.2em]">Pilih Titik Mulamu</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight leading-none">
            Ke Mana Kamu Ingin <span className="text-primary-600 italic">Melangkah?</span>
          </h2>
          <p className="text-secondary-700/70 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Setiap perjalanan <span className="text-secondary-900 font-bold italic">&quot;The New You&quot;</span> bermula dari kesadaran di area yang paling penting bagimu saat ini.
          </p>
        </div>

        {/* 1. Category Selection Tabs - REVERTED TO PREVIOUS DETAILED DESIGN */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-col md:flex-row items-center p-2 bg-white/60 border border-slate-200/50 rounded-[2.5rem] shadow-soft-xl">
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
                  onClick={() => handleTabChange(cat.id)}
                  className={cn(
                    "relative flex items-center gap-4 px-6 py-4 rounded-[2rem] transition-colors duration-300 border border-transparent w-full md:w-auto",
                    isActive 
                      ? cn("shadow-lg scale-[1.02]", activeBg)
                      : "hover:bg-slate-50/80 text-slate-500"
                  )}
                >
                  {/* Category Icon Box */}
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

        {/* 2. Transformation Path Container */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden relative group/card">
           
           {/* Desktop Header Row */}
           <div className="hidden lg:grid grid-cols-12 bg-slate-50 border-b border-slate-100">
              <div className="col-span-3 p-6 flex flex-col items-center justify-center gap-1 border-r border-slate-200/60">
                 <Zap className="w-5 h-5 text-rose-500 fill-rose-500" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">01. Masalah</span>
              </div>
              <div className="col-span-3 p-6 flex flex-col items-center justify-center gap-1 border-r border-slate-200/60">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">02. Solusi</span>
              </div>
              <div className="col-span-3 p-6 flex flex-col items-center justify-center gap-1 border-r border-slate-200/60">
                 <TrendingUp className="w-4 h-4 text-amber-600" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">03. Benefit</span>
              </div>
              <div className="col-span-3 p-6 flex flex-col items-center justify-center gap-1">
                 <Box className="w-5 h-5 text-primary-600" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-600">04. Produk</span>
              </div>
           </div>

           {/* The Interactive Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative min-h-[500px]">
              
              {/* FIXED CENTER ARROWS (Desktop Only) - Higher Z-Index to stay on top */}
              <div className="hidden lg:flex absolute left-[25%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-slate-100 rounded-full items-center justify-center z-50 text-emerald-500 shadow-xl shadow-slate-200/50">
                 <ChevronRight className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="hidden lg:flex absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-slate-100 rounded-full items-center justify-center z-50 text-amber-500 shadow-xl shadow-slate-200/50">
                 <ChevronRight className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="hidden lg:flex absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-slate-100 rounded-full items-center justify-center z-50 text-primary-50 shadow-xl shadow-slate-200/50 overflow-hidden">
                 <div className="absolute inset-0 bg-primary-600" />
                 <ChevronRight className="w-6 h-6 stroke-[3] text-white relative z-10" />
              </div>

              {/* COL 1: Masalah (Selector) */}
              <div className="col-span-1 lg:col-span-3 bg-slate-50/80 p-8 lg:p-10 border-r border-slate-200 flex flex-col justify-center items-center gap-3">
                 <div className="lg:hidden flex items-center gap-2 mb-4">
                    <Zap className="w-3 h-3 text-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Masalahmu</span>
                 </div>
                 {activeCategory.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveProblemIndex(idx)}
                      className={cn(
                        "w-full text-center lg:text-left p-4 px-5 rounded-2xl transition-all duration-300 border-2 flex flex-col lg:flex-row gap-3 items-center group/btn relative",
                        activeProblemIndex === idx 
                          ? "bg-white border-primary-500 shadow-md scale-[1.02] z-10" 
                          : "bg-white/20 border-transparent hover:border-slate-200 opacity-60 hover:opacity-100"
                      )}
                    >
                       <span className={cn("text-xl font-black italic transition-colors", activeProblemIndex === idx ? "text-primary-500" : "text-slate-300")}>
                          0{idx + 1}
                       </span>
                       <span className={cn("text-[13px] font-bold leading-tight transition-colors", activeProblemIndex === idx ? "text-slate-900" : "text-slate-400 group-hover/btn:text-slate-600")}>
                          {item.problem}
                       </span>
                    </button>
                 ))}
              </div>

              {/* COL 2: Solusi (Centered) */}
              <div className="col-span-1 lg:col-span-3 p-10 lg:p-14 border-r border-slate-100 flex flex-col justify-center items-center text-center relative bg-white overflow-hidden" key={`sol-${activeProblemIndex}`}>
                 <CheckCircle2 className="absolute -right-6 -bottom-6 w-32 h-32 text-emerald-500/5 -rotate-12" />
                 
                 <div className="lg:hidden flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solusi:</span>
                 </div>
                 <p className="text-slate-700 font-bold text-lg md:text-xl leading-relaxed italic relative z-10 animate-in slide-in-from-bottom-2 duration-500">
                    &quot;{activeItem.solution}&quot;
                 </p>
              </div>

              {/* COL 3: Benefit (Centered) */}
              <div className="col-span-1 lg:col-span-3 p-10 lg:p-14 border-r border-slate-100 flex flex-col justify-center items-center text-center relative bg-amber-50/20 overflow-hidden" key={`ben-${activeProblemIndex}`}>
                 <TrendingUp className="absolute -right-6 -bottom-6 w-32 h-32 text-amber-500/10 rotate-12" />

                 <div className="lg:hidden flex items-center gap-2 mb-4 justify-center">
                    <TrendingUp className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target:</span>
                 </div>
                 <p className="text-2xl md:text-3xl font-black text-amber-700 tracking-tighter leading-tight relative z-10 animate-in slide-in-from-bottom-2 duration-500">
                    {activeItem.benefit === '-' ? <span className="opacity-40 italic text-xl font-medium">Berdamai & Tumbuh</span> : activeItem.benefit}
                 </p>
              </div>

              {/* COL 4: Produk (Centered & Colored) */}
              <div className="col-span-1 lg:col-span-3 p-10 lg:p-14 bg-primary-600 flex flex-col justify-center items-center text-center text-white relative overflow-hidden" key={`prod-${activeProblemIndex}`}>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                 <Box className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 -rotate-12" />
                 
                 <div className="lg:hidden flex items-center gap-2 mb-4 justify-center">
                    <Box className="w-3 h-3 text-white/60" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Rekomendasi:</span>
                 </div>
                 <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight relative z-10 animate-in slide-in-from-right-4 duration-700">
                    {activeItem.product}
                 </h4>
              </div>

           </div>
        </div>

        {/* Footer Tagline */}
        <div className="mt-20 text-center">
           <p className="text-slate-400 text-xs font-black uppercase tracking-[0.5em] leading-relaxed">
              Titik mula perjalananmu untuk tumbuh dan menemukan kembali dirimu.
           </p>
        </div>

      </div>
    </section>
  )
}
