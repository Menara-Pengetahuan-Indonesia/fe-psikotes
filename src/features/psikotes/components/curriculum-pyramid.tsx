'use client'

import { useState } from 'react'
import {
  Sparkles,
  Star,
  Circle,
  Triangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { LEVELS } from './curriculum-levels'
import { PyramidLevelItem } from './pyramid-level-item'

export function CurriculumPyramid() {
  const [active, setActive] = useState<
    number | null
  >(null)

  return (
    <div className="bg-background">
      <section
        className={cn(
          'py-24 md:py-36 relative',
          'overflow-hidden bg-primary-950',
          'text-white',
          'rounded-t-[60px]',
          'md:rounded-t-[120px]',
          'rounded-b-[60px]',
          'md:rounded-b-[120px]',
        )}
      >
        {/* Horizontal accent lines */}
        {[30, 50, 70].map((top) => (
          <div
            key={top}
            className={cn(
              'absolute h-px',
              'bg-white/5',
              'left-[5%] right-[5%]',
            )}
            style={{ top: `${top}%` }}
          />
        ))}

        {/* White triangle */}
        <div
          className={cn(
            'absolute z-[1]',
            'left-1/2 -translate-x-1/2',
            'bottom-0',
            'w-[500px] h-[480px]',
            'md:w-[660px] md:h-[580px]',
          )}
          style={{
            clipPath: cn(
              'polygon(50% 0%,',
              '100% 100%, 0% 100%)',
            ),
            background: cn(
              'linear-gradient(180deg,',
              'rgba(255,255,255,0.06) 0%,',
              'rgba(255,255,255,0.02) 100%)',
            ),
          }}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-96 h-96 bg-primary-800/40',
            'rounded-full blur-[100px]',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-96 h-96 bg-primary-700/20',
            'rounded-full blur-[120px]',
            'translate-x-1/4',
            'translate-y-1/4',
            'pointer-events-none',
          )}
        />

        {/* Floating ornaments */}
        <Star
          className={cn(
            'absolute top-[14%]',
            'right-[8%]',
            'text-accent-400/20 w-8 h-8',
            'fill-accent-400/20',
          )}
        />
        <Sparkles
          className={cn(
            'absolute bottom-[18%]',
            'left-[6%] text-primary-400/20',
            'w-10 h-10',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[12%]',
            'right-[12%]',
            'text-white/5 w-12 h-12',
          )}
        />
        <Triangle
          className={cn(
            'absolute top-[35%]',
            'left-[5%]',
            'text-primary-500/10 w-8 h-8',
            'fill-primary-500/10',
            '-rotate-12',
          )}
        />

        <div
          className={cn(
            'max-w-3xl mx-auto px-6',
            'relative z-10',
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'text-center mb-16 space-y-4',
            )}
          >
            <div
              className={cn(
                'inline-flex items-center',
                'gap-2 px-4 py-1.5',
                'rounded-full bg-white/10',
                'border border-white/10',
                'shadow-sm mb-2',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5',
                  'text-accent-400',
                  'fill-accent-400',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-primary-200',
                  'uppercase',
                )}
              >
                Growth Framework
              </span>
            </div>
            <h2
              className={cn(
                'text-3xl md:text-5xl',
                'font-black tracking-tight',
                'drop-shadow-md',
              )}
            >
              Kurikulum{' '}
              <span
                className={cn(
                  'text-accent-400',
                  'relative',
                )}
              >
                Pertumbuhan
                <svg
                  className={cn(
                    'absolute -bottom-2',
                    'left-0',
                    'w-full h-3',
                    'text-accent-400/30',
                  )}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d={cn(
                      'M0 5 Q 25 0,',
                      '50 5 T 100 5',
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h2>
            <p
              className={cn(
                'text-primary-200/70',
                'text-lg max-w-2xl mx-auto',
                'font-medium leading-relaxed',
              )}
            >
              Lima tingkatan pengembangan diri
              yang dirancang sistematis dari
              fondasi internal hingga dampak
              eksternal.
            </p>
          </div>

          {/* Pyramid */}
          <div
            className={cn(
              'flex flex-col',
              'items-center gap-3',
            )}
          >
            {LEVELS.slice()
              .reverse()
              .map((item) => (
                <PyramidLevelItem
                  key={item.level}
                  item={item}
                  isActive={
                    active === item.level
                  }
                  onToggle={() =>
                    setActive(
                      active === item.level
                        ? null
                        : item.level,
                    )
                  }
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
