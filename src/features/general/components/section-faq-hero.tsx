import { Diamond, Plus, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { FaqTheme } from './section-faq-types'

type SectionFaqHeroProps = {
  badge: string
  title: string
  accentWord: string
  subtitle: string
  theme: FaqTheme
}

export function SectionFaqHero({
  badge,
  title,
  accentWord,
  subtitle,
  theme,
}: SectionFaqHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-20 md:py-32',
        theme.heroBg,
      )}
    >
      <div
        className={cn(
          'absolute top-[-10%] left-[-10%]',
          'w-150 h-150 rounded-full',
          'blur-[120px] pointer-events-none',
          theme.glowTop,
        )}
      />
      <div
        className={cn(
          'absolute bottom-[-10%] right-[-5%]',
          'w-125 h-125 rounded-full',
          'blur-[120px] pointer-events-none',
          theme.glowBottom,
        )}
      />
      <Plus
        className={cn(
          'absolute top-[10%] left-[15%]',
          'w-8 h-8 animate-pulse',
          theme.ornamentPlus,
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[20%] right-[40%]',
          'w-16 h-16 rotate-12',
          theme.ornamentDiamond,
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
            'px-4 py-2 rounded-full border',
            'shadow-lg backdrop-blur-md mb-8',
            theme.badgeBg,
            theme.badgeBorder,
          )}
        >
          <Sparkles
            className={cn(
              'w-4 h-4 text-white',
              'fill-white',
            )}
          />
          <span
            className={cn(
              'text-[11px] font-black',
              'tracking-[0.2em] uppercase',
              theme.badgeText,
            )}
          >
            {badge}
          </span>
        </div>
        <h1
          className={cn(
            'text-5xl md:text-6xl lg:text-7xl',
            'font-black text-white tracking-tighter',
            'leading-none drop-shadow-lg mb-6',
          )}
        >
          {title}{' '}
          <span className={theme.accentWord}>
            {accentWord}
          </span>
        </h1>
        <p
          className={cn(
            'text-xl max-w-2xl mx-auto',
            'leading-relaxed font-medium',
            'text-white/90',
          )}
        >
          {subtitle}
        </p>
      </div>
    </section>
  )
}
