import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function BenefitCard({
  icon: Icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-[2.5rem]',
        'border border-slate-100',
        'bg-white',
        'transition-all',
        'duration-500',
        'hover:-translate-y-1.5',
        'shadow-xl',
        'shadow-stone-200/50',
        'hover:shadow-2xl',
        'hover:shadow-primary-900/5',
        'hover:border-primary-500',
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-2xl',
          'flex items-center',
          'justify-center mb-4',
          'shadow-inner',
          'bg-primary-50',
          'text-primary-700',
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3
        className={cn(
          'font-black text-lg',
          'text-slate-900 mb-2',
          'leading-tight',
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'text-slate-500',
          'text-xs',
          'leading-relaxed',
          'font-medium',
        )}
      >
        {description}
      </p>
    </div>
  )
}
