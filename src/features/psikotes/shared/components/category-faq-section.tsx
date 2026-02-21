'use client'

import { useState } from 'react'

import { Plus, Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { TOPO_PRIMARY, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

import type { FaqItem } from '../../types'

import { CategoryFaqAccordionItem } from './category-faq-accordion-item'
import { CategoryFaqHeader } from './category-faq-header'

interface CategoryFaqSectionProps {
  faqs: FaqItem[]
}

export function CategoryFaqSection({
  faqs,
}: CategoryFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(0)

  function handleToggle(index: number) {
    setOpenIndex(
      openIndex === index ? null : index,
    )
  }

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
          backgroundImage: TOPO_PRIMARY,
          backgroundSize: TOPO_BG_SIZE,
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[12%] left-[5%]',
          'text-primary-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[15%] right-[6%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute top-[35%] right-[8%]',
          'text-primary-600/[0.07]',
          'w-20 h-20 -rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-16 -right-16',
          'w-72 h-72 bg-primary-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-20 -left-20',
          'w-64 h-64 bg-accent-100/20',
          'rounded-full blur-[80px]',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-4xl mx-auto px-6',
          'relative z-10',
        )}
      >
        <CategoryFaqHeader />

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <CategoryFaqAccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
