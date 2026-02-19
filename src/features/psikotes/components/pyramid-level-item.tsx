import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import { type Level } from './curriculum-levels'

type PyramidLevelItemProps = {
  item: Level
  isActive: boolean
  onToggle: () => void
}

export function PyramidLevelItem({
  item,
  isActive,
  onToggle,
}: PyramidLevelItemProps) {
  const Icon = item.icon

  return (
    <div
      className={cn(
        'group cursor-pointer',
        item.width,
        'transition-all',
        'duration-500',
        isActive
          ? 'scale-[1.05]'
          : 'hover:scale-[1.03]',
      )}
      onClick={onToggle}
    >
      <div
        className={cn(
          'flex items-center',
          'gap-3',
        )}
      >
        {/* 3D Block */}
        <div
          className={cn(
            'flex-1 relative overflow-hidden',
            'rounded-xl py-4 md:py-5',
            'px-4 md:px-6 text-white',
            'font-black text-lg md:text-2xl',
            'tracking-tight',
            'transition-shadow duration-500',
            item.bg, item.depth,
            isActive
              ? cn(
                  'shadow-xl',
                  item.glow,
                )
              : 'shadow-lg',
          )}
        >
          {/* Glossy */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-br',
              'from-white/20',
              'via-transparent',
              'to-black/10',
              'pointer-events-none',
            )}
          />

          <div
            className={cn(
              'relative flex',
              'items-center',
              'justify-center',
              'gap-3',
            )}
          >
            <div
              className={cn(
                'w-8 h-8',
                'md:w-9 md:h-9',
                'rounded-lg flex',
                'items-center',
                'justify-center',
                'shrink-0',
                'transition-transform',
                'duration-500',
                item.iconBg,
                isActive &&
                  'rotate-12',
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4',
                  'md:w-5',
                  'md:h-5',
                  'text-white',
                )}
              />
            </div>
            <span
              className={cn(
                'drop-shadow',
              )}
            >
              Level {item.level}
            </span>
          </div>

          <span
            className={cn(
              'block text-xs',
              'font-bold',
              'text-white/70',
              'mt-1 text-center',
              'md:hidden',
              'relative',
            )}
          >
            {item.label}
          </span>
        </div>

        {/* Desktop pill */}
        <div
          className={cn(
            'hidden md:flex',
            'items-center',
            'gap-2',
            'rounded-full',
            'px-5 py-3',
            'text-white',
            'font-bold text-sm',
            'whitespace-nowrap',
            'transition-all',
            'duration-500',
            item.pill,
            isActive &&
              'ring-2',
            isActive &&
              'ring-white/30',
          )}
        >
          {item.label}
          <ChevronRight
            className={cn(
              'w-4 h-4',
              'opacity-60',
              'transition-transform',
              'duration-300',
              isActive &&
                'translate-x-1',
            )}
          />
        </div>
      </div>

      {/* Expanded detail */}
      <div
        className={cn(
          'grid',
          'transition-all',
          'duration-500',
          'ease-in-out',
          isActive
            ? 'grid-rows-[1fr]'
              + ' opacity-100'
              + ' mt-3'
            : 'grid-rows-[0fr]'
              + ' opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'rounded-2xl p-5',
              'md:p-6',
              'backdrop-blur-md',
              'border',
              item.cardBg,
              item.cardBorder,
            )}
          >
            <div
              className={cn(
                'flex items-start',
                'gap-4',
              )}
            >
              <div
                className={cn(
                  'w-10 h-10',
                  'rounded-xl',
                  'flex items-center',
                  'justify-center',
                  'shrink-0',
                  item.iconBg,
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    'text-white',
                  )}
                />
              </div>
              <div
                className="flex-1"
              >
                <p
                  className={cn(
                    'font-black',
                    'text-white',
                    'text-sm',
                    'uppercase',
                    'tracking-wide',
                    'mb-1',
                  )}
                >
                  {item.label}
                </p>
                <p
                  className={cn(
                    'text-primary-200/60',
                    'text-xs mb-2',
                    'font-bold',
                  )}
                >
                  {item.tagline}
                </p>
                <p
                  className={cn(
                    'text-sm',
                    'text-primary-100/80',
                    'font-medium',
                    'leading-relaxed',
                  )}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
