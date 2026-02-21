import {
  Sparkles,
  Plus,
  Hexagon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

import { PERUSAHAAN_PROCESS } from '../../constants'
import { ProcessStepCard } from './process-step-card'

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
          backgroundImage: TOPO_WHITE,
          backgroundSize: TOPO_BG_SIZE,
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[12%] left-[6%]',
          'text-primary-600/15 w-8 h-8',
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
          'text-primary-600/[0.07]',
          'w-24 h-24 -rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-20 -left-20',
          'w-80 h-80 bg-primary-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-16 -right-16',
          'w-64 h-64 bg-accent-100/20',
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
            <span className="text-primary-600 relative">
              Kami Bekerja?
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
              'h-px bg-primary-200 z-0',
            )}
          />

          <div
            className={cn(
              'grid grid-cols-1',
              'md:grid-cols-4 gap-8',
            )}
          >
            {PERUSAHAAN_PROCESS.map((item, i) => (
              <ProcessStepCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                stepNumber={i + 1}
                isLast={
                  i === PERUSAHAAN_PROCESS.length - 1
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
