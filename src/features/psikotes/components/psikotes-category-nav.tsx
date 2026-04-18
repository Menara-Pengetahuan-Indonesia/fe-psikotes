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
    <section
      id="pemetaan"
      className="py-20 pb-16 relative overflow-hidden -mt-10 rounded-t-[3rem] md:rounded-t-[4rem]"
      style={{ background: 'linear-gradient(160deg, #0d3d2e 0%, #0f4d38 40%, #0c3d2e 100%)' }}
    >

      {/* bg blobs */}

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-black text-amber-300 uppercase tracking-[0.2em]">Pilih Titik Mulamu</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
            Ke Mana Kamu Ingin <span className="text-amber-400 italic">Melangkah?</span>
          </h2>
          <p className="text-emerald-100/70 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Setiap perjalanan <span className="text-white font-bold italic">&quot;The New You&quot;</span> bermula dari kesadaran di area yang paling penting bagimu saat ini.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-col md:flex-row items-stretch md:items-center p-1.5 bg-white rounded-2xl shadow-md border border-gray-100 gap-1">
            {NAV_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id

              const activeBg =
                cat.id === 'personal'     ? 'bg-indigo-50 border-indigo-200' :
                cat.id === 'relationship' ? 'bg-rose-50 border-rose-200' :
                'bg-amber-50 border-amber-200'

              const activeText =
                cat.id === 'personal'     ? 'text-indigo-700' :
                cat.id === 'relationship' ? 'text-rose-700' :
                'text-amber-700'

              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3 rounded-xl transition-colors duration-200 border',
                    isActive
                      ? cn('shadow-sm', activeBg)
                      : 'border-transparent hover:bg-gray-50 text-gray-400'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                    isActive ? cat.theme : 'bg-gray-100 text-gray-400'
                  )}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className={cn(
                      'font-black text-sm leading-none mb-0.5 transition-colors',
                      isActive ? activeText : 'text-gray-400'
                    )}>
                      {cat.title}
                    </p>
                    <p className={cn(
                      'text-[10px] font-black uppercase tracking-widest transition-colors',
                      isActive ? activeText.replace('700', '400') : 'text-gray-300'
                    )}>
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-12 border-b border-gray-100">
            <div className="col-span-3 px-6 py-4 flex items-center gap-2 border-r border-gray-100 bg-amber-50/60">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-amber-600">01. Masalah</span>
            </div>
            <div className="col-span-3 px-6 py-4 flex items-center gap-2 border-r border-gray-100 bg-emerald-50/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-600">02. Solusi</span>
            </div>
            <div className="col-span-3 px-6 py-4 flex items-center gap-2 border-r border-gray-100 bg-sky-50/60">
              <TrendingUp className="w-4 h-4 text-sky-500" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-sky-600">03. Apa yang kamu dapatkan</span>
            </div>
            <div className="col-span-3 px-6 py-4 flex items-center gap-2 bg-emerald-50/60">
              <Box className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-700">04. Prioritas kamu</span>
            </div>
          </div>

          {/* Content row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative min-h-[460px]">

            {/* Arrow connectors */}
            <div className="hidden lg:flex absolute left-[25%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-amber-200 rounded-full items-center justify-center z-50 shadow-md">
              <ChevronRight className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            </div>
            <div className="hidden lg:flex absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-emerald-200 rounded-full items-center justify-center z-50 shadow-md">
              <ChevronRight className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            </div>
            <div className="hidden lg:flex absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full items-center justify-center z-50 shadow-md shadow-emerald-200">
              <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
            </div>

            {/* COL 1: Masalah */}
            <div className="col-span-1 lg:col-span-3 bg-amber-50/40 p-6 lg:p-8 border-r border-gray-100 flex flex-col justify-center gap-2.5">
              <div className="lg:hidden flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pilih Masalahmu</span>
              </div>
              {activeCategory.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProblemIndex(idx)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 border flex items-center gap-3',
                    activeProblemIndex === idx
                      ? 'bg-white border-amber-300 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-white/70 hover:border-gray-100 opacity-50 hover:opacity-80'
                  )}
                >
                  <span className={cn(
                    'text-base font-black italic shrink-0 w-7 transition-colors',
                    activeProblemIndex === idx ? 'text-amber-400' : 'text-gray-200'
                  )}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={cn(
                    'text-[12px] font-semibold leading-snug transition-colors',
                    activeProblemIndex === idx ? 'text-gray-800' : 'text-gray-400'
                  )}>
                    {item.problem}
                  </span>
                </button>
              ))}
            </div>

            {/* COL 2: Solusi */}
            <div
              key={`sol-${activeProblemIndex}`}
              className="col-span-1 lg:col-span-3 p-6 lg:p-8 border-r border-gray-100 flex flex-col justify-center relative bg-emerald-50/30 overflow-hidden"
            >
              <CheckCircle2 className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/5" />
              <div className="lg:hidden flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Solusi:</span>
              </div>
              {typeof activeItem.solution === 'string' ? (
                <p className="text-gray-700 font-bold text-lg leading-relaxed italic text-center">
                  &quot;{activeItem.solution}&quot;
                </p>
              ) : (
                <ol className="space-y-3">
                  {activeItem.solution.stages.map((stage, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-black text-gray-800 text-xs leading-tight">{stage.title}</p>
                        <p className="text-gray-500 text-[11px] leading-snug mt-0.5">{stage.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* COL 3: Benefit */}
            <div
              key={`ben-${activeProblemIndex}`}
              className="col-span-1 lg:col-span-3 p-6 lg:p-8 border-r border-gray-100 flex flex-col justify-center relative bg-sky-50/30 overflow-hidden"
            >
              <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-sky-400/10 rotate-12" />
              <div className="lg:hidden flex items-center gap-2 mb-3">
                <TrendingUp className="w-3 h-3 text-sky-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target:</span>
              </div>
              {typeof activeItem.benefit === 'string' ? (
                <p className="text-3xl md:text-4xl font-black text-sky-600 tracking-tighter leading-tight text-center">
                  {activeItem.benefit === '-'
                    ? <span className="opacity-40 italic text-xl font-medium">Berdamai & Tumbuh</span>
                    : activeItem.benefit}
                </p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1.5">Sebelum</p>
                    <ul className="space-y-1">
                      {activeItem.benefit.before.map((item, i) => (
                        <li key={i} className="text-xs text-gray-500 leading-snug flex gap-1.5">
                          <span className="text-amber-400 shrink-0">×</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-sky-100 pt-2.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1.5">Sesudah</p>
                    <ul className="space-y-1">
                      {activeItem.benefit.after.map((item, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-snug flex gap-1.5 font-semibold">
                          <span className="text-emerald-500 shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* COL 4: Produk */}
            <div
              key={`prod-${activeProblemIndex}`}
              className="col-span-1 lg:col-span-3 p-8 lg:p-10 bg-gradient-to-br from-emerald-500 to-emerald-700 flex flex-col justify-center items-center text-center text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <Box className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 -rotate-12" />
              <div className="lg:hidden flex items-center gap-2 mb-3">
                <Box className="w-3 h-3 text-white/60" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Rekomendasi:</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                {activeItem.product || <span className="text-white/30 italic text-base font-medium">—</span>}
              </h4>
            </div>

          </div>
        </div>

        {/* Footer tagline */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.5em]">
            Titik mula perjalananmu untuk tumbuh dan menemukan kembali dirimu.
          </p>
        </div>

      </div>
    </section>
  )
}
