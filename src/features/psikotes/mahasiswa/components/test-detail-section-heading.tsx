import { cn } from '@/lib/utils'

export const HEADING_COLORS = {
  teal: 'bg-primary-500',
  amber: 'bg-accent-500',
  sky: 'bg-sky-500',
}

export type HeadingColor =
  keyof typeof HEADING_COLORS

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
