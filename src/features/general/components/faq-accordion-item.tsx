import { ChevronDown, HelpCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { FaqItem, FaqTheme } from './section-faq-types'

type FaqAccordionItemProps = {
  faq: FaqItem
  isOpen: boolean
  onToggle: () => void
  theme: FaqTheme
}

export function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
  theme,
}: FaqAccordionItemProps) {
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
