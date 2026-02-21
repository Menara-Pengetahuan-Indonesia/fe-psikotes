import { Plus, Circle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

import { MAHASISWA_PROCESS } from '../../constants'

export function MahasiswaProcess() {
  return (
    <div className="bg-background">
      <section
        className={cn(
          'py-16 md:py-20 relative',
          'overflow-hidden bg-primary-950',
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
            backgroundImage: TOPO_WHITE,
            backgroundSize: TOPO_BG_SIZE,
          }}
        />

        {/* Ornaments */}
        <Plus
          className={cn(
            'absolute top-[15%] left-[5%]',
            'text-primary-400/20 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[20%]',
            'right-[8%]',
            'text-accent-400/20 w-16 h-16',
            'animate-float-slow',
          )}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-96 h-96 bg-primary-600/20',
            'rounded-full blur-[100px]',
            'translate-x-1/2 -translate-y-1/2',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0',
            'w-96 h-96 bg-primary-300/10',
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
                  'text-accent-400 fill-accent-400',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-primary-100 uppercase',
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
              <span className="text-accent-300 relative">
                Mudah
                <svg
                  className={cn(
                    'absolute -bottom-2 left-0',
                    'w-full h-3',
                    'text-accent-400/40',
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
                'text-primary-200/70 font-medium',
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
                  'hover:shadow-primary-900/40',
                )}
              >
                {/* Step Number */}
                <div
                  className={cn(
                    'w-16 h-16 shrink-0',
                    'bg-accent-400 rounded-2xl',
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
                      'text-primary-200/70',
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
