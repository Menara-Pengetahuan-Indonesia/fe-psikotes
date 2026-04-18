'use client'

import { useState } from 'react'
import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRANSFORMATION_STAGES } from '../constants'

const QUADRANT_BG = [
  'bg-amber-50/60',
  'bg-emerald-50/60',
  'bg-sky-50/50',
  'bg-amber-50/40',
]

const QUADRANT_BORDER = [
  'border-amber-100',
  'border-emerald-100',
  'border-sky-100',
  'border-amber-100',
]

const BULLET_COLOR = [
  'bg-amber-100 text-amber-700 border-amber-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-sky-100 text-sky-700 border-sky-200',
  'bg-amber-100 text-amber-700 border-amber-200',
]

const HEADER_ICON_BG = [
  'bg-amber-100',
  'bg-emerald-100',
  'bg-sky-100',
  'bg-amber-100',
]

export function PsikotesStage() {
  const [activeStageId, setActiveStageId] = useState(TRANSFORMATION_STAGES[0].id)
  const activeStage = TRANSFORMATION_STAGES.find(s => s.id === activeStageId) || TRANSFORMATION_STAGES[0]

  return (
    <section id="transformation-stages" className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em]">Tahapan Transformasi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
            Pilih Fase <span className="text-emerald-500 italic">Hidupmu Saat Ini.</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Setiap tahapan usia memiliki tantangan unik. Temukan bagaimana kami mendampingimu melangkah lebih jauh di setiap fasenya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: Stage selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {TRANSFORMATION_STAGES.map((stage) => {
              const isActive = activeStageId === stage.id
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={cn(
                    'w-full text-left px-6 py-5 rounded-2xl transition-colors duration-300 border-2 flex items-center gap-5 group',
                    isActive
                      ? 'bg-white border-sky-400 shadow-lg shadow-sky-100/60'
                      : 'bg-white/50 border-gray-100 hover:bg-white hover:border-gray-200 opacity-60 hover:opacity-90'
                  )}
                >
                  {/* Age badge + number */}
                  <div className="shrink-0 flex flex-col items-center gap-1 w-14">
                    <span className={cn(
                      'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors',
                      isActive ? cn(stage.colors.accent, 'text-white') : 'bg-gray-100 text-gray-400'
                    )}>
                      {stage.ageRange}
                    </span>
                    <span className={cn(
                      'text-3xl font-black italic leading-none transition-colors',
                      isActive ? 'text-emerald-200' : 'text-gray-100'
                    )}>
                      0{stage.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className={cn(
                      'text-base font-black tracking-tight transition-colors',
                      isActive ? 'text-gray-900' : 'text-gray-400'
                    )}>
                      {stage.title}
                    </h3>
                    <p className={cn(
                      'text-xs font-medium leading-relaxed transition-colors line-clamp-2',
                      isActive ? 'text-gray-500' : 'text-gray-300'
                    )}>
                      {stage.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* RIGHT: 2x2 quadrant */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {activeStage.sections.map((section, idx) => (
                  <div
                    key={`${activeStageId}-${idx}`}
                    className={cn(
                      'p-8 flex flex-col gap-5 border transition-colors',
                      QUADRANT_BG[idx],
                      QUADRANT_BORDER[idx],
                      idx === 0 ? 'md:border-r md:border-b' : '',
                      idx === 1 ? 'border-l-0 md:border-b' : '',
                      idx === 2 ? 'md:border-r md:border-t-0' : '',
                      idx === 3 ? 'border-l-0 md:border-t-0' : '',
                    )}
                  >
                    {/* Section header */}
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                        HEADER_ICON_BG[idx]
                      )}>
                        <section.icon className={cn('w-4.5 h-4.5', section.color)} />
                      </div>
                      <span className={cn(
                        'text-[11px] font-black uppercase tracking-widest',
                        section.color
                      )}>
                        {section.label}
                      </span>
                    </div>

                    {/* Items */}
                    <ul className="space-y-2.5 flex-1">
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5">
                          <span className={cn(
                            'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5 border',
                            BULLET_COLOR[idx]
                          )}>
                            {iIdx + 1}
                          </span>
                          <span className="text-[13px] font-semibold text-gray-700 leading-snug">{item}</span>
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
