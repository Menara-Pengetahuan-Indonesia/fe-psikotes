'use client'

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Plus,
  Circle,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PELATIHAN_FAQS } from '../constants'

export function PelatihanFaq() {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(0)

  return (
    <section
      className={cn(
        'py-24 md:py-36 bg-background',
        'relative overflow-hidden',
      )}
    >
      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[8%] left-[6%]',
          'text-pelatihan-800/20 w-10 h-10',
          'rotate-45 pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute top-[15%] right-[8%]',
          'text-accent-500/20 w-14 h-14',
          'pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[10%] left-[10%]',
          'text-pelatihan-600/20 w-8 h-8',
          'rotate-12 pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-[20%] right-[5%]',
          'w-20 h-20 rounded-full',
          'border-2 border-pelatihan-800/15',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-4xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'bg-white border border-slate-200',
              'shadow-sm mb-2',
            )}
          >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5 text-pelatihan-600',
                'fill-pelatihan-600',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-slate-500 uppercase',
              )}
            >
              Help Center
            </span>
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl',
              'font-black tracking-tight',
              'text-slate-900 leading-tight',
            )}
          >
            Pertanyaan{' '}
            <span
              className="text-pelatihan-600 relative"
            >
              Umum
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3',
                  'text-pelatihan-500/30',
                )}
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {PELATIHAN_FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className={cn(
                  'bg-white rounded-3xl',
                  'border transition-all',
                  'duration-500 overflow-hidden',
                  isOpen
                    ? 'border-pelatihan-500'
                      + ' shadow-xl'
                      + ' shadow-pelatihan-900/5'
                      + ' ring-1'
                      + ' ring-pelatihan-500/10'
                    : 'border-slate-100'
                      + ' shadow-lg'
                      + ' shadow-stone-200/50'
                      + ' hover:border-slate-200',
                )}
              >
                <button
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : i,
                    )
                  }
                  className={cn(
                    'w-full flex cursor-pointer',
                    'items-center justify-between',
                    'p-6 md:p-8 text-left',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl',
                        'flex items-center',
                        'justify-center',
                        'transition-colors',
                        isOpen
                          ? 'bg-pelatihan-600'
                            + ' text-white'
                          : 'bg-slate-50'
                            + ' text-slate-400',
                      )}
                    >
                      <HelpCircle
                        className="h-5 w-5"
                      />
                    </div>
                    <h3
                      className={cn(
                        'font-black text-lg',
                        'transition-colors',
                        isOpen
                          ? 'text-slate-900'
                          : 'text-slate-700',
                      )}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'ml-4 shrink-0',
                      'rounded-full p-2',
                      'transition-all',
                      isOpen
                        ? 'bg-pelatihan-50'
                          + ' text-pelatihan-600'
                        : 'bg-slate-50'
                          + ' text-slate-300',
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        'h-5 w-5',
                        'transition-transform',
                        'duration-500',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </span>
                </button>

                <div
                  className={cn(
                    'grid transition-all',
                    'duration-500 ease-in-out',
                    isOpen
                      ? 'grid-rows-[1fr]'
                        + ' opacity-100'
                      : 'grid-rows-[0fr]'
                        + ' opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        'px-6 md:px-8',
                        'pb-8 pt-0 ml-14',
                      )}
                    >
                      <p
                        className={cn(
                          'text-slate-500',
                          'leading-relaxed',
                          'font-medium text-base',
                        )}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
