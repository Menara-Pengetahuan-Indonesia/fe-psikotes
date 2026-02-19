import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ProcessStepCardProps {
  icon: LucideIcon
  title: string
  description: string
  stepNumber: number
  isLast: boolean
}

export function ProcessStepCard({
  icon: Icon,
  title,
  description,
  stepNumber,
  isLast,
}: ProcessStepCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        'items-center text-center',
      )}
    >
      {/* Step Number Badge */}
      <div
        className={cn(
          'w-14 h-14 rounded-2xl',
          'bg-primary-600',
          'text-white font-black',
          'text-lg flex items-center',
          'justify-center mb-5',
          'shadow-lg',
          'shadow-primary-600/20',
          'relative z-10',
        )}
      >
        {String(stepNumber).padStart(2, '0')}
      </div>

      {/* Card */}
      <div
        className={cn(
          'group bg-white w-full',
          'p-6 rounded-3xl',
          'border border-slate-100',
          'transition-all duration-500',
          'hover:-translate-y-1',
          'hover:shadow-2xl',
          'hover:shadow-primary-900/5',
          'hover:border-primary-500',
          'shadow-xl',
          'shadow-stone-200/50',
          'flex-1',
        )}
      >
        <div
          className={cn(
            'w-11 h-11 rounded-xl',
            'bg-primary-50',
            'text-primary-600',
            'flex items-center',
            'justify-center mx-auto',
            'mb-4',
            'group-hover:bg-primary-600',
            'group-hover:text-white',
            'transition-colors',
            'duration-500',
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3
          className={cn(
            'text-base font-black',
            'text-slate-900 mb-2',
            'tracking-tight',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-slate-500',
            'text-sm leading-relaxed',
            'font-medium',
          )}
        >
          {description}
        </p>
      </div>

      {/* Mobile connector */}
      {!isLast && (
        <div
          className={cn(
            'md:hidden w-px h-8',
            'bg-primary-200 mt-4',
          )}
        />
      )}
    </div>
  )
}
