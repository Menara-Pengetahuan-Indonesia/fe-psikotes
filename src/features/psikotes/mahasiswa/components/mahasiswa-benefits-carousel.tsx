'use client'

import { useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  MAHASISWA_BENEFITS,
} from '../../constants'

const THEMES: Record<string, string> = {
  emerald:
    'bg-emerald-50/30 border-emerald-100'
    + ' hover:border-emerald-500',
  amber:
    'bg-amber-50/30 border-amber-100'
    + ' hover:border-amber-500',
  sky:
    'bg-sky-50/30 border-sky-100'
    + ' hover:border-sky-500',
  indigo:
    'bg-indigo-50/30 border-indigo-100'
    + ' hover:border-indigo-500',
  rose:
    'bg-rose-50/30 border-rose-100'
    + ' hover:border-rose-500',
}

export function MahasiswaBenefitsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      className={cn(
        'py-24 md:py-36 bg-[#faf5e4]',
        'relative overflow-hidden',
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            'flex flex-col md:flex-row',
            'md:items-end justify-between',
            'gap-6 mb-12',
          )}
        >
          <div className="space-y-4">
            <div
              className={cn(
                'inline-flex items-center',
                'gap-2 px-4 py-1.5',
                'rounded-full bg-white',
                'border border-slate-200',
                'shadow-sm',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5',
                  'text-emerald-600',
                  'fill-emerald-600',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-slate-500 uppercase',
                )}
              >
                Student Benefits
              </span>
            </div>

            <h2
              className={cn(
                'text-4xl md:text-5xl',
                'font-black tracking-tight',
                'text-slate-900',
              )}
            >
              Kenapa Harus{' '}
              <span
                className="text-emerald-600"
              >
                Bermoela?
              </span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className={cn(
                'w-12 h-12 rounded-2xl',
                'bg-white border',
                'border-slate-200',
                'flex items-center',
                'justify-center',
                'hover:bg-emerald-600',
                'hover:text-white',
                'hover:border-emerald-600',
                'transition-all duration-300',
                'shadow-lg shadow-stone-200/50',
                'cursor-pointer',
              )}
            >
              <ChevronLeft
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className={cn(
                'w-12 h-12 rounded-2xl',
                'bg-white border',
                'border-slate-200',
                'flex items-center',
                'justify-center',
                'hover:bg-emerald-600',
                'hover:text-white',
                'hover:border-emerald-600',
                'transition-all duration-300',
                'shadow-lg shadow-stone-200/50',
                'cursor-pointer',
              )}
            >
              <ChevronRight
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className={cn(
            'flex gap-6 overflow-x-auto',
            'snap-x snap-mandatory',
            'scrollbar-hide pb-4 -mx-6 px-6',
          )}
        >
          {MAHASISWA_BENEFITS.map((item) => {
            const Icon = item.icon
            const themeClass =
              THEMES[item.theme] ?? ''

            return (
              <div
                key={item.title}
                className={cn(
                  'group min-w-[280px]',
                  'md:min-w-[300px]',
                  'snap-start',
                  'bg-white p-8',
                  'rounded-[2.5rem] border',
                  'transition-all duration-500',
                  'hover:-translate-y-1.5',
                  'shadow-xl shadow-stone-200/50',
                  'hover:shadow-2xl shrink-0',
                  themeClass,
                )}
              >
                <div
                  className={cn(
                    'w-14 h-14 bg-white',
                    'rounded-2xl flex',
                    'items-center justify-center',
                    'mb-6 shadow-lg',
                    'border border-slate-50',
                    'group-hover:scale-110',
                    'transition-transform',
                    'duration-500',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-7 h-7 text-slate-900',
                      'stroke-[1.5]',
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    'text-xl font-black',
                    'text-slate-900 mb-3',
                    'tracking-tight',
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    'text-slate-500 text-sm',
                    'leading-relaxed',
                    'font-medium',
                  )}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
