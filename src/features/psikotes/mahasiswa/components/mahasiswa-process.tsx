import { Plus, Circle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import { MAHASISWA_PROCESS } from '../../constants'

export function MahasiswaProcess() {
  return (
    <div className="bg-background">
      <section
        className={cn(
          'py-16 md:py-20 relative',
          'overflow-hidden bg-emerald-950',
          'text-white',
          'rounded-t-[40px]',
          'md:rounded-t-[80px]',
          'rounded-b-[40px]',
          'md:rounded-b-[80px]',
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
            'absolute top-[15%] left-[5%]',
            'text-emerald-400/20 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[20%]',
            'right-[8%]',
            'text-amber-400/20 w-16 h-16',
            'animate-float-slow',
          )}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-96 h-96 bg-emerald-600/20',
            'rounded-full blur-[100px]',
            'translate-x-1/2 -translate-y-1/2',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0',
            'w-96 h-96 bg-emerald-300/10',
            'rounded-full blur-[100px]',
            '-translate-x-1/2 translate-y-1/2',
          )}
        />

        <div
          className={cn(
            'max-w-4xl mx-auto px-6',
            'relative z-10',
          )}
        >
          {/* Header */}
          <div
            className="text-center mb-10 space-y-3"
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
                  'text-amber-400 fill-amber-400',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-emerald-100 uppercase',
                )}
              >
                How It Works
              </span>
            </div>

            <h2
              className={cn(
                'text-3xl md:text-5xl',
                'font-black tracking-tight',
                'drop-shadow-md',
              )}
            >
              Langkah{' '}
              <span className="text-amber-300 relative">
                Mudah
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
              </span>{' '}
              Memulai
            </h2>
            <p
              className={cn(
                'text-emerald-200/70 font-medium',
                'max-w-lg mx-auto',
              )}
            >
              Cukup tiga langkah sederhana untuk
              memulai asesmen psikologi Anda.
            </p>
          </div>

          {/* Vertical Steps */}
          <div className="space-y-6">
            {MAHASISWA_PROCESS.map((item) => (
              <div
                key={item.step}
                className={cn(
                  'flex items-center gap-6',
                  'bg-white/5 backdrop-blur-md',
                  'p-6 md:p-8 rounded-3xl',
                  'border border-white/10',
                  'transition-all duration-500',
                  'hover:-translate-y-1',
                  'hover:shadow-2xl',
                  'hover:shadow-emerald-900/40',
                )}
              >
                {/* Step Number */}
                <div
                  className={cn(
                    'w-16 h-16 shrink-0',
                    'bg-amber-400 rounded-2xl',
                    'flex items-center',
                    'justify-center',
                    'text-slate-950',
                    'font-black text-xl',
                    'shadow-lg',
                  )}
                >
                  {item.step}
                </div>

                <div>
                  <h3
                    className={cn(
                      'text-xl font-black',
                      'text-white mb-1',
                      'tracking-tight',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'text-emerald-200/70',
                      'font-medium',
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
