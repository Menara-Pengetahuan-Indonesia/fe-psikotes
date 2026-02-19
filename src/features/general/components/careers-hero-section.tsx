import {
  Plus,
  Hexagon,
  Diamond,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function CareersHeroSection() {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-20 md:py-36',
        'bg-linear-to-b from-secondary-900',
        'via-secondary to-secondary-300',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 opacity-[0.07]',
          'pointer-events-none mix-blend-overlay',
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />
      <div
        className={cn(
          'absolute top-[-10%] left-[-10%]',
          'w-150 h-150 bg-secondary-900/30',
          'rounded-full blur-[120px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-[-10%] right-[-5%]',
          'w-125 h-125 bg-sky-300/15',
          'rounded-full blur-[120px]',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute top-[10%] left-[15%]',
          'text-sky-300/30 w-8 h-8',
          'animate-pulse',
        )}
      />
      <Hexagon
        className={cn(
          'absolute top-[20%] right-[25%]',
          'text-white/10 w-24 h-24',
          '-rotate-12 animate-float-medium',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[20%] right-[40%]',
          'text-accent-200/10 w-16 h-16',
          'rotate-12 animate-float-slow',
        )}
      />

      <div
        className={cn(
          'max-w-5xl mx-auto px-6',
          'relative z-10 text-center',
        )}
      >
        <div
          className={cn(
            'inline-flex items-center gap-2',
            'px-4 py-2 rounded-full',
            'bg-secondary/60 border',
            'border-sky-400/40 shadow-lg',
            'backdrop-blur-md mb-8',
          )}
        >
          <Sparkles
            className={cn(
              'w-4 h-4 text-accent-400',
              'fill-accent-400',
            )}
          />
          <span
            className={cn(
              'text-[11px] font-black',
              'tracking-[0.2em]',
              'text-sky-50 uppercase',
            )}
          >
            Join Our Team
          </span>
        </div>
        <h1
          className={cn(
            'text-5xl md:text-6xl lg:text-7xl',
            'font-black text-white',
            'tracking-tighter leading-none',
            'drop-shadow-lg mb-6',
          )}
        >
          Karir di{' '}
          <span className="text-accent-300">
            BERMOELA
          </span>
        </h1>
        <p
          className={cn(
            'text-xl text-sky-50 max-w-2xl',
            'mx-auto leading-relaxed',
            'font-medium opacity-90',
          )}
        >
          Bergabung bersama kami membangun platform
          pengembangan diri terbaik di Indonesia.
        </p>
      </div>
    </section>
  )
}
