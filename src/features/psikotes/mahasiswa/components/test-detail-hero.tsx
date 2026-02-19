import {
  Clock,
  Users,
  Sparkles,
  Plus,
  Hexagon,
  ShieldCheck,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import type { TestDetailProps } from './test-detail'

export function DetailHero({
  title,
  badge,
  description,
  duration,
  participants,
}: Pick<
  TestDetailProps,
  | 'title'
  | 'badge'
  | 'description'
  | 'duration'
  | 'participants'
>) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        'bg-linear-to-b from-primary-800',
        'via-primary-700 to-primary-500',
        'text-white',
        'pt-28 pb-16 md:pt-36 md:pb-24',
      )}
    >
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'opacity-[0.05]',
          'pointer-events-none',
          'mix-blend-overlay',
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
            + ' stroke=\'white\''
            + ' fill=\'transparent\''
            + ' stroke-width=\'1\'/%3E'
            + '%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[15%] left-[8%]',
          'text-primary-400/20 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-[12%] right-[8%]',
          'text-white/5 w-24 h-24',
          '-rotate-12 pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute top-0 left-0',
          'w-96 h-96 bg-primary-500/20',
          'rounded-full blur-[120px]',
          '-translate-x-1/2 -translate-y-1/2',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 right-0',
          'w-80 h-80 bg-accent-500/10',
          'rounded-full blur-[100px]',
          'translate-x-1/4 translate-y-1/4',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-2',
            'px-4 py-1.5 rounded-full',
            'bg-white/10 border border-white/10',
            'backdrop-blur-md mb-6',
          )}
        >
          <Sparkles
            className={cn(
              'w-3.5 h-3.5',
              'text-accent-300 fill-accent-300',
            )}
          />
          <span
            className={cn(
              'text-[10px] font-black',
              'tracking-[0.2em]',
              'text-primary-100 uppercase',
            )}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1
          className={cn(
            'text-4xl md:text-6xl',
            'font-black leading-tight',
            'mb-4 max-w-4xl',
            'tracking-tight drop-shadow-lg',
          )}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className={cn(
            'text-lg text-primary-100/80',
            'leading-relaxed font-medium',
            'max-w-2xl mb-8',
          )}
        >
          {description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-4">
          <div
            className={cn(
              'flex items-center gap-3',
              'bg-white/5 backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-white/10',
            )}
          >
            <Clock
              className="w-5 h-5 text-accent-300"
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-[10px] font-black',
                  'uppercase tracking-widest',
                  'text-primary-200/70',
                )}
              >
                Durasi
              </span>
              <span className="text-sm font-bold">
                {duration}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'flex items-center gap-3',
              'bg-white/5 backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-white/10',
            )}
          >
            <Users
              className="w-5 h-5 text-sky-300"
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-[10px] font-black',
                  'uppercase tracking-widest',
                  'text-primary-200/70',
                )}
              >
                Peserta
              </span>
              <span className="text-sm font-bold">
                {participants}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'flex items-center gap-3',
              'bg-primary-800/50',
              'backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-primary-700/30',
            )}
          >
            <ShieldCheck
              className={cn(
                'w-5 h-5 text-primary-400',
              )}
            />
            <span
              className={cn(
                'text-sm font-black italic',
                'uppercase tracking-tighter',
              )}
            >
              Verified Result
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
