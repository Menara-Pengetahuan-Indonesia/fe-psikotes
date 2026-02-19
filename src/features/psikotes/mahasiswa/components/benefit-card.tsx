import { cn } from '@/lib/utils'

import { MAHASISWA_BENEFITS } from '../../constants'

const THEME_BG: Record<string, string> = {
  teal: 'bg-primary-600',
  amber: 'bg-accent-500',
  sky: 'bg-sky-500',
  indigo: 'bg-indigo-500',
  rose: 'bg-rose-500',
}

export function BenefitCard({
  item,
  offset,
}: {
  item: (typeof MAHASISWA_BENEFITS)[number]
  offset: number
}) {
  const Icon = item.icon
  const bg =
    THEME_BG[item.theme] ?? 'bg-primary-600'
  const isCenter = offset === 0
  const isVisible = Math.abs(offset) <= 1

  return (
    <div
      className={cn(
        'absolute rounded-3xl overflow-hidden',
        bg,
      )}
      style={{
        width: isCenter
          ? 'clamp(280px, 40vw, 340px)'
          : 'clamp(220px, 32vw, 280px)',
        height: isCenter
          ? 'clamp(300px, 42vw, 360px)'
          : 'clamp(240px, 34vw, 290px)',
        transform: `translateX(${
          offset * 240
        }px) scale(${isCenter ? 1 : 0.92})`,
        opacity: isVisible
          ? (isCenter ? 1 : 0.8)
          : 0,
        zIndex: isCenter
          ? 20
          : 10 - Math.abs(offset),
        pointerEvents: isVisible
          ? 'auto'
          : 'none',
        transition:
          'transform 600ms cubic-bezier(.4,0,.2,1),'
          + ' opacity 600ms cubic-bezier(.4,0,.2,1),'
          + ' width 600ms cubic-bezier(.4,0,.2,1),'
          + ' height 600ms cubic-bezier(.4,0,.2,1)',
        boxShadow: isCenter
          ? '0 25px 50px -12px rgba(0,0,0,.25)'
          : '0 10px 25px -5px rgba(0,0,0,.1)',
      }}
    >
      <div
        className={cn(
          'h-full flex flex-col',
          'justify-end p-6 md:p-8',
          'relative',
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            'absolute top-5 right-5',
            'w-12 h-12 rounded-2xl',
            'bg-white/20 backdrop-blur-sm',
            'flex items-center justify-center',
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-black text-white',
            'tracking-tight leading-tight',
            isCenter
              ? 'text-2xl md:text-3xl mb-3'
              : 'text-lg md:text-xl mb-2',
          )}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'text-white/80 text-sm',
            'leading-relaxed font-medium',
            'transition-opacity duration-500',
          )}
          style={{ opacity: isCenter ? 1 : 0 }}
        >
          {item.description}
        </p>
      </div>
    </div>
  )
}
