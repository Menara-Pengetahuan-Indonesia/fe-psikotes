import {
  Sparkles,
  Plus,
  Hexagon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { PERUSAHAAN_PROCESS } from '../../constants'

export function PerusahaanProcess() {
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
          'absolute top-[12%] left-[6%]',
          'text-emerald-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[18%] right-[5%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute top-[25%] right-[10%]',
          'text-emerald-600/[0.07]',
          'w-24 h-24 -rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-20 -left-20',
          'w-80 h-80 bg-emerald-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-16 -right-16',
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
        <div className="text-center mb-12 space-y-3">
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
              Our Process
            </span>
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl',
              'font-black tracking-tight',
              'text-slate-900 leading-tight',
            )}
          >
            Bagaimana{' '}
            <span className="text-emerald-600 relative">
              Kami Bekerja?
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
              'max-w-lg mx-auto',
            )}
          >
            Proses asesmen yang terstruktur
            dari awal hingga laporan akhir.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className={cn(
              'hidden md:block absolute',
              'top-7 left-[12.5%] right-[12.5%]',
              'h-px bg-emerald-200 z-0',
            )}
          />

          <div
            className={cn(
              'grid grid-cols-1',
              'md:grid-cols-4 gap-8',
            )}
          >
            {PERUSAHAAN_PROCESS.map((item, i) => {
              const Icon = item.icon
              const isLast =
                i === PERUSAHAAN_PROCESS.length - 1

              return (
                <div
                  key={item.title}
                  className={cn(
                    'flex flex-col',
                    'items-center text-center',
                  )}
                >
                  {/* Step Number Badge */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl',
                      'bg-emerald-600',
                      'text-white font-black',
                      'text-lg flex items-center',
                      'justify-center mb-5',
                      'shadow-lg',
                      'shadow-emerald-600/20',
                      'relative z-10',
                    )}
                  >
                    {String(i + 1)
                      .padStart(2, '0')}
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      'group bg-white w-full',
                      'p-6 rounded-3xl',
                      'border border-slate-100',
                      'transition-all duration-500',
                      'hover:-translate-y-1',
                      'hover:shadow-2xl',
                      'hover:shadow-emerald-900/5',
                      'hover:border-emerald-500',
                      'shadow-xl',
                      'shadow-stone-200/50',
                      'flex-1',
                    )}
                  >
                    <div
                      className={cn(
                        'w-11 h-11 rounded-xl',
                        'bg-emerald-50',
                        'text-emerald-600',
                        'flex items-center',
                        'justify-center mx-auto',
                        'mb-4',
                        'group-hover:bg-emerald-600',
                        'group-hover:text-white',
                        'transition-colors',
                        'duration-500',
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={cn(
                        'text-base font-black',
                        'text-slate-900 mb-2',
                        'tracking-tight',
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        'text-slate-500',
                        'text-sm leading-relaxed',
                        'font-medium',
                      )}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Mobile connector */}
                  {!isLast && (
                    <div
                      className={cn(
                        'md:hidden w-px h-8',
                        'bg-emerald-200 mt-4',
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
