'use client'

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Plus,
  Circle,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type FaqItem = { q: string; a: string }

type FaqTheme = {
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
  ornamentSectionRing: string
  activeBorder: string
  activeShadow: string
  activeRing: string
  activeIcon: string
  activeChevron: string
}

type SectionFaqPageProps = {
  badge: string
  title: string
  accentWord: string
  subtitle: string
  faqs: FaqItem[]
  theme: FaqTheme
}

export const EMERALD_FAQ: FaqTheme = {
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
  ornamentSectionRing: 'border-emerald-800/15',
  activeBorder: 'border-emerald-500',
  activeShadow: 'shadow-emerald-900/5',
  activeRing: 'ring-emerald-500/10',
  activeIcon: 'bg-emerald-600 text-white',
  activeChevron: 'bg-emerald-50 text-emerald-600',
}

export const INDIGO_FAQ: FaqTheme = {
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
  ornamentSectionRing: 'border-indigo-800/15',
  activeBorder: 'border-indigo-500',
  activeShadow: 'shadow-indigo-900/5',
  activeRing: 'ring-indigo-500/10',
  activeIcon: 'bg-indigo-600 text-white',
  activeChevron: 'bg-indigo-50 text-indigo-600',
}

export const ORANGE_FAQ: FaqTheme = {
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
  ornamentSectionRing: 'border-orange-800/15',
  activeBorder: 'border-orange-500',
  activeShadow: 'shadow-orange-900/5',
  activeRing: 'ring-orange-500/10',
  activeIcon: 'bg-orange-600 text-white',
  activeChevron: 'bg-orange-50 text-orange-600',
}

export function SectionFaqPage({
  badge,
  title,
  accentWord,
  subtitle,
  faqs,
  theme,
}: SectionFaqPageProps) {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(0)

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

      {/* FAQ Accordion */}
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
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <FaqAccordionItem
                  key={i}
                  faq={faq}
                  isOpen={isOpen}
                  onToggle={() =>
                    setOpenIndex(
                      isOpen ? null : i,
                    )
                  }
                  theme={theme}
                />
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
  theme,
}: {
  faq: FaqItem
  isOpen: boolean
  onToggle: () => void
  theme: FaqTheme
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl border',
        'transition-all duration-500 overflow-hidden',
        isOpen
          ? cn(
              theme.activeBorder,
              'shadow-xl',
              theme.activeShadow,
              'ring-1',
              theme.activeRing,
            )
          : cn(
              'border-slate-100 shadow-lg',
              'shadow-stone-200/50',
              'hover:border-slate-200',
            ),
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex cursor-pointer',
          'items-center justify-between',
          'p-6 md:p-8 text-left',
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'w-10 h-10 rounded-xl',
              'flex items-center justify-center',
              'transition-colors',
              isOpen
                ? theme.activeIcon
                : 'bg-slate-50 text-slate-400',
            )}
          >
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3
            className={cn(
              'font-black text-lg',
              'transition-colors',
              isOpen
                ? 'text-slate-900'
                : 'text-slate-700',
            )}
          >
            {faq.q}
          </h3>
        </div>
        <span
          className={cn(
            'ml-4 shrink-0 rounded-full p-2',
            'transition-all',
            isOpen
              ? theme.activeChevron
              : 'bg-slate-50 text-slate-300',
          )}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform',
              'duration-500',
              isOpen && 'rotate-180',
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          'grid transition-all',
          'duration-500 ease-in-out',
          isOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'px-6 md:px-8',
              'pb-8 pt-0 ml-14',
            )}
          >
            <p
              className={cn(
                'text-slate-500 leading-relaxed',
                'font-medium text-base',
              )}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
