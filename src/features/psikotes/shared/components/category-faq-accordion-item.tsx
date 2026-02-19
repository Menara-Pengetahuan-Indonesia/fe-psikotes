import { ChevronDown, HelpCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { FaqItem } from '../../types'

interface CategoryFaqAccordionItemProps {
  faq: FaqItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}

export function CategoryFaqAccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: CategoryFaqAccordionItemProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl',
        'border transition-all',
        'duration-500 overflow-hidden',
        isOpen
          ? 'border-primary-500'
            + ' shadow-xl'
            + ' shadow-primary-900/5'
            + ' ring-1'
            + ' ring-primary-500/10'
          : 'border-slate-100'
            + ' shadow-lg'
            + ' shadow-stone-200/50'
            + ' hover:border-slate-200',
      )}
    >
      <button
        onClick={() => onToggle(index)}
        className={cn(
          'w-full flex cursor-pointer',
          'items-center justify-between',
          'p-6 md:p-8 text-left',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-4',
          )}
        >
          <div
            className={cn(
              'w-10 h-10 rounded-xl',
              'flex items-center',
              'justify-center',
              'transition-colors',
              isOpen
                ? 'bg-primary-600'
                  + ' text-white'
                : 'bg-slate-50'
                  + ' text-slate-400',
            )}
          >
            <HelpCircle
              className="h-5 w-5"
            />
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
            'ml-4 shrink-0',
            'rounded-full p-2',
            'transition-all',
            isOpen
              ? 'bg-primary-50'
                + ' text-primary-600'
              : 'bg-slate-50'
                + ' text-slate-300',
          )}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5',
              'transition-transform',
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
            ? 'grid-rows-[1fr]'
              + ' opacity-100'
            : 'grid-rows-[0fr]'
              + ' opacity-0',
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
                'text-slate-500',
                'leading-relaxed',
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
