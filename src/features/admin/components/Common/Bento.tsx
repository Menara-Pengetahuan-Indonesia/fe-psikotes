import React from 'react'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[20rem]',
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
}

export function BentoCard({
  children,
  className,
  title,
  description,
  icon,
  badge,
  header,
  footer,
  onClick,
}: BentoCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm transition-all hover:shadow-xl hover:border-indigo-100 cursor-pointer',
        className
      )}
    >
      {/* Background Decor */}
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:scale-150" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="size-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                {icon}
              </div>
            )}
            <div className="flex flex-col">
               {badge && <div className="mb-1">{badge}</div>}
               {title && <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{title}</h3>}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {description && (
            <p className="text-sm font-medium text-slate-500 line-clamp-3 leading-relaxed mb-4">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Footer Section */}
        {footer && <div className="mt-6 pt-6 border-t border-slate-50">{footer}</div>}
      </div>
    </div>
  )
}
