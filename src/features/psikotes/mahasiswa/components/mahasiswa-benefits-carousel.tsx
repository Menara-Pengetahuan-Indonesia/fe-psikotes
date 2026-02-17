'use client'

import { useState, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus,
  Hexagon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  MAHASISWA_BENEFITS,
} from '../../constants'

const THEME_BG: Record<string, string> = {
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  indigo: 'bg-indigo-500',
  rose: 'bg-rose-500',
}

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
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'opacity-[0.03]',
          'pointer-events-none',
          'mix-blend-multiply',
        )}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,'
            + '%3Csvg width=\'200\''
            + ' height=\'200\''
            + ' viewBox=\'0 0 200 200\''
            + ' xmlns=\'http://www.w3.org/'
            + '2000/svg\'%3E%3Cpath'
            + ' d=\'M0 100 C 20 80, 40 120,'
            + ' 60 100 S 100 80, 120 100'
            + ' S 160 120, 200 100\''
            + ' stroke=\'%23059669\''
            + ' fill=\'transparent\''
            + ' stroke-width=\'1\'/%3E'
            + '%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[10%] right-[6%]',
          'text-emerald-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[15%] left-[4%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-[25%] right-[12%]',
          'text-emerald-600/[0.07]',
          'w-20 h-20 rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-16 -right-16',
          'w-72 h-72 bg-emerald-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-20 -left-20',
          'w-64 h-64 bg-amber-100/20',
          'rounded-full blur-[80px]',
          'pointer-events-none',
        )}
      />

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
                'text-3xl md:text-4xl',
                'font-black tracking-tight',
                'text-slate-900',
              )}
            >
              Kenapa Harus{' '}
              <span
                className="text-emerald-600 relative"
              >
                Bermoela?
                <svg
                  className={cn(
                    'absolute -bottom-2 left-0',
                    'w-full h-3',
                    'text-emerald-300/50',
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
                  ? 'w-8 bg-emerald-600'
                  : 'w-2 bg-slate-300',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({
  item,
  offset,
}: {
  item: (typeof MAHASISWA_BENEFITS)[number]
  offset: number
}) {
  const Icon = item.icon
  const bg = THEME_BG[item.theme] ?? 'bg-emerald-600'
  const isCenter = offset === 0
  const isVisible = Math.abs(offset) <= 1

  return (
    <div
      className={cn(
        'absolute rounded-3xl overflow-hidden',
        bg,
      )}
      style={{
        width: isCenter
          ? 'clamp(280px, 40vw, 340px)'
          : 'clamp(220px, 32vw, 280px)',
        height: isCenter
          ? 'clamp(300px, 42vw, 360px)'
          : 'clamp(240px, 34vw, 290px)',
        transform: `translateX(${
          offset * 240
        }px) scale(${isCenter ? 1 : 0.92})`,
        opacity: isVisible ? (isCenter ? 1 : 0.8) : 0,
        zIndex: isCenter ? 20 : 10 - Math.abs(offset),
        pointerEvents: isVisible ? 'auto' : 'none',
        transition:
          'transform 600ms cubic-bezier(.4,0,.2,1),'
          + ' opacity 600ms cubic-bezier(.4,0,.2,1),'
          + ' width 600ms cubic-bezier(.4,0,.2,1),'
          + ' height 600ms cubic-bezier(.4,0,.2,1)',
        boxShadow: isCenter
          ? '0 25px 50px -12px rgba(0,0,0,.25)'
          : '0 10px 25px -5px rgba(0,0,0,.1)',
      }}
    >
      <div
        className={cn(
          'h-full flex flex-col',
          'justify-end p-6 md:p-8',
          'relative',
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            'absolute top-5 right-5',
            'w-12 h-12 rounded-2xl',
            'bg-white/20 backdrop-blur-sm',
            'flex items-center justify-center',
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-black text-white',
            'tracking-tight leading-tight',
            isCenter
              ? 'text-2xl md:text-3xl mb-3'
              : 'text-lg md:text-xl mb-2',
          )}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'text-white/80 text-sm',
            'leading-relaxed font-medium',
            'transition-opacity duration-500',
          )}
          style={{ opacity: isCenter ? 1 : 0 }}
        >
          {item.description}
        </p>
      </div>
    </div>
  )
}
