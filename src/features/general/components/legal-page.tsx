import {
  Plus,
  Diamond,
  Circle,
  Sparkles,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type LegalSection = {
  title: string
  content: string
}

type LegalTheme = {
  heroBg: string
  glowTop: string
  glowBottom: string
  ornamentPlus: string
  ornamentDiamond: string
  badgeBg: string
  badgeBorder: string
  badgeText: string
  accentWord: string
  ornamentSectionPlus: string
  ornamentSectionCircle: string
  ornamentSectionDiamond: string
  numberBg: string
  numberText: string
  cardBorder: string
  cardShadow: string
}

type LegalPageProps = {
  badge: string
  title: string
  accentWord: string
  subtitle: string
  sections: LegalSection[]
  theme: LegalTheme
}

export const EMERALD_LEGAL: LegalTheme = {
  heroBg: cn(
    'bg-linear-to-b from-emerald-700',
    'via-emerald-600 to-emerald-400',
  ),
  glowTop: 'bg-emerald-900/20',
  glowBottom: 'bg-emerald-300/20',
  ornamentPlus: 'text-emerald-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-emerald-600/50',
  badgeBorder: 'border-emerald-300',
  badgeText: 'text-emerald-50',
  accentWord: 'text-emerald-950',
  ornamentSectionPlus: 'text-emerald-800/20',
  ornamentSectionCircle: 'text-amber-500/20',
  ornamentSectionDiamond: 'text-emerald-600/20',
  numberBg: 'bg-emerald-600',
  numberText: 'text-white',
  cardBorder: 'hover:border-emerald-200',
  cardShadow: 'shadow-emerald-900/5',
}

export const INDIGO_LEGAL: LegalTheme = {
  heroBg: cn(
    'bg-linear-to-b from-indigo-700',
    'via-indigo-600 to-indigo-400',
  ),
  glowTop: 'bg-indigo-900/20',
  glowBottom: 'bg-indigo-300/20',
  ornamentPlus: 'text-indigo-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-indigo-600/50',
  badgeBorder: 'border-indigo-300',
  badgeText: 'text-indigo-50',
  accentWord: 'text-indigo-950',
  ornamentSectionPlus: 'text-indigo-800/20',
  ornamentSectionCircle: 'text-amber-500/20',
  ornamentSectionDiamond: 'text-indigo-600/20',
  numberBg: 'bg-indigo-600',
  numberText: 'text-white',
  cardBorder: 'hover:border-indigo-200',
  cardShadow: 'shadow-indigo-900/5',
}

export const ORANGE_LEGAL: LegalTheme = {
  heroBg: cn(
    'bg-linear-to-b from-orange-700',
    'via-orange-600 to-orange-400',
  ),
  glowTop: 'bg-orange-900/20',
  glowBottom: 'bg-orange-300/20',
  ornamentPlus: 'text-orange-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-orange-600/50',
  badgeBorder: 'border-orange-300',
  badgeText: 'text-orange-50',
  accentWord: 'text-orange-950',
  ornamentSectionPlus: 'text-orange-800/20',
  ornamentSectionCircle: 'text-amber-500/20',
  ornamentSectionDiamond: 'text-orange-600/20',
  numberBg: 'bg-orange-600',
  numberText: 'text-white',
  cardBorder: 'hover:border-orange-200',
  cardShadow: 'shadow-orange-900/5',
}

export function LegalPage({
  badge,
  title,
  accentWord,
  subtitle,
  sections,
  theme,
}: LegalPageProps) {
  return (
    <main>
      {/* Hero */}
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

      {/* Content */}
      <section
        className={cn(
          'py-24 md:py-36 bg-background',
          'relative overflow-hidden',
        )}
      >
        <Plus
          className={cn(
            'absolute top-[8%] left-[6%]',
            'w-10 h-10 rotate-45',
            'pointer-events-none',
            theme.ornamentSectionPlus,
          )}
        />
        <Circle
          className={cn(
            'absolute top-[15%] right-[8%]',
            'w-14 h-14 pointer-events-none',
            theme.ornamentSectionCircle,
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[10%] left-[10%]',
            'w-8 h-8 rotate-12',
            'pointer-events-none',
            theme.ornamentSectionDiamond,
          )}
        />

        <div
          className={cn(
            'max-w-4xl mx-auto px-6',
            'relative z-10',
          )}
        >
          <div className="space-y-4">
            {sections.map((s, i) => (
              <LegalCard
                key={s.title}
                section={s}
                index={i}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function LegalCard({
  section,
  index,
  theme,
}: {
  section: LegalSection
  index: number
  theme: LegalTheme
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl border',
        'border-slate-100 shadow-lg',
        'shadow-stone-200/50 transition-all',
        'duration-300 p-6 md:p-8',
        theme.cardBorder,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-10 h-10 rounded-xl shrink-0',
            'flex items-center justify-center',
            theme.numberBg,
            theme.numberText,
          )}
        >
          <Shield className="h-5 w-5" />
        </div>
        <div className="space-y-2 min-w-0">
          <h3
            className={cn(
              'font-black text-lg',
              'text-slate-800',
            )}
          >
            <span
              className={cn(
                'text-slate-400 mr-2',
                'font-mono text-sm',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {section.title}
          </h3>
          <p
            className={cn(
              'text-slate-500 leading-relaxed',
              'font-medium text-base',
            )}
          >
            {section.content}
          </p>
        </div>
      </div>
    </div>
  )
}
