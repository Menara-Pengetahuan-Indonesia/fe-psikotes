import type { CSSProperties } from 'react'
import { Sparkles, Plus, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Pill } from './category-showcase-constants'
import {
  PILL_COLORS,
  ROWS,
  MARQUEE_CSS,
  SEP_ICONS,
} from './category-showcase-constants'

function MarqueeRow({
  items,
  direction = 'left',
  duration = 30,
}: {
  items: Pill[]
  direction?: 'left' | 'right'
  duration?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={cn(
          'flex items-center gap-4',
          'w-max marquee-track',
          `marquee-${direction}`,
        )}
        style={
          {
            '--duration': `${duration}s`,
          } as CSSProperties
        }
      >
        {doubled.flatMap((item, i) => {
          const Icon = SEP_ICONS[i % 2]
          return [
            <span
              key={`p-${i}`}
              className={cn(
                'px-8 py-4 rounded-full',
                'font-black text-base',
                'whitespace-nowrap shadow-sm',
                'select-none',
                PILL_COLORS[item.color],
              )}
            >
              {item.label}
            </span>,
            <div
              key={`s-${i}`}
              className={cn(
                'w-12 h-12 rounded-full',
                'bg-white shrink-0 shadow-sm',
                'flex items-center',
                'justify-center',
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6',
                  'text-primary-600',
                )}
              />
            </div>,
          ]
        })}
      </div>
    </div>
  )
}

export function CategoryShowcase() {
  return (
    <section
      className={cn(
        'py-16 md:py-20 bg-background',
        'relative overflow-hidden',
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: MARQUEE_CSS,
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[10%] right-[7%]',
          'text-primary-800/20 w-10 h-10',
          'rotate-12 pointer-events-none',
        )}
      />
      <Star
        className={cn(
          'absolute bottom-[18%] left-[4%]',
          'text-accent-500/25 w-8 h-8',
          'fill-accent-500/25 -rotate-12',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute top-[30%] left-[12%]',
          'w-16 h-16 rounded-full',
          'border-2 border-primary-800/15',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        <div
          className="text-center mb-10 space-y-4"
        >
          <div
            className={cn(
              'inline-flex items-center',
              'gap-2 px-4 py-1.5 rounded-full',
              'bg-white border border-slate-200',
              'shadow-sm mb-2',
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
              Words of Growth
            </span>
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl',
              'font-black tracking-tight',
              'text-slate-900 leading-tight',
            )}
          >
            Tumbuh Bersama{' '}
            <span
              className="text-primary-600 relative"
            >
              BERMOELA
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3',
                  'text-primary-500/30',
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

          <p
            className={cn(
              'text-lg text-slate-500',
              'max-w-2xl mx-auto font-medium',
            )}
          >
            Setiap langkah kecil adalah
            investasi untuk versi terbaik
            dirimu.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-3">
        <MarqueeRow
          items={ROWS[0]}
          direction="left"
          duration={25}
        />
        <MarqueeRow
          items={ROWS[1]}
          direction="right"
          duration={30}
        />
        <MarqueeRow
          items={ROWS[2]}
          direction="left"
          duration={28}
        />
      </div>
    </section>
  )
}
