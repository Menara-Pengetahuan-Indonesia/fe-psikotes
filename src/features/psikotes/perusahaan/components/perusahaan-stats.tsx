import {
  Plus,
  Circle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { PERUSAHAAN_STATS } from '../../constants'

export function PerusahaanStats() {
  return (
    <div className="bg-background">
      <section
        className={cn(
          'py-16 md:py-20 relative',
          'overflow-hidden bg-emerald-950',
          'text-white',
          'rounded-t-[40px] md:rounded-t-[80px]',
          'rounded-b-[40px] md:rounded-b-[80px]',
        )}
      >
        {/* Topographic Pattern */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.05]',
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
            'absolute top-[15%] left-[5%]',
            'text-emerald-400/20 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Circle
          className={cn(
            'absolute top-[40%] right-[8%]',
            'text-amber-400/20 w-16 h-16',
            'animate-float-slow',
          )}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-96 h-96 bg-emerald-800/30',
            'rounded-full blur-[100px]',
            '-translate-x-1/2 -translate-y-1/2',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-125 h-125 bg-amber-500/10',
            'rounded-full blur-[120px]',
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
          {/* Header */}
          <div
            className={cn(
              'text-center mb-10 space-y-3',
            )}
          >
            <div
              className={cn(
                'inline-flex items-center',
                'gap-2 px-4 py-1.5',
                'rounded-full bg-white/10',
                'border border-white/10',
                'backdrop-blur-md mb-2',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5',
                  'text-amber-300 fill-amber-300',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-emerald-100 uppercase',
                )}
              >
                Proven Results
              </span>
            </div>

            <h2
              className={cn(
                'text-3xl md:text-5xl',
                'font-black tracking-tight',
                'drop-shadow-md',
              )}
            >
              Dipercaya oleh{' '}
              <span className="text-amber-300 relative">
                Ratusan Perusahaan
                <svg
                  className={cn(
                    'absolute -bottom-2 left-0',
                    'w-full h-3',
                    'text-amber-400/40',
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
                'text-emerald-100 font-medium',
                'max-w-xl mx-auto',
              )}
            >
              Data nyata dari klien korporat
              yang telah menggunakan layanan kami.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className={cn(
              'grid grid-cols-1',
              'md:grid-cols-3 gap-8',
            )}
          >
            {PERUSAHAAN_STATS.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  'text-center p-8',
                  'bg-white/5 backdrop-blur-md',
                  'rounded-[2.5rem]',
                  'border border-white/10',
                  'transition-all duration-500',
                  'hover:-translate-y-2',
                  'hover:shadow-2xl',
                  'hover:shadow-emerald-900/40',
                )}
              >
                <p
                  className={cn(
                    'text-4xl md:text-5xl',
                    'font-black text-amber-300',
                    'mb-3 tracking-tight',
                  )}
                >
                  {stat.value}
                </p>
                <h3
                  className={cn(
                    'text-lg font-black',
                    'text-white mb-2',
                    'tracking-tight',
                  )}
                >
                  {stat.label}
                </h3>
                <p
                  className={cn(
                    'text-emerald-200/70',
                    'font-medium text-sm',
                  )}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
