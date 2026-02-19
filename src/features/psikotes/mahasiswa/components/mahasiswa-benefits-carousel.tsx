'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import { MAHASISWA_BENEFITS } from '../../constants'
import { BenefitCard } from './benefit-card'
import { CarouselBackdrop } from './carousel-backdrop'

const TOTAL = MAHASISWA_BENEFITS.length

function getOffset(index: number, active: number) {
  let diff = index - active
  if (diff > TOTAL / 2) diff -= TOTAL
  if (diff < -TOTAL / 2) diff += TOTAL
  return diff
}

export function MahasiswaBenefitsCarousel() {
  const [active, setActive] = useState(0)

  const prev = useCallback(() => {
    setActive((i) =>
      i === 0 ? TOTAL - 1 : i - 1,
    )
  }, [])

  const next = useCallback(() => {
    setActive((i) =>
      i === TOTAL - 1 ? 0 : i + 1,
    )
  }, [])

  return (
    <section
      className={cn(
        'py-16 md:py-20 bg-background',
        'relative overflow-hidden',
      )}
    >
      <CarouselBackdrop />

      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-start',
            'justify-between gap-4 mb-2',
          )}
        >
          <div className="space-y-3">
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
                  'text-primary-600',
                  'fill-primary-600',
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
                'text-3xl md:text-4xl',
                'font-black tracking-tight',
                'text-slate-900',
              )}
            >
              Kenapa Harus{' '}
              <span
                className="text-primary-600 relative"
              >
                Bermoela?
                <svg
                  className={cn(
                    'absolute -bottom-2 left-0',
                    'w-full h-3',
                    'text-primary-300/50',
                  )}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </h2>
            <p
              className={cn(
                'text-slate-500 font-medium',
                'text-sm md:text-base max-w-lg',
              )}
            >
              Keunggulan yang membuat ribuan
              mahasiswa memilih Bermoela untuk
              mengembangkan potensi mereka.
            </p>
          </div>

          <p
            className={cn(
              'text-2xl font-black',
              'tabular-nums shrink-0 pt-12',
            )}
          >
            <span className="text-slate-900">
              {String(active + 1)
                .padStart(2, '0')}
            </span>
            <span className="text-slate-300">
              /{String(TOTAL).padStart(2, '0')}
            </span>
          </p>
        </div>
        <div className="h-px bg-slate-200 mb-10" />

        {/* Carousel */}
        <div
          className={cn(
            'relative flex items-center',
            'justify-center',
            'h-85 md:h-95',
          )}
        >
          {MAHASISWA_BENEFITS.map((item, i) => {
            const offset = getOffset(i, active)
            return (
              <BenefitCard
                key={item.title}
                item={item}
                offset={offset}
              />
            )
          })}

          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className={cn(
              'absolute left-2 md:left-8',
              'z-30 w-10 h-10 rounded-full',
              'bg-white/90 backdrop-blur-sm',
              'border border-slate-200',
              'flex items-center justify-center',
              'shadow-lg cursor-pointer',
              'hover:bg-white',
              'transition-colors',
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className={cn(
              'absolute right-2 md:right-8',
              'z-30 w-10 h-10 rounded-full',
              'bg-white/90 backdrop-blur-sm',
              'border border-slate-200',
              'flex items-center justify-center',
              'shadow-lg cursor-pointer',
              'hover:bg-white',
              'transition-colors',
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          className={cn(
            'flex items-center justify-center',
            'gap-2 mt-8',
          )}
        >
          {MAHASISWA_BENEFITS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full',
                'transition-all duration-500',
                'cursor-pointer',
                i === active
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-slate-300',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
