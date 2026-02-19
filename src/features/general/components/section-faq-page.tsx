'use client'

import { useState } from 'react'

import { Circle, Diamond, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

import { FaqAccordionItem } from './faq-accordion-item'
import { SectionFaqHero } from './section-faq-hero'
import type { SectionFaqPageProps } from './section-faq-types'

export { EMERALD_FAQ, INDIGO_FAQ, ORANGE_FAQ } from './section-faq-themes'
export type { FaqItem, FaqTheme, SectionFaqPageProps } from './section-faq-types'

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
      <SectionFaqHero
        badge={badge}
        title={title}
        accentWord={accentWord}
        subtitle={subtitle}
        theme={theme}
      />

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
