'use client'

import { useState } from 'react'

import { Plus, Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { FaqItem } from '../../types'

import { CategoryFaqAccordionItem } from './category-faq-accordion-item'
import { CategoryFaqHeader } from './category-faq-header'

const TOPOGRAPHIC_BG_IMAGE =
  'url("data:image/svg+xml,'
  + '%3Csvg width=\'200\''
  + ' height=\'200\''
  + ' viewBox=\'0 0 200 200\''
  + ' xmlns=\'http://www.w3.org/'
  + '2000/svg\'%3E%3Cpath'
  + ' d=\'M0 100 C 20 80, 40 120,'
  + ' 60 100 S 100 80, 120 100'
  + ' S 160 120, 200 100\''
  + ' stroke=\'%23059669\''
  + ' fill=\'transparent\''
  + ' stroke-width=\'1\'/%3E'
  + '%3C/svg%3E")'

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
          backgroundImage: TOPOGRAPHIC_BG_IMAGE,
          backgroundSize: '400px 400px',
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
