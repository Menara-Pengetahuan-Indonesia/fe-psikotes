import { Sparkles, Plus, Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

interface ResultHeroSectionProps {
  subtitle: string
}

export function ResultHeroSection({
  subtitle,
}: ResultHeroSectionProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        'bg-linear-to-b from-primary-800',
        'via-primary-700 to-primary-500',
        'text-white pt-28 pb-16 md:pt-36',
        'md:pb-20',
      )}
    >
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.05]',
          'pointer-events-none mix-blend-overlay',
        )}
        style={{
          backgroundImage: TOPO_WHITE,
          backgroundSize: TOPO_BG_SIZE,
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
          'rounded-full blur-[80px]',
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
          'max-w-2xl mx-auto px-6',
          'relative z-10 text-center space-y-4',
        )}
      >
        <div
          className={cn(
            'inline-flex items-center gap-2',
            'px-4 py-2 bg-white/10',
            'border border-white/10',
            'backdrop-blur-md rounded-full',
            'text-xs font-bold uppercase',
            'tracking-widest mb-4',
          )}
        >
          <Sparkles
            className={cn(
              'w-3 h-3 text-accent-300',
              'fill-accent-300',
            )}
          />
          Hasil Tes Kamu
        </div>
        <h1
          className={cn(
            'text-3xl md:text-5xl',
            'font-black leading-tight',
            'tracking-tight',
          )}
        >
          Selamat! Profil kamu
          <br /> telah teridentifikasi.
        </h1>
        <p
          className={cn(
            'text-primary-200 font-medium',
            'text-lg',
          )}
        >
          {subtitle}
        </p>
      </div>
    </header>
  )
}
