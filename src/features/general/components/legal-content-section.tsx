import {
  Plus,
  Diamond,
  Circle,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { LegalSection, LegalTheme } from './legal-types'

type LegalContentSectionProps = {
  sections: LegalSection[]
  theme: LegalTheme
}

export function LegalContentSection({
  sections,
  theme,
}: LegalContentSectionProps) {
  return (
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
