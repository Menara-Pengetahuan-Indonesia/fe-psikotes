import { cn } from '@/lib/utils'

import { HEADING_COLORS } from '../constants'
import type { HeadingColor } from '../constants'

export function SectionHeading({
  color,
  label,
}: {
  color: HeadingColor
  label: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
      )}
    >
      <div
        className={cn(
          'w-1.5 h-7 rounded-full',
          HEADING_COLORS[color],
        )}
      />
      <h2
        className={cn(
          'text-2xl font-black',
          'text-stone-800 tracking-tight',
        )}
      >
        {label}
      </h2>
    </div>
  )
}
